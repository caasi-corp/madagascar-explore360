
import { Database } from 'sql.js';
import { saveDatabase, sqliteHelper } from './sqlite';

// Check if database is empty
const isDatabaseEmpty = async (db: Database): Promise<boolean> => {
  const usersCount = sqliteHelper.queryAll(db, "SELECT COUNT(*) as count FROM users")[0].count;
  return usersCount === 0;
};

// Seed the database with initial data
export const seedDatabase = async (db: Database): Promise<boolean> => {
  console.log("Vérification si la base de données a besoin d'être initialisée...");
  
  try {
    const empty = await isDatabaseEmpty(db);
    
    if (empty) {
      console.log("Base de données vide, ajout des données initiales...");
      
      // Seed users (must succeed)
      if (!await seedUsers(db)) {
        throw new Error("Échec de l'ajout des utilisateurs");
      }
      
      // Seed other data (can fail without halting)
      await seedTours(db);
      await seedVehicles(db);
      await seedBookings(db);
      await seedBanners(db);
      
      // Save database after seeding
      await saveDatabase();
      
      return true;
    } else {
      console.log("Base de données déjà initialisée, pas besoin de l'alimenter");
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données:", error);
    return false;
  }
};

// Seed users
const seedUsers = async (db: Database): Promise<boolean> => {
  console.log("Ajout des utilisateurs...");
  
  const users = [
    {
      id: 'admin1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@northgascartours.com',
      password: 'Admin123!',
      role: 'admin'
    },
    {
      id: 'user1',
      firstName: 'Pierre',
      lastName: 'Martin',
      email: 'user@northgascartours.com',
      password: 'User123!',
      role: 'user'
    },
    {
      id: 'user2',
      firstName: 'Marie',
      lastName: 'Dubois',
      email: 'marie@example.com',
      password: 'password',
      role: 'user'
    }
  ];
  
  try {
    for (const user of users) {
      sqliteHelper.execute(
        db,
        `INSERT INTO users (id, firstName, lastName, email, password, role)
         VALUES ($id, $firstName, $lastName, $email, $password, $role)`,
        user
      );
    }
    console.log("Utilisateurs ajoutés avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout des utilisateurs:", error);
    return false;
  }
};

// Seed tours
const seedTours = async (db: Database): Promise<boolean> => {
  console.log("Ajout des circuits touristiques...");
  
  const tours = [
    {
      id: '1',
      title: 'Allée des Baobabs Tour',
      description: "Découvrez l'emblématique Allée des Baobabs, l'un des sites les plus célèbres de Madagascar.",
      location: 'Morondava',
      duration: '2 Jours',
      price: 299,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      featured: 1,
      category: 'Nature'
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
      featured: 1,
      category: 'Faune'
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
      featured: 1,
      category: 'Aventure'
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
      featured: 0,
      category: 'Plage'
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
      featured: 0,
      category: 'Faune'
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
      featured: 0,
      category: 'Aventure'
    }
  ];
  
  try {
    for (const tour of tours) {
      sqliteHelper.execute(
        db,
        `INSERT INTO tours (id, title, description, location, duration, price, rating, image, featured, category)
         VALUES ($id, $title, $description, $location, $duration, $price, $rating, $image, $featured, $category)`,
        tour
      );
    }
    console.log("Tours ajoutés avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout des tours:", error);
    return false;
  }
};

// Seed vehicles
const seedVehicles = async (db: Database): Promise<boolean> => {
  console.log("Ajout des véhicules...");
  
  const vehicles = [
    {
      id: 'v1',
      name: 'Toyota Land Cruiser',
      type: '4x4',
      pricePerDay: 89,
      seats: 7,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
      features: JSON.stringify(['Climatisation', 'GPS', 'Galerie de toit', '4x4', 'Bluetooth', 'Ports USB']),
      availability: 1
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
      features: JSON.stringify(['Casque inclus', 'Sacoches', 'Capacité tout-terrain', 'Économe en carburant']),
      availability: 1
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
      features: JSON.stringify(['Casque inclus', 'Coffre de rangement', 'Transmission 4x4', 'Garde au sol élevée']),
      availability: 1
    }
  ];
  
  try {
    for (const vehicle of vehicles) {
      sqliteHelper.execute(
        db,
        `INSERT INTO vehicles (id, name, type, pricePerDay, seats, transmission, fuelType, image, features, availability)
         VALUES ($id, $name, $type, $pricePerDay, $seats, $transmission, $fuelType, $image, $features, $availability)`,
        vehicle
      );
    }
    console.log("Véhicules ajoutés avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout des véhicules:", error);
    return false;
  }
};

// Seed bookings
const seedBookings = async (db: Database): Promise<boolean> => {
  console.log("Ajout des réservations...");
  
  const bookings = [
    {
      id: 'b1',
      userId: 'user1',
      tourId: '1',
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Confirmed',
      totalPrice: 299,
      createdAt: new Date().toISOString()
    }
  ];
  
  try {
    for (const booking of bookings) {
      sqliteHelper.execute(
        db,
        `INSERT INTO bookings (id, userId, tourId, startDate, endDate, status, totalPrice, createdAt)
         VALUES ($id, $userId, $tourId, $startDate, $endDate, $status, $totalPrice, $createdAt)`,
        booking
      );
    }
    console.log("Réservations ajoutées avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout des réservations:", error);
    return false;
  }
};

// Seed banners
const seedBanners = async (db: Database): Promise<boolean> => {
  console.log("Ajout des bannières...");
  
  const now = new Date().toISOString();
  const banners = [
    {
      id: 'banner-home-1',
      name: 'Bannière Accueil Principal',
      imagePath: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21',
      page: 'home',
      isActive: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'banner-tours-1',
      name: 'Bannière Circuits',
      imagePath: 'https://images.unsplash.com/photo-1518877593221-1f28583780b4',
      page: 'tours',
      isActive: 1,
      createdAt: now,
      updatedAt: now
    },
    {
      id: 'banner-vehicles-1',
      name: 'Bannière Véhicules',
      imagePath: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      page: 'vehicules',
      isActive: 1,
      createdAt: now,
      updatedAt: now
    }
  ];
  
  try {
    for (const banner of banners) {
      sqliteHelper.execute(
        db,
        `INSERT INTO banners (id, name, imagePath, page, isActive, createdAt, updatedAt)
         VALUES ($id, $name, $imagePath, $page, $isActive, $createdAt, $updatedAt)`,
        banner
      );
    }
    console.log("Bannières ajoutées avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors de l'ajout des bannières:", error);
    return false;
  }
};
