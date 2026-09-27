import { useState } from 'react';
import { formatShortCurrency } from '../utils/currency';
import { products } from '../data/products';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Record<string, number>;
  totalMoney: number;
  moneyLeft: number;
}

export default function ShareModal({ isOpen, onClose, items, totalMoney, moneyLeft }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalSpent = totalMoney - moneyLeft;
  const percentage = ((totalSpent / totalMoney) * 100).toFixed(1);

  const purchasedItems = Object.entries(items)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      return product ? "- " + product.name + " x " + qty + " (" + formatShortCurrency(product.price * qty) + ")" : null;
    })
    .filter(Boolean);

  const shareText = "I just spent " + formatShortCurrency(totalSpent) + " (" + percentage + "%) of Virat Kohli's estimated fortune on OSK Fun!\n\n" + purchasedItems.join('\n') + "\n\nMoney left: " + formatShortCurrency(moneyLeft) + "\n\nTry it yourself: " + window.location.origin;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Spend Virat Kohli's Money | OSK Fun",
          text: shareText,
          url: window.location.origin,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = shareText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" />
      <div
        className="relative bg-[#111] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center border-b border-gray-800">
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">Share Portfolio</h2>
          <p className="text-sm text-gray-500 font-medium">Export your financial allocations</p>
        </div>

        <div className="p-6 bg-[#1a1a1a] text-sm text-gray-300 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-mono border-b border-gray-800">
          {shareText}
        </div>

        <div className="p-6 space-y-3 bg-[#111]">
          <button
            onClick={handleShare}
            className="w-full py-3 bg-[#2ecc71] text-black rounded-xl font-bold hover:bg-[#27ae60] transition-colors text-sm"
          >
            {'share' in navigator ? 'Share Output' : 'Copy to Clipboard'}
          </button>
          <button
            onClick={handleCopy}
            className={`w-full py-3 rounded-xl font-bold transition-colors text-sm border-2 ${
              copied
                ? 'bg-[#2ecc71]/10 border-[#2ecc71] text-[#2ecc71]'
                : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
            }`}
          >
            {copied ? 'Copied to Clipboard!' : 'Copy Text'}
          </button>
          <button
            onClick={onClose}
            className="w-full py-2 text-gray-500 font-medium text-sm hover:text-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
