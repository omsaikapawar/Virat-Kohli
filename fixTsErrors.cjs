const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace('showReceipt,', '');
content = content.replace('toggleReceipt,', '');

// Also need to remove the onViewReceipt logic in ZeroScreen props
content = content.replace(`        onViewReceipt={() => {
          setShowZeroScreen(false);
          toggleReceipt();
        }}`, `        onViewReceipt={() => {
          setShowZeroScreen(false);
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}`);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed App.tsx toggleReceipt issue');
