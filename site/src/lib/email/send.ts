import "server-only";
import type { EmailConfig } from "./config";

export type OutgoingEmail = {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export class EmailSendError extends Error {}

async function sendWithResend(config: EmailConfig, email: OutgoingEmail) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      ...(email.replyTo && { reply_to: email.replyTo }),
    }),
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new EmailSendError(`Resend a répondu ${response.status} : ${detail.slice(0, 300)}`);
  }
}

async function sendWithSmtp(config: EmailConfig, email: OutgoingEmail) {
  const nodemailer = await import("nodemailer");
  const smtp = config.smtp!;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.user ? { user: smtp.user, pass: smtp.password } : undefined,
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
  });
  try {
    await transporter.sendMail({
      from: config.from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      replyTo: email.replyTo,
    });
  } catch (error) {
    throw new EmailSendError(`Échec SMTP : ${(error as Error).message}`);
  }
}

/** Envoie un e-mail via le fournisseur configuré. Lève EmailSendError en cas d'échec. */
export async function sendEmail(config: EmailConfig, email: OutgoingEmail) {
  if (config.provider === "resend") return sendWithResend(config, email);
  return sendWithSmtp(config, email);
}
