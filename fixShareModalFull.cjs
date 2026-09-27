const fs = require('fs');

let content = fs.readFileSync('src/components/ShareModal.tsx', 'utf8');

// Instead of truncating to 5 items, use all purchasedItems
content = content.replace(
  /const topItems = purchasedItems\.slice\(0, 5\);[\s\S]*?const shareText = [^;]+;/,
  `const shareText = "I just spent " + formatShortCurrency(totalSpent) + " (" + percentage + "%) of Virat Kohli's estimated fortune on OSK Fun!\\n\\n" + purchasedItems.join('\\n') + "\\n\\nMoney left: " + formatShortCurrency(moneyLeft) + "\\n\\nTry it yourself: " + window.location.origin;`
);

fs.writeFileSync('src/components/ShareModal.tsx', content);
console.log('ShareModal updated to include full receipt');
