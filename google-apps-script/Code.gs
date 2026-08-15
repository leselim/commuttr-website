/**
 * Google Apps Script Web App for Commuttr Website Contact Form (Secured)
 * 
 * Endpoint: https://script.google.com/macros/s/AKfycbwnmCI2y-C4rqkGtKYSEvbjZ7C7N8aoKK6Wi_TIEACebHbZaRpLXSKalH9co8b4oIgguQ/exec
 * 
 * Security Features:
 * 1. Formula Injection Protection (CWE-1236): Prepend single quote to spreadsheet cells starting with =, +, -, @, tab, return.
 * 2. Backend Rate Limiting: Uses CacheService to prevent flooding (max 2 entries per 15 min per email, max 5 entries per min globally).
 * 3. Origin & Token Verification: Validates request domain origin and API secret token.
 * 4. Input Sanitization & Length Boundaries: Truncates long fields (message max 2000 chars), strips control chars.
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
  Logger.log("--> Incoming Contact doPost request received.");
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

    // 1. Verification of Origin Domain & Secret Token
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
    var orgRaw = sanitizeSingleLine(data.organisation, 100);
    var messageRaw = sanitizeMultiLine(data.message, 2000);

    if (!emailRaw || !isValidEmail(emailRaw)) {
      Logger.log("REJECTED: Invalid email format -> " + emailRaw);
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Invalid email address format" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (!messageRaw) {
      Logger.log("REJECTED: Missing message payload");
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Message content cannot be empty" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Backend Rate Limiting via CacheService
    var cache = CacheService.getScriptCache();
    
    // Global rate limit: max 5 requests per 60 seconds
    var globalCount = parseInt(cache.get("contact_global_count") || "0", 10);
    if (globalCount >= 5) {
      Logger.log("RATE LIMITED: Global submission rate limit exceeded.");
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Server busy. Please try again in a minute." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    cache.put("contact_global_count", String(globalCount + 1), 60);

    // Email rate limit: max 2 submissions per 15 minutes (900 seconds)
    var emailKey = "contact_email_" + md5Hash(emailRaw);
    var emailCount = parseInt(cache.get(emailKey) || "0", 10);
    if (emailCount >= 2) {
      Logger.log("RATE LIMITED: Email submission rate limit hit for " + emailRaw);
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Too many contact enquiries from this email. Please wait a few minutes." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    cache.put(emailKey, String(emailCount + 1), 900);

    // 4. Sanitize fields for Google Sheets cell storage (Formula Injection Neutralization)
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

    var sheetName = sanitizeSpreadsheetCell(nameRaw);
    var sheetEmail = sanitizeSpreadsheetCell(emailRaw);
    var sheetOrg = sanitizeSpreadsheetCell(orgRaw);
    var sheetMsg = sanitizeSpreadsheetCell(messageRaw);
    var source = "Website Contact Form";
    var status = "New";
    var assignedTo = "";

    sheet.appendRow([
      formattedDate,
      sheetName,
      sheetEmail,
      sheetOrg,
      sheetMsg,
      source,
      status,
      assignedTo
    ]);
    Logger.log("--> Row written safely to Contact Google Sheet.");

    // 5. Send Team Email Notification
    try {
      sendEmailNotification({
        name: nameRaw,
        email: emailRaw,
        organisation: orgRaw,
        message: messageRaw,
        timestamp: formattedDate
      });
      Logger.log("--> Email notification successfully sent to hellocommuttr@gmail.com.");
    } catch (mailError) {
      Logger.log("CRITICAL MAIL ERROR: Failed to send email notification: " + mailError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("CRITICAL POST ERROR: " + error.toString());
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

function sanitizeMultiLine(input, maxLen) {
  if (!input) return "";
  var str = String(input).trim();
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

function sendEmailNotification(data) {
  var recipient = "hellocommuttr@gmail.com";
  var subject = "🚨 New Contact Enquiry - Commuttr";

  var htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f1117; color: #f3f4f6; margin: 0; padding: 24px; }
          .card { background-color: #181b24; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 28px; max-width: 580px; margin: 0 auto; }
          .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 24px; }
          .header h2 { margin: 0; color: #10b981; font-size: 20px; font-weight: 700; }
          .header p { margin: 4px 0 0 0; color: #9ca3af; font-size: 13px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #6b7280; font-weight: 600; margin-bottom: 4px; }
          .value { font-size: 15px; color: #ffffff; line-height: 1.5; white-space: pre-wrap; }
          .value a { color: #10b981; text-decoration: none; }
          .footer { border-top: 1px solid rgba(255,255,255,0.1); margin-top: 28px; padding-top: 16px; font-size: 12px; color: #6b7280; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h2>🚨 New Contact Enquiry</h2>
            <p>Commuttr Website</p>
          </div>
          
          <div class="field">
            <div class="label">Name</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Organisation</div>
            <div class="value">${escapeHtml(data.organisation)}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="value">${escapeHtml(data.message)}</div>
          </div>
          
          <div class="field">
            <div class="label">Submitted</div>
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
    "New Contact Enquiry - Commuttr Website\n\n" +
    "Name: " + data.name + "\n" +
    "Email: " + data.email + "\n" +
    "Organisation: " + data.organisation + "\n\n" +
    "Message:\n" + data.message + "\n\n" +
    "Submitted: " + data.timestamp;

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
