
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
    // Configure les écouteurs d'événements d'authentification d'abord
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Utilise setTimeout pour éviter les appels récursifs
          setTimeout(async () => {
            try {
              // Récupère le profil utilisateur
              const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentSession.user.id)
                .single();
              
              if (error) {
                console.error('Erreur lors de la récupération du profil:', error);
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
              console.error("Erreur lors de la récupération du profil:", error);
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );
    
    // Vérifie la session existante
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
        console.error("Erreur lors de l'initialisation de l'authentification:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Erreur lors de la connexion:", error.message);
        toast.error(error.message);
        return null;
      }
      
      return user;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return null;
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
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
        console.error("Erreur lors de l'inscription:", error.message);
        toast.error(error.message);
        return false;
      }

      toast.success("Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.");
      return true;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Déconnexion réussie");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast.error("Erreur lors de la déconnexion");
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
