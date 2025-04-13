
/**
 * Re-export all database models and APIs
 */
export * from './db/schema';
export { tourSupabaseAPI as tourAPI } from './api/supabase/tourAPI';
export { vehicleSupabaseAPI as vehicleAPI } from './api/supabase/vehicleAPI';
export { bannerSupabaseAPI as bannerAPI } from './api/supabase/bannerAPI';

// Old local APIs are still available if needed
export { initDB, resetDB } from './db/db';
export { userAPI } from './api/userAPI';
export { bookingAPI } from './api/bookingAPI';
