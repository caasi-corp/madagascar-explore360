
/**
 * API pour les opérations sur les utilisateurs
 */
import { dbx } from '../DatabaseX/db';

export const userAPI = {
  getAll: async () => {
    try {
      return dbx.users.getAll();
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return [];
    }
  },
  
  getById: async (id: string) => {
    try {
      return dbx.users.getById(id);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur ${id}:`, error);
      return null;
    }
  },
  
  getByEmail: async (email: string) => {
    try {
      return dbx.users.getByEmail(email);
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'utilisateur avec l'email ${email}:`, error);
      return null;
    }
  },
  
  authenticate: async (email: string, password: string) => {
    try {
      console.log(`Tentative d'authentification pour: ${email}`);
      const user = await userAPI.getByEmail(email);
      
      if (!user) {
        console.log("Échec d'authentification: utilisateur non trouvé");
        return null;
      }
      
      if (user.password === password) {
        console.log("Authentification réussie pour:", email);
        return { id: user.id, email: user.email, role: user.role };
      }
      
      console.log("Échec d'authentification: mot de passe incorrect");
      return null;
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      return null;
    }
  },
  
  register: async (userData: any) => {
    try {
      // Vérifier si l'email existe déjà
      const existingUser = await userAPI.getByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      const newUser = dbx.users.add({ ...userData, role: 'user' });
      return { id: newUser.id, email: newUser.email, role: newUser.role };
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
      throw error;
    }
  },
  
  update: async (id: string, userData: any) => {
    try {
      const updatedUser = dbx.users.update(id, userData);
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'utilisateur ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id: string) => {
    try {
      return dbx.users.delete(id);
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'utilisateur ${id}:`, error);
      throw error;
    }
  },
};
