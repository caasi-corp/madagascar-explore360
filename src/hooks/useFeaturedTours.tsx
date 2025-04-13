
import { useState, useEffect, useCallback } from 'react';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/api/tourAPI';
import { useToast } from '@/components/ui/use-toast';
import { resetDB } from '@/lib/db/sqlite';

export function useFeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [retries, setRetries] = useState(0);
  const { toast } = useToast();

  const fetchFeaturedTours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching featured tours... (attempt:', retries + 1, ')');
      const tours = await tourAPI.getFeatured();
      console.log('Featured tours loaded:', tours);
      
      if (tours && Array.isArray(tours)) {
        setFeaturedTours(tours);
        
        // Si les tours sont vides et qu'il s'agit probablement d'un problème de base de données
        if (tours.length === 0) {
          console.log('No featured tours found, this might be a database issue');
        }
      } else {
        console.error('Invalid tours data format:', tours);
        setFeaturedTours([]);
        toast({
          title: "Erreur de données",
          description: "Format de données des circuits invalide",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error loading featured tours:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
      setFeaturedTours([]);
      
      // Only show toast on first error
      if (retries === 0) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les circuits mis en avant",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [toast, retries]);

  // Function to manually reset the database and reload tours
  const resetAndRefetch = useCallback(async () => {
    try {
      setLoading(true);
      console.log("Resetting database...");
      await resetDB();
      setRetries(prev => prev + 1);
      toast({
        title: "Base de données réinitialisée",
        description: "Les données ont été réinitialisées, chargement des circuits...",
      });
    } catch (err) {
      console.error("Error resetting database:", err);
      toast({
        title: "Erreur",
        description: "Impossible de réinitialiser la base de données",
        variant: "destructive",
      });
      setLoading(false);
    }
  }, [toast]);

  // Function to manually refetch without resetting
  const refetch = useCallback(() => {
    setRetries(prev => prev + 1);
  }, []);

  useEffect(() => {
    fetchFeaturedTours();
  }, [fetchFeaturedTours, retries]);

  return { 
    featuredTours, 
    loading, 
    error, 
    refetch,
    resetAndRefetch
  };
}
