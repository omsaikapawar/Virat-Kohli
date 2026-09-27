const fs = require('fs');

let content = fs.readFileSync('src/components/Receipt.tsx', 'utf8');

// Ignore top jagged edge
content = content.replace(
  '<div className="absolute top-0 left-0 right-0 h-2 bg-repeat-x"',
  '<div data-html2canvas-ignore="true" className="absolute top-0 left-0 right-0 h-2 bg-repeat-x"'
);

// Ignore bottom jagged edge
content = content.replace(
  '<div className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x"',
  '<div data-html2canvas-ignore="true" className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x"'
);

fs.writeFileSync('src/components/Receipt.tsx', content);
console.log('Added html2canvas ignore tags to jagged edges');
