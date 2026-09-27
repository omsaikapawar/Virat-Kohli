const fs = require('fs');

let text = fs.readFileSync('src/data/products.ts', 'utf8');

const startStr = 'export const products: Product[] = ';
const startIdx = text.indexOf(startStr);
let arrayStr = text.substring(startIdx + startStr.length);
arrayStr = arrayStr.replace(/;\s*$/, '');

let products = eval('(' + arrayStr + ')');

// Remove all cars except lamborghini
const carsToRemove = ['swift', 'thar', 'fortuner', 'bmw_car', 'mercedes', 'audi', 'range_rover', 'porsche', 'rolls_royce'];
// Remove all bikes except royal_enfield
const bikesToRemove = ['ktm_duke', 'yamaha_r15', 'bmw_bike', 'harley'];

products = products.filter(p => !carsToRemove.includes(p.id) && !bikesToRemove.includes(p.id));

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

// Also let's update the storage key in useSpendingStore.ts to reset the balance to default
let storeText = fs.readFileSync('src/store/useSpendingStore.ts', 'utf8');
storeText = storeText.replace("const STORAGE_KEY = 'osk-fun-virat-spending';", "const STORAGE_KEY = 'osk-fun-virat-spending-v2';");
fs.writeFileSync('src/store/useSpendingStore.ts', storeText);

console.log('Done filtering cars/bikes and resetting balance.');
