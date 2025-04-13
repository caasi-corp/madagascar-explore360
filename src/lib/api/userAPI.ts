
import { User } from '../db/schema';

/**
 * API for user operations
 */
export const userAPI = {
  getAll: async () => {
    return await window.electronAPI.userGetAll();
  },
  
  getById: async (id: string) => {
    return await window.electronAPI.userGetById(id);
  },
  
  getByEmail: async (email: string) => {
    console.log("Recherche d'utilisateur par email:", email);
    try {
      const user = await window.electronAPI.userGetByEmail(email);
      if (user) {
        console.log("Utilisateur trouvé:", user);
        return user;
      } else {
        console.log("Aucun utilisateur trouvé avec cet email");
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
      return null;
    }
  },
  
  authenticate: async (email: string, password: string) => {
    try {
      console.log(`Tentative d'authentification pour: ${email}`);
      const user = await window.electronAPI.userAuthenticate(email, password);
      
      if (!user) {
        console.log("Échec d'authentification: utilisateur non trouvé ou mot de passe incorrect");
        return null;
      }
      
      console.log("Authentification réussie pour:", email);
      return user;
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      return null;
    }
  },
  
  register: async (userData: Omit<User, 'id' | 'role'>) => {
    // Check if email already exists
    const existingUser = await userAPI.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    return await window.electronAPI.userRegister(userData);
  },
  
  update: async (id: string, userData: Partial<User>) => {
    return await window.electronAPI.userUpdate(id, userData);
  },
  
  delete: async (id: string) => {
    return await window.electronAPI.userDelete(id);
  },
};
