const fs = require('fs');

let content = fs.readFileSync('src/components/ShareModal.tsx', 'utf8');

// Update purchasedItems mapping to include price formatting
content = content.replace(
  /return product \? "- " \+ product\.name \+ " x " \+ qty : null;/,
  `return product ? "- " + product.name + " x " + qty + " (" + formatShortCurrency(product.price * qty) + ")" : null;`
);

fs.writeFileSync('src/components/ShareModal.tsx', content);
console.log('ShareModal updated to include item prices in share text');
