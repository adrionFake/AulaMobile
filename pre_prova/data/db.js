import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('esportes.db');

export function initDb() {
     db.execSync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS atividades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    atividade TEXT NOT NULL,
    duracaomin REAL NOT NULL,
    categoria TEXT NOT NULL
  );
`);
}