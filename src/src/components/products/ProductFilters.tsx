
import { useState } from "react";
import { ChevronDown, Grid3X3, Rows3, Sliders } from "lucide-react";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = ["Roller Blinds", "Zebra Blinds", "Honeycomb Blinds"];
  
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeCategory === category
              ? "bg-teal-light text-white shadow-md"
              : "bg-white text-foreground hover:bg-gray-50 border border-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

interface SortDropdownProps {
  activeSorting: string;
  onSortChange: (sort: string) => void;
}

export const SortDropdown = ({ activeSorting, onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "nameAsc", label: "Name: A to Z" },
    { value: "nameDesc", label: "Name: Z to A" }
  ];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2.5 bg-white border border-gray-100 rounded-md text-sm shadow-sm"
      >
        <span className="mr-2">Sort: {sortOptions.find(opt => opt.value === activeSorting)?.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  activeSorting === option.value
                    ? "bg-gray-50 text-teal-dark font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface ViewModeProps {
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

export const ViewMode = ({ viewMode, onViewModeChange }: ViewModeProps) => {
  return (
    <div className="flex items-center border border-gray-100 rounded-md overflow-hidden">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`p-2 ${viewMode === "grid" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
        aria-label="Grid view"
      >
        <Grid3X3 size={18} />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-2 ${viewMode === "list" ? "bg-gray-100" : "bg-white hover:bg-gray-50"}`}
        aria-label="List view"
      >
        <Rows3 size={18} />
      </button>
    </div>
  );
};

interface MobileFiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

export const MobileFilters = ({ 
  showFilters, 
  setShowFilters, 
  activeCategory, 
  onCategoryChange, 
  viewMode, 
  onViewModeChange 
}: MobileFiltersProps) => {
  return (
    <>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center px-4 py-2.5 bg-white border border-gray-100 text-sm shadow-sm md:hidden"
      >
        <Sliders className="h-4 w-4 mr-2" />
        Filters
      </button>
      
      {showFilters && (
        <div className="md:hidden mb-8 p-6 bg-white rounded-lg shadow-md animate-fade-in">
          <h3 className="font-medium mb-4">Categories</h3>
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={(category) => {
              onCategoryChange(category);
              setShowFilters(false);
            }} 
          />
          
          <div className="mt-6">
            <h3 className="font-medium mb-4">View</h3>
            <ViewMode 
              viewMode={viewMode} 
              onViewModeChange={(mode) => {
                onViewModeChange(mode);
                setShowFilters(false);
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
};
