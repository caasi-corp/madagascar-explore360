
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/lib/db/schema';
import { userAPI } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => Promise<void>;
  register: (userData: { email: string, password: string, first_name: string, last_name: string }) => Promise<User | null>;
  signIn: (email: string, password: string) => Promise<User | null>; // Alias for login
  signUp: (email: string, password: string, first_name: string, last_name: string) => Promise<User | null>; // Alias for register
  signOut: () => Promise<void>; // Alias for logout
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          setLoading(false);
          return;
        }
        
        if (data.session) {
          // Session exists, fetch user profile
          const profile = await userAPI.getCurrent();
          setUser(profile);
        }
      } catch (error) {
        console.error("Error in auth check:", error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (session) {
          try {
            // Use setTimeout to avoid potential recursive issues with Supabase
            setTimeout(async () => {
              try {
                const profile = await userAPI.getCurrent();
                setUser(profile);
              } catch (error) {
                console.error("Error fetching user profile on auth change:", error);
                setUser(null);
              }
            }, 0);
          } catch (error) {
            console.error("Error in auth state change handler:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    );

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Error signing in:", error.message);
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive"
        });
        return null;
      }

      if (data.user) {
        const profile = await userAPI.getCurrent();
        setUser(profile);
        return profile;
      }

      return null;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error.message);
        return;
      }
      
      setUser(null);
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const register = async (userData: { email: string, password: string, first_name: string, last_name: string }): Promise<User | null> => {
    try {
      // Register the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name
          }
        }
      });

      if (authError) {
        console.error("Error registering:", authError.message);
        toast({
          title: "Erreur d'inscription",
          description: authError.message,
          variant: "destructive"
        });
        return null;
      }

      if (authData.user) {
        // Wait a moment for the database trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the newly created profile
        const profile = await userAPI.getCurrent();
        setUser(profile);
        return profile;
      }

      return null;
    } catch (error) {
      console.error("Registration error:", error);
      return null;
    }
  };

  // Add aliases for consistent naming
  const signIn = login;
  const signUp = (email: string, password: string, first_name: string, last_name: string) => {
    return register({ email, password, first_name, last_name });
  };
  const signOut = logout;

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
