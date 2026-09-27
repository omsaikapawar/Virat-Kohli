import { products } from '../data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  moneyLeft: number;
  items: Record<string, number>;
  onBuy: (productId: string, price: number, maxQty?: number) => void;
  onSell: (productId: string, price: number) => void;
}

export default function ProductGrid({
  moneyLeft,
  items,
  onBuy,
  onSell,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantity={items[product.id] || 0}
          moneyLeft={moneyLeft}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
}
