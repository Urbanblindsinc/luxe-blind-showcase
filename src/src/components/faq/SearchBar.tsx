import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onClear }) => {
  return (
    <div className="w-full">
      <label htmlFor="faq-search" className="sr-only">Search FAQs</label>
      <div className="relative">
        <input
          id="faq-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by topic: privacy, motorization, cleaning…"
          aria-label="Search FAQs"
          className="w-full rounded-md border border-input bg-background px-4 py-3 pr-10 text-base outline-none focus:ring-2 focus:ring-primary"
        />
        {value && (
          <button
            aria-label="Clear search"
            onClick={onClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
