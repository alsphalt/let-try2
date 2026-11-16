import type { ReactNode } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bot,
  KeyRound,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";

const nav = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, active: true },
  { label: "Bots", href: "/dashboard#bots", icon: Bot, active: false, count: 0 },
  { label: "API keys", href: "/dashboard#api-keys", icon: KeyRound, active: false, count: 0 },
  { label: "Activity", href: "/dashboard#activity", icon: Activity, active: false },
  { label: "Settings", href: "/dashboard#settings", icon: Settings, active: false },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-ink-950">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--hairline)] bg-ink-900/60 lg:flex">
        <div className="flex h-16 items-center border-b border-[var(--hairline)] px-5">
          <Link href="/" className="rounded-md hover:opacity-85">
            <Logo />
          </Link>
        </div>

        <nav aria-label="Dashboard" className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={
                  item.active
                    ? "flex items-center gap-3 rounded-lg border border-violet-500/20 bg-violet-500/[0.09] px-3 py-2.5 text-[0.82rem] text-chalk"
                    : "flex items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-[0.82rem] text-mist transition-colors duration-200 hover:bg-white/[0.04] hover:text-chalk"
                }
              >
                <Icon
                  className={
                    item.active
                      ? "h-4 w-4 text-violet-300"
                      : "h-4 w-4 text-ash"
                  }
                />
                <span className="flex-1">{item.label}</span>
                {"count" in item && typeof item.count === "number" ? (
                  <span className="font-mono text-[0.6rem] text-ash">
                    {item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--hairline)] p-3">
          <div className="rounded-lg border border-[var(--hairline)] bg-white/[0.02] p-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-500/15">
                <LogoMark className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.72rem] font-medium text-chalk">
                  Personal workspace
                </p>
                <p className="font-mono text-[0.55rem] uppercase tracking-[0.1em] text-ash">
                  not provisioned
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="mt-3 flex items-center justify-between px-1 text-[0.7rem] text-ash transition-colors hover:text-chalk"
          >
            Back to site
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-ink-950/85 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-5 sm:px-7">
            <div className="flex items-center gap-3">
              <Link href="/" className="lg:hidden">
                <LogoMark className="h-8 w-8" />
              </Link>
              <div className="hidden items-center gap-2.5 text-[0.78rem] sm:flex">
                <span className="text-ash">Personal</span>
                <span className="text-ash/50">/</span>
                <span className="text-chalk">Overview</span>
              </div>
              <div className="sm:hidden">
                <span className="text-[0.85rem] font-medium text-chalk">
                  Overview
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge tone="brand" className="hidden sm:inline-flex">
                {site.stage}
              </Badge>
              <Link
                href="/login"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/25 bg-violet-500/15 font-mono text-[0.6rem] text-violet-200 transition-colors hover:bg-violet-500/25"
                aria-label="Account — sign in"
              >
                DN
              </Link>
            </div>
          </div>

          {/* Mobile nav */}
          <nav
            aria-label="Dashboard sections"
            className="flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden"
          >
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    item.active
                      ? "flex shrink-0 items-center gap-2 rounded-lg bg-violet-500/10 px-3 py-2 text-[0.72rem] text-chalk"
                      : "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-[0.72rem] text-ash transition-colors hover:text-chalk"
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="flex-1 px-5 py-8 sm:px-7 lg:px-9">{children}</main>

        <footer className="border-t border-[var(--hairline)] px-5 py-4 sm:px-7">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ash/70">
            {site.name} · v{site.version} · foundation
          </p>
        </footer>
      </div>
    </div>
  );
}
