const fs = require('fs');

const customUrls = {
  netflix_lifetime: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  content = content.replace('https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', url);
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated Netflix logo URL');
