const fs = require('fs');

const customUrls = {
  cricket_franchise: '/images/products/cricket_franchise.png',
  cricket_coaching: '/images/products/cricket_coaching.webp',
  netflix_lifetime: '/images/products/netflix_lifetime.png',
  lifetime_maggi: '/images/products/lifetime_maggi.jpg',
  concert_tickets: '/images/products/concert_tickets.jpg',
  ipad: 'https://m.media-amazon.com/images/I/815KnP2wjDS._AC_SL1500_.jpg'
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  const regex = new RegExp("  " + id + ":\\s*'[^']+',");
  content = content.replace(regex, "  " + id + ": '" + url + "',");
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated user images.');
