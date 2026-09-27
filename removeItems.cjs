const fs = require('fs');

let text = fs.readFileSync('src/data/products.ts', 'utf8');

const startStr = 'export const products: Product[] = ';
const startIdx = text.indexOf(startStr);
let arrayStr = text.substring(startIdx + startStr.length);
arrayStr = arrayStr.replace(/;\s*$/, '');

let products = eval('(' + arrayStr + ')');

const toRemove = [
  'pani_puri',
  'biryani',
  'maldives',
  'creator_studio',
  'world_tour_luxury',
  'cricket_ground',
  'music_festival',
  'personal_yacht',
  'luxury_farmhouse',
  'gold_room',
  'streaming_platform'
];

products = products.filter(p => !toRemove.includes(p.id));

let newTs = `export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  description: string;
  maxQuantity?: number;
  fictional?: boolean;
}

export const CATEGORIES = [
  'All',
  'Food & Daily Life',
  'Tech',
  'Bikes',
  'Cars',
  'Real Estate',
  'Travel',
  'Cricket',
  'Entertainment',
  'Luxury',
  'Absurd & Meme'
];

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync('src/data/products.ts', newTs);
console.log('Removed specific items.');
