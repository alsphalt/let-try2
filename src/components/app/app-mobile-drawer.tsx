"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { AppNavLinks } from "@/components/app/app-nav-links";
import { Logo, LogoMark } from "@/components/brand/logo";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function AppMobileDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      document
        .querySelector<HTMLButtonElement>('button[aria-controls="app-mobile-nav"]')
        ?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      id="app-mobile-nav"
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close navigation"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Application navigation"
        className={cn(
          "absolute inset-y-0 left-0 flex w-[17.5rem] max-w-[85vw] flex-col border-r border-[var(--hairline)] bg-ink-900",
          "shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[var(--hairline)] px-4">
          <Link href="/" aria-label="DARKNOTE HOSTS — home">
            <Logo />
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--hairline)] bg-white/[0.03] text-mist transition-colors hover:bg-white/[0.07] hover:text-chalk"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ash">
            Workspace
          </p>
          <nav aria-label="Application">
            <AppNavLinks pathname={pathname} onNavigate={onClose} />
          </nav>

          <div className="mt-5 rounded-xl border border-[var(--hairline)] bg-white/[0.02] p-4">
            <p className="text-[0.7rem] font-medium text-chalk">
              Foundation build
            </p>
            <p className="mt-1 text-[0.65rem] leading-relaxed text-ash">
              Layout and navigation are ready. Runtime features arrive in later
              stages.
            </p>
            <Link
              href="/platform"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] text-violet-300"
            >
              Platform plan
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--hairline)] p-3">
          <div className="flex items-center gap-2.5 rounded-lg border border-[var(--hairline)] bg-white/[0.02] px-3 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
              <LogoMark className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[0.72rem] font-medium text-chalk">
                Personal workspace
              </p>
              <p className="font-mono text-[0.52rem] uppercase tracking-[0.1em] text-ash">
                preview · not provisioned
              </p>
            </div>
          </div>
          <Link
            href="/"
            onClick={onClose}
            className="mt-3 flex items-center justify-between px-1 text-[0.68rem] text-ash"
          >
            Back to site
            <span className="font-mono text-[0.55rem]">v{site.version}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
