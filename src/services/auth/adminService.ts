
import { supabase } from '@/integrations/supabase/client';

/**
 * Service responsible for admin account management
 * Note: No longer creates an admin automatically
 */
export const adminService = {
  /**
   * Ensures that the admin table exists but doesn't create a default admin
   */
  ensureAdminExists: async () => {
    // Cette fonction ne crée plus d'administrateur automatiquement
    // Elle existe pour la compatibilité avec le code existant
    console.log("La création automatique d'administrateur est désactivée");
  }
};
