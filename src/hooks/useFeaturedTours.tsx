
import { useState, useEffect, useCallback } from 'react';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/api/tourAPI';
import { useToast } from '@/components/ui/use-toast';

export function useFeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchFeaturedTours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching featured tours...');
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
      toast({
        title: "Erreur",
        description: "Impossible de charger les circuits mis en avant",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchFeaturedTours();
  }, [fetchFeaturedTours]);

  // Fonction pour recharger les tours manuellement
  const refetch = () => {
    fetchFeaturedTours();
  };

  return { featuredTours, loading, error, refetch };
}
