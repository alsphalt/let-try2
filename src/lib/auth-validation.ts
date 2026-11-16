/**
 * Shared, dependency-free validation for auth forms and API routes.
 * The server always re-runs these rules; client checks are only a convenience.
 */

export type FieldErrors = Partial<
  Record<"username" | "email" | "password" | "confirmPassword" | "identifier", string>
>;

export const USERNAME_MIN = 3;
export const USERNAME_MAX = 24;
export const PASSWORD_MIN = 10;
export const PASSWORD_MAX = 128;

const usernamePattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizeUsername(value: string): string {
  return value.trim();
}

export function usernameKey(value: string): string {
  return normalizeUsername(value).toLowerCase();
}

export function validateUsername(value: string): string | null {
  const username = normalizeUsername(value);
  if (!username) return "Username is required.";
  if (username.length < USERNAME_MIN)
    return `Use at least ${USERNAME_MIN} characters.`;
  if (username.length > USERNAME_MAX)
    return `Use ${USERNAME_MAX} characters or fewer.`;
  if (!usernamePattern.test(username))
    return "Start with a letter; use letters, numbers, _ or - only.";
  return null;
}

export function validateEmail(value: string): string | null {
  const email = normalizeEmail(value);
  if (!email) return "Email is required.";
  if (email.length > 254) return "That email address is too long.";
  if (!emailPattern.test(email)) return "Enter a valid email address.";
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return "Password is required.";
  if (value.length < PASSWORD_MIN)
    return `Use at least ${PASSWORD_MIN} characters.`;
  if (value.length > PASSWORD_MAX)
    return `Use ${PASSWORD_MAX} characters or fewer.`;
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value))
    return "Include at least one letter and one number.";
  return null;
}

export type RegistrationInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export function validateRegistration(input: RegistrationInput): FieldErrors {
  const errors: FieldErrors = {};
  const username = validateUsername(input.username);
  const email = validateEmail(input.email);
  const password = validatePassword(input.password);
  if (username) errors.username = username;
  if (email) errors.email = email;
  if (password) errors.password = password;
  if (
    input.confirmPassword !== undefined &&
    input.password !== input.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match.";
  }
  return errors;
}

export function validateLogin(input: {
  identifier: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!input.identifier.trim()) errors.identifier = "Enter your email or username.";
  if (!input.password) errors.password = "Enter your password.";
  return errors;
}

export function hasFieldErrors(errors: FieldErrors): boolean {
  return Object.keys(errors).length > 0;
}
