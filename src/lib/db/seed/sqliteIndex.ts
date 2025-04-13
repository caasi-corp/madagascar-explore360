
import { Database } from 'sql.js';
import { sqliteHelper } from '../helpers';

/**
 * Check if database is empty
 */
const isDatabaseEmpty = (db: Database): boolean => {
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
 * Seeds the database with initial SQLite data
 * This is a simplified seed function for SQLite
 */
export const seedSQLiteDatabase = async (db: Database): Promise<boolean> => {
  console.log("Vérification si la base de données SQLite a besoin d'être initialisée...");
  
  try {
    const empty = isDatabaseEmpty(db);
    
    if (empty) {
      console.log("Base de données SQLite vide, ajout des données initiales...");
      
      // Add users
      try {
        const usersData = [
          ['admin1', 'Admin', 'User', 'admin@northgascartours.com', 'Admin123!', 'admin'],
          ['user1', 'Pierre', 'Martin', 'user@northgascartours.com', 'User123!', 'user'],
          ['user2', 'Marie', 'Dubois', 'marie@example.com', 'password', 'user']
        ];
        
        for (const userData of usersData) {
          db.run(`
            INSERT INTO users (id, firstName, lastName, email, password, role)
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
        const toursData = [
          ['1', 'Allée des Baobabs Tour', "Découvrez l'emblématique Allée des Baobabs", 'Morondava', '2 Jours', 299, 4.9, 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb', 1, 'Nature', 1],
          ['2', 'Trek aux Lémuriens à Andasibe', "Parcourez le Parc National d'Andasibe", 'Andasibe', '3 Jours', 349, 4.8, 'https://images.unsplash.com/photo-1472396961693-142e6e269027', 1, 'Faune', 1]
        ];
        
        for (const tourData of toursData) {
          db.run(`
            INSERT INTO tours (id, title, description, location, duration, price, rating, image, featured, category, active)
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
