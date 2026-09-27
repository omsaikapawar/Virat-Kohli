interface HeaderProps {
  moneyLeft: number;
  totalMoney: number;
  onReceiptClick: () => void;
  onResetClick: () => void;
  itemCount: number;
}

import { formatShortCurrency } from '../utils/currency';

export default function Header({ moneyLeft, totalMoney, onReceiptClick, onResetClick, itemCount }: HeaderProps) {
  const spent = totalMoney - moneyLeft;
  const pct = totalMoney > 0 ? ((spent / totalMoney) * 100).toFixed(1) : '0';

  return (
    <>
      {/* Desktop header */}
      <header className="hidden md:block sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏏</span>
            <span className="font-bold text-lg text-text-primary">OSK Fun</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-text-muted uppercase tracking-wide">Money Left</p>
              <p className={`font-bold text-lg tabular-nums ${moneyLeft === 0 ? 'text-money-red' : 'text-money-green'}`}>
                {formatShortCurrency(moneyLeft)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted uppercase tracking-wide">Spent</p>
              <p className="font-semibold text-sm text-text-secondary">{pct}%</p>
            </div>
            <button
              onClick={onReceiptClick}
              className="relative px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              🧾 Receipt
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-money-red text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>
            <button
              onClick={onResetClick}
              className="px-3 py-2 text-text-secondary hover:text-money-red text-sm font-medium transition-colors"
              title="Reset Game"
            >
              🔄
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sticky header */}
      <header className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏏</span>
            <span className="font-bold text-sm text-text-primary">OSK Fun</span>
          </div>

          <div className={`font-bold text-base tabular-nums ${moneyLeft === 0 ? 'text-money-red' : 'text-money-green'}`}>
            {formatShortCurrency(moneyLeft)}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onReceiptClick}
              className="relative p-2"
            >
              🧾
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-money-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
            <button onClick={onResetClick} className="p-2" title="Reset">
              🔄
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
