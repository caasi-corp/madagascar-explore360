
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthUser } from '@/types/auth';

/**
 * Service for handling authentication operations
 */
export const authService = {
  /**
   * Logs in a user with email and password
   */
  login: async (email: string, password: string): Promise<AuthUser | null> => {
    try {
      console.log("Tentative de connexion avec:", email);
      
      // Pour tous les utilisateurs, utiliser l'authentification Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Login error:", error.message);
        toast.error(error.message);
        return null;
      }
      
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error("Profile fetch error:", profileError.message);
          return null;
        }
          
        if (profileData) {
          return {
            id: profileData.id,
            email: profileData.email,
            role: profileData.role,
            firstName: profileData.first_name,
            lastName: profileData.last_name
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  },

  /**
   * Registers a new user with optional admin role
   */
  register: async (email: string, password: string, firstName: string, lastName: string, isAdmin: boolean = false): Promise<boolean> => {
    try {
      console.log("Tentative d'inscription avec:", email, "prénom:", firstName, "nom:", lastName, "admin:", isAdmin);
      
      // Vérifier si l'email existe déjà
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      if (existingUser) {
        console.log("Email déjà utilisé:", email);
        toast.error("Cette adresse email est déjà utilisée.");
        return false;
      }
      
      // Inscription de l'utilisateur
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            role: isAdmin ? 'admin' : 'user'
          }
        }
      });
      
      if (error) {
        console.error("Registration error:", error.message);
        if (error.message.includes('email') && error.message.includes('already')) {
          toast.error("Cette adresse email est déjà utilisée.");
        } else {
          toast.error(error.message);
        }
        return false;
      }

      // Si l'inscription est réussie, mettre à jour manuellement le rôle dans profiles si c'est un admin
      if (data.user && isAdmin) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error("Erreur lors de la définition du rôle admin:", updateError);
          // On continue car l'utilisateur est créé, mais sans le rôle admin
        }
      }

      console.log("Inscription réussie pour:", email, "avec le rôle:", isAdmin ? 'admin' : 'user');
      toast.success("Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      if (error instanceof Error) {
        toast.error("Erreur d'inscription: " + error.message);
      } else {
        toast.error("Une erreur est survenue lors de l'inscription");
      }
      return false;
    }
  },

  /**
   * Logs out the current user
   */
  logout: async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    }
  },

  /**
   * Fetches user profile data
   */
  fetchUserProfile: async (userId: string): Promise<AuthUser | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      if (data) {
        return {
          id: data.id,
          email: data.email,
          role: data.role,
          firstName: data.first_name,
          lastName: data.last_name
        };
      }
      
      return null;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },

  /**
   * Deletes all users (admin function)
   */
  deleteAllUsers: async (): Promise<boolean> => {
    try {
      // Délète tous les utilisateurs de profiles (cascade supprime aussi dans auth.users)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');  // Évite toute erreur avec une condition impossible
        
      if (error) {
        console.error("Error deleting users:", error);
        toast.error("Erreur lors de la suppression des utilisateurs");
        return false;
      }
      
      toast.success("Tous les utilisateurs ont été supprimés");
      return true;
    } catch (error) {
      console.error("Error deleting users:", error);
      toast.error("Erreur lors de la suppression des utilisateurs");
      return false;
    }
  }
};
