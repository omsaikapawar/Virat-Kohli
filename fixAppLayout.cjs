const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update Navbar to match Neal.fun exactly
const oldNav = `<nav className="bg-white py-5 px-6 mb-8 flex justify-start items-center shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <img src="/osk-fun back.svg" alt="OSK Fun" className="h-7 hover:opacity-80 transition-opacity" />
      </nav>`;

const newNav = `<nav className="bg-white py-6 px-4 mb-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1100px] mx-auto flex justify-start">
          <img src="/osk-fun back.svg" alt="OSK Fun" className="h-12 hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
      </nav>`;
content = content.replace(oldNav, newNav);

// 2. Remove pb-20 from main container
content = content.replace(
  'className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#2ecc71] selection:text-white pb-20"',
  'className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#2ecc71] selection:text-white"'
);

// 3. Update bottom SVG so there is no space below it
const oldBottomSvg = `<div className="mt-10 mb-20 flex justify-center w-full">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:scale-105 hover:opacity-80 transition-all duration-300"
          title="Back to Top"
        >
          <img src="/osk-fun back.svg" alt="OSK Fun" className="h-16 md:h-20" />
        </button>
      </div>`;

const newBottomSvg = `<div className="mt-12 flex justify-center w-full bg-white border-t border-gray-200 py-8">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:scale-105 hover:opacity-80 transition-all duration-300"
          title="Back to Top"
        >
          <img src="/osk-fun back.svg" alt="OSK Fun" className="h-20 md:h-24" />
        </button>
      </div>`;
content = content.replace(oldBottomSvg, newBottomSvg);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated');
