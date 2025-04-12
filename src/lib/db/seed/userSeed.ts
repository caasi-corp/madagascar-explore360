
import { IDBPDatabase } from 'idb';
import { NorthGascarDB, User } from '../schema';

/**
 * Seeds user data into the database
 * @param db The database connection
 * @returns Whether the seeding was successful
 */
export const seedUsers = async (db: IDBPDatabase<NorthGascarDB>): Promise<boolean> => {
  console.log("Vérification des utilisateurs de test...");
  
  try {
    // Vérifier si des utilisateurs existent déjà
    const existingUsers = await db.getAll('users');
    if (existingUsers.length > 0) {
      console.log(`${existingUsers.length} utilisateurs existent déjà dans la base de données`);
      return true; // Pas besoin d'ajouter des utilisateurs s'ils existent déjà
    }
    
    // Si aucun utilisateur n'existe, alors ajouter les utilisateurs par défaut
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
    
    // Utiliser une seule transaction pour ajouter les utilisateurs
    console.log("Ajout des utilisateurs...");
    const tx = db.transaction('users', 'readwrite');
    const userStore = tx.objectStore('users');
    
    for (const user of users) {
      await userStore.add(user);
      console.log(`Utilisateur ajouté: ${user.email}`);
    }
    
    await tx.done;
    console.log("Transaction utilisateurs terminée avec succès");
    
    // Vérifier que les utilisateurs ont été ajoutés
    const addedUsers = await db.getAll('users');
    console.log(`${addedUsers.length} utilisateurs ajoutés:`, JSON.stringify(addedUsers));
    return true;
  } catch (e) {
    console.error("Erreur lors de l'ajout des utilisateurs:", e);
    // Ne pas relancer l'erreur, car ce n'est pas critique si les utilisateurs existent déjà
    return false;
  }
};
