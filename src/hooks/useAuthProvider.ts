
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
    // Set up authentication state change listeners
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (currentSession?.user) {
          try {
            // Get user profile
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
    
    // Check for existing session
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

  const login = async (email: string, password: string) => {
    try {
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
        // If login successful, return user object directly without waiting for state update
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
        toast.error(error.message);
        return false;
      }

      toast.success("Registration successful! Please check your email to confirm your account.");
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
