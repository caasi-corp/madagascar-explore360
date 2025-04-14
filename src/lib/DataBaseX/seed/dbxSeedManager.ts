
/**
 * Gestionnaire pour l'initialisation des données dans la base DBX
 */
import { Tour, Vehicle, User, Booking, Hotel, Flight } from '../../db/schema';
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
    },
    {
      id: '4',
      title: 'Exploration de la Montagne d\'Ambre',
      description: 'Explorez les forêts tropicales de la Montagne d\'Ambre, abritant une biodiversité exceptionnelle et des cascades impressionnantes.',
      location: 'Antsiranana',
      duration: '3 Jours',
      price: 399,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9',
      featured: false,
      category: 'Nature',
    },
    {
      id: '5',
      title: 'Canal des Pangalanes en Pirogue',
      description: 'Naviguez le long du canal des Pangalanes en pirogue traditionnelle et découvrez la vie quotidienne des villages côtiers.',
      location: 'Toamasina',
      duration: '2 Jours',
      price: 279,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1549630245-1c8882f186d9',
      featured: false,
      category: 'Culture',
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
    },
    {
      id: 'v3',
      name: 'Suzuki Jimny 4x4',
      type: '4x4',
      pricePerDay: 65,
      seats: 4,
      transmission: 'Manual',
      fuelType: 'Essence',
      image: 'https://images.unsplash.com/photo-1594818379496-da1e275992f8',
      features: ['Compact', 'Idéal pour terrains difficiles', 'Faible consommation'],
      availability: true
    },
    {
      id: 'v4',
      name: 'Quad Yamaha Grizzly',
      type: 'quad',
      pricePerDay: 55,
      seats: 1,
      transmission: 'Automatic',
      fuelType: 'Essence',
      image: 'https://images.unsplash.com/photo-1564846824194-9a2241623561',
      features: ['Casque inclus', 'Porte-bagages', 'Facile à conduire'],
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
    },
    {
      id: 'b2',
      userId: 'user2',
      tourId: '2',
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pending',
      totalPrice: 349,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'b3',
      userId: 'user2',
      vehicleId: 'v1',
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Confirmed',
      totalPrice: 340,
      createdAt: new Date().toISOString(),
    }
  ];
  
  dbxManager.writeDBX('bookings', bookings);
  console.log('Réservations ajoutées avec succès dans la base DBX');
};

// Fonction pour initialiser les données des hôtels
const seedHotels = (): void => {
  const hotels: Hotel[] = [
    {
      id: 'h1',
      name: 'Royal Palace Madagascar',
      location: 'Antananarivo',
      stars: 5,
      pricePerNight: 180,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      features: ['Piscine', 'Spa', 'Restaurant', 'WiFi', 'Parking', 'Salle de sport'],
      availability: true
    },
    {
      id: 'h2',
      name: 'Baobab Beach Resort',
      location: 'Morondava',
      stars: 4,
      pricePerNight: 120,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
      features: ['Vue sur mer', 'Accès plage', 'Restaurant', 'Bar', 'WiFi'],
      availability: true
    },
    {
      id: 'h3',
      name: 'Rainforest Lodge',
      location: 'Andasibe',
      stars: 3,
      pricePerNight: 75,
      image: 'https://images.unsplash.com/photo-1586375300773-8384e3e4916f',
      features: ['Vue sur forêt', 'Excursions nature', 'Restaurant bio', 'WiFi'],
      availability: true
    },
    {
      id: 'h4',
      name: 'Isalo Rock Lodge',
      location: 'Isalo',
      stars: 4,
      pricePerNight: 150,
      image: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a',
      features: ['Vue panoramique', 'Piscine', 'Restaurant', 'Bar', 'Spa'],
      availability: true
    },
    {
      id: 'h5',
      name: 'Vanilla Beach Hotel',
      location: 'Nosy Be',
      stars: 4,
      pricePerNight: 135,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9',
      features: ['Accès plage', 'Piscine', 'Sports nautiques', 'Restaurant', 'Bar'],
      availability: true
    }
  ];
  
  dbxManager.writeDBX('hotels', hotels);
  console.log('Hôtels ajoutés avec succès dans la base DBX');
};

// Fonction pour initialiser les données des vols
const seedFlights = (): void => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Format yyyy-mm-dd
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
  const flights: Flight[] = [
    {
      id: 'f1',
      departure: 'Paris',
      arrival: 'Antananarivo',
      departureDate: formatDate(tomorrow),
      departureTime: '10:30',
      arrivalTime: '22:45',
      airline: 'Air Madagascar',
      price: 850,
      availableSeats: 24
    },
    {
      id: 'f2',
      departure: 'Antananarivo',
      arrival: 'Nosy Be',
      departureDate: formatDate(tomorrow),
      departureTime: '08:15',
      arrivalTime: '09:45',
      airline: 'Tsaradia',
      price: 220,
      availableSeats: 36
    },
    {
      id: 'f3',
      departure: 'Antananarivo',
      arrival: 'Paris',
      departureDate: formatDate(new Date(today.setDate(today.getDate() + 7))),
      departureTime: '23:45',
      arrivalTime: '10:15',
      airline: 'Air France',
      price: 930,
      availableSeats: 18
    },
    {
      id: 'f4',
      departure: 'Antananarivo',
      arrival: 'Toliara',
      departureDate: formatDate(tomorrow),
      departureTime: '14:30',
      arrivalTime: '16:00',
      airline: 'Tsaradia',
      price: 180,
      availableSeats: 42
    },
    {
      id: 'f5',
      departure: 'Antananarivo',
      arrival: 'Morondava',
      departureDate: formatDate(new Date(today.setDate(today.getDate() + 2))),
      departureTime: '09:00',
      arrivalTime: '10:15',
      airline: 'Madagascar Trans Air',
      price: 165,
      availableSeats: 12
    }
  ];
  
  dbxManager.writeDBX('flights', flights);
  console.log('Vols ajoutés avec succès dans la base DBX');
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
    seedHotels();
    seedFlights();
    
    console.log('Initialisation des données DBX terminée avec succès');
  } else {
    console.log('Des données existent déjà dans la base DBX');
  }
};
