import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-lg font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-45 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400";

const variants: Record<Variant, string> = {
  primary:
    "bg-violet-500 text-white shadow-[0_10px_30px_-12px_rgba(124,77,255,0.9)] " +
    "hover:bg-violet-400 hover:shadow-[0_14px_38px_-14px_rgba(148,112,255,0.95)] active:translate-y-px",
  secondary:
    "border border-[var(--hairline-strong)] bg-white/[0.03] text-chalk " +
    "hover:border-violet-400/45 hover:bg-white/[0.06] active:translate-y-px",
  ghost:
    "border border-transparent text-mist hover:border-[var(--hairline)] hover:bg-white/[0.04] hover:text-chalk",
  quiet:
    "border border-transparent bg-white/[0.04] text-chalk hover:bg-white/[0.08]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.9375rem] md:h-[3.25rem]",
};

export function buttonStyles(variant: Variant = "primary", size: Size = "md") {
  return cn(base, variants[variant], sizes[size]);
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonStyles(variant, size), className)} {...props} />
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonStyles(variant, size), className)} {...props} />
  );
}
