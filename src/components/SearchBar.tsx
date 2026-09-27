interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <span className="text-text-muted">🔍</span>
      </div>
      <input
        type="text"
        placeholder="Search anything... car, cricket, food, luxury"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 bg-white border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}
