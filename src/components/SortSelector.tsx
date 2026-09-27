type SortOption = 'cheapest' | 'expensive' | 'popular' | 'random';

interface SortSelectorProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'cheapest', label: '💰 Cheapest' },
  { value: 'expensive', label: '💎 Most Expensive' },
  { value: 'popular', label: '🔥 Most Popular' },
  { value: 'random', label: '🎲 Random' },
];

export default function SortSelector({ sortBy, onSortChange }: SortSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-text-muted font-medium hidden sm:inline">Sort:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="bg-white border border-border rounded-lg px-3 py-2 text-sm text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
