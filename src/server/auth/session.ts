import "server-only";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { getDb } from "@/server/db";
import type { PublicUser } from "@/server/auth/users";

export const SESSION_COOKIE = "dn_session";
const SESSION_TTL_DAYS = 30;
const SESSION_TTL_MS = SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function shouldUseSecureCookie(): boolean {
  try {
    return new URL(process.env.APP_URL ?? "http://localhost:3000").protocol === "https:";
  } catch {
    return false;
  }
}

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: shouldUseSecureCookie(),
    path: "/",
    maxAge,
  };
}

export function createSession(
  userId: string,
  meta?: { userAgent?: string | null; ip?: string | null },
): { token: string; expiresAt: number } {
  const token = randomBytes(32).toString("base64url");
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  const db = getDb();
  // Opportunistic cleanup so expired rows do not accumulate.
  db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now);

  db.prepare(
    `INSERT INTO sessions
      (id, user_id, token_hash, created_at, expires_at, user_agent, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    randomUUID(),
    userId,
    hashToken(token),
    now,
    expiresAt,
    meta?.userAgent ?? null,
    meta?.ip ?? null,
  );

  return { token, expiresAt };
}

export function setSessionCookie(
  response: NextResponse,
  token: string,
  expiresAt: number,
): void {
  response.cookies.set(
    SESSION_COOKIE,
    token,
    sessionCookieOptions(Math.max(1, Math.floor((expiresAt - Date.now()) / 1000))),
  );
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", sessionCookieOptions(0));
}

export function deleteSessionByToken(token: string): void {
  getDb().prepare("DELETE FROM sessions WHERE token_hash = ?").run(hashToken(token));
}

export function deleteSessionsForUser(userId: string): void {
  getDb().prepare("DELETE FROM sessions WHERE user_id = ?").run(userId);
}

export async function getSessionUser(): Promise<PublicUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const row = getDb()
    .prepare(
      `SELECT u.id, u.username, u.email, u.created_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ?
       LIMIT 1`,
    )
    .get(hashToken(token), Date.now()) as
    | { id: string; username: string; email: string; created_at: number }
    | undefined;

  if (!row) return null;

  return {
    id: row.id,
    username: row.username,
    email: row.email,
    createdAt: row.created_at,
  };
}

export async function getCurrentSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}
