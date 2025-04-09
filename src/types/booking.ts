
// Define types for bookings and related data
export interface Booking {
  id: string;
  client: string;
  tour: string;
  date: string;
  participants: number;
  status: string;
  paymentStatus?: string;
  contactEmail?: string;
  contactPhone?: string;
  notes?: string;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type BookingsByDate = Record<string, Booking[]>;

export type AvailabilityStatus = 'available' | 'partial' | 'full' | 'unavailable';

export interface BookingCalendarState {
  bookings: Booking[];
  bookingsByDate: BookingsByDate;
  isLoading: boolean;
  error: Error | null;
  isSyncing: boolean;
  isConfigured: boolean;
}
