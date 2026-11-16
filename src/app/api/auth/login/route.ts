import { NextResponse } from "next/server";
import {
  createSession,
  DUMMY_PASSWORD_HASH,
  findUserByIdentifier,
  setSessionCookie,
  toPublicUser,
  verifyPassword,
} from "@/server/auth";
import { isSameOrigin, requestMeta } from "@/server/http";
import { hasFieldErrors, validateLogin } from "@/lib/auth-validation";

function fail(status: number, message: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fields }, { status });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return fail(403, "This request was blocked for security reasons.");
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return fail(400, "Send a valid JSON body.");
  }

  const identifier = String(body.identifier ?? "").trim();
  const password = String(body.password ?? "");

  const errors = validateLogin({ identifier, password });
  if (hasFieldErrors(errors)) {
    return fail(422, "Enter your credentials to continue.", errors);
  }

  const user = findUserByIdentifier(identifier);
  const valid = await verifyPassword(
    password,
    user?.passwordHash ?? DUMMY_PASSWORD_HASH,
  );

  if (!user || !valid) {
    return fail(401, "Incorrect email, username or password.");
  }

  const session = createSession(user.id, requestMeta(request));
  const response = NextResponse.json({
    ok: true,
    message: "Signed in.",
    user: toPublicUser(user),
  });
  setSessionCookie(response, session.token, session.expiresAt);
  return response;
}
