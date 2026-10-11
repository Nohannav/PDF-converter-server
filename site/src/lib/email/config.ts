import "server-only";

export type EmailProvider = "resend" | "smtp";

export type EmailConfig = {
  provider: EmailProvider;
  from: string;
  to: string[];
  sendClientConfirmation: boolean;
  resendApiKey?: string;
  smtp?: { host: string; port: number; secure: boolean; user?: string; password?: string };
};

/**
 * Lit la configuration d'envoi d'e-mails dans les variables d'environnement
 * (jamais exposées au navigateur). Retourne la liste des variables manquantes
 * si la configuration est incomplète.
 */
export function getEmailConfig(env: NodeJS.ProcessEnv = process.env):
  | { ok: true; config: EmailConfig }
  | { ok: false; missing: string[] } {
  const provider = (env.EMAIL_PROVIDER || (env.RESEND_API_KEY ? "resend" : env.SMTP_HOST ? "smtp" : "")) as
    | EmailProvider
    | "";
  const missing: string[] = [];
  if (!provider) missing.push("EMAIL_PROVIDER (resend ou smtp)");
  if (!env.EMAIL_FROM) missing.push("EMAIL_FROM");
  if (!env.CONTACT_TO_EMAIL) missing.push("CONTACT_TO_EMAIL");
  if (provider === "resend" && !env.RESEND_API_KEY) missing.push("RESEND_API_KEY");
  if (provider === "smtp" && !env.SMTP_HOST) missing.push("SMTP_HOST");

  if (missing.length > 0 || !provider) return { ok: false, missing };

  return {
    ok: true,
    config: {
      provider,
      from: env.EMAIL_FROM!,
      to: env.CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()).filter(Boolean),
      sendClientConfirmation: env.SEND_CLIENT_CONFIRMATION === "true",
      resendApiKey: env.RESEND_API_KEY,
      smtp:
        provider === "smtp"
          ? {
              host: env.SMTP_HOST!,
              port: Number(env.SMTP_PORT) || 587,
              secure: env.SMTP_SECURE === "true",
              user: env.SMTP_USER || undefined,
              password: env.SMTP_PASSWORD || undefined,
            }
          : undefined,
    },
  };
}
