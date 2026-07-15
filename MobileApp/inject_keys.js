const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'src', 'i18n', 'locales');

const newKeys = {
  // OwnerNavigaton.js
  "account_suspended": "Account Suspended",
  "ok": "OK",
  "new_booking_request_alert": "New Booking Request! \uD83D\uDD14",
  "new_join_request_msg": "You have a new join request from a tenant.",
  "view_details": "View Details",
  "new_issue_alert": "New Issue Raised! \u26A0\uFE0F",
  "tenant_reported_issue_msg": "A tenant has reported a new issue.",
  "new_payment_alert": "New Payment \uD83D\uDCB0",
  "tenant_made_payment_msg": "A tenant has made a payment.",
  "dashboard": "Dashboard",
  "issues": "Issues",
  "payments": "Payments",
  "account": "Account", // Using lowercase for key
  "failed_to_switch_account": "Failed to switch account",
  "error": "Error"
};

async function main() {
  const langs = fs.readdirSync(localesPath);
  for (const lang of langs) {
    const filePath = path.join(localesPath, lang, 'common.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      try {
        const json = JSON.parse(data);
        let hasChanges = false;
        
        for (const [key, value] of Object.entries(newKeys)) {
            if (!json[key]) {
                json[key] = value;
                hasChanges = true;
            }
        }

        if (hasChanges) {
          fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
          console.log(`Updated ${lang}/common.json`);
        }
      } catch (e) {
        console.error(`Error parsing ${filePath}:`, e);
      }
    }
  }
}

main();
