
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
   * Registers a new user
   */
  register: async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      console.log("Tentative d'inscription avec:", email, "prénom:", firstName, "nom:", lastName);
      
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
            last_name: lastName
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

      console.log("Inscription réussie pour:", email);
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
  }
};
