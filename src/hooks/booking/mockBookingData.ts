
import { format, addDays } from 'date-fns';
import { Booking, BookingsByDate } from '@/types/booking';

// Generate mock bookings for testing and development
export const generateMockBookings = (): Booking[] => {
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
  
  return mockBookings;
};

// Organize bookings by date for easier access
export const organizeBookingsByDate = (bookings: Booking[]): BookingsByDate => {
  const bookingsByDate: BookingsByDate = {};
  
  bookings.forEach(booking => {
    if (!bookingsByDate[booking.date]) {
      bookingsByDate[booking.date] = [];
    }
    bookingsByDate[booking.date].push(booking);
  });
  
  return bookingsByDate;
};
