import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const db = new Database(join(__dirname, 'crm.db'));

export function setupDatabase() {
  // Create contacts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      createdAt TEXT NOT NULL
    )
  `);

  // Create deals table
  db.exec(`
    CREATE TABLE IF NOT EXISTS deals (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      value REAL NOT NULL,
      stage TEXT NOT NULL,
      contactId TEXT,
      createdAt TEXT NOT NULL,
      FOREIGN KEY(contactId) REFERENCES contacts(id)
    )
  `);

  // Create custom emojis table
  db.exec(`
    CREATE TABLE IF NOT EXISTS custom_emojis (
      id TEXT PRIMARY KEY,
      emoji TEXT NOT NULL,
      category TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);
}

export default db;