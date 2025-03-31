
import { useState, useCallback, useMemo } from 'react';
import { TourProps } from '@/components/TourCard';

export const useTourFilters = (tours: TourProps[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [50, 800],
    duration: '',
    categories: [] as string[],
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handlePriceRangeChange = useCallback((values: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: values }));
  }, []);

  const handleDurationChange = useCallback((value: string) => {
    setFilters(prev => ({ ...prev, duration: value }));
  }, []);

  const handleCategoryChange = useCallback((category: string, checked: boolean) => {
    setFilters(prev => {
      if (checked) {
        return { ...prev, categories: [...prev.categories, category] };
      } else {
        return { ...prev, categories: prev.categories.filter(c => c !== category) };
      }
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [50, 800],
      duration: '',
      categories: [],
    });
    setSelectedDate(undefined);
  }, []);

  const toggleFilters = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const filteredTours = useMemo(() => {
    return tours.filter(tour => {
      if (searchTerm && !tour.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !tour.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !tour.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
        return false;
      }
      
      if (filters.categories.length > 0 && !filters.categories.includes(tour.category || '')) {
        return false;
      }
      
      if (filters.duration) {
        const tourDays = parseInt(tour.duration.split(' ')[0]);
        
        if (filters.duration === '1-2 Jours' && tourDays > 2) return false;
        if (filters.duration === '3-5 Jours' && (tourDays < 3 || tourDays > 5)) return false;
        if (filters.duration === '6-10 Jours' && (tourDays < 6 || tourDays > 10)) return false;
        if (filters.duration === '10+ Jours' && tourDays <= 10) return false;
      }
      
      return true;
    });
  }, [tours, searchTerm, filters]);

  return {
    searchTerm,
    setSearchTerm,
    isFilterOpen,
    toggleFilters,
    filters,
    selectedDate,
    setSelectedDate,
    handlePriceRangeChange,
    handleDurationChange,
    handleCategoryChange,
    resetFilters,
    filteredTours
  };
};
