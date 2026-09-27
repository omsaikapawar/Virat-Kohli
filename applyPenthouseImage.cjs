const fs = require('fs');

const customUrls = {
  mumbai_penthouse: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd28?w=800&q=80'
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  const regex = new RegExp("  " + id + ":\\s*'[^']+',");
  content = content.replace(regex, "  " + id + ": '" + url + "',");
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated penthouse image.');
