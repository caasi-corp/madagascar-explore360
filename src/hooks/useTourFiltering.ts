
import { useState, useEffect } from 'react';
import { TourProps } from '@/components/TourCard';

export const useTourFiltering = (tours: TourProps[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [50, 800],
    duration: '',
    categories: [] as string[],
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [filteredTours, setFilteredTours] = useState<TourProps[]>(tours);

  useEffect(() => {
    const filtered = tours.filter(tour => {
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
    
    setFilteredTours(filtered);
  }, [tours, searchTerm, filters, selectedDate]);

  const resetFilters = () => {
    setFilters({
      priceRange: [50, 800],
      duration: '',
      categories: [],
    });
    setSelectedDate(undefined);
  };

  return {
    searchTerm,
    setSearchTerm,
    isFilterOpen,
    setIsFilterOpen,
    filters,
    setFilters,
    selectedDate,
    setSelectedDate,
    filteredTours,
    resetFilters
  };
};
