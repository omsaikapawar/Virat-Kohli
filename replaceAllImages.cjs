const fs = require('fs');

const imageMap = {
  cutting_chai: '/images/products/cutting_chai.jpg',
  samosa: '/images/products/samosa.jpg',
  vada_pav: '/images/products/vada_pav.jpg',
  ps5: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
  iphone: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
  family_dinner: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
  monthly_groceries: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
  premium_dinner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  airpods: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
  cricket_bat: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  goa_trip: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
  concert_tickets: 'https://images.unsplash.com/photo-1540039155732-6761b3362148?w=800&q=80',
  lifetime_maggi: 'https://images.unsplash.com/photo-1612929633738-8fe01f7467bc?w=800&q=80',
  cricket_kit: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80',
  netflix_lifetime: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Netflix_2015_N_logo.svg',
  ipad: 'https://images.unsplash.com/photo-1588702545922-4911d0442340?w=800&q=80',
  drone: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
  kashmir_trip: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80',
  macbook: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
  royal_enfield: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
  gaming_pc: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800&q=80',
  cricket_coaching: 'https://images.unsplash.com/photo-1624526267942-ab0f0b580615?w=800&q=80',
  home_theatre: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
  streaming_setup: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?w=800&q=80',
  business_world_tour: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
  smart_home: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
  designer_watch: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
  private_chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
  wedding_catering: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
  europe_trip: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
  diamond_necklace: 'https://images.unsplash.com/photo-1599643478524-fb524b0e5d87?w=800&q=80',
  luxury_wardrobe: 'https://images.unsplash.com/photo-1558769132-cb1fac08b4af?w=800&q=80',
  lifetime_chai: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=800&q=80',
  private_jet_charter: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
  mumbai_2bhk: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  luxury_yacht: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80',
  lamborghini: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
  golden_cricket_bat: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  gold_collection: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
  goa_villa: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  cricket_academy: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  movie_theatre: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80',
  delhi_house: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  mumbai_apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  bollywood_movie: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80',
  mumbai_penthouse: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80',
  cricket_franchise: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=800&q=80',
  tv_channel: 'https://images.unsplash.com/photo-1603539824673-3563914e7a82?w=800&q=80',
  private_resort: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
  private_jet: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80',
  private_island: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80',
  cricket_stadium: 'https://images.unsplash.com/photo-1574629810360-1ff1c77f864e?w=800&q=80'
};

const lines = Object.entries(imageMap).map(([id, url]) => `  ${id}: '${url}',`);
const newFile = `export const PRODUCT_IMAGES: Record<string, string> = {
${lines.join('\n')}
};

export function getProductImage(productId: string): string | null {
  return PRODUCT_IMAGES[productId] || null;
}
`;

fs.writeFileSync('src/data/productImages.ts', newFile);
console.log('Fixed');
