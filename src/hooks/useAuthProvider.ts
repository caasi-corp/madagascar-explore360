
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/auth';
import { authService } from '@/services/auth/authService';
import { adminService } from '@/services/auth/adminService';

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
          const userData = await authService.fetchUserProfile(currentSession.user.id);
          if (userData) {
            setUser(userData);
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
          const userData = await authService.fetchUserProfile(initialSession.user.id);
          if (userData) {
            setUser(userData);
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

  // Appel initial pour vérifier si les tables nécessaires existent
  useEffect(() => {
    adminService.ensureAdminExists();
  }, []);

  return {
    user,
    session,
    isLoading,
    login: authService.login,
    register: authService.register,
    logout: async () => {
      await authService.logout();
      setUser(null);
    },
    deleteAllUsers: authService.deleteAllUsers
  };
}
