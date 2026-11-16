import { connection, NextResponse } from "next/server";
import { capabilities, serverEnv } from "@/server/config/env";
import { databaseHealth } from "@/server/db";
import { site } from "@/lib/site";

/**
 * Real health surface — reports only what this process can actually verify.
 * Unbound capabilities are labelled "not_configured" rather than faked green.
 */
export async function GET() {
  await connection();

  const database = databaseHealth() ? "ok" : "error";

  return NextResponse.json(
    {
      service: "darknote-hosts",
      status: "ok",
      version: site.version,
      stage: "identity",
      environment: serverEnv.nodeEnv,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
      checks: {
        api: "ok",
        database,
        auth: capabilities.auth(),
        email: capabilities.email(),
        botRuntime: capabilities.botRuntime(),
      },
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
