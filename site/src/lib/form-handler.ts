import "server-only";
import type { z } from "zod";
import { isSubmissionTooFast, rateLimit, verifyTurnstile } from "./antispam";
import { getEmailConfig, type EmailConfig } from "./email/config";
import { sendEmail, type OutgoingEmail } from "./email/send";
import { fieldErrors } from "./schemas";

export type FormResponse =
  | { ok: true }
  | { ok: false; code: string; message: string; errors?: Record<string, string> };

const MAX_BODY_BYTES = 20_000;

function json(body: FormResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  );
}

/** Refuse les requêtes provenant d'un autre site (protection CSRF basique). */
function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true; // Certains clients n'envoient pas Origin sur une requête same-origin.
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

type Handler<S extends z.ZodType> = {
  request: Request;
  schema: S;
  /** Identifiant utilisé pour la limitation de débit. */
  scope: string;
  build: (data: z.output<S>, config: EmailConfig) => { agency: OutgoingEmail; client?: OutgoingEmail };
};

/**
 * Traitement commun des formulaires : contrôles, validation, anti-abus et
 * envoi. Ne renvoie `{ ok: true }` QUE si le fournisseur d'e-mail a accepté
 * le message destiné à l'agence. Aucune donnée n'est stockée côté serveur.
 */
export async function handleFormSubmission<S extends z.ZodType>({ request, schema, scope, build }: Handler<S>) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, code: "FORBIDDEN", message: "Requête refusée." }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json({ ok: false, code: "BAD_REQUEST", message: "Format de requête invalide." }, 415);
  }

  const ip = clientIp(request);
  const limit = rateLimit(`${scope}:${ip ?? "inconnu"}`);
  if (!limit.ok) {
    return json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Trop de demandes envoyées en peu de temps. Merci de réessayer dans quelques minutes.",
      },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return json({ ok: false, code: "TOO_LARGE", message: "Votre message est trop long." }, 413);
    }
    raw = JSON.parse(text);
  } catch {
    return json({ ok: false, code: "BAD_REQUEST", message: "Requête invalide." }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    if (errors.website) {
      return json({ ok: false, code: "REJECTED", message: "Votre demande n'a pas pu être envoyée." }, 400);
    }
    return json(
      { ok: false, code: "VALIDATION", message: "Certains champs sont à corriger.", errors },
      422,
    );
  }
  const data = parsed.data as z.output<S> & { startedAt: number; turnstileToken?: string };

  if (isSubmissionTooFast(data.startedAt)) {
    return json(
      {
        ok: false,
        code: "TOO_FAST",
        message: "Envoi refusé par notre protection anti-robots. Rechargez la page puis réessayez.",
      },
      400,
    );
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json(
      { ok: false, code: "CAPTCHA", message: "La vérification anti-robots a échoué. Merci de réessayer." },
      400,
    );
  }

  const emailConfig = getEmailConfig();
  if (!emailConfig.ok) {
    console.error(`[${scope}] Envoi d'e-mail non configuré. Variables manquantes : ${emailConfig.missing.join(", ")}`);
    return json(
      {
        ok: false,
        code: "EMAIL_NOT_CONFIGURED",
        message:
          "L'envoi de formulaire n'est pas encore activé sur ce site. Votre demande n'a pas été transmise : contactez-nous directement par e-mail ou par téléphone.",
      },
      503,
    );
  }

  const { agency, client } = build(data, emailConfig.config);
  try {
    await sendEmail(emailConfig.config, agency);
  } catch (error) {
    // Pas de données personnelles dans les journaux : uniquement l'erreur technique.
    console.error(`[${scope}] Échec de l'envoi :`, (error as Error).message);
    return json(
      {
        ok: false,
        code: "SEND_FAILED",
        message: "Votre demande n'a pas pu être transmise suite à un problème technique. Merci de réessayer ou de nous écrire directement.",
      },
      502,
    );
  }

  if (client) {
    // L'accusé de réception est facultatif : son échec n'annule pas la demande, déjà transmise.
    await sendEmail(emailConfig.config, client).catch((error: Error) =>
      console.error(`[${scope}] Accusé de réception non envoyé :`, error.message),
    );
  }

  return json({ ok: true }, 200);
}
