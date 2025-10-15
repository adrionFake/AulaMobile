import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('AbsoluteCinema.db');

export function initDb() {
     db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS AbsoluteCinema (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    genero TEXT
    
  
  );
`);
}