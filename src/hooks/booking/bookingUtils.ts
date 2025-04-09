
import { format } from 'date-fns';
import { AvailabilityStatus, BookingsByDate } from '@/types/booking';

// Check availability for a specific date
export const getAvailability = (
  date: Date, 
  bookingsByDate: BookingsByDate
): AvailabilityStatus => {
  const dateStr = format(date, 'yyyy-MM-dd');
  const bookingsForDay = bookingsByDate[dateStr] || [];
  
  // Example availability rules
  const totalParticipants = bookingsForDay.reduce((sum, b) => sum + b.participants, 0);
  const maxParticipantsPerDay = 20; // Example limit
  
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

// Check if Google API is configured
export const checkApiConfiguration = (): boolean => {
  const apiKey = localStorage.getItem('google_api_key');
  const clientId = localStorage.getItem('google_client_id');
  const clientSecret = localStorage.getItem('google_client_secret');
  const configStatus = localStorage.getItem('google_api_configured');

  return Boolean(
    apiKey && clientId && clientSecret && configStatus === 'true'
  );
};

// Synchronize with Google Calendar (simulated)
export const syncWithGoogleCalendar = async (): Promise<void> => {
  // Vérifier si l'API est configurée
  if (!checkApiConfiguration()) {
    throw new Error("L'API Google n'est pas configurée");
  }
  
  // Simuler une synchronisation avec Google Calendar
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Dans une implémentation réelle, on appellerait l'API Google Calendar ici
  console.log("Synchronisation avec Google Calendar...");
  
  return Promise.resolve();
};
