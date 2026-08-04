/**
 * Google Apps Script Web App for Commuttr Website Waitlist Form
 * 
 * Endpoint: https://script.google.com/macros/s/AKfycbwpEn0ukizh-1zOAgNWnC__jvTJj0PoR0iGubUFQH1baqIiq8FQflFrn8MMAVvXM4w/exec
 * 
 * 1. Accepts POST requests containing JSON form data:
 *    { "name": "...", "email": "...", "city": "...", "organisation": "...", "transportMode": "..." }
 * 2. Appends entry to active Google Sheet ("Waitlist")
 * 3. Sends notification email to hellocommuttr@gmail.com
 * 4. Sends confirmation welcome email to the user
 */

function doPost(e) {
  Logger.log("--> Incoming Waitlist doPost request received.");
  try {
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log("ERROR: Invalid request payload. Missing e.postData.contents.");
      return ContentService.createTextOutput(JSON.stringify({ result: "error", error: "Missing payload" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var contents = e.postData.contents;
    Logger.log("Raw post payload: " + contents);

    var data = JSON.parse(contents);
    Logger.log("Successfully parsed JSON payload for waitlist user: " + (data.email || "unknown"));

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var city = data.city || "N/A";
    var organisation = data.organisation || "N/A";
    var transportMode = data.transportMode || "N/A";
    var source = "Website Waitlist Form";
    var status = "New";

    // 1. Append row to Google Sheet
    sheet.appendRow([
      formattedDate,
      name,
      email,
      city,
      organisation,
      transportMode,
      source,
      status
    ]);
    Logger.log("--> Row successfully written to Waitlist Google Sheet.");

    // 2. Send Team Email Notification
    try {
      sendTeamWaitlistNotification({
        name: name,
        email: email,
        city: city,
        organisation: organisation,
        transportMode: transportMode,
        timestamp: formattedDate
      });
      Logger.log("--> Team email notification sent.");
    } catch (teamMailErr) {
      Logger.log("ERROR sending team mail: " + teamMailErr.toString());
    }

    // 3. Send User Confirmation Email
    try {
      sendUserWaitlistConfirmation({
        name: name,
        email: email
      });
      Logger.log("--> User welcome confirmation email sent.");
    } catch (userMailErr) {
      Logger.log("ERROR sending user mail: " + userMailErr.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("CRITICAL WAITLIST POST ERROR: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
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
