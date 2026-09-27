const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Fix the subtitle text replacing the broken unicode
content = content.replace(
  /<p className="text-gray-500 font-medium text-lg">Simulation of an estimated [^<]+<\/p>/,
  '<p className="text-gray-500 font-medium text-lg">Simulation of an estimated ₹1,100 Crore net worth.</p>'
);

// Update ZeroScreen props in App.tsx
const oldZeroScreen = `<ZeroScreen
        isOpen={showZeroScreen}
        totalMoney={totalMoney}
        onPlayAgain={() => {
          resetGame();
          setShowZeroScreen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onViewReceipt={() => {
          setShowZeroScreen(false);
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
        onShare={() => {
          setShowZeroScreen(false);
          toggleShareModal();
        }}
      />`;

const newZeroScreen = `<ZeroScreen
        isOpen={showZeroScreen}
        totalMoney={totalMoney}
        moneyLeft={moneyLeft}
        items={items}
        onPlayAgain={() => {
          resetGame();
          setShowZeroScreen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onShare={() => {
          setShowZeroScreen(false);
          toggleShareModal();
        }}
      />`;

content = content.replace(oldZeroScreen, newZeroScreen);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated for ZeroScreen props');
