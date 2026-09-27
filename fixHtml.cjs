const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// 1. Fix the broken favicon line
content = content.replace(
  /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/><text y='\.9em' font-size='90'>.*<\/svg>" \/>/,
  '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />'
);

// 2. Remove | OSK Fun from titles
content = content.replace(
  /<title>Spend Virat Kohli's Money \| OSK Fun<\/title>/g,
  "<title>Spend Virat Kohli's Money</title>"
);
content = content.replace(
  /content="Spend Virat Kohli's Money \| OSK Fun"/g,
  'content="Spend Virat Kohli\'s Money"'
);

fs.writeFileSync('index.html', content);
console.log('index.html fixed');
