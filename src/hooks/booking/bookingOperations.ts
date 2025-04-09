
import { format } from 'date-fns';
import { Booking, BookingsByDate } from '@/types/booking';

// Add a new booking
export const addBooking = (
  bookings: Booking[],
  bookingsByDate: BookingsByDate,
  bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>
): { updatedBookings: Booking[], updatedBookingsByDate: BookingsByDate } => {
  // Generate a new ID (in a real app, this would come from the backend)
  const newId = `B${String(bookings.length + 1).padStart(3, '0')}`;
  const now = format(new Date(), 'yyyy-MM-dd');
  
  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    createdAt: now,
    updatedAt: now
  };
  
  // Add to the list of bookings
  const updatedBookings = [...bookings, newBooking];
  
  // Update bookingsByDate
  const updatedBookingsByDate = { ...bookingsByDate };
  if (!updatedBookingsByDate[newBooking.date]) {
    updatedBookingsByDate[newBooking.date] = [];
  }
  updatedBookingsByDate[newBooking.date].push(newBooking);
  
  return {
    updatedBookings,
    updatedBookingsByDate
  };
};

// Update an existing booking
export const updateBooking = (
  bookings: Booking[],
  bookingsByDate: BookingsByDate,
  id: string,
  bookingData: Partial<Booking>
): { updatedBookings: Booking[], updatedBookingsByDate: BookingsByDate } => {
  // Find and update the booking
  const bookingIndex = bookings.findIndex(b => b.id === id);
  if (bookingIndex === -1) {
    throw new Error(`Réservation introuvable: ${id}`);
  }
  
  const oldBooking = bookings[bookingIndex];
  const updatedBooking: Booking = {
    ...oldBooking,
    ...bookingData,
    updatedAt: format(new Date(), 'yyyy-MM-dd')
  };
  
  const updatedBookings = [...bookings];
  updatedBookings[bookingIndex] = updatedBooking;
  
  // Update bookingsByDate
  const oldDate = oldBooking.date;
  const newDate = bookingData.date || oldDate;
  
  const updatedBookingsByDate = { ...bookingsByDate };
  
  // Remove from old date
  if (updatedBookingsByDate[oldDate]) {
    updatedBookingsByDate[oldDate] = updatedBookingsByDate[oldDate].filter(b => b.id !== id);
    if (updatedBookingsByDate[oldDate].length === 0) {
      delete updatedBookingsByDate[oldDate];
    }
  }
  
  // Add to new date
  if (!updatedBookingsByDate[newDate]) {
    updatedBookingsByDate[newDate] = [];
  }
  updatedBookingsByDate[newDate].push(updatedBooking);
  
  return {
    updatedBookings,
    updatedBookingsByDate
  };
};

// Delete a booking
export const deleteBooking = (
  bookings: Booking[],
  bookingsByDate: BookingsByDate,
  id: string
): { updatedBookings: Booking[], updatedBookingsByDate: BookingsByDate } => {
  // Find the booking to delete
  const bookingToDelete = bookings.find(b => b.id === id);
  if (!bookingToDelete) {
    throw new Error(`Réservation introuvable: ${id}`);
  }
  
  // Remove from the main list
  const updatedBookings = bookings.filter(b => b.id !== id);
  
  // Remove from bookingsByDate
  const dateToUpdate = bookingToDelete.date;
  const updatedBookingsByDate = { ...bookingsByDate };
  
  if (updatedBookingsByDate[dateToUpdate]) {
    updatedBookingsByDate[dateToUpdate] = updatedBookingsByDate[dateToUpdate].filter(b => b.id !== id);
    if (updatedBookingsByDate[dateToUpdate].length === 0) {
      delete updatedBookingsByDate[dateToUpdate];
    }
  }
  
  return {
    updatedBookings,
    updatedBookingsByDate
  };
};
