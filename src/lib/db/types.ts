
import { Database } from 'sql.js';
import { IDBPDatabase } from 'idb';
import { NorthGascarDB } from './schema';

// Types spécifiques pour éviter les confusions
export type SQLiteDatabase = Database;
export type IndexedDBDatabase = IDBPDatabase<NorthGascarDB>;
