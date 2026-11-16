"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type LogoMarkProps = {
  className?: string;
  withGlow?: boolean;
};

/** The DARKNOTE HOSTS monogram: an outlined "D" inside a violet-lit tile. */
export function LogoMark({ className, withGlow = false }: LogoMarkProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const tileId = `dn-tile-${uid}`;
  const markId = `dn-mark-${uid}`;

  return (
    <span className={cn("relative inline-flex", className)}>
      {withGlow ? (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 rounded-[30%] bg-violet-500/40 blur-lg"
        />
      ) : null}
      <svg
        viewBox="0 0 44 44"
        role="img"
        aria-label="DARKNOTE HOSTS"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={tileId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#191029" />
            <stop offset="55%" stopColor="#0c0817" />
            <stop offset="100%" stopColor="#07050d" />
          </linearGradient>
          <linearGradient id={markId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DDD3FF" />
            <stop offset="45%" stopColor="#9B72FF" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
        <rect
          x="0.8"
          y="0.8"
          width="42.4"
          height="42.4"
          rx="12.4"
          fill={`url(#${tileId})`}
          stroke="rgba(178,152,255,0.26)"
          strokeWidth="1.1"
        />
        <path
          d="M15.6 12.6h6.5c6.2 0 10.6 4.2 10.6 9.4s-4.4 9.4-10.6 9.4h-6.5V12.6Z"
          fill="none"
          stroke={`url(#${markId})`}
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
        <path
          d="M15.6 10.8v22.4"
          stroke="#EFE9FF"
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <circle cx="27.1" cy="12.9" r="2.05" fill="#C9B6FF" />
      </svg>
    </span>
  );
}

type LogoProps = {
  className?: string;
  compact?: boolean;
  markClassName?: string;
};

/** Full lockup used in the header, footer and auth panels. */
export function Logo({ className, compact = false, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark
        className={cn("h-9 w-9 shrink-0", markClassName)}
        withGlow={false}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.8rem] font-semibold tracking-[0.26em] text-chalk">
          DARKNOTE
        </span>
        {!compact ? (
          <span className="mt-1.5 flex items-center gap-1.5">
            <span className="h-px w-3 bg-violet-500/70" />
            <span className="text-[0.6rem] font-medium tracking-[0.42em] text-violet-300">
              HOSTS
            </span>
          </span>
        ) : null}
      </span>
    </span>
  );
}
