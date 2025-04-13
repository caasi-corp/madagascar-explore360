
import { Tour } from '../db/schema';

/**
 * API for tour operations
 */
export const tourAPI = {
  getAll: async () => {
    return await window.electronAPI.tourGetAll();
  },
  
  getById: async (id: string) => {
    return await window.electronAPI.tourGetById(id);
  },
  
  getByCategory: async (category: string) => {
    return await window.electronAPI.tourGetByCategory(category);
  },
  
  getByLocation: async (location: string) => {
    // For now, we'll filter client-side since we don't have a specific IPC method for this
    const allTours = await tourAPI.getAll();
    return allTours.filter(tour => tour.location === location);
  },
  
  getFeatured: async () => {
    return await window.electronAPI.tourGetFeatured();
  },
  
  getRelated: async (id: string, category: string) => {
    const toursInCategory = await tourAPI.getByCategory(category);
    return toursInCategory.filter(tour => tour.id !== id).slice(0, 4);
  },
  
  search: async (searchParams: {
    term?: string;
    category?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    active?: boolean;
  }) => {
    // For complex searches, we'll get all tours and filter client-side
    let tours = await tourAPI.getAll();
    
    if (searchParams.term) {
      const term = searchParams.term.toLowerCase();
      tours = tours.filter(tour => 
        tour.title.toLowerCase().includes(term) || 
        tour.description.toLowerCase().includes(term) || 
        tour.location.toLowerCase().includes(term)
      );
    }
    
    if (searchParams.category) {
      tours = tours.filter(tour => tour.category === searchParams.category);
    }
    
    if (searchParams.location) {
      tours = tours.filter(tour => tour.location === searchParams.location);
    }
    
    if (searchParams.minPrice !== undefined) {
      tours = tours.filter(tour => tour.price >= searchParams.minPrice!);
    }
    
    if (searchParams.maxPrice !== undefined) {
      tours = tours.filter(tour => tour.price <= searchParams.maxPrice!);
    }
    
    if (searchParams.featured !== undefined) {
      tours = tours.filter(tour => Boolean(tour.featured) === searchParams.featured);
    }
    
    if (searchParams.active !== undefined) {
      tours = tours.filter(tour => Boolean(tour.active) === searchParams.active);
    }
    
    return tours;
  },
  
  add: async (tour: Omit<Tour, 'id'>) => {
    return await window.electronAPI.tourAdd(tour);
  },
  
  update: async (id: string, tour: Partial<Tour>) => {
    return await window.electronAPI.tourUpdate(id, tour);
  },
  
  delete: async (id: string) => {
    return await window.electronAPI.tourDelete(id);
  },
  
  searchByPrice: async (minPrice: number, maxPrice: number) => {
    const allTours = await tourAPI.getAll();
    return allTours.filter(tour => tour.price >= minPrice && tour.price <= maxPrice);
  },
  
  searchByDuration: async (minDays: number, maxDays: number) => {
    const allTours = await tourAPI.getAll();
    return allTours.filter(tour => {
      const days = parseInt(tour.duration.split(' ')[0]);
      return days >= minDays && days <= maxDays;
    });
  },
  
  getAllCategories: async () => {
    const allTours = await tourAPI.getAll();
    return [...new Set(allTours.map(tour => tour.category))].filter(Boolean);
  },
  
  getAllLocations: async () => {
    const allTours = await tourAPI.getAll();
    return [...new Set(allTours.map(tour => tour.location))].filter(Boolean);
  }
};
