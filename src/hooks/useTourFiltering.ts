
import { useState, useEffect } from 'react';
import { Tour } from '@/lib/db/schema';

interface TourFilters {
  category: string;
  minPrice: string;
  maxPrice: string;
  duration: string;
}

export const useTourFiltering = (tours: Tour[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TourFilters>({
    category: '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);

  useEffect(() => {
    let result = [...tours];

    // Filter by search term (title, description, location)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        tour => 
          tour.title.toLowerCase().includes(term) || 
          tour.description.toLowerCase().includes(term) || 
          tour.location.toLowerCase().includes(term)
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(tour => tour.category === filters.category);
    }

    // Filter by price range
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      result = result.filter(tour => tour.price >= minPrice);
    }
    
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      result = result.filter(tour => tour.price <= maxPrice);
    }

    // Filter by duration
    if (filters.duration) {
      const [min, max] = filters.duration.split('-').map(d => parseInt(d.trim()));
      result = result.filter(tour => {
        const tourDays = parseInt(tour.duration.split(' ')[0]);
        return tourDays >= min && tourDays <= max;
      });
    }

    // Only show active tours (if property exists)
    result = result.filter(tour => tour.active !== false);

    setFilteredTours(result);
  }, [tours, searchTerm, filters, selectedDate]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      duration: ''
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
