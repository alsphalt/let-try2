import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-[var(--hairline)] bg-ink-950/60">
      <div className="page-shell py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ash">
              An always-on runtime for messaging bots and internal automations.
              Built for operators who want their stack to stay quiet and
              predictable.
            </p>
            <div className="mt-5 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ash">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
              {site.stage}
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ash">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist transition-colors duration-200 hover:text-chalk"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[var(--hairline)] pt-6 text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>© {site.name}. Independent platform.</p>
          <p className="font-mono tracking-[0.12em] text-ash/80">
            v{site.version} · FOUNDATION
          </p>
        </div>
      </div>
    </footer>
  );
}
