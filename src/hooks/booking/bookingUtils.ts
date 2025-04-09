
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

// Fetch real bookings data from Google Calendar (simulated)
const fetchGoogleCalendarEvents = async () => {
  // Simuler un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Ces données représentent ce que nous récupérerions de l'API Google Calendar
  return [
    {
      id: 'gc-001',
      summary: 'Visite Baobabs - Famille Martin (4 pers.)',
      start: { date: format(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') },
      description: 'Tour: Avenue des Baobabs\nContact: martin@example.com\nTél: +33 6 12 34 56 78'
    },
    {
      id: 'gc-002',
      summary: 'Trekking Isalo - M. Dupont (2 pers.)',
      start: { date: format(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') },
      description: 'Tour: Parc National Isalo\nContact: dupont@example.com\nTél: +33 6 87 65 43 21'
    },
    {
      id: 'gc-003',
      summary: 'Excursion Nosy Be - Groupe Leblanc (6 pers.)',
      start: { date: format(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd') },
      description: 'Tour: Île de Nosy Be\nContact: leblanc@example.com\nTél: +33 7 11 22 33 44'
    },
  ];
};

// Parse Google Calendar events to Booking format
const parseGoogleEvents = (events: any[]) => {
  return events.map(event => {
    // Extraire les infos du résumé et de la description
    const summaryMatch = event.summary.match(/(.+) - (.+) \((\d+) pers\.\)/);
    const tourName = summaryMatch ? summaryMatch[1] : 'Tour inconnu';
    const clientName = summaryMatch ? summaryMatch[2] : 'Client inconnu';
    const participants = summaryMatch ? parseInt(summaryMatch[3], 10) : 1;
    
    // Extraire les contacts de la description
    const descLines = event.description.split('\n');
    const contactEmail = descLines.find(line => line.startsWith('Contact:'))?.replace('Contact:', '').trim() || '';
    const contactPhone = descLines.find(line => line.startsWith('Tél:'))?.replace('Tél:', '').trim() || '';
    
    return {
      id: event.id,
      client: clientName,
      tour: tourName,
      date: event.start.date,
      participants,
      status: 'Confirmed',
      contactEmail,
      contactPhone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });
};

// Synchronize with Google Calendar
export const syncWithGoogleCalendar = async (): Promise<void> => {
  // Vérifier si l'API est configurée
  if (!checkApiConfiguration()) {
    throw new Error("L'API Google n'est pas configurée");
  }
  
  console.log("Synchronisation avec Google Calendar...");
  
  try {
    // Dans une implémentation réelle, ce code utiliserait l'API Google Calendar
    const events = await fetchGoogleCalendarEvents();
    
    // Transformer les événements en réservations
    const bookings = parseGoogleEvents(events);
    
    console.log("Synchronisation réussie. Événements récupérés:", bookings.length);
    
    // Ici, dans une implémentation réelle, on sauvegarderait ces réservations dans la base de données locale
    localStorage.setItem('google_calendar_sync_date', new Date().toISOString());
    
    return Promise.resolve();
  } catch (error) {
    console.error("Erreur lors de la synchronisation:", error);
    throw new Error("Erreur lors de la synchronisation avec Google Calendar");
  }
};
