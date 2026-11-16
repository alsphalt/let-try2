import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Tone = "brand" | "neutral" | "success" | "warning" | "outline";

const tones: Record<Tone, string> = {
  brand: "border-violet-500/35 bg-violet-500/12 text-violet-200",
  neutral: "border-white/10 bg-white/[0.05] text-mist",
  success: "border-mint/25 bg-mint/[0.08] text-mint",
  warning: "border-amber/25 bg-amber/[0.08] text-amber",
  outline: "border-[var(--hairline-strong)] bg-transparent text-mist",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: ComponentPropsWithoutRef<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "text-[0.6875rem] font-medium leading-none tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

export function StatusDot({
  tone = "success",
  className,
}: {
  tone?: "success" | "warning" | "muted";
  className?: string;
}) {
  const colors = {
    success: "bg-mint live-dot",
    warning: "bg-amber",
    muted: "bg-ash",
  } as const;
  return (
    <span
      aria-hidden
      className={cn("inline-block h-1.5 w-1.5 rounded-full", colors[tone], className)}
    />
  );
}
