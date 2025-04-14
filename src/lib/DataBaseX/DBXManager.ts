
/**
 * Gestionnaire principal de la base de données DBX
 * Fournit des méthodes pour interagir avec les données stockées dans le navigateur
 */

// Types de base
export type DBXDataType = 'tours' | 'vehicles' | 'users' | 'bookings' | 'hotels' | 'flights';

// Interface pour les données stockées
export interface DBXFile<T> {
  version: number;
  lastUpdated: string;
  data: T[];
}

class DBXManager {
  private storagePrefix: string = 'dbx_';
  private cache: Map<string, any> = new Map();

  /**
   * Construit la clé de stockage pour une entité
   */
  private getStorageKey(type: DBXDataType): string {
    return `${this.storagePrefix}${type}`;
  }

  /**
   * Lit les données d'une entité
   */
  readDBX<T>(type: DBXDataType): T[] {
    try {
      const cacheKey = `${type}`;
      
      // Vérifie si les données sont en cache
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      // Récupère les données du localStorage
      const storageKey = this.getStorageKey(type);
      const storedData = localStorage.getItem(storageKey);
      
      // Si les données n'existent pas, retourne un tableau vide
      if (!storedData) {
        console.log(`Aucune donnée trouvée pour ${type}, retourne un tableau vide`);
        return [];
      }
      
      // Parse et récupère les données
      const dbxFile: DBXFile<T> = JSON.parse(storedData);
      
      // Met en cache les données
      this.cache.set(cacheKey, dbxFile.data);
      
      return dbxFile.data;
    } catch (error) {
      console.error(`Erreur lors de la lecture des données ${type}:`, error);
      return [];
    }
  }

  /**
   * Écrit des données pour une entité
   */
  writeDBX<T>(type: DBXDataType, data: T[]): boolean {
    try {
      const storageKey = this.getStorageKey(type);
      
      const dbxFile: DBXFile<T> = {
        version: 1,
        lastUpdated: new Date().toISOString(),
        data
      };
      
      // Écrit les données dans le localStorage
      localStorage.setItem(storageKey, JSON.stringify(dbxFile));
      
      // Met à jour le cache
      this.cache.set(`${type}`, data);
      
      console.log(`Données écrites avec succès pour ${type}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de l'écriture des données ${type}:`, error);
      return false;
    }
  }

  /**
   * Ajoute ou met à jour un élément
   */
  updateItem<T extends { id: string }>(type: DBXDataType, item: T): T {
    const items = this.readDBX<T>(type);
    const index = items.findIndex(i => i.id === item.id);
    
    if (index !== -1) {
      items[index] = item;
    } else {
      items.push(item);
    }
    
    this.writeDBX(type, items);
    return item;
  }

  /**
   * Supprime un élément
   */
  deleteItem<T extends { id: string }>(type: DBXDataType, id: string): boolean {
    const items = this.readDBX<T>(type);
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length < items.length) {
      this.writeDBX(type, filteredItems);
      return true;
    }
    
    return false;
  }

  /**
   * Vide le cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Exporte une instance singleton du gestionnaire DBX
export const dbxManager = new DBXManager();
