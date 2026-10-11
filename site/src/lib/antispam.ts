import "server-only";

/** Délai minimal entre l'affichage du formulaire et son envoi (robots trop rapides). */
export const MIN_FILL_TIME_MS = 3_000;
/** Un formulaire ouvert depuis plus de 24 h doit être rechargé. */
export const MAX_FILL_TIME_MS = 24 * 60 * 60 * 1000;

export function isSubmissionTooFast(startedAt: number, now = Date.now()) {
  const elapsed = now - startedAt;
  return elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FILL_TIME_MS;
}

/**
 * Limitation simple du nombre d'envois par adresse IP (mémoire du processus).
 * Suffisant sur un serveur Node unique ; sur une plateforme serverless à
 * plusieurs instances, complétez avec Cloudflare Turnstile (déjà intégré) ou
 * un stockage partagé (Redis / Upstash).
 */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, { limit = 5, windowMs = 10 * 60 * 1000 } = {}, now = Date.now()) {
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false as const, retryAfterSeconds: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5_000) {
    for (const [k, v] of buckets) if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
  }
  return { ok: true as const };
}

export function resetRateLimit() {
  buckets.clear();
}

/** Vérifie un jeton Cloudflare Turnstile si TURNSTILE_SECRET_KEY est défini. */
export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Protection optionnelle non activée.
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8_000),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}
