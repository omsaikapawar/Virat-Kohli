import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  'All': '✨',
  'Food & Daily Life': '🍽️',
  'Tech': '💻',
  'Bikes': '🏍️',
  'Cars': '🚗',
  'Real Estate': '🏠',
  'Travel': '✈️',
  'Cricket': '🏏',
  'Entertainment': '🎬',
  'Luxury': '💎',
  'Absurd & Meme': '🤪',
};

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            selected === cat
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-text-secondary border border-border hover:border-primary hover:text-primary'
          }`}
        >
          {CATEGORY_EMOJIS[cat] || '📦'} {cat}
        </button>
      ))}
    </div>
  );
}
