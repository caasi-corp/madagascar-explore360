
import { Booking } from '../db/schema';

/**
 * API for booking operations
 */
export const bookingAPI = {
  getAll: async () => {
    return await window.electronAPI.bookingGetAll();
  },
  
  getById: async (id: string) => {
    return await window.electronAPI.bookingGetById(id);
  },
  
  getByUserId: async (userId: string) => {
    return await window.electronAPI.bookingGetByUserId(userId);
  },
  
  getByStatus: async (status: string) => {
    // Filter client-side for this query
    const allBookings = await bookingAPI.getAll();
    return allBookings.filter(booking => booking.status === status);
  },
  
  add: async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    // Add createdAt on the client side before sending to main process
    const bookingWithDate = {
      ...booking,
      createdAt: new Date().toISOString()
    };
    return await window.electronAPI.bookingAdd(bookingWithDate);
  },
  
  update: async (id: string, booking: Partial<Booking>) => {
    return await window.electronAPI.bookingUpdate(id, booking);
  },
  
  delete: async (id: string) => {
    return await window.electronAPI.bookingDelete(id);
  },
};
