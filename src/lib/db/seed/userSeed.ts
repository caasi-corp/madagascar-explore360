
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, User } from '../schema';

/**
 * Seeds user data into the database
 * @param db The database connection
 * @returns Whether the seeding was successful
 */
export const seedUsers = async (db: IDBPDatabase<NorthGascarDB>): Promise<boolean> => {
  console.log("Création des utilisateurs de test...");
  
  try {
    const users: User[] = [
      {
        id: 'admin1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@northgascartours.com',
        password: 'Admin123!',
        role: 'admin',
      },
      {
        id: 'user1',
        firstName: 'Pierre',
        lastName: 'Martin',
        email: 'user@northgascartours.com',
        password: 'User123!',
        role: 'user',
      },
      {
        id: 'user2',
        firstName: 'Marie',
        lastName: 'Dubois',
        email: 'marie@example.com',
        password: 'password',
        role: 'user',
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
