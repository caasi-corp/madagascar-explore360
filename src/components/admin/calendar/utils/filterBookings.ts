
import { Booking } from '@/types/booking';
import { format } from 'date-fns';

export const filterBookings = (
  bookings: Booking[],
  searchQuery: string,
  filters: {
    status: string;
    tour: string;
    minParticipants: number;
    maxParticipants: number;
  }
): Booking[] => {
  return bookings.filter(booking => {
    const matchesSearch = searchQuery === '' || 
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || booking.status === filters.status;
    
    const matchesTour = filters.tour === 'all' || booking.tour === filters.tour;
    
    const matchesParticipants = 
      booking.participants >= filters.minParticipants && 
      booking.participants <= filters.maxParticipants;
    
    return matchesSearch && matchesStatus && matchesTour && matchesParticipants;
  });
};

export const exportBookingsToCSV = (filteredBookings: Booking[]): void => {
  const headers = "ID,Client,Tour,Date,Participants,Statut\n";
  const csvContent = filteredBookings.reduce((acc, booking) => {
    return acc + `${booking.id},${booking.client},"${booking.tour}",${booking.date},${booking.participants},${booking.status}\n`;
  }, headers);
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `reservations_${format(new Date(), 'yyyy-MM-dd')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
