import type { ReactNode } from "react";
import { Info } from "lucide-react";

export function Notice({
  children,
  tone = "amber",
}: {
  children: ReactNode;
  tone?: "amber" | "violet";
}) {
  const styles =
    tone === "amber"
      ? "border-amber/20 bg-amber/[0.04] text-amber/90"
      : "border-violet-500/20 bg-violet-500/[0.05] text-violet-100/90";

  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-4 py-3 ${styles}`}
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <p className="text-[0.74rem] leading-relaxed">{children}</p>
    </div>
  );
}
