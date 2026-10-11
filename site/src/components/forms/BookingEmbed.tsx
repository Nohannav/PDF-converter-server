"use client";

import { useState } from "react";
import { CalendarDays, ExternalLink } from "lucide-react";

/**
 * Intégration de la page de réservation (Cal.com ou équivalent).
 * L'iframe n'est chargée qu'à la demande du visiteur : aucune ressource
 * tierce n'est chargée tant qu'il n'a pas cliqué (performance et vie privée).
 * Les créneaux, la saisie (nom, e-mail, téléphone, sujet) et la confirmation
 * sont gérés par le service de réservation.
 */
export function BookingEmbed({
  embedUrl,
  url,
  provider,
  durationMinutes,
}: {
  embedUrl: string;
  url: string;
  provider: string;
  durationMinutes: number;
}) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-3xl bg-paper p-6 ring-1 ring-line sm:p-8">
        <CalendarDays className="size-9 text-bordeaux" aria-hidden />
        <div>
          <p className="text-lg font-semibold">Échange téléphonique de {durationMinutes} minutes</p>
          <p className="mt-2 text-ink/75">
            Choisissez un jour et un créneau parmi les disponibilités réelles de l&apos;agence, puis indiquez vos
            coordonnées et le sujet de l&apos;appel. Vous recevez une confirmation dès que la réservation est
            enregistrée.
          </p>
          <p className="mt-3 text-sm text-stone">
            Le calendrier est fourni par {provider}. En l&apos;affichant, vous acceptez le chargement de ce service
            externe (voir la politique de confidentialité).
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-bordeaux px-7 py-3 font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-bordeaux-deep"
          >
            <CalendarDays className="size-4" aria-hidden /> Voir les créneaux disponibles
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 font-semibold text-ink hover:bg-ink/5"
          >
            Ouvrir dans un nouvel onglet <ExternalLink className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-paper ring-1 ring-line">
      <iframe
        src={embedUrl}
        title={`Réserver un appel avec l'agence (${provider})`}
        className="h-[760px] w-full border-0"
        loading="lazy"
        allow="payment"
      />
      <p className="border-t border-line px-5 py-3 text-sm text-stone">
        Le calendrier ne s&apos;affiche pas ?{" "}
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
          Ouvrez la page de réservation
        </a>
        .
      </p>
    </div>
  );
}
