import { ArrowDown, Braces, Database, MonitorSmartphone, ServerCog } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/ui/section";

const layers = [
  {
    icon: MonitorSmartphone,
    label: "Presentation",
    title: "Next.js app router",
    detail: "React 19 · server components · typed routes",
    meta: "src/app",
    tone: "text-violet-200",
  },
  {
    icon: ServerCog,
    label: "Control plane",
    title: "Route handlers & services",
    detail: "auth · bots · integrations · health",
    meta: "src/app/api · src/server",
    tone: "text-violet-200",
  },
  {
    icon: Database,
    label: "Persistence",
    title: "Adapter boundary",
    detail: "Postgres-ready interface, no driver bound yet",
    meta: "src/server/db",
    tone: "text-violet-200",
  },
];

export function Architecture() {
  return (
    <Section className="border-t border-[var(--hairline)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Application structure"
              title="Clear seams now, so features land without a rewrite."
              description="Frontend, API surface and service layer are separated from day one. Authentication, database and bot runtime plug into interfaces that already exist."
            />

            <ul className="mt-8 space-y-4">
              {[
                "Frontend components never reach into the database directly.",
                "Every server capability sits behind a typed module with one job.",
                "Configuration is validated at startup and never imported client-side.",
                "Secrets stay in environment variables — nothing hard-coded, nothing committed.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-[0.86rem] text-mist">
                  <span
                    aria-hidden
                    className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-violet-400"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 inline-flex items-center gap-2 rounded-lg border border-[var(--hairline)] bg-white/[0.02] px-3 py-2 font-mono text-[0.65rem] text-ash">
              <Braces className="h-3.5 w-3.5 text-violet-400" />
              typed · modular · server-first
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 rounded-[2rem] bg-violet-700/10 blur-2xl"
            />
            <div className="panel rounded-2xl p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                  request path
                </p>
                <p className="font-mono text-[0.6rem] text-ash">foundation layout</p>
              </div>

              <div className="space-y-2.5">
                {layers.map((layer, index) => {
                  const Icon = layer.icon;
                  return (
                    <div key={layer.title}>
                      <div className="group relative rounded-xl border border-[var(--hairline)] bg-gradient-to-b from-white/[0.045] to-white/[0.012] p-4 transition-colors duration-300 hover:border-violet-400/30">
                        <div className="flex items-start gap-3.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-black/30">
                            <Icon className="h-4 w-4 text-violet-300" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ash">
                                {layer.label}
                              </p>
                              <p className="font-mono text-[0.55rem] text-ash/70">
                                {layer.meta}
                              </p>
                            </div>
                            <p className="mt-1 text-[0.86rem] font-medium text-chalk">
                              {layer.title}
                            </p>
                            <p className="mt-0.5 text-[0.72rem] text-ash">
                              {layer.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index < layers.length - 1 ? (
                        <div className="flex justify-center py-1.5">
                          <ArrowDown className="h-3.5 w-3.5 text-violet-500/50" />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-dashed border-[var(--hairline-strong)] bg-black/20 px-4 py-3">
                <p className="text-[0.68rem] leading-relaxed text-ash">
                  Interfaces are defined; drivers and providers are intentionally
                  unbound in this stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
