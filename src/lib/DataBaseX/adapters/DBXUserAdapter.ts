
/**
 * Adaptateur pour les opérations sur les utilisateurs avec DBX
 */
import { User } from '../../db/schema';
import { dbxManager } from '../DBXManager';

export const DBXUserAdapter = {
  getAll: (): User[] => {
    return dbxManager.readDBX<User>('users');
  },
  
  getById: (id: string): User | undefined => {
    const users = dbxManager.readDBX<User>('users');
    return users.find(user => user.id === id);
  },
  
  getByEmail: (email: string): User | null => {
    const users = dbxManager.readDBX<User>('users');
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  },
  
  authenticate: (email: string, password: string): { id: string; email: string; role: string } | null => {
    const user = DBXUserAdapter.getByEmail(email);
    
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
  },
  
  register: (userData: Omit<User, 'id' | 'role'>): { id: string; email: string; role: string } => {
    // Vérifier si l'email existe déjà
    const existingUser = DBXUserAdapter.getByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    const id = crypto.randomUUID();
    const newUser = { ...userData, id, role: 'user' as const };
    dbxManager.updateItem<User>('users', newUser);
    
    return { id: newUser.id, email: newUser.email, role: newUser.role };
  },
  
  update: (id: string, userData: Partial<User>): { id: string; email: string; role: string } => {
    const users = dbxManager.readDBX<User>('users');
    const existingUser = users.find(u => u.id === id);
    
    if (!existingUser) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...existingUser, ...userData };
    dbxManager.updateItem<User>('users', updatedUser);
    
    return { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
  },
  
  delete: (id: string): boolean => {
    return dbxManager.deleteItem<User>('users', id);
  }
};
