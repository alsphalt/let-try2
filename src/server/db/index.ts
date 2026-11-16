import "server-only";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * SQLite persistence.
 *
 * A single connection is cached on globalThis so Next.js hot reloads and
 * route handlers share one handle. The schema is created idempotently at
 * startup; migrations are tracked with PRAGMA user_version.
 */

const SCHEMA_VERSION = 1;

function databaseFile(): string {
  return process.env.DATABASE_PATH?.trim()
    ? path.resolve(process.env.DATABASE_PATH)
    : path.join(process.cwd(), "data", "darknote-hosts.db");
}

function migrate(db: Database.Database) {
  const version = db.pragma("user_version", { simple: true }) as number;
  if (version >= SCHEMA_VERSION) return;

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      username      TEXT NOT NULL,
      username_key  TEXT NOT NULL UNIQUE,
      email         TEXT NOT NULL,
      email_key     TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at    INTEGER NOT NULL,
      updated_at    INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      user_agent TEXT,
      ip         TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);

    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id         TEXT PRIMARY KEY,
      user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL,
      used_at    INTEGER
    );

    CREATE INDEX IF NOT EXISTS idx_reset_user ON password_reset_tokens(user_id);
  `);

  db.pragma(`user_version = ${SCHEMA_VERSION}`);
}

function connect(): Database.Database {
  const file = databaseFile();
  if (file !== ":memory:") {
    mkdirSync(path.dirname(file), { recursive: true });
  }

  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");
  migrate(db);
  return db;
}

const globalForDb = globalThis as unknown as {
  __darknoteDb?: Database.Database;
};

export function getDb(): Database.Database {
  if (!globalForDb.__darknoteDb) {
    globalForDb.__darknoteDb = connect();
  }
  return globalForDb.__darknoteDb;
}

export function isDatabaseBound(): boolean {
  return true;
}

export function databaseHealth(): boolean {
  try {
    return getDb().prepare("SELECT 1 AS ok").get() !== undefined;
  } catch {
    return false;
  }
}

export function databaseLocation(): string {
  return databaseFile();
}
