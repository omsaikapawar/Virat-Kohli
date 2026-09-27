const fs = require('fs');

const customUrls = {
  monthly_groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  ps5: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
  netflix_lifetime: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  iphone: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
  royal_enfield: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
  gaming_pc: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80',
  cricket_coaching: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  home_theatre: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
  wedding_catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
  europe_trip: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
  mumbai_2bhk: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  luxury_yacht: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
  lamborghini: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  cricket_academy: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  bollywood_movie: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80',
  cricket_franchise: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80',
  tv_channel: 'https://images.unsplash.com/photo-1603539824673-3563914e7a82?w=800&q=80',
  cricket_stadium: 'https://images.unsplash.com/photo-1574629810360-1ff1c77f864e?w=800&q=80'
};

let content = fs.readFileSync('src/data/productImages.ts', 'utf8');

for (const [id, url] of Object.entries(customUrls)) {
  content = content.replace('/images/products/' + id + '.jpg', url);
}

fs.writeFileSync('src/data/productImages.ts', content);
console.log('Updated product images URLs');
