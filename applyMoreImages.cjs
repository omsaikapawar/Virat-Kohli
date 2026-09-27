const fs = require('fs');

const customUrls = {
  home_theatre: '/images/products/home_theatre.jpg',
  royal_enfield: '/images/products/royal_enfield.webp',
  cricket_bat: '/images/products/cricket_bat.jpg'
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  const regex = new RegExp("  " + id + ":\\s*'[^']+',");
  content = content.replace(regex, "  " + id + ": '" + url + "',");
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated user images for home theatre, bike, and bat.');
