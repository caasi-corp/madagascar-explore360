
import { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';

// Interface pour les réservations
export interface Booking {
  id: string;
  client: string;
  tour: string;
  date: string;
  participants: number;
  status: string;
  paymentStatus?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
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
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  getAvailability: (date: Date) => 'available' | 'partial' | 'full' | 'unavailable';
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
        
        const today = new Date();
        
        // Données factices de réservation
        const mockBookings: Booking[] = [
          {
            id: 'B001',
            client: 'Jean Dupont',
            tour: 'Avenue des Baobabs',
            date: format(today, 'yyyy-MM-dd'),
            participants: 2,
            status: 'Confirmé',
            paymentStatus: 'Payé',
            contactEmail: 'jean.dupont@example.com',
            contactPhone: '+261 34 01 02 03',
            notes: 'Client VIP - Besoin d\'un guide anglophone',
            price: 120,
            createdAt: format(addDays(today, -10), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -5), 'yyyy-MM-dd'),
          },
          {
            id: 'B002',
            client: 'Marie Martin',
            tour: 'Parc National d\'Isalo',
            date: format(today, 'yyyy-MM-dd'),
            participants: 4,
            status: 'En attente',
            paymentStatus: 'Acompte',
            contactEmail: 'marie.martin@example.com',
            contactPhone: '+261 33 04 05 06',
            notes: 'Prévoir un pique-nique',
            price: 320,
            createdAt: format(addDays(today, -7), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -7), 'yyyy-MM-dd'),
          },
          {
            id: 'B003',
            client: 'Pierre Lefèvre',
            tour: 'Tsingy de Bemaraha',
            date: format(addDays(today, 1), 'yyyy-MM-dd'), // Demain
            participants: 3,
            status: 'Confirmé',
            paymentStatus: 'Payé',
            contactEmail: 'pierre.lefevre@example.com',
            contactPhone: '+261 32 07 08 09',
            price: 280,
            createdAt: format(addDays(today, -14), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -2), 'yyyy-MM-dd'),
          },
          {
            id: 'B004',
            client: 'Sophie Dubois',
            tour: 'Nosy Be',
            date: format(addDays(today, 2), 'yyyy-MM-dd'), // Après-demain
            participants: 2,
            status: 'Confirmé',
            paymentStatus: 'Payé',
            contactEmail: 'sophie.dubois@example.com',
            contactPhone: '+261 34 10 11 12',
            price: 200,
            createdAt: format(addDays(today, -20), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -20), 'yyyy-MM-dd'),
          },
          {
            id: 'B005',
            client: 'Antoine Moreau',
            tour: 'Avenue des Baobabs',
            date: format(addDays(today, 3), 'yyyy-MM-dd'), 
            participants: 5,
            status: 'En attente',
            paymentStatus: 'En attente',
            contactEmail: 'antoine.moreau@example.com',
            contactPhone: '+261 33 13 14 15',
            price: 300,
            createdAt: format(addDays(today, -5), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -5), 'yyyy-MM-dd'),
          },
          {
            id: 'B006',
            client: 'Camille Bernard',
            tour: 'Parc National d\'Andasibe',
            date: format(addDays(today, 5), 'yyyy-MM-dd'), 
            participants: 2,
            status: 'Confirmé',
            paymentStatus: 'Payé',
            contactEmail: 'camille.bernard@example.com',
            contactPhone: '+261 32 16 17 18',
            notes: 'Intéressé par l\'observation des lémuriens',
            price: 150,
            createdAt: format(addDays(today, -30), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -3), 'yyyy-MM-dd'),
          },
          {
            id: 'B007',
            client: 'Lucas Petit',
            tour: 'Tsingy de Bemaraha',
            date: format(addDays(today, 7), 'yyyy-MM-dd'), 
            participants: 6,
            status: 'Confirmé',
            paymentStatus: 'Acompte',
            contactEmail: 'lucas.petit@example.com',
            contactPhone: '+261 34 19 20 21',
            notes: 'Groupe familial avec enfants',
            price: 560,
            createdAt: format(addDays(today, -25), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -10), 'yyyy-MM-dd'),
          },
          {
            id: 'B008',
            client: 'Emma Rousseau',
            tour: 'Avenue des Baobabs',
            date: format(addDays(today, 10), 'yyyy-MM-dd'), 
            participants: 2,
            status: 'En attente',
            paymentStatus: 'En attente',
            contactEmail: 'emma.rousseau@example.com',
            contactPhone: '+261 33 22 23 24',
            price: 120,
            createdAt: format(addDays(today, -3), 'yyyy-MM-dd'),
            updatedAt: format(addDays(today, -3), 'yyyy-MM-dd'),
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

  // Ajouter une nouvelle réservation
  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    try {
      // Générer un nouvel ID (dans une application réelle, cela viendrait du backend)
      const newId = `B${String(bookings.length + 1).padStart(3, '0')}`;
      const now = format(new Date(), 'yyyy-MM-dd');
      
      const newBooking: Booking = {
        ...bookingData,
        id: newId,
        createdAt: now,
        updatedAt: now
      };
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ajouter à la liste des réservations
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);
      
      // Mettre à jour bookingsByDate
      const updatedBookingsByDate = { ...bookingsByDate };
      if (!updatedBookingsByDate[newBooking.date]) {
        updatedBookingsByDate[newBooking.date] = [];
      }
      updatedBookingsByDate[newBooking.date].push(newBooking);
      setBookingsByDate(updatedBookingsByDate);
      
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    }
  };

  // Mettre à jour une réservation existante
  const updateBooking = async (id: string, bookingData: Partial<Booking>): Promise<void> => {
    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Trouver et mettre à jour la réservation
      const bookingIndex = bookings.findIndex(b => b.id === id);
      if (bookingIndex === -1) {
        throw new Error(`Réservation introuvable: ${id}`);
      }
      
      const updatedBooking: Booking = {
        ...bookings[bookingIndex],
        ...bookingData,
        updatedAt: format(new Date(), 'yyyy-MM-dd')
      };
      
      const updatedBookings = [...bookings];
      updatedBookings[bookingIndex] = updatedBooking;
      setBookings(updatedBookings);
      
      // Mettre à jour bookingsByDate
      const oldDate = bookings[bookingIndex].date;
      const newDate = bookingData.date || oldDate;
      
      const updatedBookingsByDate = { ...bookingsByDate };
      
      // Supprimer de l'ancienne date
      if (updatedBookingsByDate[oldDate]) {
        updatedBookingsByDate[oldDate] = updatedBookingsByDate[oldDate].filter(b => b.id !== id);
        if (updatedBookingsByDate[oldDate].length === 0) {
          delete updatedBookingsByDate[oldDate];
        }
      }
      
      // Ajouter à la nouvelle date
      if (!updatedBookingsByDate[newDate]) {
        updatedBookingsByDate[newDate] = [];
      }
      updatedBookingsByDate[newDate].push(updatedBooking);
      
      setBookingsByDate(updatedBookingsByDate);
      
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    }
  };

  // Supprimer une réservation
  const deleteBooking = async (id: string): Promise<void> => {
    try {
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Trouver la réservation à supprimer
      const bookingToDelete = bookings.find(b => b.id === id);
      if (!bookingToDelete) {
        throw new Error(`Réservation introuvable: ${id}`);
      }
      
      // Supprimer de la liste principale
      const updatedBookings = bookings.filter(b => b.id !== id);
      setBookings(updatedBookings);
      
      // Supprimer de bookingsByDate
      const dateToUpdate = bookingToDelete.date;
      const updatedBookingsByDate = { ...bookingsByDate };
      
      if (updatedBookingsByDate[dateToUpdate]) {
        updatedBookingsByDate[dateToUpdate] = updatedBookingsByDate[dateToUpdate].filter(b => b.id !== id);
        if (updatedBookingsByDate[dateToUpdate].length === 0) {
          delete updatedBookingsByDate[dateToUpdate];
        }
      }
      
      setBookingsByDate(updatedBookingsByDate);
      
      return Promise.resolve();
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    }
  };

  // Vérifier la disponibilité pour une date donnée
  const getAvailability = (date: Date): 'available' | 'partial' | 'full' | 'unavailable' => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const bookingsForDay = bookingsByDate[dateStr] || [];
    
    // Exemple de règles de disponibilité
    const totalParticipants = bookingsForDay.reduce((sum, b) => sum + b.participants, 0);
    const maxParticipantsPerDay = 20; // Exemple de limite
    
    if (bookingsForDay.length === 0) {
      return 'available';
    } else if (totalParticipants >= maxParticipantsPerDay) {
      return 'full';
    } else if (totalParticipants >= maxParticipantsPerDay * 0.7) {
      return 'partial';
    } else {
      return 'available';
    }
  };

  return {
    bookings,
    bookingsByDate,
    isLoading,
    error,
    syncWithGoogle,
    isSyncing,
    isConfigured,
    addBooking,
    updateBooking,
    deleteBooking,
    getAvailability
  };
};
