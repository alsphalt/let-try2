import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AppNavLinks } from "@/components/app/app-nav-links";
import { Logo } from "@/components/brand/logo";
import type { SessionUser } from "@/lib/auth-types";
import { site } from "@/lib/site";

function initialsFor(username: string): string {
  return (username.replace(/[^a-zA-Z0-9]/g, "").slice(0, 2) || "DN").toUpperCase();
}

export function AppSidebar({
  pathname,
  user,
}: {
  pathname: string;
  user: SessionUser;
}) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-[var(--hairline)] bg-ink-900/50 lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-[var(--hairline)] px-5">
        <Link
          href="/"
          className="rounded-md transition-opacity duration-200 hover:opacity-85"
          aria-label="DARKNOTE HOSTS — home"
        >
          <Logo />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ash">
          Workspace
        </p>
        <nav aria-label="Application">
          <AppNavLinks pathname={pathname} />
        </nav>

        <div className="mt-6 rounded-xl border border-[var(--hairline)] bg-white/[0.02] p-4">
          <p className="text-[0.7rem] font-medium text-chalk">Accounts are live</p>
          <p className="mt-1 text-[0.65rem] leading-relaxed text-ash">
            Registration, sign-in and sessions are active. The bot runtime and
            billing arrive in later stages.
          </p>
          <Link
            href="/platform"
            className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] text-violet-300 transition-colors hover:text-violet-200"
          >
            Platform plan
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <div className="border-t border-[var(--hairline)] p-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-[var(--hairline)] bg-white/[0.02] px-3 py-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/25 bg-violet-500/15 font-mono text-[0.62rem] text-violet-200">
            {initialsFor(user.username)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[0.72rem] font-medium text-chalk">
              {user.username}
            </p>
            <p className="truncate text-[0.62rem] text-ash">{user.email}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-1">
          <Link
            href="/"
            className="text-[0.68rem] text-ash transition-colors hover:text-chalk"
          >
            Back to site
          </Link>
          <span className="font-mono text-[0.55rem] text-ash/70">
            v{site.version}
          </span>
        </div>
      </div>
    </aside>
  );
}
