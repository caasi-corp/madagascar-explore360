
// Types pour les entités principales
export interface Tour {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  category: string | null;
  featured: boolean | null;
  active: boolean | null;
  created_at: string | null;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string;
  description: string | null;
  seats: number;
  transmission: string;
  fueltype: string;
  priceperday: number;
  image: string;
  images: string[] | null;
  features: string[];
  featured: boolean | null;
  availability: boolean | null;
  created_at: string | null;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  created_at: string | null;
}

export interface Booking {
  id: string;
  user_id: string;
  tour_id: string | null;
  vehicle_id: string | null;
  hotel_id: string | null;
  flight_id: string | null;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string | null;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  price_per_night: number;
  features: string[];
  image: string;
  availability: boolean | null;
  created_at: string | null;
}

export interface Flight {
  id: string;
  airline: string;
  departure: string;
  arrival: string;
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  price: number;
  available_seats: number;
  created_at: string | null;
}

export interface Banner {
  id: string;
  name: string;
  image_path: string;
  page: string;
  description: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}
