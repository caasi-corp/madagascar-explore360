
import { useState, useEffect } from 'react';
import { tourAPI } from '@/lib/store';

export interface TourQueryResult {
  tour: any;
  isLoading: boolean;
  error: Error | null;
}

export const useTourQuery = (id?: string): TourQueryResult => {
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchTour = async () => {
      if (!id) {
        setError(new Error("ID du circuit non spécifié"));
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        // Tentative de récupération du circuit depuis l'API
        const tourData = await tourAPI.getById(id);
        setTour(tourData);
      } catch (err) {
        console.error("Erreur lors de la récupération du circuit:", err);
        setError(err instanceof Error ? err : new Error("Erreur inconnue"));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTour();
  }, [id]);
  
  return { tour, isLoading, error };
};
