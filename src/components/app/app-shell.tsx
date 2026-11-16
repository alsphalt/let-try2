"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AppMobileDrawer } from "@/components/app/app-mobile-drawer";
import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";
import { site } from "@/lib/site";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-ink-950">
      <AppSidebar pathname={pathname} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar onOpenNav={() => setNavOpen(true)} />

        <main className="relative flex-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(124,77,255,0.10),transparent_75%)]"
          />
          <div className="relative mx-auto w-full max-w-6xl px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
            {children}
          </div>
        </main>

        <footer className="border-t border-[var(--hairline)] px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ash/70">
              {site.name} · v{site.version} · foundation
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/api/health"
                className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ash/70 transition-colors hover:text-mist"
              >
                System health
              </Link>
              <Link
                href="/"
                className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-ash/70 transition-colors hover:text-mist"
              >
                Public site
              </Link>
            </div>
          </div>
        </footer>
      </div>

      <AppMobileDrawer
        open={navOpen}
        pathname={pathname}
        onClose={() => setNavOpen(false)}
      />
    </div>
  );
}
