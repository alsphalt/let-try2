import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, htmlFor, hint, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label
          htmlFor={htmlFor}
          className="text-[0.78rem] font-medium text-chalk/90"
        >
          {label}
        </label>
        {hint ? <span className="text-[0.68rem] text-ash">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

type InputProps = ComponentPropsWithoutRef<"input"> & {
  icon?: LucideIcon;
  trailing?: ReactNode;
};

export function Input({ icon: Icon, trailing, className, ...props }: InputProps) {
  return (
    <div className="relative">
      {Icon ? (
        <Icon
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ash"
        />
      ) : null}
      <input
        className={cn(
          "h-11 w-full rounded-lg border border-[var(--hairline)] bg-black/35 text-[0.875rem] text-chalk",
          "placeholder:text-ash/70 transition-[border-color,box-shadow,background-color] duration-200",
          "hover:border-[var(--hairline-strong)]",
          "focus:border-violet-400/60 focus:bg-black/50 focus:outline-none focus:ring-4 focus:ring-violet-500/10",
          Icon ? "pl-10" : "pl-3.5",
          trailing ? "pr-11" : "pr-3.5",
          className,
        )}
        {...props}
      />
      {trailing ? (
        <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
          {trailing}
        </div>
      ) : null}
    </div>
  );
}
