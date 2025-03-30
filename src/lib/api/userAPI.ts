
import { getDB } from '../db/db';
import { User } from '../db/schema';

/**
 * API for user operations
 */
export const userAPI = {
  getAll: async () => {
    const db = await getDB();
    return db.getAll('users');
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    return db.get('users', id);
  },
  
  getByEmail: async (email: string) => {
    const db = await getDB();
    try {
      // Console log pour debug
      console.log("Recherche d'utilisateur par email:", email);
      const allUsers = await db.getAll('users');
      console.log("Tous les utilisateurs:", allUsers);
      
      const user = await db.getFromIndex('users', 'by-email', email);
      console.log("Utilisateur trouvé par email:", user);
      return user;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur par email:", error);
      // Méthode alternative de recherche si l'index ne fonctionne pas correctement
      const allUsers = await db.getAll('users');
      return allUsers.find(user => user.email === email);
    }
  },
  
  authenticate: async (email: string, password: string) => {
    try {
      console.log("Tentative d'authentification pour:", email);
      const user = await userAPI.getByEmail(email);
      console.log("Utilisateur récupéré:", user);
      
      if (user && user.password === password) {
        console.log("Authentification réussie");
        return { id: user.id, email: user.email, role: user.role };
      }
      console.log("Échec d'authentification: mot de passe incorrect ou utilisateur non trouvé");
      return null;
    } catch (error) {
      console.error("Erreur lors de l'authentification:", error);
      return null;
    }
  },
  
  register: async (userData: Omit<User, 'id' | 'role'>) => {
    const db = await getDB();
    // Check if email already exists
    const existingUser = await userAPI.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    const id = crypto.randomUUID();
    const newUser = { ...userData, id, role: 'user' as const };
    await db.put('users', newUser);
    return { id: newUser.id, email: newUser.email, role: newUser.role };
  },
  
  update: async (id: string, userData: Partial<User>) => {
    const db = await getDB();
    const existingUser = await db.get('users', id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    const updatedUser = { ...existingUser, ...userData };
    await db.put('users', updatedUser);
    return { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    await db.delete('users', id);
  },
};
