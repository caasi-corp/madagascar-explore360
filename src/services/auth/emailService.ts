
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for handling email-related operations
 */
export const emailService = {
  /**
   * Checks if an email already exists in the profiles table
   */
  checkEmailExists: async (email: string) => {
    try {
      console.log("Vérification de l'existence de l'email:", email);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (error) {
        console.error("Erreur lors de la vérification de l'email:", error);
        return null;
      }
      
      return data !== null;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return null;
    }
  }
};
