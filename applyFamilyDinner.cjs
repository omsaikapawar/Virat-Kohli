const fs = require('fs');

const customUrls = {
  family_dinner: '/images/products/family_dinner.jpg'
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  const regex = new RegExp("  " + id + ":\\s*'[^']+',");
  content = content.replace(regex, "  " + id + ": '" + url + "',");
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated family dinner image.');
