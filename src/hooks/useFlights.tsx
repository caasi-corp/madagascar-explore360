
import { useState, useEffect } from 'react';
import { Flight } from '@/lib/db/schema';
import { dbxAPI } from '@/lib/dbx';

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setIsLoading(true);
        const flightsData = dbxAPI.flights.getAll();
        setFlights(flightsData);
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error(String(err)));
        console.error('Erreur lors du chargement des vols:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const searchFlights = (params: {
    departure?: string;
    arrival?: string;
    departureDate?: string;
    airline?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => {
    try {
      const results = dbxAPI.flights.search(params);
      return results;
    } catch (err) {
      console.error('Erreur lors de la recherche de vols:', err);
      return [];
    }
  };

  const getFlightById = (id: string): Flight | undefined => {
    try {
      return dbxAPI.flights.getById(id);
    } catch (err) {
      console.error(`Erreur lors de la récupération du vol ${id}:`, err);
      return undefined;
    }
  };

  return {
    flights,
    isLoading,
    error,
    searchFlights,
    getFlightById,
  };
}
