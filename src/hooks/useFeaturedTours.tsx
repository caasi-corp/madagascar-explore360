
import { useState, useEffect } from 'react';
import { Tour } from '@/lib/db/schema';
import { tourAPI } from '@/lib/api/tourAPI';

export function useFeaturedTours() {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const tours = await tourAPI.getFeatured();
        console.log('Tours mis en avant chargés:', tours);
        setFeaturedTours(tours);
      } catch (error) {
        console.error('Erreur lors du chargement des tours mis en avant:', error);
        setError(error instanceof Error ? error : new Error('Erreur inconnue'));
        // Fallback to empty array in case of error
        setFeaturedTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  return { featuredTours, loading, error };
}
