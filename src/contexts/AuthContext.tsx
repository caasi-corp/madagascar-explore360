
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuthUser {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<AuthUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
        return null;
      }

      toast.success("Inscription réussie! Veuillez vérifier votre email pour confirmer votre compte.");
      return user;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      return null;
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

  const value = {
    user,
    session,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
}
