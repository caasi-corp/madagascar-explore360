
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
    return db.getFromIndex('users', 'by-email', email);
  },
  
  authenticate: async (email: string, password: string) => {
    const user = await userAPI.getByEmail(email);
    if (user && user.password === password) { // In a real app, use proper password comparison
      return { id: user.id, email: user.email, role: user.role };
    }
    return null;
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
