import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ComingSoon({
  icon: Icon,
  section,
  title,
  description,
  planned,
  actions,
  footnote,
}: {
  icon: LucideIcon;
  section: string;
  title: string;
  description: ReactNode;
  planned: string[];
  actions?: ReactNode;
  footnote?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-gradient-to-b from-ink-850 to-ink-900 px-5 py-10 sm:px-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(60% 60% at 50% 0%, rgba(124,77,255,0.18), transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-fade opacity-40"
      />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/25 bg-gradient-to-b from-violet-500/20 to-white/[0.02]">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-2xl bg-violet-600/30 blur-xl"
          />
          <Icon className="h-7 w-7 text-violet-200" />
        </span>

        <Badge tone="brand" className="mt-6">
          Coming soon
        </Badge>

        <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
          {section}
        </p>
        <h2 className="mt-2 text-balance text-2xl font-semibold tracking-[-0.03em] text-chalk sm:text-[2rem] sm:leading-[1.15]">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-pretty text-[0.85rem] leading-relaxed text-mist">
          {description}
        </p>

        {actions ? (
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">{actions}</div>
        ) : null}

        <div className="mt-9 w-full rounded-xl border border-[var(--hairline)] bg-black/25 p-4 text-left sm:p-5">
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-ash">
            Planned for this section
          </p>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {planned.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[0.76rem] leading-relaxed text-mist"
              >
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-violet-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {footnote ? (
          <p className="mt-5 text-[0.66rem] leading-relaxed text-ash">
            {footnote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
