"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  Info,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";

type Mode = "signin" | "signup";

const copy = {
  signin: {
    title: "Welcome back",
    description: "Sign in to your DARKNOTE HOSTS control plane.",
    submit: "Sign in",
    alternate: "New here?",
    alternateLink: "/register",
    alternateLabel: "Create an account",
  },
  signup: {
    title: "Create your account",
    description: "Reserve your workspace on DARKNOTE HOSTS.",
    submit: "Create account",
    alternate: "Already have an account?",
    alternateLink: "/login",
    alternateLabel: "Sign in",
  },
} as const;

export function AuthForm({ mode }: { mode: Mode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const content = copy[mode];

  return (
    <div>
      <p className="eyebrow">{mode === "signin" ? "Sign in" : "Get started"}</p>
      <h1 className="mt-3 text-[1.85rem] font-semibold tracking-[-0.03em] text-chalk">
        {content.title}
      </h1>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-mist">
        {content.description}
      </p>

      <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-amber/20 bg-amber/[0.05] px-3.5 py-3">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
        <p className="text-[0.72rem] leading-relaxed text-amber/90">
          Stage 01 preview. Authentication is scaffolded but not connected — no
          account is created and nothing you type is stored.
        </p>
      </div>

      <form
        className="mt-7 space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          setNotice(
            "This build has no auth provider bound yet. The form validates locally, then stops here.",
          );
        }}
      >
        {mode === "signup" ? (
          <Field label="Display name" htmlFor="name">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ada Lovelace"
              icon={UserRound}
              required
            />
          </Field>
        ) : null}

        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            icon={AtSign}
            required
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          hint={mode === "signup" ? "8+ characters" : undefined}
        >
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="••••••••"
            icon={LockKeyhole}
            minLength={8}
            required
            trailing={
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="rounded-md p-2 text-ash transition-colors hover:bg-white/[0.05] hover:text-chalk"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          />
        </Field>

        <Button type="submit" size="lg" className="w-full">
          {content.submit}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>

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

      <p className="mt-7 text-center text-[0.8rem] text-ash">
        {content.alternate}{" "}
        <Link
          href={content.alternateLink}
          className="font-medium text-violet-200 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          {content.alternateLabel}
        </Link>
      </p>
    </div>
  );
}
