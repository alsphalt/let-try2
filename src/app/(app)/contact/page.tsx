import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleDashed, Clock3, FileText, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/app/contact-form";
import { Notice } from "@/components/app/notice";
import { PageHeader } from "@/components/app/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach the DARKNOTE HOSTS team.",
};

const readFirst = [
  {
    title: "Platform overview",
    copy: "How the runtime, workspaces and API fit together.",
    href: "/platform",
  },
  {
    title: "Design system",
    copy: "Tokens, components and the visual language.",
    href: "/design",
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        eyebrow="Support"
        title="Contact Us"
        description="Questions about hosting, API access or billing — send a note and it will be routed to the right place."
        badge={
          <Badge tone="warning">
            <CircleDashed className="h-2.5 w-2.5" />
            Delivery not connected
          </Badge>
        }
      />

      <Notice>
        This page is part of the layout foundation. The form validates locally,
        but no message is transmitted or stored until the contact service is
        connected.
      </Notice>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="text-[0.95rem] font-semibold text-chalk">
              Send a message
            </h2>
            <p className="mt-1 text-[0.72rem] text-ash">
              All fields are required.
            </p>
          </div>
          <ContactForm />
        </Card>

        <div className="space-y-4">
          <Card className="p-5">
            <div className="flex items-center gap-2.5">
              <Clock3 className="h-3.5 w-3.5 text-violet-300" />
              <p className="text-[0.82rem] font-medium text-chalk">
                Before you send
              </p>
            </div>
            <ul className="mt-3 space-y-2.5 text-[0.72rem] leading-relaxed text-ash">
              <li className="flex gap-2">
                <span aria-hidden className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                Include the workspace and bot name if your question is about a
                specific instance.
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                For API questions, mention the endpoints you plan to call.
              </li>
              <li className="flex gap-2">
                <span aria-hidden className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                Never include session credentials or pairing codes in a message.
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2.5">
              <FileText className="h-3.5 w-3.5 text-violet-300" />
              <p className="text-[0.82rem] font-medium text-chalk">Read first</p>
            </div>
            <ul className="mt-3 divide-y divide-[var(--hairline)]">
              {readFirst.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-3 py-3 transition-colors"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 text-[0.76rem] text-chalk">
                        {item.title}
                        <ArrowUpRight className="h-3 w-3 text-ash transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-0.5 block text-[0.66rem] leading-relaxed text-ash">
                        {item.copy}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-3.5 w-3.5 text-mint" />
              <p className="text-[0.82rem] font-medium text-chalk">
                System status
              </p>
            </div>
            <p className="mt-2 text-[0.7rem] leading-relaxed text-ash">
              Check the live health endpoint before reporting an outage.
            </p>
            <Link
              href="/api/health"
              className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[0.56rem] uppercase tracking-[0.12em] text-violet-300 transition-colors hover:text-violet-200"
            >
              GET /api/health
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}
