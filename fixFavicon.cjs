const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace the broken inline emoji favicon with the file we just created
content = content.replace(
  /<link rel="icon".*?>/,
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'
);

fs.writeFileSync('index.html', content);
console.log('index.html favicon updated');
