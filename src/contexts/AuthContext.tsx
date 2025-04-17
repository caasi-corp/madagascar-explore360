
import React, { createContext, useContext } from 'react';
import { AuthUser } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';

// Defining the shape of the context
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser | null>;
  register: (email: string, password: string, firstName: string, lastName: string, isAdmin?: boolean) => Promise<boolean>;
  logout: () => Promise<void>;
  deleteAllUsers?: () => Promise<boolean>; // New function to delete all users
}

// Creating context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => null,
  register: async () => false,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
