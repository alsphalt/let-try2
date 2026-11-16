import { NextResponse } from "next/server";
import {
  createSession,
  createUser,
  findUserByEmail,
  findUserByUsername,
  hashPassword,
  isUniqueViolation,
  setSessionCookie,
  toPublicUser,
} from "@/server/auth";
import { requestMeta, isSameOrigin } from "@/server/http";
import {
  hasFieldErrors,
  normalizeEmail,
  normalizeUsername,
  validateRegistration,
  type FieldErrors,
} from "@/lib/auth-validation";

function fail(status: number, message: string, fields?: FieldErrors) {
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

  const username = normalizeUsername(String(body.username ?? ""));
  const email = normalizeEmail(String(body.email ?? ""));
  const password = String(body.password ?? "");
  const confirmPassword =
    body.confirmPassword === undefined ? undefined : String(body.confirmPassword);

  const errors = validateRegistration({
    username,
    email,
    password,
    confirmPassword,
  });
  if (hasFieldErrors(errors)) {
    return fail(422, "Check the highlighted fields and try again.", errors);
  }

  const duplicateErrors: FieldErrors = {};
  if (findUserByEmail(email)) {
    duplicateErrors.email = "An account with this email already exists.";
  }
  if (findUserByUsername(username)) {
    duplicateErrors.username = "That username is already taken.";
  }
  if (hasFieldErrors(duplicateErrors)) {
    return fail(409, "An account already exists with those details.", duplicateErrors);
  }

  let user;
  try {
    const passwordHash = await hashPassword(password);
    user = createUser({ username, email, passwordHash });
  } catch (error) {
    if (isUniqueViolation(error)) {
      return fail(
        409,
        "An account already exists with that email or username.",
      );
    }
    console.error("Registration failed", error);
    return fail(500, "Could not create the account. Please try again.");
  }

  const session = createSession(user.id, requestMeta(request));
  const response = NextResponse.json(
    {
      ok: true,
      message: "Account created.",
      user: toPublicUser(user),
    },
    { status: 201 },
  );
  setSessionCookie(response, session.token, session.expiresAt);
  return response;
}
