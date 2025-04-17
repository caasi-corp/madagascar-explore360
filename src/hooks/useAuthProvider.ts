
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthUser } from '@/types/auth';

export function useAuthProvider() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching profile:', error);
              return;
            }
            
            if (data) {
              setUser({
                id: data.id,
                email: data.email,
                role: data.role,
                firstName: data.first_name,
                lastName: data.last_name
              });
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        } else {
          setUser(null);
        }
      }
    );
    
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', initialSession.user.id)
            .single();
            
          if (data) {
            setUser({
              id: data.id,
              email: data.email,
              role: data.role,
              firstName: data.first_name,
              lastName: data.last_name
            });
          }
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fonction pour vérifier et créer le compte administrateur si nécessaire
  const ensureAdminExists = async () => {
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
  };

  // Appel initial pour vérifier/créer le compte administrateur
  useEffect(() => {
    ensureAdminExists();
  }, []);

  const login = async (email: string, password: string) => {
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
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      if (existingUser) {
        toast.error("Cette adresse email est déjà utilisée.");
        return false;
      }
      
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

      toast.success("Inscription réussie ! Veuillez vérifier votre email pour confirmer votre compte.");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast.success("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error during logout");
    }
  };

  return {
    user,
    session,
    isLoading,
    login,
    register,
    logout
  };
}
