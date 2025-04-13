
import React, { createContext, useState, useEffect, useContext } from 'react';
import { userAPI } from '@/lib/api/userAPI';

interface AuthUser {
  id: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  logout: () => void;
}

// Créer le contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => null,
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'état de la session au chargement
    const checkAuthStatus = async () => {
      try {
        setIsLoading(true);
        const userId = localStorage.getItem('userId');
        const userRole = localStorage.getItem('userRole');
        
        if (userId && userRole) {
          const userData = await userAPI.getById(userId);
          if (userData) {
            setUser({
              id: userData.id,
              email: userData.email,
              role: userData.role,
              firstName: userData.firstName,
              lastName: userData.lastName
            });
          } else {
            // Si l'utilisateur n'existe pas, nettoyer le localStorage
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'état d'authentification:", error);
        // En cas d'erreur, nettoyer le localStorage par sécurité
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email, password);
      const user = await userAPI.authenticate(email, password);
      
      if (user) {
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userRole', user.role);
        
        // Récupérer les détails supplémentaires de l'utilisateur
        const userData = await userAPI.getById(user.id);
        const authUser = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: userData?.firstName,
          lastName: userData?.lastName
        };
        
        setUser(authUser);
        return authUser;
      }
      return null;
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
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
