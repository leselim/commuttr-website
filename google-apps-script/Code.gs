/**
 * Google Apps Script Web App for Commuttr Website Contact Form
 * 
 * 1. Accepts POST requests containing JSON form data:
 *    { "name": "...", "email": "...", "organisation": "...", "message": "..." }
 * 2. Appends entry to active Google Sheet
 * 3. Sends a styled HTML email notification to hellocommuttr@gmail.com
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var contents = e.postData.contents;
    var data = JSON.parse(contents);

    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");

    var name = data.name || "N/A";
    var email = data.email || "N/A";
    var organisation = data.organisation || "N/A";
    var message = data.message || "N/A";
    var source = "Website Contact Form";
    var status = "New";
    var assignedTo = "";

    // 1. Append row to Google Sheet
    sheet.appendRow([
      formattedDate,
      name,
      email,
      organisation,
      message,
      source,
      status,
      assignedTo
    ]);

    // 2. Send Email Notification (wrapped in try-catch so email errors don't break form response)
    try {
      sendEmailNotification({
        name: name,
        email: email,
        organisation: organisation,
        message: message,
        timestamp: formattedDate
      });
    } catch (mailError) {
      Logger.log("Failed to send email notification: " + mailError.toString());
    }

    return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error handling doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
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
