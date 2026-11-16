import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <div aria-hidden className="aurora" />
      <div aria-hidden className="absolute inset-0 grid-fade opacity-50" />

      <header className="page-shell relative flex h-[var(--header-height)] items-center">
        <Logo />
      </header>

      <main className="relative flex flex-1 items-center">
        <div className="page-shell py-16">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-violet-300">
            404 · signal lost
          </p>
          <h1 className="mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.035em] text-chalk sm:text-5xl">
            This route isn&apos;t hosted here.
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-mist">
            The page you asked for does not exist in this build. The foundation
            ships only the surfaces that are fully wired.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </ButtonLink>
            <ButtonLink href="/platform" variant="secondary">
              Platform overview
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </main>

      <footer className="page-shell relative py-6">
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ash/70">
          DARKNOTE HOSTS · independent platform
        </p>
      </footer>
    </div>
  );
}
