"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, ShieldCheck, Terminal } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckState = "ok" | "not_configured" | "not_connected" | "error";

type HealthPayload = {
  service: string;
  status: string;
  version: string;
  stage: string;
  uptimeSeconds: number;
  timestamp: string;
  checks: {
    api: CheckState;
    database: CheckState;
    auth: CheckState;
    botRuntime: CheckState;
  };
};

const labels: Array<{
  key: keyof HealthPayload["checks"];
  name: string;
  detail: string;
}> = [
  { key: "api", name: "API surface", detail: "/api/health" },
  { key: "database", name: "Database", detail: "adapter not bound" },
  { key: "auth", name: "Auth provider", detail: "not configured" },
  { key: "botRuntime", name: "Bot runtime", detail: "not provisioned" },
];

function tone(state: CheckState | undefined) {
  if (state === "ok") return { dot: "bg-mint", text: "text-mint", label: "Operational" };
  if (state === "error") return { dot: "bg-rose", text: "text-rose", label: "Unreachable" };
  return { dot: "bg-amber", text: "text-amber", label: "Pending" };
}

export function StatusPanel({ embedded = false }: { embedded?: boolean }) {
  const [health, setHealth] = useState<HealthPayload | null>(null);
  const [failed, setFailed] = useState(false);
  const [checking, setChecking] = useState(true);

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/health", { cache: "no-store" });
      if (!response.ok) throw new Error("unhealthy");
      setHealth((await response.json()) as HealthPayload);
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setChecking(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setChecking(true);
    void load();
  }, [load]);

  useEffect(() => {
    // Initial read of the real health endpoint; state is set after the await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  return (
    <div className={embedded ? "w-full" : "relative"}>
      {embedded ? null : (
        <div
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-[2rem] bg-violet-600/12 blur-2xl"
        />
      )}
      <div
        className={
          embedded
            ? "overflow-hidden rounded-xl"
            : "panel overflow-hidden rounded-2xl"
        }
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--hairline)] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--hairline)] bg-white/[0.04]">
              <Terminal className="h-3.5 w-3.5 text-violet-300" />
            </span>
            <p className="font-mono text-[0.7rem] tracking-[0.08em] text-mist">
              darknote-hosts / status
            </p>
          </div>
          <button
            type="button"
            onClick={refresh}
            aria-label="Refresh platform status"
            className="rounded-md p-1.5 text-ash transition-colors hover:bg-white/[0.05] hover:text-chalk"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", checking && "animate-spin")} />
          </button>
        </div>

        <div className="space-y-1 px-3 py-3">
          {labels.map((row) => {
            const state = health?.checks[row.key];
            const style = tone(state);
            return (
              <div
                key={row.key}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <p className="text-[0.82rem] font-medium text-chalk">{row.name}</p>
                  <p className="truncate font-mono text-[0.62rem] text-ash">
                    {row.detail}
                  </p>
                </div>
                <span className="flex shrink-0 items-center gap-2">
                  <span
                    className={cn(
                      "font-mono text-[0.6rem] uppercase tracking-[0.1em]",
                      style.text,
                    )}
                  >
                    {failed ? "Unknown" : checking && !health ? "Checking" : style.label}
                  </span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      failed ? "bg-rose" : style.dot,
                    )}
                  />
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--hairline)] bg-black/20 px-5 py-3">
          <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ash">
            <ShieldCheck className="h-3 w-3 text-violet-400" />
            {health ? `v${health.version} · ${health.stage}` : "reading runtime"}
          </span>
          <span className="font-mono text-[0.6rem] text-ash">
            {health
              ? new Date(health.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })
              : "--:--:--"}
          </span>
        </div>
      </div>

      {embedded ? null : (
        <div className="mt-3 flex items-center justify-end gap-2 px-1">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
            Live from the app router
          </span>
        </div>
      )}
    </div>
  );
}
