
import { getDB, saveDatabase, sqliteHelper } from '../db/sqlite';
import { User } from '../db/schema';

/**
 * API for user operations
 */
export const userAPI = {
  getAll: async () => {
    const db = await getDB();
    const users = sqliteHelper.queryAll(db, "SELECT * FROM users");
    return users as User[];
  },
  
  getById: async (id: string) => {
    const db = await getDB();
    const user = sqliteHelper.queryOne(db, "SELECT * FROM users WHERE id = $id", { $id: id });
    return user as User | null;
  },
  
  getByEmail: async (email: string) => {
    const db = await getDB();
    console.log("Recherche d'utilisateur par email:", email);
    
    try {
      const user = sqliteHelper.queryOne(
        db, 
        "SELECT * FROM users WHERE LOWER(email) = LOWER($email)", 
        { $email: email }
      );
      
      if (user) {
        console.log("Utilisateur trouvé:", user);
        return user as User;
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
    
    sqliteHelper.execute(
      db,
      `INSERT INTO users (id, firstName, lastName, email, password, role)
       VALUES ($id, $firstName, $lastName, $email, $password, $role)`,
      {
        $id: id,
        $firstName: userData.firstName,
        $lastName: userData.lastName,
        $email: userData.email,
        $password: userData.password,
        $role: 'user'
      }
    );
    
    await saveDatabase();
    
    return { id, email: userData.email, role: 'user' as const };
  },
  
  update: async (id: string, userData: Partial<User>) => {
    const db = await getDB();
    const existingUser = await userAPI.getById(id);
    
    if (!existingUser) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...existingUser, ...userData };
    
    sqliteHelper.execute(
      db,
      `UPDATE users SET 
        firstName = $firstName, 
        lastName = $lastName, 
        email = $email, 
        password = $password, 
        role = $role
       WHERE id = $id`,
      {
        $id: id,
        $firstName: updatedUser.firstName,
        $lastName: updatedUser.lastName,
        $email: updatedUser.email,
        $password: updatedUser.password,
        $role: updatedUser.role
      }
    );
    
    await saveDatabase();
    
    return { id: updatedUser.id, email: updatedUser.email, role: updatedUser.role };
  },
  
  delete: async (id: string) => {
    const db = await getDB();
    sqliteHelper.execute(db, "DELETE FROM users WHERE id = $id", { $id: id });
    await saveDatabase();
  },
};
