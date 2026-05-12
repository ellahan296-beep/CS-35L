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
  )
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