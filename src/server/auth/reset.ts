import "server-only";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { getDb } from "@/server/db";

const RESET_TTL_MS = 30 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function createPasswordResetToken(userId: string): {
  token: string;
  expiresAt: number;
} {
  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  const expiresAt = now + RESET_TTL_MS;

  const db = getDb();
  db.prepare("DELETE FROM password_reset_tokens WHERE expires_at <= ? OR used_at IS NOT NULL").run(now);
  db.prepare(
    `INSERT INTO password_reset_tokens
      (id, user_id, token_hash, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
  ).run(randomUUID(), userId, hashToken(token), now, expiresAt);

  return { token, expiresAt };
}

export function consumePasswordResetToken(token: string): string | null {
  const db = getDb();
  const now = Date.now();
  const row = db
    .prepare(
      `SELECT id, user_id FROM password_reset_tokens
       WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
       LIMIT 1`,
    )
    .get(hashToken(token), now) as { id: string; user_id: string } | undefined;

  if (!row) return null;

  const result = db
    .prepare("UPDATE password_reset_tokens SET used_at = ? WHERE id = ? AND used_at IS NULL")
    .run(now, row.id);

  if (result.changes !== 1) return null;
  return row.user_id;
}

export function invalidateResetTokensForUser(userId: string): void {
  getDb()
    .prepare("UPDATE password_reset_tokens SET used_at = ? WHERE user_id = ? AND used_at IS NULL")
    .run(Date.now(), userId);
}
