
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
      
      // Vérifier dans la table profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
      
      if (error) {
        console.error("Erreur lors de la vérification de l'email dans profiles:", error);
        return null;
      }
      
      // Si l'email existe dans la table profiles
      if (data !== null) {
        return true;
      }
      
      // Si l'email n'existe pas dans la table profiles, on renvoie false
      return false;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return null;
    }
  }
};
