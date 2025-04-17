
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Service responsible for admin account management
 */
export const adminService = {
  /**
   * Ensures that an admin account exists in the database
   */
  ensureAdminExists: async () => {
    try {
      // Vérifier si l'administrateur existe déjà
      const { data: existingAdmin } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', 'admin@northgascartours.com')
        .maybeSingle();
      
      if (!existingAdmin) {
        console.log("L'administrateur n'existe pas, création du compte admin...");
        
        // Créer le compte administrateur dans Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: 'admin@northgascartours.com',
          password: 'Admin123!',
        });
        
        if (authError) {
          console.error("Erreur lors de la création du compte auth admin:", authError);
          return;
        }
        
        if (authData.user) {
          // Insérer le profil administrateur
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: 'admin@northgascartours.com',
              role: 'admin',
              first_name: 'Admin',
              last_name: 'User'
            });
          
          if (profileError) {
            console.error("Erreur lors de la création du profil admin:", profileError);
          } else {
            console.log("Compte administrateur créé avec succès!");
          }
        }
      } else {
        console.log("Le compte administrateur existe déjà dans la base de données");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification/création du compte admin:", error);
    }
  }
};
