
/**
 * API pour les opérations sur les circuits
 */
import { dbx } from '../DatabaseX/db';

export const tourAPI = {
  getAll: async () => {
    try {
      return dbx.tours.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des circuits:", error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      return dbx.tours.getById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération du circuit ${id}:`, error);
      return null;
    }
  },
  
  getByCategory: async (category: string) => {
    try {
      return dbx.tours.getByCategory(category);
    } catch (error) {
      console.error(`Erreur lors de la récupération des circuits de catégorie ${category}:`, error);
      return [];
    }
  },
  
  getByLocation: async (location: string) => {
    try {
      const allTours = dbx.tours.getAll();
      return allTours.filter(tour => tour.location === location);
    } catch (error) {
      console.error(`Erreur lors de la récupération des circuits à ${location}:`, error);
      return [];
    }
  },
  
  getFeatured: async () => {
    try {
      return dbx.tours.getFeatured();
    } catch (error) {
      console.error("Erreur lors de la récupération des circuits en vedette:", error);
      return [];
    }
  },
  
  getRelated: async (id: string, category: string) => {
    try {
      const allTours = dbx.tours.getByCategory(category);
      return allTours.filter(tour => tour.id !== id).slice(0, 4);
    } catch (error) {
      console.error(`Erreur lors de la récupération des circuits similaires:`, error);
      return [];
    }
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
    try {
      let tours = dbx.tours.getAll();
      
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
        tours = tours.filter(tour => tour.featured === searchParams.featured);
      }
      
      if (searchParams.active !== undefined) {
        tours = tours.filter(tour => tour.active === searchParams.active);
      }
      
      return tours;
    } catch (error) {
      console.error("Erreur lors de la recherche de circuits:", error);
      return [];
    }
  },
  
  add: async (tour: Omit<any, 'id'>) => {
    try {
      return dbx.tours.add(tour);
    } catch (error) {
      console.error("Erreur lors de l'ajout du circuit:", error);
      throw error;
    }
  },
  
  update: async (id: string, tour: Partial<any>) => {
    try {
      return dbx.tours.update(id, tour);
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du circuit ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      return dbx.tours.delete(id);
    } catch (error) {
      console.error(`Erreur lors de la suppression du circuit ${id}:`, error);
      throw error;
    }
  },
  
  searchByPrice: async (minPrice: number, maxPrice: number) => {
    try {
      const allTours = dbx.tours.getAll();
      return allTours.filter(tour => tour.price >= minPrice && tour.price <= maxPrice);
    } catch (error) {
      console.error("Erreur lors de la recherche de circuits par prix:", error);
      return [];
    }
  },
  
  searchByDuration: async (minDays: number, maxDays: number) => {
    try {
      const allTours = dbx.tours.getAll();
      return allTours.filter(tour => {
        const days = parseInt(tour.duration.split(' ')[0]);
        return days >= minDays && days <= maxDays;
      });
    } catch (error) {
      console.error("Erreur lors de la recherche de circuits par durée:", error);
      return [];
    }
  },
  
  getAllCategories: async () => {
    try {
      const allTours = dbx.tours.getAll();
      return [...new Set(allTours.map(tour => tour.category))].filter(Boolean);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
      return [];
    }
  },
  
  getAllLocations: async () => {
    try {
      const allTours = dbx.tours.getAll();
      return [...new Set(allTours.map(tour => tour.location))].filter(Boolean);
    } catch (error) {
      console.error("Erreur lors de la récupération des emplacements:", error);
      return [];
    }
  }
};
