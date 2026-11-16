import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export function CtaBand() {
  return (
    <section className="border-t border-[var(--hairline)]">
      <Container className="py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-b from-violet-700/16 via-ink-850 to-ink-900 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(60% 80% at 50% 0%, rgba(124,77,255,0.28), transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="eyebrow justify-center">Accounts are live</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-chalk sm:text-4xl">
              The foundation is in place. The runtime comes next.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-mist sm:text-[0.95rem]">
              Branding, design system, application structure and the API surface
              are ready. Authentication, database binding and bot hosting land
              in the stages that follow.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/platform" size="lg">
                What&apos;s next
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="secondary" size="lg">
                Preview the dashboard
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
