
/**
 * Gestionnaire pour l'initialisation des données dans la base DBX
 */
import { Tour, Vehicle, User, Booking } from '../../db/schema';
import { dbxManager } from '../DBXManager';

// Fonction pour initialiser les données utilisateur
const seedUsers = (): void => {
  const users: User[] = [
    {
      id: 'user1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@northgascartours.com',
      password: 'adminSecretPass',
      role: 'admin'
    },
    {
      id: 'user2',
      firstName: 'John',
      lastName: 'Doe',
      email: 'user@northgascartours.com',
      password: 'userPass123',
      role: 'user'
    }
  ];
  
  dbxManager.writeDBX('users', users);
  console.log('Utilisateurs ajoutés avec succès dans la base DBX');
};

// Fonction pour initialiser les données de tours
const seedTours = (): void => {
  // Reprendre les données de toursData.ts
  const tours: Tour[] = [
    {
      id: '1',
      title: 'Circuit Allée des Baobabs',
      description: 'Découvrez l\'emblématique Allée des Baobabs, l\'un des sites les plus célèbres de Madagascar.',
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
      title: 'Randonnée Lémuriens à Andasibe',
      description: 'Randonnez à travers le Parc National d\'Andasibe et rencontrez différentes espèces de lémuriens dans leur habitat naturel.',
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
      title: 'Aventure au Parc National de l\'Isalo',
      description: 'Découvrez les paysages époustouflants du Parc National de l\'Isalo avec ses canyons, cascades et piscines naturelles.',
      location: 'Isalo',
      duration: '4 Jours',
      price: 499,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
      featured: true,
      category: 'Aventure',
    }
  ];
  
  dbxManager.writeDBX('tours', tours);
  console.log('Tours ajoutés avec succès dans la base DBX');
};

// Fonction pour initialiser les données de véhicules
const seedVehicles = (): void => {
  const vehicles: Vehicle[] = [
    {
      id: 'v1',
      name: '4x4 Toyota Land Cruiser',
      type: '4x4',
      pricePerDay: 85,
      seats: 5,
      transmission: 'Manual',
      fuelType: 'Diesel',
      image: 'https://images.unsplash.com/photo-1594661498378-364aee0bded1',
      features: ['Climatisation', 'GPS', 'Toit ouvrant'],
      availability: true
    },
    {
      id: 'v2',
      name: 'Moto KTM Adventure',
      type: 'motorcycle',
      pricePerDay: 45,
      seats: 2,
      transmission: 'Manual',
      fuelType: 'Essence',
      image: 'https://images.unsplash.com/photo-1558981285-6f0c94958bb6',
      features: ['Casques inclus', 'Sacoches', 'Assurance tout-risque'],
      availability: true
    }
  ];
  
  dbxManager.writeDBX('vehicles', vehicles);
  console.log('Véhicules ajoutés avec succès dans la base DBX');
};

// Fonction pour initialiser les données de réservation
const seedBookings = (): void => {
  const bookings: Booking[] = [
    {
      id: 'b1',
      userId: 'user1',
      tourId: '1',
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 jours à partir de maintenant
      endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 17 jours à partir de maintenant
      status: 'Confirmed',
      totalPrice: 299,
      createdAt: new Date().toISOString(),
    }
  ];
  
  dbxManager.writeDBX('bookings', bookings);
  console.log('Réservations ajoutées avec succès dans la base DBX');
};

// Fonction principale d'initialisation
export const initializeDBXData = (): void => {
  console.log('Initialisation des données DBX...');
  
  // Vérifier si les données existent déjà
  const users = dbxManager.readDBX<User>('users');
  
  if (users.length === 0) {
    console.log('Aucune donnée trouvée, initialisation des données...');
    
    seedUsers();
    seedTours();
    seedVehicles();
    seedBookings();
    
    console.log('Initialisation des données DBX terminée avec succès');
  } else {
    console.log('Des données existent déjà dans la base DBX');
  }
};
