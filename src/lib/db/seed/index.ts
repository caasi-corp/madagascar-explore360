
import { SQLiteDatabase } from '../types';
import { sqliteHelper } from '../helpers';

/**
 * Check if database is empty
 */
const isDatabaseEmpty = (db: SQLiteDatabase): boolean => {
  try {
    const result = sqliteHelper.queryAll(db, "SELECT COUNT(*) as count FROM users");
    if (result && result.length > 0) {
      return result[0].count === 0;
    }
    return true; // If there's an error, assume it's empty
  } catch (error) {
    console.error("Erreur lors de la vérification de la base de données:", error);
    return true; // Assume empty on error
  }
};

/**
 * Seeds the SQLite database with initial data
 * @param db The database to seed
 * @param force Force seeding even if the database already has data
 * @returns Whether seeding was successful
 */
export const seedSQLiteDatabase = async (
  db: SQLiteDatabase,
  force: boolean = false
): Promise<boolean> => {
  console.log("Vérification si la base de données SQLite a besoin d'être initialisée...");
  
  try {
    const empty = isDatabaseEmpty(db);
    
    if (empty || force) {
      console.log("Base de données SQLite vide ou forçage de l'initialisation, ajout des données initiales...");
      
      // Add users
      try {
        const usersData = [
          ['admin1', 'Admin', 'User', 'admin@northgascartours.com', 'Admin123!', 'admin'],
          ['user1', 'Pierre', 'Martin', 'user@northgascartours.com', 'User123!', 'user'],
          ['user2', 'Marie', 'Dubois', 'marie@example.com', 'password', 'user']
        ];
        
        // First clear any existing users if we're forcing a reset
        if (force) {
          try {
            sqliteHelper.execute(db, "DELETE FROM users");
            console.log("Table des utilisateurs vidée pour réinitialisation");
          } catch (e) {
            console.log("Aucune table utilisateurs à vider");
          }
        }
        
        for (const userData of usersData) {
          sqliteHelper.execute(db, `
            INSERT OR REPLACE INTO users (id, firstName, lastName, email, password, role)
            VALUES (?, ?, ?, ?, ?, ?)
          `, userData);
        }
        
        console.log("Utilisateurs ajoutés avec succès");
      } catch (error) {
        console.error("Erreur lors de l'ajout des utilisateurs:", error);
        throw error;
      }
      
      // Add tours
      try {
        // First clear any existing tours if we're forcing a reset
        if (force) {
          try {
            sqliteHelper.execute(db, "DELETE FROM tours");
            console.log("Table des tours vidée pour réinitialisation");
          } catch (e) {
            console.log("Aucune table tours à vider");
          }
        }
        
        const toursData = [
          ['1', 'Allée des Baobabs Tour', "Découvrez l'emblématique Allée des Baobabs", 'Morondava', '2 Jours', 299, 4.9, 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb', 1, 'Nature', 1],
          ['2', 'Trek aux Lémuriens à Andasibe', "Parcourez le Parc National d'Andasibe", 'Andasibe', '3 Jours', 349, 4.8, 'https://images.unsplash.com/photo-1472396961693-142e6e269027', 1, 'Faune', 1],
          ['3', 'Aventure au Parc National d\'Isalo', "Découvrez les paysages étonnants du Parc National d'Isalo", 'Isalo', '4 Jours', 499, 4.7, 'https://images.unsplash.com/photo-1469041797191-50ace28483c3', 1, 'Aventure', 1],
          ['4', 'Paradis de l\'île Nosy Be', "Relaxez-vous sur les magnifiques plages de Nosy Be", 'Nosy Be', '5 Jours', 599, 4.9, 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57', 0, 'Plage', 1]
        ];
        
        for (const tourData of toursData) {
          sqliteHelper.execute(db, `
            INSERT OR REPLACE INTO tours (id, title, description, location, duration, price, rating, image, featured, category, active)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, tourData);
        }
        
        console.log("Tours ajoutés avec succès");
      } catch (error) {
        console.error("Erreur lors de l'ajout des tours:", error);
      }
      
      return true;
    } else {
      console.log("Base de données SQLite déjà initialisée");
      return true;
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données SQLite:", error);
    return false;
  }
};
