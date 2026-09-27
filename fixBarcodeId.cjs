const fs = require('fs');
let content = fs.readFileSync('src/components/Receipt.tsx', 'utf8');

// Add id="fake-barcode" to the fake barcode container
content = content.replace(
  '<div className="mt-5 flex justify-center h-10 w-full overflow-hidden">',
  '<div id="fake-barcode" className="mt-5 flex justify-center h-10 w-full overflow-hidden">'
);

fs.writeFileSync('src/components/Receipt.tsx', content);
console.log('Added ID to barcode');
