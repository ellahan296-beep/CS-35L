const Database = require('better-sqlite3');
const db = new Database('campustrade.db');


db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT,
    price       REAL    NOT NULL,
    category    TEXT    NOT NULL,
    tags        TEXT    DEFAULT '[]',
    images      TEXT    DEFAULT '[]',
    campus      TEXT    NOT NULL,
    seller_id   INTEGER NOT NULL,
    status      TEXT    DEFAULT 'active',
    created_at  TEXT    DEFAULT (datetime('now'))
  );

  CREATE VIRTUAL TABLE IF NOT EXISTS listings_fts 
  USING FTS5(title, description, content = 'listings', content_rowid = 'id', tokenize = 'trigram');

  INSERT INTO listings_fts (rowid, title, description)
  SELECT id, 
  title, 
  description
  FROM listings;

  CREATE TRIGGER IF NOT EXISTS listings_insert AFTER 
  INSERT ON listings BEGIN
  INSERT INTO listings_fts(rowid, title, description)
  VALUES (new.id, new.title, new.description); END;

  CREATE TRIGGER IF NOT EXISTS listings_update AFTER 
  UPDATE ON listings BEGIN
  INSERT INTO listings_fts(rowid, title, description)
  VALUES (new.id, new.title, new.description); END;

  CREATE TRIGGER IF NOT EXISTS listings_delete AFTER 
  DELETE ON listings BEGIN
  DELETE FROM listings_fts
  WHERE rowid = old.id; END;
  
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    UNIQUE NOT NULL,
    email         TEXT    UNIQUE NOT NULL,
    password_hash TEXT    NOT NULL,
    created_at    TEXT    DEFAULT (datetime('now'))
  )
`);

console.log('Database check');

module.exports = db;