const fs = require('fs');
let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

const fallbacks = {
  cricket_coaching: 'https://images.unsplash.com/photo-1624526267942-ab0f0b580615?w=800&q=80',
  lifetime_maggi: 'https://images.unsplash.com/photo-1612929633738-8fe01f7467bc?w=800&q=80',
  ipad: 'https://images.unsplash.com/photo-1588702545922-4911d0442340?w=800&q=80',
  concert_tickets: 'https://images.unsplash.com/photo-1540039155732-6761b3362148?w=800&q=80'
};

for (const [id, url] of Object.entries(fallbacks)) {
  const regex = new RegExp("  " + id + ":\\s*'[^']+',");
  content = content.replace(regex, "  " + id + ": '" + url + "',");
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Restored fallbacks for scraped logos/errors');
