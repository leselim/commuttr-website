# Google Apps Script Security Deployment Guide

This directory contains the Google Apps Script backend handlers for the Commuttr Website forms:
- `WaitlistCode.gs`: Backs the Waitlist Form (`/src/components/sections/Waitlist.tsx`)
- `Code.gs`: Backs the Contact Enquiry Form (`/src/components/sections/Contact.tsx`)

---

## Implemented Security Controls

1. **Spreadsheet Formula / CSV Injection Protection (CWE-1236)**
   - Prepend `'` (single quote) to any spreadsheet input starting with `=`, `+`, `-`, `@`, `\t`, `\r`.
   - Prevents execution of malicious formulas (`=HYPERLINK()`, `=IMPORTXML()`, etc.) inside Google Sheets.

2. **Backend Rate Limiting (`CacheService`)**
   - **Per Email:** Maximum 2 submissions per 15 minutes per email address.
   - **Global Limit:** Maximum 5 submissions per 60 seconds total across all clients.

3. **Origin & Secret Verification**
   - Checks request payload origin against authorized domains (`https://commuttr.co.za`, `https://www.commuttr.co.za`, `http://localhost:5173`).
   - Verifies `_token` parameter passed from frontend.

4. **Sanitization & Length Limits**
   - Enforces max field lengths (`name`: 100, `email`: 254, `city`/`org`: 100, `message`: 2000).
   - Removes control characters and strips newlines from single-line fields to prevent email header injection.
   - HTML-escapes all parameters inserted into email notification bodies.

---

## How to Update Your Live Google Apps Script Deployments

### Updating Waitlist Backend (`WaitlistCode.gs`)
1. Open your Waitlist Google Apps Script Project at [script.google.com](https://script.google.com).
2. Copy the entire contents of `google-apps-script/WaitlistCode.gs`.
3. Paste it into the Apps Script editor replacing the old code.
4. Click **Deploy** -> **New Deployment**.
5. Select **Type**: *Web App*.
6. Execute as: *Me*.
7. Who has access: *Anyone*.
8. Click **Deploy** and authorize if prompted.

### Updating Contact Form Backend (`Code.gs`)
1. Open your Contact Form Google Apps Script Project.
2. Copy the entire contents of `google-apps-script/Code.gs`.
3. Replace the code in the Apps Script editor.
4. Click **Deploy** -> **New Deployment** (Web App, Execute as Me, Access: Anyone).
5. Click **Deploy**.

---

## Optional: Configuring Secret Verification Token
To customize the security token in Google Apps Script:
1. In Apps Script Editor, go to **Project Settings** (gear icon) -> **Script Properties**.
2. Add Property `API_SECRET_TOKEN` with your secret value.
3. Set the matching `VITE_API_SECRET_TOKEN` in `.env` or Netlify/Vercel environment settings.
