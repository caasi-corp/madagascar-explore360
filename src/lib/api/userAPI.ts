
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
    console.log("Recherche d'utilisateur par email:", email);
    
    try {
      // Récupérer tous les utilisateurs pour la vérification
      const allUsers = await db.getAll('users');
      console.log("Tous les utilisateurs dans la base:", JSON.stringify(allUsers));
      
      // Recherche directe en mémoire plutôt que par l'index qui semble poser problème
      const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
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
      console.log(`Tentative d'authentification pour: ${email} avec mot de passe: ${password}`);
      const user = await userAPI.getByEmail(email);
      
      if (!user) {
        console.log("Échec d'authentification: utilisateur non trouvé");
        return null;
      }
      
      console.log(`Vérification du mot de passe pour ${email}`);
      console.log(`Mot de passe fourni: ${password}`);
      console.log(`Mot de passe stocké: ${user.password}`);
      
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
