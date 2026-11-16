import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  AtSign,
  Boxes,
  Check,
  CircleCheck,
  Database,
  KeyRound,
  Layers,
  LockKeyhole,
  Radio,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Badge, StatusDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { Container, Section, SectionHeading } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "The DARKNOTE HOSTS design language: colour, typography, spacing, components and motion.",
};

function Token({
  name,
  hex,
  swatch,
  border,
}: {
  name: string;
  hex: string;
  swatch: string;
  border?: boolean;
}) {
  return (
    <div>
      <div
        className={`h-20 rounded-lg ${border ? "border border-white/10" : ""}`}
        style={{ backgroundColor: swatch }}
      />
      <p className="mt-2.5 text-[0.75rem] font-medium text-chalk">{name}</p>
      <p className="font-mono text-[0.6rem] uppercase text-ash">{hex}</p>
    </div>
  );
}

function SpecRow({
  label,
  spec,
  children,
}: {
  label: string;
  spec: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b border-[var(--hairline)] py-5 last:border-0 md:grid-cols-[9rem_1fr] md:items-baseline md:gap-8">
      <div>
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ash">
          {label}
        </p>
        <p className="mt-1 font-mono text-[0.58rem] text-ash/70">{spec}</p>
      </div>
      <div className="min-w-0 text-chalk">{children}</div>
    </div>
  );
}

const iconSet = [
  { icon: Server, name: "runtime" },
  { icon: Boxes, name: "workspace" },
  { icon: KeyRound, name: "api key" },
  { icon: ShieldCheck, name: "security" },
  { icon: Activity, name: "activity" },
  { icon: Database, name: "database" },
  { icon: Radio, name: "channel" },
  { icon: Layers, name: "stack" },
  { icon: Terminal, name: "console" },
  { icon: LockKeyhole, name: "secret" },
];

