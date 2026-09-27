const fs = require('fs');
const productsText = fs.readFileSync('src/data/products.ts', 'utf8');
const ids = [...productsText.matchAll(/"id":\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const files = fs.readdirSync('public/images/products').map(f => f.replace('.jpg', ''));
const missing = ids.filter(id => !files.includes(id));
console.log('Total IDs:', ids.length);
console.log('Total Files:', files.length);
console.log('Missing:', missing);
