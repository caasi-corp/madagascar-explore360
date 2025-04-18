
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Booking } from '../schema';

/**
 * Seeds booking data into the database
 * @param db The database connection
 */
export const seedBookings = async (db: IDBPDatabase<NorthGascarDB>): Promise<void> => {
  console.log("Ajout des réservations...");
  
  const bookings: Booking[] = [
    {
      id: 'b1',
      userId: 'user1',
      tourId: '1',
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 17 days from now
      status: 'Confirmed',
      totalPrice: 299,
      createdAt: new Date().toISOString(),
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
