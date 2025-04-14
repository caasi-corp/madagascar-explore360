
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { toast } from "sonner";
import { UserWithProfile, mapProfileToUser } from '@/types/supabase';

interface AuthContextType {
  session: Session | null;
  user: UserWithProfile | null;
  profile: any | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer la session et l'utilisateur au chargement
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Vérifier si une session existe déjà
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session?.user) {
        // Récupérer le profil de l'utilisateur si connecté
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setProfile(profile);
        setUser(mapProfileToUser(session.user, profile));
      } else {
        setUser(null);
      }
      
      // Mettre en place l'écouteur d'événements d'authentification
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setSession(session);
          
          if (session?.user) {
            // Ne pas appeler directement les fonctions de Supabase dans le callback
            // Utiliser setTimeout pour éviter les deadlocks
            setTimeout(async () => {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              setProfile(profile);
              setUser(mapProfileToUser(session.user, profile));
            }, 0);
          } else {
            setProfile(null);
            setUser(null);
          }
        }
      );
      
      setIsLoading(false);
      
      // Nettoyer l'écouteur lors du démontage
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);

  // Connexion avec email et mot de passe
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error: any) {
      console.error('Erreur de connexion:', error.message);
      throw error;
    }
  };

  // Inscription avec email et mot de passe
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error: any) {
      console.error("Erreur d'inscription:", error.message);
      throw error;
    }
  };

  // Déconnexion
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Erreur de déconnexion:', error.message);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  // Mise à jour du profil
  const updateProfile = async (profileData: any) => {
    try {
      if (!user) throw new Error('Aucun utilisateur connecté');
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Erreur de mise à jour du profil:', error.message);
      throw error;
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return context;
};
