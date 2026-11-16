import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Transactional email.
 *
 * SMTP is optional. When it is not configured:
 * - in development (or with AUTH_DEV_RESET_LINKS=true) the reset link is
 *   returned to the client so the flow can be completed locally;
 * - in production the request still succeeds generically but no mail is sent,
 *   and a warning is logged so the operator knows to configure SMTP.
 */

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user?: string;
  pass?: string;
  from: string;
};

function smtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  return {
    host,
    port: Number.isFinite(port) ? port : 587,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    user: process.env.SMTP_USER?.trim() || undefined,
    pass: process.env.SMTP_PASS || undefined,
    from: process.env.SMTP_FROM?.trim() || "DARKNOTE HOSTS <no-reply@localhost>",
  };
}

let cached: Transporter | null = null;

function transporter(): Transporter | null {
  const config = smtpConfig();
  if (!config) return null;
  if (!cached) {
    cached = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.user ? { user: config.user, pass: config.pass } : undefined,
    });
  }
  return cached;
}

export function mailConfigured(): boolean {
  return smtpConfig() !== null;
}

export function devResetLinkEnabled(): boolean {
  if (process.env.AUTH_DEV_RESET_LINKS === "true") return true;
  return process.env.NODE_ENV !== "production" && !mailConfigured();
}

export async function sendPasswordResetEmail(input: {
  to: string;
  username: string;
  resetUrl: string;
}): Promise<boolean> {
  const mail = transporter();
  const config = smtpConfig();
  if (!mail || !config) return false;

  await mail.sendMail({
    from: config.from,
    to: input.to,
    subject: "Reset your DARKNOTE HOSTS password",
    text: [
      `Hi ${input.username},`,
      "",
      "We received a request to reset the password for your DARKNOTE HOSTS account.",
      "This link expires in 30 minutes and can only be used once:",
      "",
      input.resetUrl,
      "",
      "If you did not request this, you can ignore this email — your password stays unchanged.",
    ].join("\n"),
    html: `
      <div style="background:#040308;color:#f6f3ff;padding:32px;font-family:Inter,Arial,sans-serif">
        <p style="font-size:12px;letter-spacing:2px;color:#b298ff">DARKNOTE HOSTS</p>
        <h1 style="font-size:22px;margin:16px 0 8px">Reset your password</h1>
        <p style="color:#b4accb;font-size:14px;line-height:1.6">
          Hi ${input.username}, we received a request to reset your password.
          This link expires in 30 minutes and can only be used once.
        </p>
        <p style="margin:24px 0">
          <a href="${input.resetUrl}" style="background:#7c4dff;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-size:14px">
            Choose a new password
          </a>
        </p>
        <p style="color:#857c9e;font-size:12px;line-height:1.6">
          If you did not request this, ignore this email — your password stays unchanged.
        </p>
      </div>
    `,
  });

  return true;
}
