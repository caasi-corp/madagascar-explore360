
import { IDBPDatabase } from 'idb';
import { Booking } from '../schema';

/**
 * Seeds booking data into the database
 * @param db The database connection
 */
export const seedBookings = async (db: any): Promise<void> => {
  console.log("Ajout des réservations...");
  
  const bookings: Booking[] = [
    {
      id: 'b1',
      user_id: 'user1',
      tour_id: '1',
      start_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
      end_date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 17 days from now
      status: 'Confirmed',
      total_price: 299,
      created_at: new Date().toISOString(),
    },
  ];
  
  try {
    const bookingsTx = db.transaction('bookings', 'readwrite');
    const bookingsStore = bookingsTx.objectStore('bookings');
    for (const booking of bookings) {
      await bookingsStore.put(booking);
    }
    await bookingsTx.done;
    console.log("Réservations ajoutées avec succès");
  } catch (e) {
    console.error("Erreur lors de l'ajout des réservations:", e);
  }
};
