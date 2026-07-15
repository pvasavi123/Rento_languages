const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'src', 'i18n', 'locales');

const newKeys = {
  // Owner Notification Statuses
  "resolved": "Resolved",
  "in_progress": "In Progress",
  "open": "Open",
  "success": "Success",
  "failed": "Failed",
  "verifying": "Verifying",
  "approved": "Approved",
  "declined": "Declined",
  "withdrawn": "Withdrawn",
  "room_allotted": "Room Allotted",
  "pending": "Pending",
  
  // Owner Notification Actions
  "accept": "Accept",
  "decline": "Decline",
  "allot_room": "Allot Room",
  "approve": "Approve",

  // Texts
  "guest_requests": "Guest Requests",
  "manage_incoming_booking_applications": "Manage incoming booking applications",
  "clear_all": "Clear All",
  "clear_all_confirm": "Are you sure you want to clear all notifications?",
  "cancel": "Cancel",
  "all_cleared": "All cleared!",
  "managed_all_guest_requests": "You've managed all your guest requests.",
  "new_tenant": "New Tenant",
  "existing_tenant": "Existing Tenant",
  "check_in": "Check-in",
  "phone": "Phone",
  "flexible": "Flexible"
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
