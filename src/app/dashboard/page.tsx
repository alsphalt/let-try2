import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CircleCheck,
  CircleDashed,
  Info,
  KeyRound,
  Plus,
  Radio,
} from "lucide-react";
import { StatusPanel } from "@/components/landing/status-panel";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "DARKNOTE HOSTS control plane — foundation preview.",
};

const stats = [
  { label: "Bots", value: "0", note: "runtime not provisioned" },
  { label: "API keys", value: "0", note: "auth not configured" },
  { label: "Workspaces", value: "0", note: "database not connected" },
];

const setup = [
  {
    title: "Bind a database",
    copy: "Postgres adapter, workspace and bot schemas.",
    state: "Stage 02",
  },
  {
    title: "Configure authentication",
    copy: "Provider, sessions and workspace membership.",
    state: "Stage 02",
  },
  {
    title: "Provision the runtime",
    copy: "Bot processes, supervision and log streaming.",
    state: "Stage 03",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Control plane</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-chalk sm:text-[1.85rem]">
            Overview
          </h1>
          <p className="mt-2 max-w-xl text-[0.85rem] leading-relaxed text-mist">
            The application shell is live. No workspace has been provisioned
            yet, so every surface below is an honest empty state.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Badge tone="warning">
            <CircleDashed className="h-2.5 w-2.5" />
            Foundation workspace
          </Badge>
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-lg border border-amber/20 bg-amber/[0.04] px-4 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
        <p className="text-[0.74rem] leading-relaxed text-amber/90">
          Authentication, database access and bot provisioning are not wired in
          this stage. Buttons that would mutate state are disabled on purpose.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5" hover>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ash">
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-chalk">
              {stat.value}
            </p>
            <p className="mt-1 text-[0.65rem] text-ash">{stat.note}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-4">
            <div>
              <h2 className="text-[0.9rem] font-semibold text-chalk">
                Platform status
              </h2>
              <p className="mt-0.5 text-[0.68rem] text-ash">
                Read from the live health endpoint
              </p>
            </div>
            <Link
              href="/api/health"
              className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-violet-300 transition-colors hover:text-violet-200"
            >
              /api/health
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="px-3 py-2">
            <StatusPanel embedded />
          </div>
        </Card>

        <Card className="p-0">
          <div className="border-b border-[var(--hairline)] px-5 py-4">
            <h2 className="text-[0.9rem] font-semibold text-chalk">
              Setup checklist
            </h2>
            <p className="mt-0.5 text-[0.68rem] text-ash">
              The path from foundation to first bot
            </p>
          </div>
          <ul className="divide-y divide-[var(--hairline)]">
            {setup.map((step) => (
              <li key={step.title} className="flex items-start gap-3.5 px-5 py-4">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--hairline)] bg-white/[0.02]">
                  <CircleDashed className="h-3 w-3 text-ash" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.8rem] font-medium text-chalk">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-[0.7rem] leading-relaxed text-ash">
                    {step.copy}
                  </p>
                </div>
                <Badge tone="outline" className="shrink-0">
                  {step.state}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-5">
            <ButtonLink
              href="/platform"
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Read the platform plan
              <ArrowRight className="h-3.5 w-3.5" />
            </ButtonLink>
          </div>
        </Card>
      </div>

      <Card className="p-0" id="bots">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--hairline)] px-5 py-4">
          <div>
            <h2 className="text-[0.9rem] font-semibold text-chalk">Bots</h2>
            <p className="mt-0.5 text-[0.68rem] text-ash">
              Nothing runs here yet
            </p>
          </div>
          <Button size="sm" variant="secondary" disabled>
            <Plus className="h-3.5 w-3.5" />
            New bot
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--hairline)] bg-white/[0.03]">
            <Bot className="h-5 w-5 text-violet-300" />
          </span>
          <p className="mt-4 text-[0.9rem] font-medium text-chalk">
            No bots in this workspace
          </p>
          <p className="mt-1.5 max-w-sm text-[0.75rem] leading-relaxed text-ash">
            Bot provisioning arrives with the runtime stage. Until then this
            table stays empty rather than showing sample rows.
          </p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-0" id="api-keys">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-4">
            <div>
              <h2 className="text-[0.9rem] font-semibold text-chalk">
                API keys
              </h2>
              <p className="mt-0.5 text-[0.68rem] text-ash">
                Scoped access tokens
              </p>
            </div>
            <KeyRound className="h-4 w-4 text-ash" />
          </div>
          <div className="px-5 py-8 text-center">
            <p className="text-[0.8rem] text-mist">No keys issued</p>
            <p className="mx-auto mt-1.5 max-w-xs text-[0.7rem] leading-relaxed text-ash">
              Key creation unlocks once identity and persistence are connected.
            </p>
            <Button size="sm" variant="quiet" className="mt-4" disabled>
              Create key
            </Button>
          </div>
        </Card>

        <Card className="p-0" id="activity">
          <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-4">
            <div>
              <h2 className="text-[0.9rem] font-semibold text-chalk">Activity</h2>
              <p className="mt-0.5 text-[0.68rem] text-ash">
                Lifecycle events
              </p>
            </div>
            <Radio className="h-4 w-4 text-ash" />
          </div>
          <div className="flex flex-col items-center justify-center px-5 py-8 text-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--hairline)] bg-white/[0.02]">
              <CircleCheck className="h-3.5 w-3.5 text-mint" />
            </span>
            <p className="mt-3 text-[0.8rem] text-mist">No events recorded</p>
            <p className="mx-auto mt-1.5 max-w-xs text-[0.7rem] leading-relaxed text-ash">
              The event stream is defined but not emitting in this build.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
