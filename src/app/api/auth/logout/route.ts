import { NextResponse } from "next/server";
import {
  clearSessionCookie,
  deleteSessionByToken,
  getCurrentSessionToken,
} from "@/server/auth";
import { isSameOrigin } from "@/server/http";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, message: "This request was blocked for security reasons." },
      { status: 403 },
    );
  }

  const token = await getCurrentSessionToken();
  if (token) deleteSessionByToken(token);

  const response = NextResponse.json({ ok: true, message: "Signed out." });
  clearSessionCookie(response);
  return response;
}
