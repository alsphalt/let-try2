"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  AtSign,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import {
  hasFieldErrors,
  validateLogin,
  validateRegistration,
  type FieldErrors,
} from "@/lib/auth-validation";
import { cn } from "@/lib/cn";

type Mode = "signin" | "signup";

type ApiResponse = {
  ok?: boolean;
  message?: string;
  fields?: FieldErrors;
  user?: { id: string; username: string; email: string };
};

const copy = {
  signin: {
    eyebrow: "Sign in",
    title: "Welcome back",
    description: "Sign in to your DARKNOTE HOSTS control plane.",
    submit: "Sign in",
    alternate: "New here?",
    alternateLink: "/register",
    alternateLabel: "Create an account",
  },
  signup: {
    eyebrow: "Get started",
    title: "Create your account",
    description: "Set up your DARKNOTE HOSTS account and workspace.",
    submit: "Create account",
    alternate: "Already have an account?",
    alternateLink: "/login",
    alternateLabel: "Sign in",
  },
} as const;

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const content = copy[mode];

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const clearField = (field: keyof FieldErrors) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);
    setSuccess(null);

    const clientErrors =
      mode === "signup"
        ? validateRegistration({ username, email, password, confirmPassword })
        : validateLogin({ identifier, password });

    if (hasFieldErrors(clientErrors)) {
      setFieldErrors(clientErrors);
      setFormError("Check the highlighted fields and try again.");
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    try {
      const endpoint =
        mode === "signup" ? "/api/auth/register" : "/api/auth/login";
      const payload =
        mode === "signup"
          ? { username, email, password, confirmPassword }
          : { identifier, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "same-origin",
      });

      const data = (await response.json().catch(() => ({}))) as ApiResponse;

      if (!response.ok) {
        setFieldErrors(data.fields ?? {});
        setFormError(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setSuccess(
        mode === "signup"
          ? "Account created. Taking you to your dashboard…"
          : "Signed in. Taking you to your dashboard…",
      );
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setFormError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="eyebrow">{content.eyebrow}</p>
      <h1 className="mt-3 text-[1.85rem] font-semibold tracking-[-0.03em] text-chalk">
        {content.title}
      </h1>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-mist">
        {content.description}
      </p>

      {formError ? (
        <div
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-lg border border-rose/25 bg-rose/[0.06] px-3.5 py-3"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" />
          <p className="text-[0.74rem] leading-relaxed text-rose/90">{formError}</p>
        </div>
      ) : null}

      {success ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 flex items-start gap-2.5 rounded-lg border border-mint/25 bg-mint/[0.06] px-3.5 py-3"
        >
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" />
          <p className="text-[0.74rem] leading-relaxed text-mint/90">{success}</p>
        </div>
      ) : null}

      <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
        {mode === "signup" ? (
          <Field label="Username" htmlFor="username" hint="3–24 characters">
            <Input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="ada_operator"
              icon={UserRound}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                clearField("username");
              }}
              aria-invalid={Boolean(fieldErrors.username)}
              aria-describedby={fieldErrors.username ? "username-error" : undefined}
              className={fieldErrors.username ? "border-rose/50" : undefined}
              required
            />
            {fieldErrors.username ? (
              <p id="username-error" className="text-[0.68rem] text-rose">
                {fieldErrors.username}
              </p>
            ) : null}
          </Field>
        ) : null}

        {mode === "signup" ? (
          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              icon={AtSign}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearField("email");
              }}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={fieldErrors.email ? "border-rose/50" : undefined}
              required
            />
            {fieldErrors.email ? (
              <p id="email-error" className="text-[0.68rem] text-rose">
                {fieldErrors.email}
              </p>
            ) : null}
          </Field>
        ) : (
          <Field label="Email or username" htmlFor="identifier">
            <Input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              placeholder="you@company.com"
              icon={UserRound}
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                clearField("identifier");
              }}
              aria-invalid={Boolean(fieldErrors.identifier)}
              aria-describedby={
                fieldErrors.identifier ? "identifier-error" : undefined
              }
              className={fieldErrors.identifier ? "border-rose/50" : undefined}
              required
            />
            {fieldErrors.identifier ? (
              <p id="identifier-error" className="text-[0.68rem] text-rose">
                {fieldErrors.identifier}
              </p>
            ) : null}
          </Field>
        )}

        <Field
          label="Password"
          htmlFor="password"
          hint={mode === "signup" ? "10+ chars, letters & numbers" : undefined}
        >
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            placeholder="••••••••••"
            icon={LockKeyhole}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              clearField("password");
            }}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            className={fieldErrors.password ? "border-rose/50" : undefined}
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
          {fieldErrors.password ? (
            <p id="password-error" className="text-[0.68rem] text-rose">
              {fieldErrors.password}
            </p>
          ) : null}
        </Field>

        {mode === "signup" ? (
          <Field label="Confirm password" htmlFor="confirmPassword">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••••"
              icon={LockKeyhole}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                clearField("confirmPassword");
              }}
              aria-invalid={Boolean(fieldErrors.confirmPassword)}
              aria-describedby={
                fieldErrors.confirmPassword ? "confirm-error" : undefined
              }
              className={fieldErrors.confirmPassword ? "border-rose/50" : undefined}
              required
            />
            {fieldErrors.confirmPassword ? (
              <p id="confirm-error" className="text-[0.68rem] text-rose">
                {fieldErrors.confirmPassword}
              </p>
            ) : null}
          </Field>
        ) : (
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-[0.72rem] text-violet-200 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className={cn("w-full", submitting && "cursor-wait")}
          disabled={submitting || Boolean(success)}
        >
          {submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              {mode === "signup" ? "Creating account…" : "Signing in…"}
            </>
          ) : (
            <>
              {content.submit}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
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
