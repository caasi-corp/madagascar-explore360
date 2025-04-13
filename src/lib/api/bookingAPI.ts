
import { getDB } from '../db/db';
import { Booking } from '../db/schema';

/**
 * API for booking operations
 */
export const bookingAPI = {
  getAll: async () => {
    const db = await getDB();
    return db.getAll('bookings');
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    return db.get('bookings', id);
  },
  
  getByUserId: async (userId: string) => {
    const db = await getDB();
    return db.getAllFromIndex('bookings', 'by-userId', userId);
  },
  
  getByStatus: async (status: string) => {
    const db = await getDB();
    return db.getAllFromIndex('bookings', 'by-status', status);
  },
  
  add: async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newBooking = { ...booking, id, createdAt };
    await db.put('bookings', newBooking);
    return newBooking;
  },
  
  update: async (id: string, booking: Partial<Booking>) => {
    const db = await getDB();
    const existingBooking = await db.get('bookings', id);
    if (!existingBooking) {
      throw new Error('Booking not found');
    }
    const updatedBooking = { ...existingBooking, ...booking };
    await db.put('bookings', updatedBooking);
    return updatedBooking;
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    await db.delete('bookings', id);
  },
};
