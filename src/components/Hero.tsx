import MoneyCounter from './MoneyCounter';

interface HeroProps {
  totalMoney: number;
  moneyLeft: number;
  disclaimer: string;
  sourceNote: string;
  lastUpdated: string;
}

export default function Hero({ totalMoney, moneyLeft, disclaimer, sourceNote, lastUpdated }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-green-50/30 to-surface-secondary pt-8 pb-10 sm:pt-12 sm:pb-14">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-saffron/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary mb-3 leading-tight">
          Spend Virat Kohli's Money{' '}
          <span className="inline-block animate-bounce">🏏</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary font-medium mb-2">
          What would you do with <span className="text-primary font-bold">₹1,100 crore</span>?
        </p>

        <p className="text-sm text-text-muted mb-8">
          Not real money. Just an unnecessarily fun experiment.
        </p>

        {/* Money display */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-6">
          <div className="bg-white rounded-2xl shadow-md border border-border px-6 py-4 sm:px-8 sm:py-5 min-w-[220px]">
            <MoneyCounter
              amount={totalMoney}
              label="💰 Starting Money"
              size="md"
              colorClass="text-text-primary"
              animate={false}
            />
          </div>

          <div className="text-2xl text-text-muted hidden sm:block">→</div>
          <div className="text-2xl text-text-muted sm:hidden">↓</div>

          <div className={`rounded-2xl shadow-lg border-2 px-6 py-4 sm:px-8 sm:py-5 min-w-[220px] transition-colors duration-300 ${
            moneyLeft === 0
              ? 'bg-red-50 border-money-red'
              : moneyLeft < totalMoney
                ? 'bg-green-50 border-primary'
                : 'bg-white border-primary/30'
          }`}>
            <MoneyCounter
              amount={moneyLeft}
              label="Money Left"
              size="lg"
              colorClass={moneyLeft === 0 ? 'text-money-red' : 'text-money-green'}
            />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="max-w-xl mx-auto">
          <p className="text-xs text-text-muted leading-relaxed">
            {disclaimer}
          </p>
          <p className="text-xs text-text-muted mt-1 opacity-70">
            {sourceNote} • Last updated: {lastUpdated}
          </p>
        </div>
      </div>
    </section>
  );
}
