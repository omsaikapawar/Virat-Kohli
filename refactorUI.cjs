const fs = require('fs');

function updateAppTsx() {
  let content = fs.readFileSync('src/App.tsx', 'utf8');
  
  // Replace OSK Fun text with SVG
  content = content.replace(
    '<h1 className="text-2xl font-bold tracking-widest text-black">OSK.FUN</h1>',
    '<img src="/osk-fun back.svg" alt="OSK Fun" className="h-8 mx-auto sm:mx-0" />'
  );

  // Update sticky header for money
  content = content.replace(
    /<div className="sticky top-0[^>]+>[\\s\\S]*?\{formatIndianCurrency\(moneyLeft\)\}[\\s\\S]*?<\/div>/,
    `<div className="sticky top-0 z-50 bg-[#111] text-[#2ecc71] py-4 text-center shadow-lg mb-4 flex flex-col items-center justify-center border-b-4 border-[#2ecc71]">
          <span className="text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Available Balance</span>
          <span className="font-bold text-4xl md:text-5xl" style={{ fontFamily: 'monospace' }}>{formatIndianCurrency(moneyLeft)}</span>
        </div>`
  );

  // Remove Receipt toggle modal
  content = content.replace(
    /<Receipt[\\s\\S]*?\/>/,
    ``
  );
  
  // Add inline receipt at the bottom
  content = content.replace(
    /<\/div>\\s*\{\/\* Modals & Overlays \*\/\}/,
    `
        {/* Inline Receipt */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Receipt items={items} totalMoney={totalMoney} moneyLeft={moneyLeft} />
        </div>
      </div>
      {/* Modals & Overlays */}`
  );

  // Remove Floating Receipt Button
  content = content.replace(
    /\{\/\* Floating Receipt Button \*\/\}[\s\S]*?<\/div>/,
    ''
  );

  fs.writeFileSync('src/App.tsx', content);
}

function updateReceiptTsx() {
  let content = fs.readFileSync('src/components/Receipt.tsx', 'utf8');
  
  // Change props (remove isOpen and onClose)
  content = content.replace(
    /interface ReceiptProps \{[\s\S]*?\}/,
    `interface ReceiptProps {
  items: Record<string, number>;
  totalMoney: number;
  moneyLeft: number;
}`
  );
  
  content = content.replace(
    /export default function Receipt\(\{ isOpen, onClose, items, totalMoney, moneyLeft \}: ReceiptProps\) \{[\s\S]*?if \(\!isOpen\) return null;/,
    `export default function Receipt({ items, totalMoney, moneyLeft }: ReceiptProps) {`
  );

  // Remove modal wrappers by using a simple string replacement
  const modalStart = `<div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

      {/* Receipt */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >`;
      
  content = content.replace(modalStart, `<div className="w-full">`);

  // Remove emojis from output
  content = content.replace(
    /emoji: product\.emoji,/,
    ''
  );
  
  content = content.replace(
    /\{item\.emoji\}\s*/,
    ''
  );
  
  content = content.replace(
    /A-/,
    'x'
  );
  
  // Remove broken emoji placeholders
  content = content.replace(/<p className="text-4xl mb-2">.*<\/p>/, '');
  
  // Remove close button
  const closeBtn = `{/* Close button */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>`;
  content = content.replace(closeBtn, `</div>`);
  
  fs.writeFileSync('src/components/Receipt.tsx', content);
}

function updateShareModalTsx() {
  let content = fs.readFileSync('src/components/ShareModal.tsx', 'utf8');
  
  content = content.replace(/dY\'\?dY\?\?/g, '');
  content = content.replace(/dY\"-/g, '');
  content = content.replace(/dY\"/g, '');
  content = content.replace(/Share My Spending/g, 'Share My Spending');
  content = content.replace(/  Share/g, 'Share');
  content = content.replace(/< Copy/g, 'Copy');
  content = content.replace(/o\" /g, '');
  content = content.replace(/A-/g, 'x');
  content = content.replace(/\{product\.emoji\} /g, '');
  
  // Update link
  content = content.replace(/window\.location\.href/, 'window.location.origin');
  
  fs.writeFileSync('src/components/ShareModal.tsx', content);
}

function updateZeroScreenTsx() {
  let content = fs.readFileSync('src/components/ZeroScreen.tsx', 'utf8');
  
  content = content.replace(/dY\'\?/g, '');
  content = content.replace(/\+\' ,10/g, '');
  content = content.replace(/dY\", /g, '');
  content = content.replace(/dY _ /g, '');
  content = content.replace(/dY\"  /g, '');
  
  fs.writeFileSync('src/components/ZeroScreen.tsx', content);
}

function updateProductCardTsx() {
  let content = fs.readFileSync('src/components/ProductCard.tsx', 'utf8');
  
  // Add premium shake animation logic
  content = content.replace(
    /const \[buyAnim, setBuyAnim\] = useState\(false\);/,
    `const [buyAnim, setBuyAnim] = useState(false);
  const [errorAnim, setErrorAnim] = useState(false);`
  );
  
  content = content.replace(
    /if \(\!canBuy\) return;/,
    `if (!canBuy) {
      if (!canAfford) {
        setErrorAnim(true);
        setTimeout(() => setErrorAnim(false), 500);
      }
      return;
    }`
  );
  
  content = content.replace(
    /disabled=\{\!canBuy\}/g,
    ``
  );
  
  content = content.replace(
    /className=\{\`product-card relative bg-white border \$\{[\s\S]*?\}\`\}/,
    `className={\`product-card relative bg-white border \${
        !canAfford ? 'border-red-400' : 'border-gray-200'
      } rounded-xl flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 \${
        buyAnim ? 'scale-[1.02]' : ''
      } \${errorAnim ? 'animate-shake border-red-500' : ''}\`}`
  );
  
  // Remove {product.emoji}
  content = content.replace(
    /<span className="text-8xl drop-shadow-sm">\{product\.emoji\}<\/span>/,
    `<span className="text-gray-400 font-semibold tracking-widest uppercase">No Image</span>`
  );
  
  fs.writeFileSync('src/components/ProductCard.tsx', content);
}

function updateTailwind() {
  let content = fs.readFileSync('tailwind.config.js', 'utf8');
  
  if (!content.includes('shake:')) {
    content = content.replace(
      /keyframes: \{/,
      `keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' }
        },`
    );
    content = content.replace(
      /animation: \{/,
      `animation: {
        shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',`
    );
    fs.writeFileSync('tailwind.config.js', content);
  }
}

updateAppTsx();
updateReceiptTsx();
updateShareModalTsx();
updateZeroScreenTsx();
updateProductCardTsx();
updateTailwind();
console.log('Done refactoring!');
