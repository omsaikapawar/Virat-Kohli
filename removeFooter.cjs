const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace footer wrapper with a transparent container
content = content.replace(
  '<div className="mt-12 flex justify-center w-full bg-white border-t border-gray-200 py-8">',
  '<div className="mt-8 pb-8 flex justify-center w-full">'
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated to remove footer block');
