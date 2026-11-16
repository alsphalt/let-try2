import {
  Activity,
  Boxes,
  KeyRound,
  Layers,
  Radio,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Container, Section, SectionHeading } from "@/components/ui/section";

type Capability = {
  icon: LucideIcon;
  title: string;
  description: string;
  stage: string;
};

const capabilities: Capability[] = [
  {
    icon: Activity,
    title: "Always-on runtime",
    description:
      "Supervised bot processes with clean restarts and health checks, so a dropped connection never becomes a dead session.",
    stage: "Runtime · next",
  },
  {
    icon: Boxes,
    title: "Isolated workspaces",
    description:
      "Every workspace gets its own scope for processes, secrets and limits. Nothing leaks sideways between projects.",
    stage: "Workspaces · next",
  },
  {
    icon: KeyRound,
    title: "API-first control plane",
    description:
      "Provision, pause and inspect from the dashboard or directly from your own tooling with scoped API keys.",
    stage: "Foundation · in place",
  },
  {
    icon: Radio,
    title: "Channels & webhooks",
    description:
      "A connector layer shaped for messaging channels, inbound webhooks and outbound event delivery.",
    stage: "Connectors · planned",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description:
      "Encrypted credentials, expiring sessions and per-workspace access boundaries baked into the data model.",
    stage: "Auth · next",
  },
  {
    icon: Layers,
    title: "Composable stack",
    description:
      "A typed frontend, route-handler API and service layer that can grow without a rewrite.",
    stage: "Foundation · in place",
  },
];

export function Capabilities() {
  return (
    <Section className="border-t border-[var(--hairline)]">
      <Container>
        <SectionHeading
          eyebrow="Platform direction"
          title="A hosting layer built for operators, not demos."
          description="The surface you see is the foundation. Each capability below has a defined place in the architecture, and is being wired in deliberately — no placeholder controls, no fake data."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} hover className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--hairline)] bg-gradient-to-b from-white/[0.06] to-transparent">
                    <Icon className="h-[1.15rem] w-[1.15rem] text-violet-300" />
                  </span>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ash">
                    {item.stage}
                  </span>
                </div>
                <h3 className="mt-5 text-[0.95rem] font-semibold text-chalk">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-mist">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
