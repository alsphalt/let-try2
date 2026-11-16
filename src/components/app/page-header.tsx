import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="mt-2 text-[1.7rem] font-semibold tracking-[-0.03em] text-chalk sm:text-[1.9rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-xl text-[0.85rem] leading-relaxed text-mist">
            {description}
          </p>
        ) : null}
      </div>
      {badge || actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          {badge}
          {actions}
        </div>
      ) : null}
    </div>
  );
}
