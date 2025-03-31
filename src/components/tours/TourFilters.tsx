
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
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

const TourFilters: React.FC<FiltersProps> = ({
  isFilterOpen,
  toggleFilters,
  filters,
  handlePriceRangeChange,
  handleDurationChange,
  handleCategoryChange,
  resetFilters,
  categories,
  durations,
}) => {
  return (
    <>
      <Button 
        variant={isFilterOpen ? "default" : "outline"} 
        onClick={toggleFilters}
        className="flex-shrink-0"
      >
        <Filter className="mr-2 h-4 w-4" />
        Filtres
      </Button>
      
      {isFilterOpen && (
        <div className="mt-4 pt-4 border-t animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filtres</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
              <X size={14} className="mr-1" /> Réinitialiser
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Fourchette de Prix</h4>
              <div className="px-2">
                <Slider
                  defaultValue={filters.priceRange}
                  min={50}
                  max={800}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="my-6"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.priceRange[0]} €</span>
                  <span>{filters.priceRange[1]} €</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Durée</h4>
              <RadioGroup value={filters.duration} onValueChange={handleDurationChange}>
                {durations.map((duration) => (
                  <div key={duration} className="flex items-center space-x-2">
                    <RadioGroupItem value={duration} id={duration} />
                    <Label htmlFor={duration} className="text-sm">{duration}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Catégories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={category} 
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
                    />
                    <label 
                      htmlFor={category}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TourFilters;
