import "server-only";
import { serverEnv } from "@/server/config/env";

/**
 * Database boundary.
 *
 * Stage 01 intentionally ships no driver. The application talks to this
 * interface only, so binding Postgres/Prisma later is a single adapter file
 * instead of a refactor of every route.
 */

export type QueryParams = ReadonlyArray<unknown>;

export interface DatabaseAdapter {
  readonly kind: string;
  healthCheck(): Promise<boolean>;
  query<T>(statement: string, params?: QueryParams): Promise<T[]>;
}

let adapter: DatabaseAdapter | null = null;

/** Called once from an infrastructure/init module when a driver is bound. */
export function registerDatabaseAdapter(next: DatabaseAdapter): void {
  adapter = next;
}

export function isDatabaseBound(): boolean {
  return adapter !== null;
}

export function getDatabase(): DatabaseAdapter {
  if (!adapter) {
    throw new Error(
      serverEnv.databaseUrl
        ? "A DATABASE_URL is set but no adapter has been registered. Bind one with registerDatabaseAdapter()."
        : "Database access is not available in Stage 01. Set DATABASE_URL and register an adapter before querying.",
    );
  }
  return adapter;
}
