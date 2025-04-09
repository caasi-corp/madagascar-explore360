
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

// Interface pour les réservations
interface Booking {
  id: string;
  client: string;
  tour: string;
  date: string;
  participants: number;
  status: string;
}

// Interface pour le retour du hook
interface UseBookingCalendarReturn {
  bookings: Booking[];
  bookingsByDate: Record<string, Booking[]>;
  isLoading: boolean;
  error: Error | null;
  syncWithGoogle: () => Promise<void>;
  isSyncing: boolean;
  isConfigured: boolean;
}

export const useBookingCalendar = (): UseBookingCalendarReturn => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsByDate, setBookingsByDate] = useState<Record<string, Booking[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  // Vérifier si l'API est configurée
  useEffect(() => {
    const apiKey = localStorage.getItem('google_api_key');
    const clientId = localStorage.getItem('google_client_id');
    const clientSecret = localStorage.getItem('google_client_secret');
    const configStatus = localStorage.getItem('google_api_configured');

    setIsConfigured(
      Boolean(apiKey && clientId && clientSecret && configStatus === 'true')
    );
  }, []);

  // Charger les réservations (simulation)
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setIsLoading(true);
        
        // Simuler un chargement depuis une API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données factices de réservation
        const mockBookings: Booking[] = [
          {
            id: 'B001',
            client: 'Jean Dupont',
            tour: 'Avenue des Baobabs',
            date: format(new Date(), 'yyyy-MM-dd'),
            participants: 2,
            status: 'Confirmé'
          },
          {
            id: 'B002',
            client: 'Marie Martin',
            tour: 'Parc National d\'Isalo',
            date: format(new Date(), 'yyyy-MM-dd'),
            participants: 4,
            status: 'En attente'
          },
          {
            id: 'B003',
            client: 'Pierre Lefèvre',
            tour: 'Tsingy de Bemaraha',
            date: format(new Date(Date.now() + 86400000), 'yyyy-MM-dd'), // Demain
            participants: 3,
            status: 'Confirmé'
          },
          {
            id: 'B004',
            client: 'Sophie Dubois',
            tour: 'Nosy Be',
            date: format(new Date(Date.now() + 172800000), 'yyyy-MM-dd'), // Après-demain
            participants: 2,
            status: 'Confirmé'
          },
        ];
        
        setBookings(mockBookings);
        
        // Organiser les réservations par date
        const bookingsByDateMap: Record<string, Booking[]> = {};
        mockBookings.forEach(booking => {
          if (!bookingsByDateMap[booking.date]) {
            bookingsByDateMap[booking.date] = [];
          }
          bookingsByDateMap[booking.date].push(booking);
        });
        
        setBookingsByDate(bookingsByDateMap);
        setIsLoading(false);
      } catch (err: any) {
        setError(err);
        setIsLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Fonction pour synchroniser avec Google Tasks
  const syncWithGoogle = async (): Promise<void> => {
    try {
      setIsSyncing(true);
      
      // Vérifier si l'API est configurée
      if (!isConfigured) {
        throw new Error("L'API Google n'est pas configurée");
      }
      
      // Simuler une synchronisation avec Google Tasks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dans une implémentation réelle, on appellerait l'API Google Tasks ici
      console.log("Synchronisation avec Google Tasks...");
      
      setIsSyncing(false);
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      setIsSyncing(false);
      return Promise.reject(err);
    }
  };

  return {
    bookings,
    bookingsByDate,
    isLoading,
    error,
    syncWithGoogle,
    isSyncing,
    isConfigured
  };
};
