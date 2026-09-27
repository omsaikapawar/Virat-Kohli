const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add onClose prop to ZeroScreen
content = content.replace(
  'onPlayAgain={() => {',
  `onClose={() => {
          setShowZeroScreen(false);
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }}
        onPlayAgain={() => {`
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx updated for ZeroScreen onClose');
