"use client";

import { useState } from "react";
import { AtSign, Info, Send, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

const topics = [
  "General question",
  "Bot hosting",
  "API access",
  "Billing & wallet",
  "Report a problem",
];

export function ContactForm() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setNotice(
          "Message delivery is not connected in this build. Your text stayed in the browser and was not sent.",
        );
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name">
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Ada Lovelace"
            icon={UserRound}
            required
          />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            icon={AtSign}
            required
          />
        </Field>
      </div>

      <Field label="Topic" htmlFor="contact-topic">
        <div className="relative">
          <select
            id="contact-topic"
            name="topic"
            defaultValue={topics[0]}
            className="h-11 w-full appearance-none rounded-lg border border-[var(--hairline)] bg-black/35 px-3.5 pr-9 text-[0.875rem] text-chalk transition-[border-color,box-shadow] duration-200 hover:border-[var(--hairline-strong)] focus:border-violet-400/60 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic} className="bg-ink-850">
                {topic}
              </option>
            ))}
          </select>
          <span
            aria-hidden
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[0.6rem] text-ash"
          >
            ▾
          </span>
        </div>
      </Field>

      <Field
        label="Message"
        htmlFor="contact-message"
        hint="Details help"
      >
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="Tell us what you are building, or what you need help with."
          className="w-full resize-y rounded-lg border border-[var(--hairline)] bg-black/35 px-3.5 py-3 text-[0.875rem] leading-relaxed text-chalk placeholder:text-ash/70 transition-[border-color,box-shadow,background-color] duration-200 hover:border-[var(--hairline-strong)] focus:border-violet-400/60 focus:bg-black/50 focus:outline-none focus:ring-4 focus:ring-violet-500/10"
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2 text-[0.68rem] leading-relaxed text-ash">
          <Info className="mt-0.5 h-3 w-3 shrink-0 text-amber" />
          Delivery is not connected in this stage.
        </p>
        <Button type="submit" className="shrink-0">
          Send message
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={
          notice
            ? "rounded-lg border border-[var(--hairline)] bg-white/[0.03] px-3.5 py-3 text-[0.72rem] leading-relaxed text-mist"
            : "sr-only"
        }
      >
        {notice}
      </p>
    </form>
  );
}
