"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  AtSign,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { validateEmail } from "@/lib/auth-validation";
import { httpErrorMessage, readJson } from "@/lib/api-response";

type ApiResponse = {
  ok?: boolean;
  message?: string;
  fields?: { email?: string };
  devResetUrl?: string;
};

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);
    setMessage(null);
    setDevResetUrl(null);

    const emailError = validateEmail(email);
    if (emailError) {
      setFieldError(emailError);
      return;
    }
    setFieldError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await readJson<ApiResponse>(response)) ?? {};

      if (!response.ok) {
        setFieldError(data.fields?.email ?? null);
        setFormError(data.message ?? httpErrorMessage(response.status));
        return;
      }

      setMessage(
        data.message ??
          "If an account exists for that email, a reset link is on its way.",
      );
      setDevResetUrl(data.devResetUrl ?? null);
    } catch {
      setFormError("Could not reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <p className="eyebrow">Account recovery</p>
      <h1 className="mt-3 text-[1.85rem] font-semibold tracking-[-0.03em] text-chalk">
        Reset your password
      </h1>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-mist">
        Enter the email on your account and we&apos;ll send a single-use reset
        link. It expires in 30 minutes.
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

      {message ? (
        <div
          role="status"
          className="mt-6 rounded-lg border border-mint/25 bg-mint/[0.06] px-3.5 py-3"
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" />
            <p className="text-[0.74rem] leading-relaxed text-mint/90">{message}</p>
          </div>
          {devResetUrl ? (
            <div className="mt-3 border-t border-mint/15 pt-3">
              <p className="text-[0.66rem] leading-relaxed text-mist">
                SMTP is not configured on this environment, so the one-time link
                is shown here for local testing:
              </p>
              <Link
                href={devResetUrl}
                className="mt-2 inline-flex items-center gap-1.5 text-[0.72rem] font-medium text-violet-200 underline underline-offset-4"
              >
                Open reset link
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}

      <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
        <Field label="Email" htmlFor="forgot-email">
          <Input
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            icon={AtSign}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setFieldError(null);
            }}
            aria-invalid={Boolean(fieldError)}
            className={fieldError ? "border-rose/50" : undefined}
            required
          />
          {fieldError ? (
            <p className="text-[0.68rem] text-rose">{fieldError}</p>
          ) : null}
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending link…
            </>
          ) : (
            <>
              Send reset link
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <Link
        href="/login"
        className="mt-7 inline-flex items-center gap-1.5 text-[0.78rem] text-ash transition-colors hover:text-chalk"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to sign in
      </Link>
    </div>
  );
}
