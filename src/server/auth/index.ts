import "server-only";

/**
 * Authentication boundary.
 *
 * Real implementation: SQLite-backed users and sessions, scrypt password
 * hashing, and single-use password reset tokens. Route handlers stay thin and
 * call these functions; UI components never import this module.
 */

export { hashPassword, verifyPassword, DUMMY_PASSWORD_HASH } from "./password";
export {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdentifier,
  findUserByUsername,
  isUniqueViolation,
  toPublicUser,
  updateUserPassword,
  type PublicUser,
  type UserRecord,
} from "./users";
export {
  clearSessionCookie,
  createSession,
  deleteSessionByToken,
  deleteSessionsForUser,
  getCurrentSessionToken,
  getSessionUser,
  SESSION_COOKIE,
  sessionCookieOptions,
  setSessionCookie,
} from "./session";
export {
  consumePasswordResetToken,
  createPasswordResetToken,
  invalidateResetTokensForUser,
} from "./reset";
export {
  devResetLinkEnabled,
  mailConfigured,
  sendPasswordResetEmail,
} from "./mailer";

export function isAuthBound(): boolean {
  return true;
}
