"use client";

import Link from "next/link";
import { NavIcon } from "@/components/app/nav-icon";
import { appNav } from "@/lib/app-nav";
import { cn } from "@/lib/cn";

export function AppNavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1">
      {appNav.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg border px-3 py-2.5",
                "text-[0.82rem] transition-[background-color,border-color,color] duration-200",
                active
                  ? "border-violet-500/20 bg-violet-500/[0.09] text-chalk"
                  : "border-transparent text-mist hover:border-[var(--hairline)] hover:bg-white/[0.035] hover:text-chalk",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-violet-400 transition-opacity duration-200",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              <NavIcon
                href={item.href}
                className={active ? "text-violet-300" : "text-ash"}
              />
              <span className="flex-1">{item.label}</span>
              {item.soon ? (
                <span className="rounded border border-[var(--hairline)] px-1.5 py-0.5 font-mono text-[0.5rem] uppercase tracking-[0.1em] text-ash">
                  Soon
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
