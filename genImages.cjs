const fs = require('fs');
const productsText = fs.readFileSync('src/data/products.ts', 'utf8');
const ids = [...productsText.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
let out = 'export const PRODUCT_IMAGES: Record<string, string> = {\n';
for (const id of ids) {
  out += '  ' + id + ': \'/images/products/' + id + '.jpg\',\n';
}
out += '};\n\nexport function getProductImage(productId: string): string | null {\n  return PRODUCT_IMAGES[productId] || null;\n}';
fs.writeFileSync('src/data/productImages.ts', out);
