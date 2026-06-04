import React from "react";
import { cn } from "@/lib/utils";

export const CATEGORIES = [
  "Privacy & Light Control",
  "Safety",
  "Maintenance & Durability",
  "Energy & Comfort",
  "Measurements & Fit",
  "Design & Compatibility",
] as const;

interface FilterChipsProps {
  selected: string[];
  onToggle: (category: string) => void;
  icons?: Record<string, React.ReactNode>;
}

const FilterChips: React.FC<FilterChipsProps> = ({ selected, onToggle, icons = {} }) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1" aria-label="FAQ category filters">
      {CATEGORIES.map((cat) => {
        const active = selected.includes(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition-colors",
              active ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground border-border hover:bg-secondary/80"
            )}
            aria-pressed={active}
          >
            {icons[cat]}
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterChips;
