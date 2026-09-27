import fs from 'fs';

async function main() {
  const { products } = await import('./dist/data/products.js');
  
  const removeIds = [
    'hundred_enfields',
    'ten_lambos',
    'crore_samosas',
    'thousand_assistants',
    'all_mumbai_pizza',
    'hundred_luxury_cars',
    'do_nothing'
  ];

  let filtered = products.filter(p => !removeIds.includes(p.id));
  filtered.sort((a, b) => a.price - b.price);

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

export const products: Product[] = ${JSON.stringify(filtered, null, 2)};
`;

  fs.writeFileSync('src/data/products.ts', newTs);
  console.log('Filtered and sorted!');
}

main();
