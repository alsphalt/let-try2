"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LoaderCircle,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { pageTitleFor } from "@/lib/app-nav";
import type { SessionUser } from "@/lib/auth-types";
import { site } from "@/lib/site";

type MenuName = "bell" | "profile" | null;

function initialsFor(username: string): string {
  const clean = username.replace(/[^a-zA-Z0-9]/g, "");
  return (clean.slice(0, 2) || "DN").toUpperCase();
}

export function AppTopbar({
  onOpenNav,
  user,
}: {
  onOpenNav: () => void;
  user: SessionUser;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const title = pageTitleFor(pathname);
  const [menu, setMenu] = useState<MenuName>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const clusterRef = useRef<HTMLDivElement>(null);
  const initials = initialsFor(user.username);

  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!clusterRef.current?.contains(event.target as Node)) setMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    setLogoutError(null);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      if (!response.ok) {
        setLogoutError("Could not sign out. Please try again.");
        return;
      }
      setMenu(null);
      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("Could not reach the server. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--hairline)] bg-ink-950/85 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenNav}
            aria-label="Open navigation"
            aria-controls="app-mobile-nav"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--hairline)] bg-white/[0.03] text-mist transition-colors hover:bg-white/[0.07] hover:text-chalk lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          <Link
            href="/"
            aria-label="DARKNOTE HOSTS — home"
            className="shrink-0 rounded-md lg:hidden"
          >
            <LogoMark className="h-8 w-8" />
          </Link>

          <nav aria-label="Breadcrumb" className="hidden min-w-0 md:block">
            <ol className="flex items-center gap-2 text-[0.78rem]">
              <li className="truncate text-ash">{user.username}</li>
              <li aria-hidden className="text-ash/40">
                /
              </li>
              <li className="truncate text-chalk">{title}</li>
            </ol>
          </nav>

          <p className="truncate text-[0.88rem] font-medium text-chalk md:hidden">
            {title}
          </p>
        </div>

        <div ref={clusterRef} className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Badge tone="brand" className="hidden xl:inline-flex">
            {site.stage}
          </Badge>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu((current) => (current === "bell" ? null : "bell"))}
              aria-label="Notifications"
              aria-haspopup="dialog"
              aria-expanded={menu === "bell"}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200",
                menu === "bell"
                  ? "border-violet-400/35 bg-violet-500/12 text-chalk"
                  : "border-transparent text-mist hover:border-[var(--hairline)] hover:bg-white/[0.05] hover:text-chalk",
              )}
            >
              <Bell className="h-[1.05rem] w-[1.05rem]" />
            </button>

            {menu === "bell" ? (
              <div
                role="dialog"
                aria-label="Notifications"
                className="pop-in absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[var(--hairline-strong)] bg-ink-850 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-3">
                  <p className="text-[0.8rem] font-medium text-chalk">
                    Notifications
                  </p>
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-ash">
                    0 new
                  </span>
                </div>
                <div className="flex flex-col items-center px-5 py-8 text-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-white/[0.03]">
                    <Bell className="h-4 w-4 text-ash" />
                  </span>
                  <p className="mt-3 text-[0.8rem] text-chalk">
                    No notifications yet
                  </p>
                  <p className="mt-1 max-w-[15rem] text-[0.68rem] leading-relaxed text-ash">
                    Runtime and billing events will appear here once those
                    services are connected.
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          <span
            aria-hidden
            className="mx-0.5 hidden h-6 w-px bg-[var(--hairline)] sm:block"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setLogoutError(null);
                setMenu((current) => (current === "profile" ? null : "profile"));
              }}
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={menu === "profile"}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border py-1 pl-1 pr-2 transition-colors duration-200",
                menu === "profile"
                  ? "border-violet-400/30 bg-violet-500/[0.08]"
                  : "border-transparent hover:border-[var(--hairline)] hover:bg-white/[0.04]",
              )}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/25 bg-violet-500/15 font-mono text-[0.6rem] text-violet-200">
                {initials}
              </span>
              <span className="hidden max-w-[9rem] text-left sm:block">
                <span className="block truncate text-[0.72rem] font-medium leading-tight text-chalk">
                  {user.username}
                </span>
                <span className="block truncate font-mono text-[0.52rem] tracking-[0.04em] text-ash">
                  {user.email}
                </span>
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-ash transition-transform duration-200",
                  menu === "profile" && "rotate-180",
                )}
              />
            </button>

            {menu === "profile" ? (
              <div
                role="menu"
                aria-label="Profile"
                className="pop-in absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-[var(--hairline-strong)] bg-ink-850 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center gap-3 border-b border-[var(--hairline)] px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-400/25 bg-violet-500/15 font-mono text-[0.62rem] text-violet-200">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[0.78rem] font-medium text-chalk">
                      {user.username}
                    </p>
                    <p className="truncate text-[0.66rem] text-ash">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="p-1.5">
                  <Link
                    href="/settings"
                    role="menuitem"
                    onClick={() => setMenu(null)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.8rem] text-mist transition-colors hover:bg-white/[0.05] hover:text-chalk"
                  >
                    <Settings className="h-4 w-4 text-ash" />
                    Settings
                  </Link>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => void handleLogout()}
                    disabled={loggingOut}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[0.8rem] text-mist transition-colors hover:bg-rose/[0.07] hover:text-rose disabled:opacity-60"
                  >
                    {loggingOut ? (
                      <LoaderCircle className="h-4 w-4 animate-spin text-ash" />
                    ) : (
                      <LogOut className="h-4 w-4 text-ash" />
                    )}
                    {loggingOut ? "Signing out…" : "Logout"}
                  </button>
                </div>

                {logoutError ? (
                  <div
                    role="alert"
                    className="border-t border-[var(--hairline)] bg-rose/[0.05] px-4 py-2.5"
                  >
                    <p className="text-[0.66rem] leading-relaxed text-rose">
                      {logoutError}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 border-t border-[var(--hairline)] px-4 py-2.5">
                    <ShieldCheck className="h-3 w-3 text-violet-400" />
                    <p className="truncate font-mono text-[0.52rem] uppercase tracking-[0.1em] text-ash">
                      Secure session · {site.stage}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
