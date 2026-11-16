import { ArrowRight, CircleCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { StatusPanel } from "@/components/landing/status-panel";
import { site } from "@/lib/site";

const stack = ["Next.js 16", "TypeScript strict", "App Router", "Node 22"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-28">
      <div aria-hidden className="aurora" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="rise inline-flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-violet-500/[0.07] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-violet-200">
                {site.stage}
              </span>
            </div>

            <h1 className="rise rise-1 mt-6 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-[3.4rem] lg:text-[4.15rem]">
              Host bots that
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient">never sleep.</span>
            </h1>

            <p className="rise rise-2 mt-6 max-w-xl text-pretty text-[0.975rem] leading-relaxed text-mist sm:text-[1.05rem]">
              DARKNOTE HOSTS is the always-on home for messaging bots and
              internal automations — isolated workspaces, a clean control API
              and an operator-first dashboard.
            </p>

            <div className="rise rise-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/platform" size="lg">
                Explore the platform
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/design" variant="secondary" size="lg">
                View design system
              </ButtonLink>
            </div>

            <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {stack.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-1.5 text-[0.7rem] text-ash"
                >
                  <CircleCheck className="h-3 w-3 text-violet-400/80" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rise rise-3 lg:pl-4">
            <StatusPanel />
          </div>
        </div>
      </Container>
    </section>
  );
}
