const fs = require('fs');
let text = fs.readFileSync('src/data/products.ts', 'utf8');

// I will just use eval! I can strip the 'export interface...' and 'export const products: Product[] ='
// and evaluate the JS array.

const startStr = 'export const products: Product[] = ';
const startIdx = text.indexOf(startStr);
if (startIdx === -1) {
  console.error("Couldn't find start string");
  process.exit(1);
}

let arrayStr = text.substring(startIdx + startStr.length);
arrayStr = arrayStr.replace(/;\s*$/, '');

let products = eval('(' + arrayStr + ')');

const removeIds = [
  'hundred_enfields',
  'ten_lambos',
  'crore_samosas',
  'thousand_assistants',
  'all_mumbai_pizza',
  'hundred_luxury_cars',
  'do_nothing',
  'build_city',
  'rent_moon'
];

products = products.filter(p => !removeIds.includes(p.id));
products.sort((a, b) => a.price - b.price);

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
console.log('Done mapping.');
