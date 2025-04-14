
import { useState, useEffect } from 'react';
import { Hotel } from '@/lib/db/schema';
import { dbxAPI } from '@/lib/dbx';

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const hotelsData = dbxAPI.hotels.getAll();
        setHotels(hotelsData);
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error(String(err)));
        console.error('Erreur lors du chargement des hôtels:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const searchHotels = (params: {
    term?: string;
    location?: string;
    minStars?: number;
    maxStars?: number;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    try {
      const results = dbxAPI.hotels.search(params);
      return results;
    } catch (err) {
      console.error('Erreur lors de la recherche d\'hôtels:', err);
      return [];
    }
  };

  const getHotelById = (id: string): Hotel | undefined => {
    try {
      return dbxAPI.hotels.getById(id);
    } catch (err) {
      console.error(`Erreur lors de la récupération de l'hôtel ${id}:`, err);
      return undefined;
    }
  };

  return {
    hotels,
    isLoading,
    error,
    searchHotels,
    getHotelById,
  };
}
