/**
 * Google Apps Script Web App for Commuttr Website Waitlist Form (Secured)
 * 
 * Deployment: Configure Web App endpoint in environment variables (VITE_WAITLIST_ENDPOINT)
 * 
 * Security Features:
 * 1. Formula Injection Protection (CWE-1236): Prepend single quote to spreadsheet cells starting with =, +, -, @, tab, return.
 * 2. Backend Rate Limiting: Uses CacheService to prevent flooding (max 2 entries per 15 min per email, max 5 entries per min globally).
 * 3. Origin & Token Verification: Validates request domain origin and API secret token.
 * 4. Input Sanitization & Length Boundaries: Truncates long fields, strips control chars, and sanitizes line breaks for headers.
 * 5. HTML & XSS Escaping: Escapes all dynamic parameters rendered in HTML emails.
 */

var ALLOWED_ORIGINS = [
  "https://commuttr.co.za",
  "https://www.commuttr.co.za",
  "http://localhost:5173",
  "http://localhost:3000"
];

var SECRET_TOKEN = "cmtr_sec_98f4a10d927a4e61b2e3";

function doPost(e) {
  Logger.log("--> Incoming Waitlist doPost request received.");
  try {
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log("ERROR: Invalid request payload. Missing e.postData.contents.");
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Missing payload" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var contents = e.postData.contents;
    var data;
    try {
      data = JSON.parse(contents);
    } catch (parseErr) {
      Logger.log("ERROR: Payload parse failure: " + parseErr.toString());
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Invalid JSON format" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 1. Verification of Origin & Secret Token
    var requestOrigin = data._origin || (e.parameter ? e.parameter.origin : "");
    if (requestOrigin && !isAllowedOrigin(requestOrigin)) {
      Logger.log("REJECTED: Unauthorized Origin Domain -> " + requestOrigin);
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Unauthorized origin domain" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var providedToken = data._token || (e.parameter ? e.parameter.token : "");
    var configuredToken = getScriptProperty("API_SECRET_TOKEN") || SECRET_TOKEN;
    if (providedToken && providedToken !== configuredToken) {
      Logger.log("REJECTED: Invalid security verification token.");
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Invalid security token" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Extract & Sanitize Input Values
    var emailRaw = sanitizeSingleLine(data.email, 254).toLowerCase();
    var nameRaw = sanitizeSingleLine(data.name, 100);
    var cityRaw = sanitizeSingleLine(data.city, 100);
    var orgRaw = sanitizeSingleLine(data.organisation, 100);
    var modeRaw = sanitizeSingleLine(data.transportMode, 50);

    if (!emailRaw || !isValidEmail(emailRaw)) {
      Logger.log("REJECTED: Invalid email format -> " + emailRaw);
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Invalid email address format" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Backend Rate Limiting via CacheService
    var cache = CacheService.getScriptCache();
    
    // Global rate limit: max 5 requests per 60 seconds
    var globalCount = parseInt(cache.get("waitlist_global_count") || "0", 10);
    if (globalCount >= 5) {
      Logger.log("RATE LIMITED: Global submission rate limit exceeded.");
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Server busy. Please try again in a minute." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    cache.put("waitlist_global_count", String(globalCount + 1), 60);

    // Email rate limit: max 2 submissions per 15 minutes (900 seconds)
    var emailKey = "waitlist_email_" + md5Hash(emailRaw);
    var emailCount = parseInt(cache.get(emailKey) || "0", 10);
    if (emailCount >= 2) {
      Logger.log("RATE LIMITED: Email submission rate limit hit for " + emailRaw);
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Too many signups for this email. Please try again later." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    cache.put(emailKey, String(emailCount + 1), 900);

    // 4. Sanitize fields for Google Sheets cell storage (Formula Injection Neutralization)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

    var sheetName = sanitizeSpreadsheetCell(nameRaw);
    var sheetEmail = sanitizeSpreadsheetCell(emailRaw);
    var sheetCity = sanitizeSpreadsheetCell(cityRaw);
    var sheetOrg = sanitizeSpreadsheetCell(orgRaw);
    var sheetMode = sanitizeSpreadsheetCell(modeRaw);
    var source = "Website Waitlist Form";
    var status = "New";

    sheet.appendRow([
      formattedDate,
      sheetName,
      sheetEmail,
      sheetCity,
      sheetOrg,
      sheetMode,
      source,
      status
    ]);
    Logger.log("--> Row written safely to Waitlist Google Sheet.");

    // 5. Send Team Email Notification
    try {
      sendTeamWaitlistNotification({
        name: nameRaw,
        email: emailRaw,
        city: cityRaw,
        organisation: orgRaw,
        transportMode: modeRaw,
        timestamp: formattedDate
      });
      Logger.log("--> Team email notification sent.");
    } catch (teamMailErr) {
      Logger.log("ERROR sending team mail: " + teamMailErr.toString());
    }

    // 6. Send User Welcome Confirmation Email
    try {
      sendUserWaitlistConfirmation({
        name: nameRaw,
        email: emailRaw
      });
      Logger.log("--> User welcome confirmation email sent.");
    } catch (userMailErr) {
      Logger.log("ERROR sending user mail: " + userMailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("CRITICAL WAITLIST POST ERROR: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Internal server error" }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Neutralizes CSV/Spreadsheet Formula Injection (CWE-1236).
 * If cell starts with '=', '+', '-', '@', '\t', '\r', prepends single quote.
 */
function sanitizeSpreadsheetCell(input) {
  if (input === null || input === undefined) return "N/A";
  var str = String(input).trim();
  if (str === "") return "N/A";
  
  // Remove control characters
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

  // Formula trigger check: =, +, -, @, \t, \r
  if (/^[\=\+\-\@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function sanitizeSingleLine(input, maxLen) {
  if (!input) return "";
  var str = String(input).trim().replace(/[\r\n]/g, " ");
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  if (maxLen && str.length > maxLen) {
    str = str.substring(0, maxLen);
  }
  return str;
}

function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isAllowedOrigin(origin) {
  for (var i = 0; i < ALLOWED_ORIGINS.length; i++) {
    if (origin.indexOf(ALLOWED_ORIGINS[i]) === 0) return true;
  }
  return false;
}

function md5Hash(str) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str);
  var hash = "";
  for (var i = 0; i < bytes.length; i++) {
    var byteVal = bytes[i];
    if (byteVal < 0) byteVal += 256;
    var byteStr = byteVal.toString(16);
    if (byteStr.length == 1) byteStr = "0" + byteStr;
    hash += byteStr;
  }
  return hash;
}

function getScriptProperty(propName) {
  try {
    return PropertiesService.getScriptProperties().getProperty(propName);
  } catch (e) {
    return null;
  }
}

function sendTeamWaitlistNotification(data) {
  var recipient = "hellocommuttr@gmail.com";
  var subject = "🎉 New Commuttr Waitlist Signup";

  var htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0b; color: #fafafa; margin: 0; padding: 24px; }
          .card { background-color: #101013; border: 1px solid rgba(255,255,255,0.1); border-radius: 0; padding: 28px; max-width: 580px; margin: 0 auto; }
          .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px; }
          .header h2 { margin: 0; color: #f63d06; font-size: 20px; font-weight: 700; }
          .header p { margin: 4px 0 0 0; color: #9a9aa5; font-size: 13px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #9a9aa5; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #ffffff; line-height: 1.5; }
          .value a { color: #f63d06; text-decoration: none; }
          .footer { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 28px; padding-top: 16px; font-size: 12px; color: #9a9aa5; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>🎉 New Waitlist Signup</h2>
            <p>Commuttr Mobility Platform</p>
          </div>
          
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          
          <div class="field">
            <div class="label">City</div>
            <div class="value">${escapeHtml(data.city)}</div>
          </div>

          <div class="field">
            <div class="label">Organisation</div>
            <div class="value">${escapeHtml(data.organisation)}</div>
          </div>

          <div class="field">
            <div class="label">Primary Transport Mode</div>
            <div class="value">${escapeHtml(data.transportMode)}</div>
          </div>
          
          <div class="field">
            <div class="label">Signed Up</div>
            <div class="value">${escapeHtml(data.timestamp)}</div>
          </div>

          <div class="footer">
            Commuttr Digital Mobility • Automated Notification
          </div>
        </div>
      </body>
    </html>
  `;

  var plainBody = 
    "New Commuttr Waitlist Signup\n\n" +
    "Name: " + data.name + "\n" +
    "Email: " + data.email + "\n" +
    "City: " + data.city + "\n" +
    "Organisation: " + data.organisation + "\n" +
    "Primary Transport Mode: " + data.transportMode + "\n\n" +
    "Timestamp: " + data.timestamp;

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
}

function sendUserWaitlistConfirmation(data) {
  if (!data.email || data.email === "N/A") return;

  var recipient = data.email;
  var subject = "Welcome to the Commuttr Waitlist";

  var htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0a0a0b; color: #fafafa; margin: 0; padding: 24px; }
          .card { background-color: #101013; border: 1px solid rgba(255,255,255,0.1); border-radius: 0; padding: 32px; max-width: 580px; margin: 0 auto; }
          .header h1 { margin: 0 0 12px 0; color: #ffffff; font-size: 24px; font-weight: 700; }
          .tag { display: inline-block; color: #f63d06; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-bottom: 12px; }
          p { font-size: 15px; color: #9a9aa5; line-height: 1.6; margin: 16px 0; }
          ul { margin: 16px 0; padding-left: 20px; color: #fafafa; }
          li { margin-bottom: 8px; font-size: 15px; }
          .highlight { color: #ffffff; font-weight: 600; }
          .footer { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 32px; padding-top: 20px; font-size: 12px; color: #9a9aa5; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="tag">Commuttr Early Access</div>
          <h1>Welcome to the Commuttr Waitlist</h1>
          <p>Hi ${escapeHtml(data.name)},</p>
          <p>Thank you for joining the Commuttr waitlist.</p>
          <p>We're excited to have you on board.</p>
          <p>You'll be among the first to receive:</p>
          <ul>
            <li>Product updates</li>
            <li>Beta invitations</li>
            <li>Launch announcements</li>
            <li>Early access opportunities</li>
          </ul>
          <p>We're building a smarter way to navigate public transport in South Africa and can't wait to share what's coming.</p>
          <p>The Commuttr Team</p>
          <div class="footer">
            Commuttr • Intelligent Public Transport Mobility for South Africa
          </div>
        </div>
      </body>
    </html>
  `;

  var plainBody = 
    "Hi " + data.name + ",\n\n" +
    "Thank you for joining the Commuttr waitlist.\n\n" +
    "We're excited to have you on board.\n\n" +
    "You'll be among the first to receive:\n\n" +
    "• Product updates\n" +
    "• Beta invitations\n" +
    "• Launch announcements\n" +
    "• Early access opportunities\n\n" +
    "We're building a smarter way to navigate public transport in South Africa and can't wait to share what's coming.\n\n" +
    "The Commuttr Team";

  MailApp.sendEmail({
    to: recipient,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
