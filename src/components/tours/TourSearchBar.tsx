
import React, { memo } from 'react';
import SearchBar from './SearchBar';
import DateSelector from './DateSelector';
import TourFilters from './TourFilters';

interface TourSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  isFilterOpen: boolean;
  toggleFilters: () => void;
  filters: {
    priceRange: number[];
    duration: string;
    categories: string[];
  };
  handlePriceRangeChange: (values: number[]) => void;
  handleDurationChange: (value: string) => void;
  handleCategoryChange: (category: string, checked: boolean) => void;
  resetFilters: () => void;
  categories: string[];
  durations: string[];
}

const TourSearchBar: React.FC<TourSearchBarProps> = memo(({
  searchTerm, 
  setSearchTerm,
  selectedDate,
  setSelectedDate,
  isFilterOpen,
  toggleFilters,
  filters,
  handlePriceRangeChange,
  handleDurationChange,
  handleCategoryChange,
  resetFilters,
  categories,
  durations
}) => {
  return (
    <div className="bg-card rounded-lg shadow-md p-4 md:p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <div className="flex gap-2">
          <DateSelector 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
          />
          
          <TourFilters 
            isFilterOpen={isFilterOpen}
            toggleFilters={toggleFilters}
            filters={filters}
            handlePriceRangeChange={handlePriceRangeChange}
            handleDurationChange={handleDurationChange}
            handleCategoryChange={handleCategoryChange}
            resetFilters={resetFilters}
            categories={categories}
            durations={durations}
          />
        </div>
      </div>
    </div>
  );
});

TourSearchBar.displayName = 'TourSearchBar';

export default TourSearchBar;
