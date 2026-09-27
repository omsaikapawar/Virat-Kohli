const fs = require('fs');

const customUrls = {
  golden_cricket_bat: '/images/products/golden_cricket_bat.webp'
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  const regex = new RegExp("  " + id + ":\\s*'[^']+',");
  content = content.replace(regex, "  " + id + ": '" + url + "',");
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated golden cricket bat image.');
