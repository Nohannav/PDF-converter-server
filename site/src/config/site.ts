/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONFIGURATION CENTRALE DU SITE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Toutes les informations publiques de l'agence se modifient ici.
 *
 *  Règle : une valeur laissée vide ("") n'est JAMAIS affichée ni publiée dans
 *  les données structurées. Les boutons qui en dépendent (appel, réseaux
 *  sociaux…) sont masqués automatiquement tant que la valeur manque.
 *
 *  Lancez `npm run check:config` pour lister ce qui reste à compléter.
 *
 *  Les secrets (clés API, mots de passe SMTP, adresse de réception des
 *  formulaires) ne vont PAS ici : ils sont dans les variables d'environnement
 *  (voir `.env.example`).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  /** Nom commercial PROVISOIRE — à remplacer par le vrai nom de l'agence. */
  name: "Combi & Disco",
  /** Signature courte affichée sous le logo (provisoire, modifiable). */
  baseline: "Animations événementielles mobiles",
  /** Description générale utilisée par défaut pour le SEO. */
  description:
    "Location d'un combi Volkswagen vintage aménagé en bar mobile ou en espace DJ, et de la plus petite discothèque du monde : des animations originales pour mariages, soirées privées et événements d'entreprise.",

  /**
   * URL publique du site, sans barre finale. Utilisée pour les URL canoniques,
   * le sitemap et Open Graph. Peut être surchargée par NEXT_PUBLIC_SITE_URL.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  locale: "fr_FR",

  contact: {
    /** Adresse e-mail AFFICHÉE publiquement (peut différer de CONTACT_TO_EMAIL). */
    email: "",
    /** Téléphone au format international pour les liens tel: — ex. "+33612345678". */
    phone: "",
    /** Téléphone tel qu'affiché — ex. "06 12 34 56 78". */
    phoneDisplay: "",
  },

  /**
   * Adresse postale. Pour une activité itinérante sans accueil du public,
   * vous pouvez ne renseigner que la ville et le code postal.
   */
  address: {
    street: "",
    postalCode: "",
    city: "",
    region: "",
    country: "FR",
  },

  /** Zone d'intervention — essentielle pour le référencement local. */
  serviceArea: {
    /** Phrase affichée, ex. "Lyon, le Rhône et toute la région Auvergne-Rhône-Alpes". */
    label: "",
    /** Villes / départements / régions desservis (données structurées). */
    areas: [] as string[],
  },

  /**
   * Horaires de joignabilité (format Schema.org), ex.
   * [{ days: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "18:00" }]
   */
  openingHours: [] as { days: string[]; opens: string; closes: string }[],
  /** Version lisible des horaires, ex. "Du lundi au vendredi, 9 h – 18 h". */
  openingHoursLabel: "",

  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
    linkedin: "",
    youtube: "",
  },

  /** URL de la fiche Google Business Profile, si elle existe. */
  googleBusinessProfileUrl: "",

  /** Informations légales (mentions légales & politique de confidentialité). */
  legal: {
    companyName: "",
    legalForm: "",
    shareCapital: "",
    siret: "",
    rcs: "",
    vatNumber: "",
    registeredAddress: "",
    publicationDirector: "",
    /** Responsable du traitement des données personnelles. */
    dataController: "",
    /** Adresse e-mail pour exercer ses droits RGPD. */
    privacyEmail: "",
    host: {
      name: "",
      address: "",
      phone: "",
    },
    /** Durée de conservation des demandes de devis / rappel (texte affiché). */
    retentionQuotes: "3 ans à compter du dernier contact, sauf relation commerciale en cours",
    lastUpdated: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Une valeur de configuration est-elle renseignée ? */
export function isSet(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function telHref() {
  return isSet(siteConfig.contact.phone) ? `tel:${siteConfig.contact.phone.replace(/\s+/g, "")}` : null;
}

export function socialLinks() {
  const labels: Record<keyof typeof siteConfig.social, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    tiktok: "TikTok",
    linkedin: "LinkedIn",
    youtube: "YouTube",
  };
  return (Object.keys(siteConfig.social) as (keyof typeof siteConfig.social)[])
    .filter((key) => isSet(siteConfig.social[key]))
    .map((key) => ({ key, label: labels[key], href: siteConfig.social[key] }));
}

/** Indexation autorisée uniquement si explicitement activée (évite d'indexer un site non finalisé). */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
