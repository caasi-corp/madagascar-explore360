
import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, Tour, Vehicle, Booking } from '@/lib/db/schema';

// Extended user type that includes profile data
export interface UserWithProfile extends SupabaseUser {
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
}

// Function to map Supabase profile data to our frontend model
export const mapProfileToUser = (user: SupabaseUser, profile: any): UserWithProfile => {
  return {
    ...user,
    firstName: profile?.first_name || '',
    lastName: profile?.last_name || '',
    role: profile?.role || 'user',
    email: user.email || '', // Ensure email is always set, using empty string as fallback
  };
};

// Function to map Supabase booking data to our frontend Booking model
export const mapSupabaseBooking = (booking: any): Booking => {
  return {
    id: booking.id,
    userId: booking.user_id,
    tourId: booking.tour_id,
    vehicleId: booking.vehicle_id,
    hotelId: booking.hotel_id,
    flightId: booking.flight_id,
    startDate: booking.start_date,
    endDate: booking.end_date,
    status: booking.status,
    totalPrice: booking.total_price,
    createdAt: booking.created_at
  };
};

// Function to map Supabase vehicle data to our frontend Vehicle model
export const mapSupabaseVehicle = (vehicle: any): Vehicle => {
  return {
    id: vehicle.id,
    name: vehicle.name,
    type: vehicle.type,
    pricePerDay: vehicle.priceperday,
    seats: vehicle.seats,
    transmission: vehicle.transmission,
    fuelType: vehicle.fueltype,
    image: vehicle.image,
    features: vehicle.features,
    availability: vehicle.availability,
    description: vehicle.description,
    featured: vehicle.featured,
    images: vehicle.images,
  };
};
