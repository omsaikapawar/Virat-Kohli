import { useState, useEffect, useRef, useCallback } from 'react';
import { formatIndianCurrency } from '../utils/currency';

interface MoneyCounterProps {
  amount: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorClass?: string;
  animate?: boolean;
}

export default function MoneyCounter({
  amount,
  label,
  size = 'lg',
  colorClass = 'text-money-green',
  animate = true,
}: MoneyCounterProps) {
  const [displayAmount, setDisplayAmount] = useState(amount);
  const [animDir, setAnimDir] = useState<'up' | 'down' | null>(null);
  const prevAmount = useRef(amount);
  const animFrame = useRef<number | undefined>(undefined);

  const animateValue = useCallback((from: number, to: number) => {
    const duration = 400;
    const startTime = performance.now();
    const diff = to - from;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + diff * eased);

      setDisplayAmount(current);

      if (progress < 1) {
        animFrame.current = requestAnimationFrame(step);
      }
    };

    if (animFrame.current !== undefined) {
      cancelAnimationFrame(animFrame.current);
    }
    animFrame.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (animate && prevAmount.current !== amount) {
      setAnimDir(amount < prevAmount.current ? 'down' : 'up');
      animateValue(prevAmount.current, amount);
      prevAmount.current = amount;

      const timer = setTimeout(() => setAnimDir(null), 400);
      return () => clearTimeout(timer);
    } else {
      setDisplayAmount(amount);
      prevAmount.current = amount;
    }

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [amount, animate, animateValue]);

  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
    xl: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  };

  const animClass =
    animDir === 'down'
      ? 'animate-count-down'
      : animDir === 'up'
        ? 'animate-count-up'
        : '';

  return (
    <div className="text-center">
      {label && (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-text-secondary mb-1">
          {label}
        </p>
      )}
      <div
        className={`money-counter font-bold tabular-nums ${sizeClasses[size]} ${colorClass} ${animClass}`}
      >
        {formatIndianCurrency(displayAmount)}
      </div>
    </div>
  );
}
