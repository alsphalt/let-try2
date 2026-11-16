import { NextResponse } from "next/server";
import {
  consumePasswordResetToken,
  deleteSessionsForUser,
  hashPassword,
  invalidateResetTokensForUser,
  updateUserPassword,
} from "@/server/auth";
import { isSameOrigin } from "@/server/http";
import { validatePassword } from "@/lib/auth-validation";

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

  const token = String(body.token ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!token) {
    return NextResponse.json(
      { ok: false, message: "This reset link is missing its token." },
      { status: 400 },
    );
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return NextResponse.json(
      { ok: false, message: passwordError, fields: { password: passwordError } },
      { status: 422 },
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        ok: false,
        message: "Passwords do not match.",
        fields: { confirmPassword: "Passwords do not match." },
      },
      { status: 422 },
    );
  }

  const userId = consumePasswordResetToken(token);
  if (!userId) {
    return NextResponse.json(
      {
        ok: false,
        message: "This reset link is invalid, expired or already used.",
      },
      { status: 400 },
    );
  }

  const passwordHash = await hashPassword(password);
  updateUserPassword(userId, passwordHash);
  invalidateResetTokensForUser(userId);
  deleteSessionsForUser(userId);

  return NextResponse.json({
    ok: true,
    message: "Password updated. Sign in with your new password.",
  });
}
