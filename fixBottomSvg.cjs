const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update bottom SVG size
content = content.replace(
  'className="h-20 md:h-24"',
  'className="h-10 md:h-12 opacity-80 hover:opacity-100"'
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated for smaller bottom SVG');
