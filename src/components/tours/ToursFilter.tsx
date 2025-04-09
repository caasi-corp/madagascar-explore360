
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';

interface ToursFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  filters: {
    priceRange: number[];
    duration: string;
    categories: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    priceRange: number[];
    duration: string;
    categories: string[];
  }>>;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  categories: string[];
  durations: string[];
}

const ToursFilter: React.FC<ToursFilterProps> = ({
  searchTerm,
  setSearchTerm,
  isFilterOpen,
  setIsFilterOpen,
  filters,
  setFilters,
  selectedDate,
  setSelectedDate,
  categories,
  durations
}) => {
  const handlePriceRangeChange = (values: number[]) => {
    setFilters({ ...filters, priceRange: values });
  };

  const handleDurationChange = (value: string) => {
    setFilters({ ...filters, duration: value });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    } else {
      setFilters({ ...filters, categories: filters.categories.filter(c => c !== category) });
    }
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [50, 800],
      duration: '',
      categories: [],
    });
    setSelectedDate(undefined);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-4 md:p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Rechercher circuits, lieux..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-shrink-0">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : 'Sélectionner une date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="p-3 pointer-events-auto"
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant={isFilterOpen ? "default" : "outline"} 
            onClick={toggleFilters}
            className="flex-shrink-0"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
        </div>
      </div>
      
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
    </div>
  );
};

export default ToursFilter;
