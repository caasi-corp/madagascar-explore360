
/**
 * Définitions des types pour la base de données DatabaseX
 */

// Types de base de données
export type DBXTour = {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured?: boolean;
  category?: string;
  active?: boolean;
};

export type DBXVehicle = {
  id: string;
  name: string;
  type: 'car' | '4x4' | 'motorcycle' | 'quad';
  pricePerDay: number;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: string;
  image: string;
  features: string[];
  availability: boolean;
  description?: string;
  featured?: boolean;
  images?: string[];
};

export type DBXUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type DBXBooking = {
  id: string;
  userId: string;
  tourId?: string;
  vehicleId?: string;
  hotelId?: string;
  flightId?: string;
  startDate: string;
  endDate: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalPrice: number;
  createdAt: string;
};

export type DBXBanner = {
  id: string;
  name: string;
  imagePath: string;
  page: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
