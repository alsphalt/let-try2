/** Read a JSON response without throwing when a proxy returns HTML. */
export async function readJson<T>(response: Response): Promise<T | null> {
  const text = await response.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/**
 * Concrete fallback text when the API could not return a JSON message.
 * This is what replaces the old generic "Something went wrong" copy.
 */
export function httpErrorMessage(status: number): string {
  if (status === 401) return "Incorrect email, username or password.";
  if (status === 403) return "This request was blocked for security reasons.";
  if (status === 404)
    return "The authentication endpoint could not be found (HTTP 404). The app may need to be rebuilt or redeployed.";
  if (status === 422) return "Check the highlighted fields and try again.";
  if (status === 429) return "Too many attempts. Wait a moment and try again.";
  if (status >= 500)
    return `The authentication server failed to complete the request (HTTP ${status}). Check the server logs.`;
  return `The request failed (HTTP ${status}). Please try again.`;
}