export default function DesignPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--hairline)] pt-16 pb-14 sm:pt-20">
        <div aria-hidden className="aurora opacity-70" />
        <Container className="relative">
          <p className="eyebrow">Design system</p>
          <h1 className="mt-4 max-w-3xl text-balance text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.035em] text-chalk sm:text-5xl">
            One language for a <span className="text-gradient">quiet interface.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-[0.95rem] leading-relaxed text-mist sm:text-base">
            Black surfaces, violet signals, generous spacing and restrained
            motion. These tokens are the contract every screen follows.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <Badge tone="brand">v0.1.0</Badge>
            <Badge tone="outline">Dark only</Badge>
            <Badge tone="outline">Inter · JetBrains Mono</Badge>
          </div>
        </Container>
      </section>

      <Section className="pb-8">
        <Container>
          <SectionHeading
            eyebrow="01 · Brand"
            title="Monogram and lockup."
            description="The mark is a violet-lit tile with an outlined D. The lockup pairs a tracked wordmark with a fine rule and the HOSTS descriptor."
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="panel flex flex-wrap items-center justify-around gap-10 px-8 py-12">
              <LogoMark className="h-24 w-24" withGlow />
              <Logo markClassName="h-12 w-12" />
            </div>
            <div className="panel flex flex-col justify-center gap-4 p-7">
              <p className="text-[0.8rem] font-medium text-chalk">Usage</p>
              <ul className="space-y-2.5 text-[0.75rem] leading-relaxed text-ash">
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" />
                  Keep clear space of at least one tile width around the mark.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" />
                  Use the lockup on ink surfaces; the mark alone below 24px.
                </li>
                <li className="flex gap-2">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-mint" />
                  Never recolor the gradient or place it on violet fills.
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-8">
        <Container>
          <SectionHeading eyebrow="02 · Colour" title="Ink first, violet for intent." />
          <div className="mt-9 space-y-8">
            <div>
              <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Surfaces
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <Token name="Ink 950" hex="#040308" swatch="#040308" border />
                <Token name="Ink 900" hex="#07050D" swatch="#07050D" border />
                <Token name="Ink 850" hex="#0A0714" swatch="#0A0714" border />
                <Token name="Ink 800" hex="#0E0A1A" swatch="#0E0A1A" border />
                <Token name="Ink 700" hex="#181129" swatch="#181129" border />
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Brand
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                <Token name="Violet 300" hex="#B298FF" swatch="#B298FF" />
                <Token name="Violet 400" hex="#9470FF" swatch="#9470FF" />
                <Token name="Violet 500" hex="#7C4DFF" swatch="#7C4DFF" />
                <Token name="Violet 600" hex="#6A2FE0" swatch="#6A2FE0" />
                <Token name="Violet 800" hex="#3D1880" swatch="#3D1880" />
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Text & status
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                <Token name="Chalk" hex="#F6F3FF" swatch="#F6F3FF" />
                <Token name="Mist" hex="#B4ACCB" swatch="#B4ACCB" />
                <Token name="Ash" hex="#857C9E" swatch="#857C9E" />
                <Token name="Mint" hex="#4ADE9B" swatch="#4ADE9B" />
                <Token name="Amber" hex="#F5C26B" swatch="#F5C26B" />
                <Token name="Rose" hex="#F871A0" swatch="#F871A0" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <Container>
          <SectionHeading
            eyebrow="03 · Typography"
            title="Inter for the interface, mono for the machine."
            description="Tight tracking on large headings, comfortable line height in body copy, and uppercase mono labels for technical metadata."
          />
          <div className="panel mt-9 px-5 py-2 sm:px-7">
            <SpecRow label="Display" spec="64 / 1.04 / -3.5%">
              <p className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-[2.75rem]">
                Host bots that never sleep.
              </p>
            </SpecRow>
            <SpecRow label="Heading" spec="32 / 1.15 / -2%">
              <p className="text-2xl font-semibold tracking-[-0.02em] sm:text-[2rem]">
                A hosting layer for operators.
              </p>
            </SpecRow>
            <SpecRow label="Subheading" spec="18 / 1.4 / -1%">
              <p className="text-lg font-medium tracking-[-0.01em]">
                Isolated workspaces, clean API.
              </p>
            </SpecRow>
            <SpecRow label="Body" spec="15 / 1.7">
              <p className="max-w-xl text-[0.95rem] leading-relaxed text-mist">
                Body copy stays at a comfortable measure with mist-toned text on
                ink surfaces, reserving pure chalk for emphasis and headings.
              </p>
            </SpecRow>
            <SpecRow label="Caption" spec="12 / 1.5">
              <p className="text-xs text-ash">
                Secondary metadata, helper text and timestamps.
              </p>
            </SpecRow>
            <SpecRow label="Mono label" spec="10 / 0.18em">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-violet-300">
                Stage 01 · Foundation
              </p>
            </SpecRow>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <Container>
          <SectionHeading eyebrow="04 · Components" title="Buttons, badges, fields and cards." />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            <div className="panel p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Buttons
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button>
                  Primary
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="quiet">Quiet</Button>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
              <p className="mt-5 text-[0.7rem] leading-relaxed text-ash">
                44px default height, 8px radius, 220ms ease-out transitions and a
                single-pixel lift on press.
              </p>
            </div>

            <div className="panel p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Badges & status
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <Badge tone="brand">Stage 01</Badge>
                <Badge tone="success">
                  <CircleCheck className="h-2.5 w-2.5" />
                  Operational
                </Badge>
                <Badge tone="warning">Scaffolded</Badge>
                <Badge tone="neutral">Queued</Badge>
                <Badge tone="outline">Outline</Badge>
              </div>
              <div className="mt-6 space-y-3 rounded-lg border border-[var(--hairline)] bg-black/20 p-4">
                <div className="flex items-center justify-between text-[0.78rem]">
                  <span className="text-mist">API surface</span>
                  <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-mint">
                    <StatusDot />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-[0.78rem]">
                  <span className="text-mist">Database</span>
                  <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-amber">
                    <StatusDot tone="warning" />
                    Pending
                  </span>
                </div>
                <div className="flex items-center justify-between text-[0.78rem]">
                  <span className="text-mist">Bot runtime</span>
                  <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ash">
                    <StatusDot tone="muted" />
                    Unbound
                  </span>
                </div>
              </div>
            </div>

            <div className="panel p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Fields
              </p>
              <div className="mt-5 space-y-4">
                <Field label="Email" htmlFor="ds-email">
                  <Input
                    id="ds-email"
                    type="email"
                    placeholder="you@company.com"
                    icon={AtSign}
                  />
                </Field>
                <Field label="API key" htmlFor="ds-key" hint="read-only example">
                  <Input
                    id="ds-key"
                    type="text"
                    defaultValue="dn_live_••••••••••••"
                    icon={KeyRound}
                    readOnly
                  />
                </Field>
              </div>
            </div>

            <div className="panel p-6">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                Card
              </p>
              <Card className="mt-5 bg-black/20">
                <div className="flex items-start justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--hairline)] bg-white/[0.04]">
                    <Server className="h-4 w-4 text-violet-300" />
                  </span>
                  <Badge tone="warning">Scaffolded</Badge>
                </div>
                <p className="mt-4 text-[0.9rem] font-semibold text-chalk">
                  Bot runtime
                </p>
                <p className="mt-1.5 text-[0.78rem] leading-relaxed text-mist">
                  The interface exists; no process is provisioned in this stage.
                </p>
              </Card>
              <p className="mt-4 text-[0.7rem] leading-relaxed text-ash">
                16px radius, hairline border, subtle top sheen, optional 2px lift
                on hover.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="05 · Space & radius" title="A 4px rhythm." />
              <div className="mt-7 space-y-3">
                {[
                  { token: "4 · xs", width: "w-1" },
                  { token: "8 · sm", width: "w-2" },
                  { token: "12 · md", width: "w-3" },
                  { token: "16 · base", width: "w-4" },
                  { token: "24 · lg", width: "w-6" },
                  { token: "32 · xl", width: "w-8" },
                  { token: "48 · 2xl", width: "w-12" },
                ].map((step) => (
                  <div key={step.token} className="flex items-center gap-4">
                    <span className="w-20 font-mono text-[0.6rem] text-ash">
                      {step.token}
                    </span>
                    <span className={`h-2 rounded-full bg-violet-500/70 ${step.width}`} />
                  </div>
                ))}
              </div>
              <div className="mt-7 flex gap-3">
                {[
                  { label: "8px", cls: "rounded-lg" },
                  { label: "12px", cls: "rounded-xl" },
                  { label: "16px", cls: "rounded-2xl" },
                  { label: "24px", cls: "rounded-3xl" },
                ].map((radius) => (
                  <div
                    key={radius.label}
                    className={`flex h-20 flex-1 items-end justify-center border border-[var(--hairline-strong)] bg-white/[0.03] pb-2 font-mono text-[0.55rem] text-ash ${radius.cls}`}
                  >
                    {radius.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="06 · Motion" title="Subtle, never decorative." />
              <div className="mt-7 space-y-3">
                {[
                  { name: "Colour & border", spec: "200ms · ease-out-soft" },
                  { name: "Card hover", spec: "260ms · 2px lift" },
                  { name: "Mobile sheet", spec: "300ms · height + opacity" },
                  { name: "Hero entrance", spec: "700ms · 14px rise" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-[var(--hairline)] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-[0.8rem] text-chalk">{item.name}</span>
                    <span className="font-mono text-[0.6rem] text-ash">
                      {item.spec}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.72rem] leading-relaxed text-ash">
                All motion respects{" "}
                <span className="font-mono text-[0.65rem]">
                  prefers-reduced-motion
                </span>
                . Nothing loops except the live status dot.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--hairline)]">
        <Container>
          <SectionHeading
            eyebrow="07 · Iconography"
            title="One stroke family."
            description="Lucide icons at 1.5–2px stroke, sized 12–20px, always paired with a label or accessible name."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {iconSet.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="flex items-center gap-3 rounded-lg border border-[var(--hairline)] bg-white/[0.02] px-4 py-3.5"
                >
                  <Icon className="h-4 w-4 text-violet-300" />
                  <span className="font-mono text-[0.65rem] text-ash">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="panel mt-8 grid gap-5 p-6 sm:grid-cols-3">
            <div>
              <p className="text-[0.8rem] font-medium text-chalk">Focus</p>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ash">
                A 2px violet outline with a 2px offset. Never removed.
              </p>
              <button
                type="button"
                className="mt-3 rounded-lg border border-[var(--hairline-strong)] px-3 py-2 text-[0.75rem] text-chalk focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
              >
                Focus me
              </button>
            </div>
            <div>
              <p className="text-[0.8rem] font-medium text-chalk">Contrast</p>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ash">
                Chalk on ink exceeds 15:1. Mist body text stays above 7:1 on
                surfaces.
              </p>
            </div>
            <div>
              <p className="text-[0.8rem] font-medium text-chalk">Targets</p>
              <p className="mt-1.5 text-[0.72rem] leading-relaxed text-ash">
                Minimum 40px touch height on mobile, 44px for primary actions.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
