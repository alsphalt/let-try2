import "server-only";
import { randomUUID } from "node:crypto";
import { getDb } from "@/server/db";
import { normalizeEmail, normalizeUsername, usernameKey } from "@/lib/auth-validation";

export type UserRecord = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: number;
};

export type PublicUser = {
  id: string;
  username: string;
  email: string;
  createdAt: number;
};

type UserRow = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: number;
};

function toRecord(row: UserRow): UserRecord {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export function findUserByIdentifier(identifier: string): UserRecord | null {
  const key = identifier.trim().toLowerCase();
  if (!key) return null;

  const row = getDb()
    .prepare(
      `SELECT id, username, email, password_hash, created_at
       FROM users
       WHERE email_key = ? OR username_key = ?
       LIMIT 1`,
    )
    .get(key, key) as UserRow | undefined;

  return row ? toRecord(row) : null;
}

export function findUserByUsername(username: string): UserRecord | null {
  const row = getDb()
    .prepare(
      `SELECT id, username, email, password_hash, created_at
       FROM users WHERE username_key = ? LIMIT 1`,
    )
    .get(usernameKey(username)) as UserRow | undefined;
  return row ? toRecord(row) : null;
}

export function findUserByEmail(email: string): UserRecord | null {
  const row = getDb()
    .prepare(
      `SELECT id, username, email, password_hash, created_at
       FROM users WHERE email_key = ? LIMIT 1`,
    )
    .get(normalizeEmail(email)) as UserRow | undefined;
  return row ? toRecord(row) : null;
}

export function findUserById(id: string): UserRecord | null {
  const row = getDb()
    .prepare(
      `SELECT id, username, email, password_hash, created_at
       FROM users WHERE id = ? LIMIT 1`,
    )
    .get(id) as UserRow | undefined;
  return row ? toRecord(row) : null;
}

export function createUser(input: {
  username: string;
  email: string;
  passwordHash: string;
}): UserRecord {
  const now = Date.now();
  const id = randomUUID();
  const username = normalizeUsername(input.username);
  const email = normalizeEmail(input.email);

  getDb()
    .prepare(
      `INSERT INTO users
        (id, username, username_key, email, email_key, password_hash, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      id,
      username,
      usernameKey(username),
      email,
      email,
      input.passwordHash,
      now,
      now,
    );

  return {
    id,
    username,
    email,
    passwordHash: input.passwordHash,
    createdAt: now,
  };
}

export function updateUserPassword(userId: string, passwordHash: string): void {
  getDb()
    .prepare("UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?")
    .run(passwordHash, Date.now(), userId);
}

export function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    String((error as { code?: unknown }).code).startsWith("SQLITE_CONSTRAINT")
  );
}
