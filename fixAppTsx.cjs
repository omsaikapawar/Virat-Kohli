const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update Sticky Money Bar
const oldSticky = `<div className="sticky top-0 z-50 bg-[#2ecc71] text-white py-4 text-center font-bold text-3xl md:text-4xl shadow-md mb-4" style={{ fontFamily: 'monospace' }}>
          {formatIndianCurrency(moneyLeft)}
        </div>`;
const newSticky = `<div className="sticky top-0 z-50 bg-[#111] text-[#2ecc71] py-4 text-center shadow-lg mb-4 flex flex-col items-center justify-center border-b-4 border-[#2ecc71]">
          <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Available Balance</span>
          <span className="font-bold text-4xl md:text-5xl" style={{ fontFamily: 'monospace' }}>{formatIndianCurrency(moneyLeft)}</span>
        </div>`;
content = content.replace(oldSticky, newSticky);

// Replace Receipt modal with inline receipt
const oldReceipt = `<Receipt
        isOpen={showReceipt}
        onClose={toggleReceipt}
        items={items}
        totalMoney={totalMoney}
        moneyLeft={moneyLeft}
      />`;

content = content.replace(oldReceipt, ``);

// Add inline receipt at the bottom of ProductGrid
const oldGrid = `        <ProductGrid
          moneyLeft={moneyLeft}
          items={items}
          onBuy={handleBuy}
          onSell={sellItem}
        />
      </div>`;

const newGrid = `        <ProductGrid
          moneyLeft={moneyLeft}
          items={items}
          onBuy={handleBuy}
          onSell={sellItem}
        />
        
        {/* Inline Receipt */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Receipt items={items} totalMoney={totalMoney} moneyLeft={moneyLeft} />
        </div>
      </div>`;
content = content.replace(oldGrid, newGrid);

// Remove floating receipt button (already removed by previous script, but just in case)
const oldFloat = `{/* Floating Receipt Button */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={toggleReceipt}
          className="px-6 py-3 bg-[#2ecc71] text-white rounded shadow-lg font-bold hover:bg-[#27ae60] transition-colors"
        >
          View Receipt
        </button>
      </div>`;
content = content.replace(oldFloat, '');

// Also fix easter egg broken emoji
content = content.replace('Virat would probably question your financial planning. dY??', 'Virat would probably question your financial planning.');

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx fixed');
