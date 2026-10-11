"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Mail, XCircle } from "lucide-react";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string; code?: string };

type ApiResponse = { ok: boolean; code?: string; message?: string; errors?: Record<string, string> };

/**
 * Envoie les données au serveur. Le succès n'est déclaré que si le serveur
 * répond explicitement { ok: true } (e-mail accepté par le fournisseur).
 */
export function useSubmit(endpoint: string) {
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  /** Retourne les erreurs de champs éventuellement renvoyées par le serveur. */
  async function submit(payload: unknown): Promise<{ ok: boolean; errors?: Record<string, string> }> {
    setState({ status: "submitting" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as ApiResponse | null;
      if (response.ok && data?.ok === true) {
        setState({ status: "success" });
        return { ok: true };
      }
      setState({
        status: "error",
        code: data?.code,
        message: data?.message || "Votre demande n'a pas pu être envoyée. Merci de réessayer.",
      });
      return { ok: false, errors: data?.errors };
    } catch {
      setState({
        status: "error",
        code: "NETWORK",
        message: "Impossible de joindre le serveur. Vérifiez votre connexion internet puis réessayez.",
      });
    }
    return { ok: false };
  }

  return { state, submit };
}

export function SubmitButton({ submitting, children }: { submitting: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      aria-busy={submitting}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-combi px-7 py-3 font-semibold text-cream shadow-[0_10px_30px_-12px_rgba(179,38,45,0.7)] transition-all hover:-translate-y-0.5 hover:bg-bordeaux disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {submitting ? "Envoi en cours…" : children}
    </button>
  );
}

export function ErrorBanner({ message, mailto }: { message: string; mailto?: string | null }) {
  return (
    <div role="alert" className="rounded-2xl border border-combi/30 bg-combi/5 p-5 text-sm leading-relaxed text-ink">
      <p className="flex items-start gap-2 font-semibold text-combi">
        <XCircle className="mt-0.5 size-5 shrink-0" aria-hidden /> Votre demande n&apos;a pas été envoyée.
      </p>
      <p className="mt-2">{message}</p>
      {mailto && (
        <p className="mt-3">
          <a href={mailto} className="inline-flex items-center gap-2 font-semibold text-ink underline underline-offset-4">
            <Mail className="size-4" aria-hidden /> Envoyer ma demande par e-mail à la place
          </a>
        </p>
      )}
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="animate-rise-in rounded-3xl bg-ink p-8 text-cream sm:p-10">
      <CheckCircle2 className="size-10 text-copper-light" aria-hidden />
      <h3 tabIndex={-1} className="mt-5 text-3xl font-medium" data-autofocus>
        {title}
      </h3>
      <div className="mt-4 space-y-3 leading-relaxed text-cream/80">{children}</div>
    </div>
  );
}
