import { formatShortCurrency } from '../utils/currency';
import { products } from '../data/products';

interface ReceiptProps {
  items: Record<string, number>;
  totalMoney: number;
  moneyLeft: number;
}

export default function Receipt({ items, totalMoney, moneyLeft }: ReceiptProps) {
  const purchasedItems = Object.entries(items)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return {
        name: product.name,
        price: product.price,
        quantity: qty,
        total: product.price * qty,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b?.total || 0) - (a?.total || 0));

  const totalSpent = totalMoney - moneyLeft;
  const percentage = totalMoney > 0 ? ((totalSpent / totalMoney) * 100).toFixed(2) : '0';

  return (
    <div id="receipt-capture" className="w-full max-w-sm mx-auto bg-[#fffcf5] text-gray-900 font-mono text-xs sm:text-sm p-6 sm:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-gray-200 relative mb-12">
      {/* Top jagged edge */}
      <div data-html2canvas-ignore="true" className="absolute top-0 left-0 right-0 h-2 bg-repeat-x" style={{ backgroundImage: 'radial-gradient(circle at 4px 0, transparent 4px, #fffcf5 4px)', backgroundSize: '8px 8px', transform: 'translateY(-100%)' }}></div>
      
      {/* Header */}
      <div className="text-center pb-4 border-b border-dashed border-gray-400 mb-4">
        <h2 className="font-bold text-lg tracking-widest uppercase mb-1">OSK FUN STORE</h2>
        <p className="uppercase text-[10px] tracking-wider text-gray-500">Official Spending Receipt</p>
        <p className="text-[10px] text-gray-400 mt-2">DATE: {new Date().toLocaleDateString()}</p>
        <p className="text-[10px] text-gray-400">TXN: #VK-{Math.floor(Math.random()*1000000)}</p>
      </div>

      {/* Content */}
      <div className="mb-4">
        {purchasedItems.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-dashed border-gray-400">
                <th className="py-2 font-semibold">QTY</th>
                <th className="py-2 font-semibold">ITEM</th>
                <th className="py-2 font-semibold text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {purchasedItems.map((item, idx) => (
                <tr key={idx} className="border-b border-dashed border-gray-300">
                  <td className="py-2 align-top">{item?.quantity}</td>
                  <td className="py-2 pr-2">{item?.name}</td>
                  <td className="py-2 text-right align-top tabular-nums font-semibold">{item ? formatShortCurrency(item.total) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-6 text-gray-400 font-medium">
            * NO ITEMS PURCHASED *
          </div>
        )}
      </div>

      {/* Footer Totals */}
      <div className="border-t border-dashed border-gray-400 pt-4 space-y-2">
        <div className="flex justify-between">
          <span>INITIAL BALANCE:</span>
          <span className="tabular-nums">{formatShortCurrency(totalMoney)}</span>
        </div>
        <div className="flex justify-between">
          <span>TOTAL SPENT:</span>
          <span className="tabular-nums font-bold">{formatShortCurrency(totalSpent)}</span>
        </div>
        <div className="flex justify-between">
          <span>SPENT PERCENTAGE:</span>
          <span className="tabular-nums">{percentage}%</span>
        </div>
        <div className="flex justify-between border-t border-dashed border-gray-400 pt-3 mt-3 font-bold text-base">
          <span>BALANCE DUE:</span>
          <span className="tabular-nums">{formatShortCurrency(moneyLeft)}</span>
        </div>
      </div>
      
      <div className="text-center mt-6 pt-4 border-t border-dashed border-gray-400">
        <p className="font-bold tracking-widest text-lg">THANK YOU</p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase">Please retain for your records</p>
        
        {/* Fake Barcode */}
        <div id="fake-barcode" className="mt-5 flex justify-center h-10 w-full overflow-hidden">
          <svg width="100%" height="40" preserveAspectRatio="none">
            {[...Array(60)].map((_, i) => (
              <rect key={i} x={`${i * 1.7}%`} y="0" width={Math.random() > 0.5 ? "0.8%" : "1.5%"} height="40" fill="#111" />
            ))}
          </svg>
        </div>
      </div>
      
      {/* Bottom jagged edge */}
      <div data-html2canvas-ignore="true" className="absolute bottom-0 left-0 right-0 h-2 bg-repeat-x" style={{ backgroundImage: 'radial-gradient(circle at 4px 8px, transparent 4px, #fffcf5 4px)', backgroundSize: '8px 8px', transform: 'translateY(100%)' }}></div>
    </div>
  );
}
