import "server-only";

/** Reject cross-site form posts. Requests without an Origin header (curl, same-origin GET) pass. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export function requestMeta(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return {
    userAgent: request.headers.get("user-agent"),
    ip: forwarded?.split(",")[0]?.trim() || null,
  };
}
