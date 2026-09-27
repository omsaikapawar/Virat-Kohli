import { formatIndianCurrency } from '../utils/currency';

interface ZeroScreenProps {
  isOpen: boolean;
  totalMoney: number;
  moneyLeft: number;
  items: Record<string, number>;
  onPlayAgain: () => void;
  onShare: () => void;
  onClose?: () => void;
}

export default function ZeroScreen({ isOpen, totalMoney, onPlayAgain, onShare, onClose }: ZeroScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      
      <div className="relative text-center animate-bounce-in w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#f8f9fa] p-8">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tighter leading-tight">
            Well, that was <span className="text-[#2ecc71]">fast.</span>
          </h1>
          
          <div className="text-lg sm:text-xl text-gray-800 font-bold mb-4 tracking-tight">
            You just blew {formatIndianCurrency(totalMoney)}.
          </div>
          
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            Virat's accountant is going to be absolutely furious. You can review your official receipt at the bottom of the page, or share your questionable financial decisions now.
          </p>
        </div>

        <div className="p-6 bg-white flex flex-col gap-3 justify-center w-full border-t border-gray-100">
          <button
            onClick={onShare}
            className="w-full py-4 bg-[#2ecc71] text-white rounded-xl font-bold tracking-wide hover:bg-[#27ae60] transition-colors shadow-sm text-sm"
          >
            Share Receipt
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-50 border border-gray-200 text-gray-700 rounded-xl font-bold tracking-wide hover:bg-gray-100 transition-colors shadow-sm text-sm"
            >
              View Receipt
            </button>
            <button
              onClick={onPlayAgain}
              className="flex-1 py-3 bg-gray-100 text-gray-800 rounded-xl font-bold tracking-wide hover:bg-gray-200 transition-colors shadow-sm text-sm"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
