
import { useState, useEffect } from 'react';
import { Tour } from '@/lib/db/schema';

export interface TourFilters {
  priceRange: number[];
  duration: string;
  categories: string[];
  category?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const useTourFiltering = (tours: Tour[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TourFilters>({
    priceRange: [50, 800],
    duration: '',
    categories: [],
    category: '',
    minPrice: '',
    maxPrice: ''
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

    // Filter by category (either from categories array or category string)
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(tour => tour.category && filters.categories.includes(tour.category));
    } else if (filters.category) {
      result = result.filter(tour => tour.category === filters.category);
    }

    // Filter by price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      const [minPrice, maxPrice] = filters.priceRange;
      result = result.filter(tour => tour.price >= minPrice && tour.price <= maxPrice);
    } else {
      // Use the old style filters if present
      if (filters.minPrice) {
        const minPrice = parseFloat(filters.minPrice);
        result = result.filter(tour => tour.price >= minPrice);
      }
      
      if (filters.maxPrice) {
        const maxPrice = parseFloat(filters.maxPrice);
        result = result.filter(tour => tour.price <= maxPrice);
      }
    }

    // Filter by duration
    if (filters.duration) {
      const [min, max] = filters.duration.split('-').map(d => parseInt(d.trim()));
      result = result.filter(tour => {
        const tourDays = parseInt(tour.duration.split(' ')[0]);
        return tourDays >= min && tourDays <= max;
      });
    }

    // Only filter inactive tours if explicitly set to false - otherwise show all tours
    result = result.filter(tour => tour.active !== false);

    setFilteredTours(result);
  }, [tours, searchTerm, filters, selectedDate]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      priceRange: [50, 800],
      duration: '',
      categories: [],
      category: '',
      minPrice: '',
      maxPrice: ''
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
