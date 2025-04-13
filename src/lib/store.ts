
/**
 * Re-export all database models and APIs
 */
export * from './DatabaseX/types';
export { initDB, resetDB } from './DatabaseX/db';
export { tourAPI } from './api/tourAPI';
export { vehicleAPI } from './api/vehicleAPI';
export { userAPI } from './api/userAPI';
export { bookingAPI } from './api/bookingAPI';
export { bannerAPI } from './api/bannerAPI';

// Type aliases for backward compatibility with existing components
export type Tour = import('./DatabaseX/types').DBXTour;
export type Vehicle = import('./DatabaseX/types').DBXVehicle;
export type User = import('./DatabaseX/types').DBXUser;
export type Booking = import('./DatabaseX/types').DBXBooking;
export type Banner = import('./DatabaseX/types').DBXBanner;
