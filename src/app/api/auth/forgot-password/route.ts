import { NextResponse } from "next/server";
import {
  createPasswordResetToken,
  devResetLinkEnabled,
  findUserByEmail,
  mailConfigured,
  sendPasswordResetEmail,
} from "@/server/auth";
import { isSameOrigin } from "@/server/http";
import { normalizeEmail, validateEmail } from "@/lib/auth-validation";

const GENERIC_MESSAGE =
  "If an account exists for that email, a reset link is on its way.";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: "This request was blocked for security reasons." },
      { status: 403 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Send a valid JSON body." },
      { status: 400 },
    );
  }

  if (!mailConfigured() && !devResetLinkEnabled()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Password reset email is not configured on this server. Contact the operator.",
      },
      { status: 503 },
    );
  }

  const email = normalizeEmail(String(body.email ?? ""));
  const emailError = validateEmail(email);
  if (emailError) {
    return NextResponse.json(
      { ok: false, message: emailError, fields: { email: emailError } },
      { status: 422 },
    );
  }

  const user = findUserByEmail(email);
  let devResetUrl: string | undefined;

  if (user) {
    const { token } = createPasswordResetToken(user.id);
    const base = (process.env.APP_URL ?? new URL(request.url).origin).replace(
      /\/$/,
      "",
    );
    const resetUrl = `${base}/reset-password?token=${encodeURIComponent(token)}`;

    try {
      const delivered = await sendPasswordResetEmail({
        to: user.email,
        username: user.username,
        resetUrl,
      });

      if (!delivered && devResetLinkEnabled()) {
        devResetUrl = resetUrl;
      } else if (!delivered) {
        console.warn(
          "Password reset requested but SMTP is not configured. Set SMTP_* variables to deliver reset email.",
        );
      }
    } catch (error) {
      console.error("Password reset email failed", error);
    }
  }

  return NextResponse.json({
    ok: true,
    message: GENERIC_MESSAGE,
    devResetUrl,
  });
}
