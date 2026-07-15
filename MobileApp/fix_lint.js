const fs = require('fs');

const filePath = './src/utils/translations.js';
let content = fs.readFileSync(filePath, 'utf8');

// We'll use a regex replacement script or AST to fix duplicate keys. 
// A simpler way: we'll just fix the exact line for TenantRegisterScreen.js first.

const tenantRegisterPath = './src/screens/auth/TenantRegisterScreen.js';
let trContent = fs.readFileSync(tenantRegisterPath, 'utf8');
trContent = trContent.replace(/Let's get you started/g, "Let&apos;s get you started");
fs.writeFileSync(tenantRegisterPath, trContent);

console.log("Fixed TenantRegisterScreen.js");
