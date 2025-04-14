
/**
 * Gestionnaire principal de la base de données DBX
 * Fournit des méthodes pour interagir avec les fichiers .dbx
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

// Types de base
export type DBXDataType = 'tours' | 'vehicles' | 'users' | 'bookings' | 'hotels' | 'flights';

// Interface pour les données stockées dans un fichier DBX
export interface DBXFile<T> {
  version: number;
  lastUpdated: string;
  data: T[];
}

class DBXManager {
  private basePath: string;
  private cache: Map<string, any> = new Map();

  constructor() {
    this.basePath = path.join(process.cwd(), 'DataBaseX');
    this.ensureDirectoryExists();
  }

  /**
   * S'assure que le répertoire DataBaseX existe
   */
  private ensureDirectoryExists(): void {
    try {
      if (!existsSync(this.basePath)) {
        mkdirSync(this.basePath, { recursive: true });
        console.log("Répertoire DataBaseX créé avec succès");
      }
    } catch (error) {
      console.error("Erreur lors de la création du répertoire DataBaseX:", error);
    }
  }

  /**
   * Obtient le chemin complet pour un fichier .dbx
   */
  private getFilePath(type: DBXDataType, id?: string): string {
    return id 
      ? path.join(this.basePath, `${type}_${id}.dbx`)
      : path.join(this.basePath, `${type}.dbx`);
  }

  /**
   * Lit les données d'un fichier .dbx
   */
  readDBX<T>(type: DBXDataType): T[] {
    try {
      const cacheKey = `${type}`;
      
      // Vérifie si les données sont en cache
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }
      
      const filePath = this.getFilePath(type);
      
      // Vérifie si le fichier existe
      if (!existsSync(filePath)) {
        console.log(`Fichier ${filePath} non trouvé, retourne un tableau vide`);
        return [];
      }
      
      // Lit et parse le fichier
      const fileContent = readFileSync(filePath, 'utf-8');
      const dbxFile: DBXFile<T> = JSON.parse(fileContent);
      
      // Met en cache les données
      this.cache.set(cacheKey, dbxFile.data);
      
      return dbxFile.data;
    } catch (error) {
      console.error(`Erreur lors de la lecture du fichier ${type}.dbx:`, error);
      return [];
    }
  }

  /**
   * Écrit des données dans un fichier .dbx
   */
  writeDBX<T>(type: DBXDataType, data: T[]): boolean {
    try {
      const filePath = this.getFilePath(type);
      
      const dbxFile: DBXFile<T> = {
        version: 1,
        lastUpdated: new Date().toISOString(),
        data
      };
      
      // Écrit les données dans le fichier
      writeFileSync(filePath, JSON.stringify(dbxFile, null, 2), 'utf-8');
      
      // Met à jour le cache
      this.cache.set(`${type}`, data);
      
      console.log(`Données écrites avec succès dans ${filePath}`);
      return true;
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans le fichier ${type}.dbx:`, error);
      return false;
    }
  }

  /**
   * Ajoute ou met à jour un élément dans un fichier .dbx
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
   * Supprime un élément d'un fichier .dbx
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
