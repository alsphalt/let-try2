import "server-only";

/**
 * Server-side configuration.
 *
 * Authentication and SQLite persistence work out of the box. External
 * capabilities (SMTP, bot runtime, billing) stay optional and report their
 * own state instead of failing the whole process.
 */

function optional(key: string): string | null {
  const value = process.env[key]?.trim();
  return value && value.length > 0 ? value : null;
}

export const serverEnv = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  appUrl: optional("APP_URL") ?? "http://localhost:3000",
  databasePath: optional("DATABASE_PATH"),
  smtpHost: optional("SMTP_HOST"),
  botRuntimeUrl: optional("BOT_RUNTIME_URL"),
  redisUrl: optional("REDIS_URL"),
} as const;

export type CapabilityState = "ok" | "not_configured" | "not_connected";

export const capabilities = {
  auth(): CapabilityState {
    return "ok";
  },
  database(): CapabilityState {
    return "ok";
  },
  email(): CapabilityState {
    return serverEnv.smtpHost ? "ok" : "not_configured";
  },
  botRuntime(): CapabilityState {
    return serverEnv.botRuntimeUrl ? "not_connected" : "not_configured";
  },
  queue(): CapabilityState {
    return serverEnv.redisUrl ? "not_connected" : "not_configured";
  },
} as const;

export function assertConfigured(
  key: keyof typeof serverEnv,
  hint: string,
): string {
  const value = serverEnv[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      `Missing configuration "${String(key)}". ${hint} Add it to .env.local (see .env.example).`,
    );
  }
  return value;
}
