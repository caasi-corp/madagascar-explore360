
/**
 * Adaptateur pour les opérations sur les réservations avec DBX
 */
import { Booking } from '../../db/schema';
import { dbxManager } from '../DBXManager';

export const DBXBookingAdapter = {
  getAll: (): Booking[] => {
    return dbxManager.readDBX<Booking>('bookings');
  },
  
  getById: (id: string): Booking | undefined => {
    const bookings = dbxManager.readDBX<Booking>('bookings');
    return bookings.find(booking => booking.id === id);
  },
  
  getByUserId: (userId: string): Booking[] => {
    const bookings = dbxManager.readDBX<Booking>('bookings');
    return bookings.filter(booking => booking.userId === userId);
  },
  
  getByStatus: (status: string): Booking[] => {
    const bookings = dbxManager.readDBX<Booking>('bookings');
    return bookings.filter(booking => booking.status === status);
  },
  
  add: (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newBooking = { ...booking, id, createdAt };
    return dbxManager.updateItem<Booking>('bookings', newBooking);
  },
  
  update: (id: string, bookingData: Partial<Booking>): Booking => {
    const bookings = dbxManager.readDBX<Booking>('bookings');
    const existingBooking = bookings.find(b => b.id === id);
    
    if (!existingBooking) {
      throw new Error('Booking not found');
    }
    
    const updatedBooking = { ...existingBooking, ...bookingData };
    return dbxManager.updateItem<Booking>('bookings', updatedBooking);
  },
  
  delete: (id: string): boolean => {
    return dbxManager.deleteItem<Booking>('bookings', id);
  }
};
