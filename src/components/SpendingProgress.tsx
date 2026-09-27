import { formatShortCurrency } from '../utils/currency';
import { getCommentary } from '../utils/commentary';

interface SpendingProgressProps {
  moneyLeft: number;
  totalMoney: number;
}

export default function SpendingProgress({ moneyLeft, totalMoney }: SpendingProgressProps) {
  const spent = totalMoney - moneyLeft;
  const percentage = totalMoney > 0 ? (spent / totalMoney) * 100 : 0;
  const commentary = getCommentary(moneyLeft, totalMoney);

  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="bg-white rounded-2xl shadow-sm border border-border p-4 sm:p-6">
        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-xs text-text-muted uppercase tracking-wide">Money Spent</p>
            <p className="font-bold text-lg text-text-primary">{formatShortCurrency(spent)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-muted uppercase tracking-wide">Progress</p>
            <p className="font-bold text-lg text-primary">{percentage.toFixed(2)}%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted uppercase tracking-wide">Remaining</p>
            <p className={`font-bold text-lg ${moneyLeft === 0 ? 'text-money-red' : 'text-money-green'}`}>
              {formatShortCurrency(moneyLeft)}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="progress-bar-fill h-full rounded-full bg-gradient-to-r from-primary to-primary-light relative"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          >
            {percentage > 5 && (
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            )}
          </div>
        </div>

        {/* Commentary */}
        <p className="mt-3 text-sm text-text-secondary text-center font-medium italic">
          "{commentary}"
        </p>
      </div>
    </div>
  );
}
