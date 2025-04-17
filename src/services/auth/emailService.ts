
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
      
      // Vérifier d'abord dans les utilisateurs Supabase
      const { data: authData, error: authError } = await supabase.auth
        .admin
        .listUsers({
          filter: { email }
        });
      
      if (authError) {
        console.error("Erreur lors de la vérification dans auth:", authError);
        
        // Fallback: vérifier dans la table profiles si l'API admin n'est pas disponible
        const { data, error } = await supabase
          .from('profiles')
          .select('email')
          .eq('email', email)
          .maybeSingle();
        
        if (error) {
          console.error("Erreur lors de la vérification de l'email dans profiles:", error);
          return null;
        }
        
        return data !== null;
      }
      
      // Si nous avons trouvé des utilisateurs avec cet email dans auth
      return authData && authData.users && authData.users.length > 0;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      return null;
    }
  }
};
