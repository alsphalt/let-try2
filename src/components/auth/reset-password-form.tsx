"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { validatePassword } from "@/lib/auth-validation";
import { httpErrorMessage, readJson } from "@/lib/api-response";

type ApiResponse = {
  ok?: boolean;
  message?: string;
  fields?: { password?: string; confirmPassword?: string };
};

export function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<ApiResponse["fields"]>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!token) {
    return (
      <div>
        <p className="eyebrow">Account recovery</p>
        <h1 className="mt-3 text-[1.85rem] font-semibold tracking-[-0.03em] text-chalk">
          Link incomplete
        </h1>
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-rose/25 bg-rose/[0.06] px-3.5 py-3">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose" />
          <p className="text-[0.74rem] leading-relaxed text-rose/90">
            This reset link has no token. Request a new link to continue.
          </p>
        </div>
        <ButtonLink href="/forgot-password" className="mt-6 w-full" size="lg">
          Request a new link
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    );
  }

  if (success) {
    return (
      <div>
        <p className="eyebrow">Account recovery</p>
        <h1 className="mt-3 text-[1.85rem] font-semibold tracking-[-0.03em] text-chalk">
          Password updated
        </h1>
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-mint/25 bg-mint/[0.06] px-3.5 py-3">
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" />
          <p className="text-[0.74rem] leading-relaxed text-mint/90">
            Your password has been changed and existing sessions were signed out.
          </p>
        </div>
        <ButtonLink href="/login" className="mt-6 w-full" size="lg">
          Continue to sign in
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setFormError(null);
    setFieldErrors({});

    const passwordError = validatePassword(password);
    if (passwordError) {
      setFieldErrors({ password: passwordError });
      return;
    }
    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match." });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });
      const data = (await readJson<ApiResponse>(response)) ?? {};

      if (!response.ok) {
        setFieldErrors(data.fields ?? {});
        setFormError(data.message ?? httpErrorMessage(response.status));
        return;
      }

      setSuccess(true);
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
        Choose a new password
      </h1>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-mist">
        Use at least 10 characters with a letter and a number.
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

      <form className="mt-7 space-y-5" onSubmit={onSubmit} noValidate>
        <Field label="New password" htmlFor="new-password">
          <Input
            id="new-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••••"
            icon={LockKeyhole}
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setFieldErrors((current) => ({ ...current, password: undefined }));
            }}
            aria-invalid={Boolean(fieldErrors?.password)}
            className={fieldErrors?.password ? "border-rose/50" : undefined}
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
          {fieldErrors?.password ? (
            <p className="text-[0.68rem] text-rose">{fieldErrors.password}</p>
          ) : null}
        </Field>

        <Field label="Confirm new password" htmlFor="confirm-new-password">
          <Input
            id="confirm-new-password"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••••"
            icon={LockKeyhole}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setFieldErrors((current) => ({
                ...current,
                confirmPassword: undefined,
              }));
            }}
            aria-invalid={Boolean(fieldErrors?.confirmPassword)}
            className={fieldErrors?.confirmPassword ? "border-rose/50" : undefined}
            required
          />
          {fieldErrors?.confirmPassword ? (
            <p className="text-[0.68rem] text-rose">
              {fieldErrors.confirmPassword}
            </p>
          ) : null}
        </Field>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Updating…
            </>
          ) : (
            <>
              Update password
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-7 text-center text-[0.78rem] text-ash">
        Remembered it?{" "}
        <Link
          href="/login"
          className="font-medium text-violet-200 underline-offset-4 hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
