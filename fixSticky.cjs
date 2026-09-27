const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove sticky from navbar
content = content.replace(
  'nav className="bg-white py-5 px-6 mb-8 flex justify-start items-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] sticky top-0 z-[60]"',
  'nav className="bg-white py-5 px-6 mb-8 flex justify-start items-center shadow-[0_2px_15px_rgba(0,0,0,0.03)]"'
);

// 2. Add sticky back to money bar
content = content.replace(
  'className="relative z-50 bg-[#111111] text-[#2ecc71] py-6 text-center shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-2xl mb-12 overflow-hidden transform transition-all border border-gray-800 backdrop-blur-md bg-opacity-95"',
  'className="sticky top-4 z-50 bg-[#111111] text-[#2ecc71] py-6 text-center shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-2xl mb-12 overflow-hidden transform transition-all border border-gray-800 backdrop-blur-md bg-opacity-95"'
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated for sticky money bar and scrolling header');
