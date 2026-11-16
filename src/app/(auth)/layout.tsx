import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Boxes, Radio, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const highlights = [
  {
    icon: Boxes,
    title: "Isolated by default",
    copy: "One workspace, one boundary. No shared state between projects.",
  },
  {
    icon: Radio,
    title: "Built for uptime",
    copy: "Supervised runtimes that come back cleanly after a restart.",
  },
  {
    icon: ShieldCheck,
    title: "Operator-first access",
    copy: "Scoped API keys and auditable sessions, never shared credentials.",
  },
];

// Signed-in visitors are redirected before this shell renders.
export const instant = false;

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.02fr_0.98fr]">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden border-r border-[var(--hairline)] bg-ink-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div aria-hidden className="aurora" />
        <div aria-hidden className="absolute inset-0 grid-fade opacity-60" />

        <div className="relative">
          <Link href="/" className="inline-flex rounded-md hover:opacity-85">
            <Logo />
          </Link>
        </div>

        <div className="relative max-w-md">
          <p className="eyebrow">Control plane</p>
          <h2 className="mt-4 text-balance text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.03em] text-chalk">
            A quieter place to run the bots that keep your work moving.
          </h2>
          <ul className="mt-9 space-y-5">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-white/[0.04]">
                    <Icon className="h-3.5 w-3.5 text-violet-300" />
                  </span>
                  <div>
                    <p className="text-[0.85rem] font-medium text-chalk">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-ash">
                      {item.copy}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ash">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          Secure sessions · authentication online
        </div>
      </aside>

      {/* Form panel */}
      <main className="relative flex flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="inline-flex lg:hidden">
            <Logo />
          </Link>
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 text-[0.75rem] text-ash transition-colors hover:text-chalk"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="auth-enter w-full max-w-[26rem]">{children}</div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 pb-6 text-center font-mono text-[0.6rem] uppercase tracking-[0.14em] text-ash/70 sm:px-8">
          <span>DARKNOTE HOSTS · independent platform</span>
          <span aria-hidden className="text-ash/30">·</span>
          <Link
            href="/welcome"
            className="transition-colors hover:text-violet-200"
          >
            Replay intro
          </Link>
        </div>
      </main>
    </div>
  );
}
