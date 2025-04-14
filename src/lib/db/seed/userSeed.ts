
import { IDBPDatabase } from 'idb';
import { User } from '../schema';

/**
 * Seeds user data into the database
 * @param db The database connection
 * @returns Whether the seeding was successful
 */
export const seedUsers = async (db: any): Promise<boolean> => {
  console.log("Création des utilisateurs de test...");
  
  try {
    const users: User[] = [
      {
        id: 'admin1',
        first_name: 'Admin',
        last_name: 'User',
        email: 'admin@northgascartours.com',
        role: 'admin',
        created_at: new Date().toISOString()
      },
      {
        id: 'user1',
        first_name: 'Pierre',
        last_name: 'Martin',
        email: 'user@northgascartours.com',
        role: 'user',
        created_at: new Date().toISOString()
      },
      {
        id: 'user2',
        first_name: 'Marie',
        last_name: 'Dubois',
        email: 'marie@example.com',
        role: 'user',
        created_at: new Date().toISOString()
      }
    ];
    
    // Use a single transaction for users
    console.log("Ajout des utilisateurs...");
    const tx = db.transaction('users', 'readwrite');
    const userStore = tx.objectStore('users');
    
    for (const user of users) {
      await userStore.add(user);
      console.log(`Utilisateur ajouté: ${user.email}`);
    }
    
    await tx.done;
    console.log("Transaction utilisateurs terminée avec succès");
    
    // Verify users were added
    const addedUsers = await db.getAll('users');
    console.log(`${addedUsers.length} utilisateurs ajoutés:`, JSON.stringify(addedUsers));
    return true;
  } catch (e) {
    console.error("Erreur critique lors de l'ajout des utilisateurs:", e);
    throw e; // This is critical, so we rethrow
  }
};
