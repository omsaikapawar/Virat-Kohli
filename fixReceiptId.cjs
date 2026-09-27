const fs = require('fs');
let content = fs.readFileSync('src/components/Receipt.tsx', 'utf8');
content = content.replace(
  '<div className="w-full max-w-sm mx-auto bg-[#fffcf5]',
  '<div id="receipt-capture" className="w-full max-w-sm mx-auto bg-[#fffcf5]'
);
fs.writeFileSync('src/components/Receipt.tsx', content);
console.log('Receipt.tsx updated with ID');
