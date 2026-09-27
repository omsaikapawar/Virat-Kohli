const fs = require('fs');

function updateApp() {
  let content = fs.readFileSync('src/App.tsx', 'utf8');
  
  // 1. Move logo to left (justify-start)
  content = content.replace(
    'justify-end items-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] sticky top-0 z-[60]',
    'justify-start items-center shadow-[0_2px_15px_rgba(0,0,0,0.03)] sticky top-0 z-[60]'
  );
  
  // 2. Remove sticky from money bar so ONLY header is sticky
  content = content.replace(
    'sticky top-[80px] z-50 bg-[#111111]',
    'relative z-50 bg-[#111111]'
  );
  
  // 3. Fix broken currency character in paragraph
  content = content.replace(
    /,11,100 Crore/g,
    '₹1,100 Crore'
  );
  
  fs.writeFileSync('src/App.tsx', content);
}

function writeZeroScreen() {
  const content = `import { formatIndianCurrency } from '../utils/currency';

interface ZeroScreenProps {
  isOpen: boolean;
  totalMoney: number;
  onPlayAgain: () => void;
  onViewReceipt: () => void;
  onShare: () => void;
}

export default function ZeroScreen({ isOpen, totalMoney, onPlayAgain, onViewReceipt, onShare }: ZeroScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in" />
      
      <div className="relative text-center animate-fade-in-scale max-w-lg mx-auto p-10 rounded-2xl border border-gray-800 bg-[#111] shadow-2xl">
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter">
          FUNDS DEPLETED
        </h1>
        
        <div className="text-xl sm:text-2xl text-[#2ecc71] font-bold mb-6 tracking-tight font-mono">
          {formatIndianCurrency(totalMoney)} SPENT
        </div>
        
        <p className="text-base text-gray-400 font-medium mb-10 px-4 leading-relaxed">
          You have successfully allocated the entirety of the portfolio. Review your acquisitions or begin a new simulation.
        </p>

        <div className="flex flex-col gap-3 justify-center w-full">
          <button
            onClick={onPlayAgain}
            className="w-full py-4 bg-white text-black rounded-xl font-black tracking-widest uppercase hover:bg-gray-200 transition-colors shadow-sm text-sm"
          >
            Restart Simulation
          </button>
          <div className="flex gap-3 mt-2">
            <button
              onClick={onViewReceipt}
              className="flex-1 py-3 bg-transparent border border-gray-700 text-gray-300 rounded-xl font-bold hover:bg-gray-800 hover:text-white transition-colors text-sm"
            >
              View Receipt
            </button>
            <button
              onClick={onShare}
              className="flex-1 py-3 bg-[#2ecc71] text-black rounded-xl font-bold hover:bg-[#27ae60] transition-colors text-sm"
            >
              Share Output
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync('src/components/ZeroScreen.tsx', content);
}

// Ensure ShareModal doesn't have broken characters
function updateShareModal() {
  let content = fs.readFileSync('src/components/ShareModal.tsx', 'utf8');
  content = content.replace(/dY\'\?dY\?\?/g, '');
  content = content.replace(/o\"/g, '');
  fs.writeFileSync('src/components/ShareModal.tsx', content);
}

updateApp();
writeZeroScreen();
updateShareModal();
console.log('Final UI polish complete');
