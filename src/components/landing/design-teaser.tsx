import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";

const swatches = [
  { name: "Ink", hex: "#040308", className: "bg-[#040308]" },
  { name: "Surface", hex: "#0A0714", className: "bg-[#0A0714]" },
  { name: "Violet", hex: "#7C4DFF", className: "bg-[#7C4DFF]" },
  { name: "Iris", hex: "#B298FF", className: "bg-[#B298FF]" },
  { name: "Mist", hex: "#B4ACCB", className: "bg-[#B4ACCB]" },
  { name: "Mint", hex: "#4ADE9B", className: "bg-[#4ADE9B]" },
];

export function DesignTeaser() {
  return (
    <Section className="border-t border-[var(--hairline)]">
      <Container>
        <SectionHeading
          eyebrow="Design system"
          title="One visual language across every surface."
          description="A documented set of tokens, type styles and components keeps the product coherent as it grows — from marketing pages to the dashboard."
          action={
            <Link
              href="/design"
              className="inline-flex items-center gap-2 text-sm text-violet-200 transition-colors hover:text-white"
            >
              Open the system
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="panel card-hover overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--hairline)] px-6 py-4">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                palette / core
              </p>
              <p className="text-[0.62rem] text-ash">6 tokens</p>
            </div>
            <div className="grid grid-cols-3 gap-3 p-5 sm:grid-cols-6">
              {swatches.map((swatch) => (
                <div key={swatch.name} className="space-y-2">
                  <div
                    className={`h-20 rounded-lg border border-white/10 ${swatch.className}`}
                  />
                  <div>
                    <p className="text-[0.7rem] font-medium text-chalk">
                      {swatch.name}
                    </p>
                    <p className="font-mono text-[0.55rem] text-ash">
                      {swatch.hex}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel card-hover flex flex-col justify-between p-6">
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
                type / interface
              </p>
              <p className="mt-4 text-[2.6rem] font-semibold leading-none tracking-[-0.04em] text-chalk">
                Aa
              </p>
              <p className="mt-3 text-[0.8rem] text-mist">
                Inter Variable for the interface, JetBrains Mono for the
                technical layer.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
