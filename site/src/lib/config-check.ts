import { bookingConfig } from "../config/booking.ts";
import { isSet, siteConfig } from "../config/site.ts";

/**
 * Liste des informations à compléter avant la mise en ligne.
 * Utilisée par le bandeau de développement et par `npm run check:config`.
 */
export function missingConfiguration(env: NodeJS.ProcessEnv = process.env) {
  const missing: { area: string; item: string }[] = [];
  const add = (area: string, item: string) => missing.push({ area, item });

  if (siteConfig.name === "Combi & Disco") add("Identité", "Nom commercial définitif (siteConfig.name — nom provisoire)");
  if (!isSet(env.NEXT_PUBLIC_SITE_URL)) add("SEO", "NEXT_PUBLIC_SITE_URL (URL publique du site)");
  if (env.NEXT_PUBLIC_ALLOW_INDEXING !== "true") add("SEO", "NEXT_PUBLIC_ALLOW_INDEXING=true (indexation désactivée)");
  if (!isSet(siteConfig.contact.email)) add("Coordonnées", "E-mail public (siteConfig.contact.email)");
  if (!isSet(siteConfig.contact.phone)) add("Coordonnées", "Téléphone (siteConfig.contact.phone / phoneDisplay)");
  if (!isSet(siteConfig.address.city)) add("SEO local", "Ville (siteConfig.address.city)");
  if (siteConfig.serviceArea.areas.length === 0) add("SEO local", "Zone d'intervention (siteConfig.serviceArea)");

  const provider = env.EMAIL_PROVIDER || (env.RESEND_API_KEY ? "resend" : env.SMTP_HOST ? "smtp" : "");
  if (!provider) add("Formulaires", "EMAIL_PROVIDER + RESEND_API_KEY ou SMTP_* (envoi des e-mails)");
  if (!isSet(env.EMAIL_FROM)) add("Formulaires", "EMAIL_FROM (expéditeur vérifié)");
  if (!isSet(env.CONTACT_TO_EMAIL)) add("Formulaires", "CONTACT_TO_EMAIL (réception des demandes)");
  if (!bookingConfig.enabled) add("Rendez-vous", "NEXT_PUBLIC_BOOKING_URL (page Cal.com)");

  const legal = siteConfig.legal;
  if (!isSet(legal.companyName) || !isSet(legal.siret)) add("Légal", "Raison sociale et SIRET (siteConfig.legal)");
  if (!isSet(legal.publicationDirector)) add("Légal", "Directeur de la publication");
  if (!isSet(legal.host.name)) add("Légal", "Hébergeur du site");
  if (!isSet(legal.dataController) || !isSet(legal.privacyEmail)) add("RGPD", "Responsable du traitement et e-mail RGPD");

  return missing;
}
