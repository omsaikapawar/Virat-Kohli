import { useState, useCallback, useRef } from 'react';
import { formatIndianCurrency } from '../utils/currency';
import { getProductImage } from '../data/productImages';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  quantity: number;
  moneyLeft: number;
  onBuy: (productId: string, price: number, maxQty?: number) => void;
  onSell: (productId: string, price: number) => void;
}

export default function ProductCard({ product, quantity, moneyLeft, onBuy, onSell }: ProductCardProps) {
  const [buyAnim, setBuyAnim] = useState(false);
  const [errorAnim, setErrorAnim] = useState(false);
  const [flyEmoji, setFlyEmoji] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const imageSrc = getProductImage(product.id);
  const canAfford = product.price === 0 || moneyLeft >= product.price;
  const atMax = product.maxQuantity !== undefined && quantity >= product.maxQuantity;
  const canBuy = canAfford && !atMax;
  const canSell = quantity > 0;

  const handleBuy = useCallback(() => {
    if (!canBuy) {
      if (!canAfford) {
        setErrorAnim(true);
        setTimeout(() => setErrorAnim(false), 500);
      }
      return;
    }
    onBuy(product.id, product.price, product.maxQuantity);
    setBuyAnim(true);
    setFlyEmoji(true);
    setTimeout(() => setBuyAnim(false), 200);
    setTimeout(() => setFlyEmoji(false), 800);
  }, [canBuy, onBuy, product]);

  const handleSell = useCallback(() => {
    if (!canSell) return;
    onSell(product.id, product.price);
  }, [canSell, onSell, product]);

  return (
    <div
      ref={cardRef}
      className={`product-card relative bg-white border ${
        !canAfford ? 'border-red-400' : 'border-gray-200'
      } rounded-xl flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 ${
        buyAnim ? 'scale-[1.02]' : ''
      } ${errorAnim ? 'animate-shake border-red-500' : ''}`}
    >
      {/* Flying +1 on buy */}
      {flyEmoji && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-fly-money pointer-events-none bg-[#2ecc71] text-white font-bold py-1 px-4 rounded-full shadow-lg">
          +1
        </div>
      )}

      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden rounded-t-xl bg-gray-50 border-b border-gray-100">
        {imageSrc && !imgFailed ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 skeleton-shimmer" />
            )}
            <img
              src={imageSrc}
              alt={product.name}
              loading="lazy"
              width={280}
              height={280}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgFailed(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <span className="text-gray-400 font-semibold tracking-widest uppercase">No Image</span>
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title & Price */}
        <div className="text-center mb-6 flex-1 flex flex-col justify-end">
          <h3 className="font-bold text-xl text-gray-800 mb-2 leading-tight">{product.name}</h3>
          <p className="font-bold text-xl text-[#2ecc71]">
            {product.price === 0 ? 'FREE' : formatIndianCurrency(product.price)}
          </p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <button
            onClick={handleSell}
            disabled={!canSell}
            className="w-full py-2.5 font-bold text-sm bg-gray-100 text-gray-800 hover:bg-[#ff4757] hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors rounded"
          >
            Sell
          </button>
          <div className="text-center font-bold text-gray-800 border-x border-gray-200 border-y py-2.5 rounded bg-white">
            {quantity}
          </div>
          <button
            onClick={handleBuy}
            
            className={`w-full py-2.5 font-bold text-sm text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors rounded ${
              canBuy ? 'bg-[#2ecc71] hover:bg-[#27ae60]' : 'bg-gray-100'
            }`}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
