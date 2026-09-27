import { useEffect, useCallback, useState } from 'react';
import { formatIndianCurrency } from './utils/currency';
import { useSpendingStore } from './store/useSpendingStore';
import { useNetWorth } from './hooks/useNetWorth';
import ProductGrid from './components/ProductGrid';
import Receipt from './components/Receipt';
import ZeroScreen from './components/ZeroScreen';
import { shareReceiptAsImage } from './utils/shareReceipt';

function App() {
  const { netWorth } = useNetWorth();

  const {
    totalMoney,
    moneyLeft,
    items,
    showZeroScreen,
    initializeMoney,
    buyItem,
    sellItem,
    setShowZeroScreen,
    resetGame,
  } = useSpendingStore();

  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    if (netWorth > 0) {
      initializeMoney(netWorth);
    }
  }, [netWorth, initializeMoney]);

  const handleBuy = useCallback((productId: string, price: number, maxQty?: number) => {
    buyItem(productId, price, maxQty);
  }, [buyItem]);

  const handleShare = async () => {
    setIsSharing(true);
    await shareReceiptAsImage();
    setIsSharing(false);
  };

  const hasPurchasedItems = Object.values(items).some(qty => qty > 0);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans selection:bg-[#2ecc71] selection:text-white">
      {/* Top Navbar */}
      <nav className="bg-white py-6 px-4 mb-8 shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1100px] mx-auto flex justify-start">
          <img src="/osk-fun back.svg" alt="OSK Fun" className="h-12 hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-[1100px] mx-auto px-4">
        {/* Profile Section */}
        <div className="bg-white p-8 text-center rounded-3xl shadow-sm border border-gray-100 mb-8 animate-fade-in-scale">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Virat_Kohli_during_the_India_vs_Aus_4th_Test_match_at_Narendra_Modi_Stadium_on_09_March_2023.jpg" 
            alt="Virat Kohli" 
            className="w-36 h-36 rounded-full mx-auto mb-5 object-cover object-top border-4 border-gray-50 shadow-md transition-transform hover:scale-105 duration-300"
          />
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Spend Virat Kohli's Money</h2>
          <p className="text-gray-500 font-medium text-lg">Simulation of an estimated ₹1,100 Crore net worth.</p>
        </div>

        {/* Sticky Money Bar */}
        <div className="sticky top-0 z-50 bg-[#111111] text-[#2ecc71] py-6 text-center shadow-[0_15px_40px_rgba(0,0,0,0.15)] rounded-b-2xl mb-12 overflow-hidden transform transition-all border border-gray-800 backdrop-blur-md bg-opacity-95 border-t-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2ecc71]/10 to-transparent pointer-events-none" />
          <span className="block text-gray-400 text-xs font-bold tracking-[0.25em] uppercase mb-2 relative z-10">Available Balance</span>
          <span className="block font-black text-5xl md:text-6xl tracking-tighter relative z-10">
            {formatIndianCurrency(moneyLeft)}
          </span>
        </div>

        {/* Product Grid */}
        <ProductGrid
          moneyLeft={moneyLeft}
          items={items}
          onBuy={handleBuy}
          onSell={sellItem}
        />
        
        {/* Inline Receipt */}
        <div className="mt-20 flex flex-col items-center w-full pb-10">
          <Receipt items={items} totalMoney={totalMoney} moneyLeft={moneyLeft} />
          
          {hasPurchasedItems && (
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="mt-6 px-10 py-4 bg-[#2ecc71] text-white rounded-xl font-bold tracking-wide hover:bg-[#27ae60] transition-colors shadow-lg disabled:opacity-70 flex items-center justify-center min-w-[200px]"
            >
              {isSharing ? 'Generating Image...' : 'Share Receipt'}
            </button>
          )}
        </div>
      </div>

      {/* Large Bottom SVG Logo Button */}
      <div className="mt-8 pb-8 flex justify-center w-full">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:scale-105 hover:opacity-80 transition-all duration-300"
          title="Back to Top"
        >
          <img src="/osk-fun back.svg" alt="OSK Fun" className="h-10 md:h-12 opacity-80 hover:opacity-100" />
        </button>
      </div>

      <ZeroScreen
        isOpen={showZeroScreen}
        totalMoney={totalMoney}
        moneyLeft={moneyLeft}
        items={items}
        onClose={() => {
          setShowZeroScreen(false);
          window.scrollTo({ top: document.body.scrollHeight - 300, behavior: 'smooth' });
        }}
        onPlayAgain={() => {
          resetGame();
          setShowZeroScreen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onShare={() => {
          setShowZeroScreen(false);
          handleShare();
        }}
      />
    </div>
  );
}

export default App;
