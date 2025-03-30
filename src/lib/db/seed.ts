import { IDBPDatabase } from 'idb';
import { NorthGascarDB, Tour, Vehicle, User, Booking } from './schema';

/**
 * Seeds the database with initial data
 * @param db The database connection
 */
export const seedData = async (db: IDBPDatabase<NorthGascarDB>) => {
  console.log("Début du processus de seed de la base de données");
  
  try {
    // Vérifier d'abord si des données existent déjà
    const existingUsers = await db.getAll('users');
    if (existingUsers.length > 0) {
      console.log("Des utilisateurs existent déjà, le seed ne sera pas exécuté");
      return;
    }
    
    // Seed users first - CRITICAL
    console.log("Création des utilisateurs de test...");
    const users: User[] = [
      {
        id: 'admin1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@northgascartours.com',
        password: 'Admin123!',
        role: 'admin',
      },
      {
        id: 'user1',
        firstName: 'Pierre',
        lastName: 'Martin',
        email: 'user@northgascartours.com',
        password: 'User123!',
        role: 'user',
      },
      {
        id: 'user2',
        firstName: 'Marie',
        lastName: 'Dubois',
        email: 'marie@example.com',
        password: 'password',
        role: 'user',
      }
    ];
    
    // Use a single transaction for users
    try {
      console.log("Ajout des utilisateurs...");
      const tx = db.transaction('users', 'readwrite');
      const userStore = tx.objectStore('users');
      
      for (const user of users) {
        await userStore.add(user);
        console.log(`Utilisateur ajouté: ${user.email}`);
      }
      
      await tx.done;
      console.log("Transaction utilisateurs terminée avec succès");
      
      // Verify users were added
      const addedUsers = await db.getAll('users');
      console.log(`${addedUsers.length} utilisateurs ajoutés:`, JSON.stringify(addedUsers));
    } catch (e) {
      console.error("Erreur critique lors de l'ajout des utilisateurs:", e);
      throw e; // This is critical, so we rethrow
    }
    
    // Seed tours
    const tours: Tour[] = [
      {
        id: '1',
        title: 'Allée des Baobabs Tour',
        description: "Découvrez l'emblématique Allée des Baobabs, l'un des sites les plus célèbres de Madagascar.",
        location: 'Morondava',
        duration: '2 Jours',
        price: 299,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
        featured: true,
        category: 'Nature',
      },
      {
        id: '2',
        title: 'Trek aux Lémuriens à Andasibe',
        description: 'Parcourez le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
        location: 'Andasibe',
        duration: '3 Jours',
        price: 349,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
        featured: true,
        category: 'Faune',
      },
      {
        id: '3',
        title: 'Aventure au Parc National d\'Isalo',
        description: 'Découvrez les paysages étonnants du Parc National d\'Isalo avec ses canyons, cascades et piscines naturelles.',
        location: 'Isalo',
        duration: '4 Jours',
        price: 499,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
        featured: true,
        category: 'Aventure',
      },
      {
        id: '4',
        title: 'Paradis de l\'île Nosy Be',
        description: 'Relaxez-vous sur les magnifiques plages de Nosy Be, la principale destination balnéaire de Madagascar.',
        location: 'Nosy Be',
        duration: '5 Jours',
        price: 599,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
        featured: false,
        category: 'Plage',
      },
      {
        id: '5',
        title: 'Expédition au Parc National de Ranomafana',
        description: 'Explorez les forêts luxuriantes de Ranomafana et observez des espèces rares de lémuriens, d\'oiseaux et de caméléons.',
        location: 'Ranomafana',
        duration: '3 Jours',
        price: 389,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a',
        featured: false,
        category: 'Faune',
      },
      {
        id: '6',
        title: 'Trek au Tsingy de Bemaraha',
        description: 'Voyagez à travers les spectaculaires formations calcaires du Parc National du Tsingy de Bemaraha.',
        location: 'Bemaraha',
        duration: '4 Jours',
        price: 649,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1504623953583-4ae307ea839f',
        featured: false,
        category: 'Aventure',
      },
    ];
    
    // Seed vehicles
    const vehicles: Vehicle[] = [
      {
        id: 'v1',
        name: 'Toyota Land Cruiser',
        type: '4x4',
        pricePerDay: 89,
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        features: ['Climatisation', 'GPS', 'Galerie de toit', '4x4', 'Bluetooth', 'Ports USB'],
        availability: true,
      },
      {
        id: 'v2',
        name: 'Yamaha TW200',
        type: 'motorcycle',
        pricePerDay: 45,
        seats: 2,
        transmission: 'Manual',
        fuelType: 'Petrol',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
        features: ['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant'],
        availability: true,
      },
      {
        id: 'v3',
        name: 'BRP Can-Am Outlander',
        type: 'quad',
        pricePerDay: 65,
        seats: 1,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        image: 'https://images.unsplash.com/photo-1566845735839-6e25c92269a1',
        features: ['Casque inclus', 'Coffre de rangement', 'Transmission 4x4', 'Garde au sol élevée'],
        availability: true,
      },
    ];
    
    // Add some sample bookings
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

    // Store data with proper error handling - these are less critical
    try {
      await db.transaction('tours', 'readwrite', store => {
        tours.forEach(tour => store.put(tour));
      });
      console.log("Tours ajoutés avec succès");
    } catch (e) {
      console.error("Erreur lors de l'ajout des tours:", e);
    }
    
    try {
      await db.transaction('vehicles', 'readwrite', store => {
        vehicles.forEach(vehicle => store.put(vehicle));
      });
      console.log("Véhicules ajoutés avec succès");
    } catch (e) {
      console.error("Erreur lors de l'ajout des véhicules:", e);
    }
    
    try {
      await db.transaction('bookings', 'readwrite', store => {
        bookings.forEach(booking => store.put(booking));
      });
      console.log("Réservations ajoutées avec succès");
    } catch (e) {
      console.error("Erreur lors de l'ajout des réservations:", e);
    }
    
    console.log("Seed de la base de données terminé avec succès");
  } catch (error) {
    console.error("Erreur générale durant le seed de la base de données:", error);
    throw error;
  }
};
