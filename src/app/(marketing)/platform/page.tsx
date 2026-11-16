import type { Metadata } from "next";
import {
  Activity,
  ArrowRight,
  Boxes,
  CircleDashed,
  CircleCheck,
  KeyRound,
  ScrollText,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "How DARKNOTE HOSTS is structured: an always-on bot runtime, isolated workspaces and an API-first control plane.",
};

const pillars = [
  {
    icon: Server,
    title: "Runtime",
    copy: "Supervised processes per bot, with restart policy, health checks and a clean lifecycle. Sessions stay warm instead of reconnecting on every deploy.",
    points: ["Process supervision", "Restart policy", "Health probes"],
  },
  {
    icon: Boxes,
    title: "Workspaces",
    copy: "The tenant boundary for everything: bots, credentials, API keys and usage. Scoped queries keep one workspace from ever reading another.",
    points: ["Tenant scoping", "Secret isolation", "Per-workspace limits"],
  },
  {
    icon: KeyRound,
    title: "Control plane",
    copy: "A typed API surface behind every dashboard action, so the same operations are available to your own tooling and CI.",
    points: ["Scoped API keys", "Route-handler API", "Dashboard parity"],
  },
];

const foundation = [
  {
    area: "Design system & branding",
    location: "src/app/globals.css · src/components/ui",
    status: "Implemented",
    tone: "success" as const,
  },
  {
    area: "Marketing surfaces",
    location: "src/app/(marketing)",
    status: "Implemented",
    tone: "success" as const,
  },
  {
    area: "Health API",
    location: "src/app/api/health",
    status: "Implemented",
    tone: "success" as const,
  },
  {
    area: "Authentication",
    location: "src/server/auth · SQLite sessions",
    status: "Implemented",
    tone: "success" as const,
  },
  {
    area: "Database persistence",
    location: "src/server/db · SQLite",
    status: "Implemented",
    tone: "success" as const,
  },
  {
    area: "Bot repository & runtime contract",
    location: "src/server/bots",
    status: "Scaffolded",
    tone: "warning" as const,
  },
  {
    area: "Provisioning, logs, billing",
    location: "—",
    status: "Planned",
    tone: "neutral" as const,
  },
];

const stages = [
  {
    id: "01",
    title: "Foundation",
    copy: "Brand, design system, responsive shell, application structure and a real health surface.",
    state: "complete",
  },
  {
    id: "02",
    title: "Identity & data",
    copy: "Registration, sign-in and scrypt-hashed accounts are live on SQLite. Workspace roles and API keys follow.",
    state: "current",
  },
  {
    id: "03",
    title: "Runtime",
    copy: "Provision bot processes, add log streaming and lifecycle controls from the dashboard.",
    state: "later",
  },
];

export default function PlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--hairline)] pt-16 pb-14 sm:pt-20 sm:pb-16">
        <div aria-hidden className="aurora opacity-80" />
        <Container className="relative">
          <p className="eyebrow">Platform</p>
          <h1 className="mt-4 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.035em] text-chalk sm:text-5xl">
            The hosting layer, <span className="text-gradient">mapped.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-mist sm:text-base">
            DARKNOTE HOSTS separates presentation, control plane and runtime so
            each part can evolve on its own. This page documents what exists
            today and where each capability is headed.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <Badge tone="brand">Stage 02 · Identity live</Badge>
            <Badge tone="outline">Next.js 16 · React 19</Badge>
            <Badge tone="outline">TypeScript strict</Badge>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Architecture"
            title="Three boundaries, one product."
            description="Every request crosses the same seams, which keeps future integrations contained instead of tangled."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card key={pillar.title} hover className="flex flex-col p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--hairline)] bg-gradient-to-b from-white/[0.06] to-transparent">
                    <Icon className="h-[1.15rem] w-[1.15rem] text-violet-300" />
                  </span>
                  <h2 className="mt-5 text-base font-semibold text-chalk">
                    {pillar.title}
                  </h2>
                  <p className="mt-2 flex-1 text-[0.84rem] leading-relaxed text-mist">
                    {pillar.copy}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-[var(--hairline)] pt-4">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-[0.75rem] text-ash"
                      >
                        <CircleCheck className="h-3 w-3 text-violet-400/80" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <Container>
          <div>
            <SectionHeading
              eyebrow="Foundation status"
              title="What is real in this build."
              description="No capability is marked complete until it is wired end to end. Scaffolded means the interface exists but its provider is not connected yet."
            />

            <div className="panel mt-9 overflow-hidden">
              <div className="hidden grid-cols-[1.3fr_1.5fr_auto] gap-4 border-b border-[var(--hairline)] px-6 py-3.5 md:grid">
                {["Capability", "Where it lives", "State"].map((label) => (
                  <p
                    key={label}
                    className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-ash"
                  >
                    {label}
                  </p>
                ))}
              </div>
              <ul className="divide-y divide-[var(--hairline)]">
                {foundation.map((row) => (
                  <li
                    key={row.area}
                    className="grid gap-1.5 px-6 py-4 transition-colors duration-200 hover:bg-white/[0.02] md:grid-cols-[1.3fr_1.5fr_auto] md:items-center md:gap-4"
                  >
                    <p className="text-[0.85rem] font-medium text-chalk">
                      {row.area}
                    </p>
                    <p className="font-mono text-[0.65rem] text-ash">
                      {row.location}
                    </p>
                    <div className="md:justify-self-end">
                      <Badge tone={row.tone}>
                        {row.tone === "success" ? (
                          <CircleCheck className="h-2.5 w-2.5" />
                        ) : row.tone === "warning" ? (
                          <CircleDashed className="h-2.5 w-2.5" />
                        ) : null}
                        {row.status}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <Container>
          <SectionHeading
            eyebrow="Delivery"
            title="Three stages, no shortcuts."
            description="Each stage leaves the application in a working, verifiable state."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className={
                  stage.state === "complete"
                    ? "relative rounded-xl border border-violet-500/30 bg-gradient-to-b from-violet-700/12 to-transparent p-6"
                    : "relative rounded-xl border border-[var(--hairline)] bg-white/[0.015] p-6"
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.65rem] tracking-[0.16em] text-violet-300">
                    STAGE {stage.id}
                  </span>
                  {stage.state === "complete" ? (
                    <Badge tone="success">
                      <CircleCheck className="h-2.5 w-2.5" />
                      Complete
                    </Badge>
                  ) : stage.state === "current" ? (
                    <Badge tone="brand">Live</Badge>
                  ) : stage.state === "next" ? (
                    <Badge tone="outline">Next</Badge>
                  ) : (
                    <Badge tone="outline">Queued</Badge>
                  )}
                </div>
                <h3 className="mt-4 text-base font-semibold text-chalk">
                  {stage.title}
                </h3>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-mist">
                  {stage.copy}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/design">
              Review the design system
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">
              Open the dashboard
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)] py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Activity,
                title: "No faked state",
                copy: "Unbound services read as pending, never as green.",
              },
              {
                icon: ShieldCheck,
                title: "Secrets stay server-side",
                copy: "Environment-only configuration, validated where it is used.",
              },
              {
                icon: ScrollText,
                title: "Documented seams",
                copy: "Contracts live next to the modules that will implement them.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3.5">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
                  <div>
                    <p className="text-[0.82rem] font-medium text-chalk">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.75rem] leading-relaxed text-ash">
                      {item.copy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
