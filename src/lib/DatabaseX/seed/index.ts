
/**
 * Point d'entrée pour l'initialisation des données de test
 */
import { dbx } from '../db';
import { DBXTour, DBXVehicle, DBXUser, DBXBooking, DBXBanner } from '../types';

/**
 * Remplit la base de données avec les données initiales
 */
export const seedDatabase = async (): Promise<boolean> => {
  try {
    console.log("Ajout des données initiales dans DatabaseX...");
    
    // Ajouter les utilisateurs (étape critique)
    await seedUsers();
    
    // Ajouter les autres données
    await seedTours();
    await seedVehicles();
    await seedBookings();
    await seedBanners();
    
    console.log("Données initiales ajoutées avec succès dans DatabaseX");
    return true;
  } catch (error) {
    console.error("Erreur critique lors de l'initialisation de DatabaseX:", error);
    return false;
  }
};

/**
 * Ajoute les utilisateurs de test
 */
const seedUsers = async (): Promise<void> => {
  console.log("Ajout des utilisateurs de test...");
  
  const users: Omit<DBXUser, 'id'>[] = [
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@northgascartours.com',
      password: 'Admin123!',
      role: 'admin',
    },
    {
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'user@northgascartours.com',
      password: 'User123!',
      role: 'user',
    },
    {
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie@example.com',
      password: 'password',
      role: 'user',
    }
  ];
  
  for (const user of users) {
    dbx.users.add(user);
  }
  
  const addedUsers = dbx.users.getAll();
  console.log(`${addedUsers.length} utilisateurs ajoutés`);
};

/**
 * Ajoute les circuits touristiques de test
 */
const seedTours = async (): Promise<void> => {
  console.log("Ajout des circuits de test...");
  
  const tours: Omit<DBXTour, 'id'>[] = [
    {
      title: 'Circuit Allée des Baobabs',
      description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar.',
      location: 'Morondava',
      duration: '2 Jours',
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      featured: true,
      category: 'Nature',
      active: true,
    },
    {
      title: 'Randonnée Lémuriens à Andasibe',
      description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
      location: 'Andasibe',
      duration: '3 Jours',
      price: 349,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      featured: true,
      category: 'Faune',
      active: true,
    },
    {
      title: 'Aventure au Parc National de l\'Isalo',
      description: 'Découvrez les paysages époustouflants du Parc National de l\'Isalo avec ses canyons, cascades et piscines naturelles.',
      location: 'Isalo',
      duration: '4 Jours',
      price: 499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
      featured: true,
      category: 'Aventure',
      active: true,
    },
    {
      title: 'Paradis de l\'île de Nosy Be',
      description: 'Détendez-vous sur les magnifiques plages de Nosy Be, la principale destination balnéaire de Madagascar.',
      location: 'Nosy Be',
      duration: '5 Jours',
      price: 599,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
      featured: false,
      category: 'Plage',
      active: true,
    },
  ];
  
  for (const tour of tours) {
    dbx.tours.add(tour);
  }
  
  const addedTours = dbx.tours.getAll();
  console.log(`${addedTours.length} circuits ajoutés`);
};

/**
 * Ajoute les véhicules de test
 */
const seedVehicles = async (): Promise<void> => {
  console.log("Ajout des véhicules de test...");
  
  const vehicles: Omit<DBXVehicle, 'id'>[] = [
    {
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
  
  for (const vehicle of vehicles) {
    dbx.vehicles.add(vehicle);
  }
  
  const addedVehicles = dbx.vehicles.getAll();
  console.log(`${addedVehicles.length} véhicules ajoutés`);
};

/**
 * Ajoute les réservations de test
 */
const seedBookings = async (): Promise<void> => {
  console.log("Ajout des réservations de test...");
  
  const user = dbx.users.getByEmail('user@northgascartours.com');
  if (!user) {
    console.error("Impossible de trouver l'utilisateur pour les réservations");
    return;
  }
  
  const tours = dbx.tours.getAll();
  if (tours.length === 0) {
    console.error("Aucun circuit n'a été trouvé pour les réservations");
    return;
  }
  
  const bookings: Omit<DBXBooking, 'id' | 'createdAt'>[] = [
    {
      userId: user.id,
      tourId: tours[0].id,
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 jours plus tard
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 17 jours plus tard
      status: 'Confirmed',
      totalPrice: 299,
    },
  ];
  
  for (const booking of bookings) {
    dbx.bookings.add(booking);
  }
  
  const addedBookings = dbx.bookings.getAll();
  console.log(`${addedBookings.length} réservations ajoutées`);
};

/**
 * Ajoute les bannières de test
 */
const seedBanners = async (): Promise<void> => {
  console.log("Ajout des bannières de test...");
  
  const banners: Omit<DBXBanner, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Bannière Accueil',
      imagePath: 'https://images.unsplash.com/photo-1540541338287-41700207dee6',
      page: 'home',
      description: 'Bannière principale pour la page d\'accueil',
      isActive: true
    },
    {
      name: 'Bannière Tours',
      imagePath: 'https://images.unsplash.com/photo-1550236520-7050f3582da0',
      page: 'tours',
      description: 'Bannière pour la page des circuits',
      isActive: true
    },
    {
      name: 'Bannière Services',
      imagePath: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5',
      page: 'services',
      description: 'Bannière pour la page des services',
      isActive: true
    }
  ];
  
  for (const banner of banners) {
    dbx.banners.add(banner);
  }
  
  const addedBanners = dbx.banners.getAll();
  console.log(`${addedBanners.length} bannières ajoutées`);
};
