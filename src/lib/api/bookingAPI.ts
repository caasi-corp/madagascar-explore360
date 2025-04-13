
import { getDB, saveDatabase, sqliteHelper } from '../db/sqlite';
import { Booking } from '../db/schema';

/**
 * API for booking operations
 */
export const bookingAPI = {
  getAll: async () => {
    const db = await getDB();
    const bookings = sqliteHelper.queryAll(db, "SELECT * FROM bookings");
    return bookings as Booking[];
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    const booking = sqliteHelper.queryOne(db, "SELECT * FROM bookings WHERE id = $id", { $id: id });
    return booking as Booking | null;
  },
  
  getByUserId: async (userId: string) => {
    const db = await getDB();
    const bookings = sqliteHelper.queryAll(db, "SELECT * FROM bookings WHERE userId = $userId", { $userId: userId });
    return bookings as Booking[];
  },
  
  getByStatus: async (status: string) => {
    const db = await getDB();
    const bookings = sqliteHelper.queryAll(db, "SELECT * FROM bookings WHERE status = $status", { $status: status });
    return bookings as Booking[];
  },
  
  add: async (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const db = await getDB();
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    sqliteHelper.execute(
      db,
      `INSERT INTO bookings (
        id, userId, tourId, vehicleId, hotelId, flightId, 
        startDate, endDate, status, totalPrice, createdAt
      ) VALUES (
        $id, $userId, $tourId, $vehicleId, $hotelId, $flightId, 
        $startDate, $endDate, $status, $totalPrice, $createdAt
      )`,
      {
        $id: id,
        $userId: booking.userId,
        $tourId: booking.tourId || null,
        $vehicleId: booking.vehicleId || null,
        $hotelId: booking.hotelId || null,
        $flightId: booking.flightId || null,
        $startDate: booking.startDate,
        $endDate: booking.endDate,
        $status: booking.status,
        $totalPrice: booking.totalPrice,
        $createdAt: createdAt
      }
    );
    
    await saveDatabase();
    
    return {
      ...booking,
      id,
      createdAt
    } as Booking;
  },
  
  update: async (id: string, booking: Partial<Booking>) => {
    const db = await getDB();
    const existingBooking = await bookingAPI.getById(id);
    
    if (!existingBooking) {
      throw new Error('Booking not found');
    }
    
    const updatedBooking = { ...existingBooking, ...booking };
    
    sqliteHelper.execute(
      db,
      `UPDATE bookings SET 
        userId = $userId, 
        tourId = $tourId, 
        vehicleId = $vehicleId, 
        hotelId = $hotelId, 
        flightId = $flightId, 
        startDate = $startDate, 
        endDate = $endDate, 
        status = $status, 
        totalPrice = $totalPrice
       WHERE id = $id`,
      {
        $id: id,
        $userId: updatedBooking.userId,
        $tourId: updatedBooking.tourId || null,
        $vehicleId: updatedBooking.vehicleId || null,
        $hotelId: updatedBooking.hotelId || null,
        $flightId: updatedBooking.flightId || null,
        $startDate: updatedBooking.startDate,
        $endDate: updatedBooking.endDate,
        $status: updatedBooking.status,
        $totalPrice: updatedBooking.totalPrice
      }
    );
    
    await saveDatabase();
    
    return updatedBooking;
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    sqliteHelper.execute(db, "DELETE FROM bookings WHERE id = $id", { $id: id });
    await saveDatabase();
  },
};
