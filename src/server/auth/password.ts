import "server-only";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

/**
 * Password hashing with scrypt (memory-hard, built into Node).
 * Format: scrypt$N$r$p$salt$hash — parameters travel with the hash so they
 * can be raised later without invalidating existing passwords.
 */

const COST = 16384;
const BLOCK_SIZE = 8;
const PARALLELIZATION = 1;
const KEY_LENGTH = 64;
const MAX_MEMORY = 64 * 1024 * 1024;

function derive(
  password: string,
  salt: Buffer,
  keyLength: number,
  options: { N: number; r: number; p: number; maxmem: number },
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, keyLength, options, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, KEY_LENGTH, {
    N: COST,
    r: BLOCK_SIZE,
    p: PARALLELIZATION,
    maxmem: MAX_MEMORY,
  });

  return [
    "scrypt",
    COST,
    BLOCK_SIZE,
    PARALLELIZATION,
    salt.toString("base64url"),
    key.toString("base64url"),
  ].join("$");
}

export async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);

  // Guard against tampered parameters causing excessive work.
  if (
    !Number.isInteger(N) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    N < 2 ** 12 ||
    N > 2 ** 17 ||
    r < 1 ||
    r > 16 ||
    p < 1 ||
    p > 4
  ) {
    return false;
  }

  const salt = Buffer.from(parts[4], "base64url");
  const expected = Buffer.from(parts[5], "base64url");
  if (salt.length === 0 || expected.length === 0) return false;

  const actual = await derive(password, salt, expected.length, {
    N,
    r,
    p,
    maxmem: MAX_MEMORY,
  });

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** Used to keep login timings similar when the account does not exist. */
export const DUMMY_PASSWORD_HASH =
  "scrypt$16384$8$1$MDAwMDAwMDAwMDAwMDAwMA$" +
  "Z6n0vH7oQK9m3i0d7KxJx8o4v3oQm8Xz1oQm8Xz1oQm8Xz1oQm8Xz1oQm8Xz1oQm8Xz1oQm8Xz1oQm8Xw";
