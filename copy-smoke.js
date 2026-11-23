// Copy smoke image to public folder
const fs = require('fs');
const src = process.env.HOME + '/.gemini/antigravity/brain/e1f4a86b-8ac3-4f14-9734-e90cb409b2f1/smoke_clouds_1778683016552.png';
const dest = __dirname + '/public/images/smoke.png';
fs.copyFileSync(src, dest);
console.log('Copied smoke.png:', fs.statSync(dest).size, 'bytes');
