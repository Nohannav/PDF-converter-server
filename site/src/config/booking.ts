/**
 * Prise de rendez-vous en ligne.
 *
 * Le site intègre la page de réservation d'un service externe (Cal.com
 * recommandé, compatible avec Calendly ou toute page de réservation
 * intégrable en iframe). Les créneaux affichés proviennent exclusivement de
 * ce service : rien n'est codé en dur ici.
 *
 * Variables d'environnement :
 *  - NEXT_PUBLIC_BOOKING_URL : URL publique de l'événement de réservation,
 *    ex. https://cal.com/mon-agence/appel-decouverte
 *  - NEXT_PUBLIC_BOOKING_DURATION_MINUTES : durée affichée (doit correspondre
 *    à la durée paramétrée dans Cal.com). 20 par défaut.
 */
const rawUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || "";

function toEmbedUrl(url: string) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    // Cal.com (cloud ou auto-hébergé) : le paramètre embed active l'affichage intégré.
    if (parsed.hostname.endsWith("cal.com") || parsed.searchParams.has("cal")) {
      parsed.searchParams.set("embed", "true");
      parsed.searchParams.set("layout", "month_view");
    }
    if (parsed.hostname.endsWith("calendly.com")) {
      parsed.searchParams.set("hide_gdpr_banner", "1");
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

const embedUrl = toEmbedUrl(rawUrl);

export const bookingConfig = {
  enabled: embedUrl.length > 0,
  url: embedUrl ? rawUrl : "",
  embedUrl,
  provider: rawUrl.includes("calendly.com") ? "Calendly" : "Cal.com",
  durationMinutes: Number(process.env.NEXT_PUBLIC_BOOKING_DURATION_MINUTES) || 20,
};
