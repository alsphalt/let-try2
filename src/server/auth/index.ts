import "server-only";

/**
 * Authentication boundary.
 *
 * The shape of a session and the operations the app needs are defined here.
 * No provider is wired in Stage 01, so `getSession` truthfully resolves to
 * `null` — there are no sessions to read yet.
 */

export type Session = {
  userId: string;
  workspaceId: string;
  email: string;
  issuedAt: Date;
  expiresAt: Date;
};

export type Credentials = {
  email: string;
  password: string;
};

export interface AuthProvider {
  readonly name: string;
  signIn(credentials: Credentials): Promise<Session>;
  signOut(sessionId: string): Promise<void>;
  getSession(request: Request): Promise<Session | null>;
  requireSession(request: Request): Promise<Session>;
}

let provider: AuthProvider | null = null;

export function registerAuthProvider(next: AuthProvider): void {
  provider = next;
}

export function isAuthBound(): boolean {
  return provider !== null;
}

export async function getSession(request: Request): Promise<Session | null> {
  return provider ? provider.getSession(request) : null;
}

export async function requireSession(request: Request): Promise<Session> {
  if (!provider) {
    throw new Error(
      "Authentication is not configured in Stage 01. Register an AuthProvider before requiring a session.",
    );
  }
  return provider.requireSession(request);
}
