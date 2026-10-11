/**
 * Emplacements photo du site.
 *
 * Chaque emplacement possède un nom de fichier attendu dans `public/images/`.
 * Si une photo portant ce nom existe (.webp, .avif, .jpg, .jpeg ou .png),
 * elle est utilisée automatiquement. Sinon, une illustration vectorielle
 * provisoire (créée pour ce projet, libre de droits) est affichée à la place.
 *
 * Exemple : déposez `public/images/concepts/combi-bar.jpg` et la photo
 * remplace l'illustration partout où l'emplacement « combi-bar » est utilisé.
 *
 * Voir `public/images/LISEZ-MOI.md` pour les formats recommandés.
 */
import type { IllustrationKey } from "@/components/media/illustrations";

export type MediaSlot = {
  /** Chemin sans extension, relatif à /public. */
  file: string;
  /** Texte alternatif (décrit l'image réelle — à ajuster si la photo diffère). */
  alt: string;
  illustration: IllustrationKey;
};

export const mediaSlots = {
  heroCombi: {
    file: "images/concepts/hero-combi",
    alt: "Combi Volkswagen vintage rouge et blanc aménagé en bar pour un événement",
    illustration: "combi-bar",
  },
  combiClosed: {
    file: "images/concepts/combi-ferme",
    alt: "Combi Volkswagen vintage rouge et blanc, vu de profil",
    illustration: "combi-closed",
  },
  combiBar: {
    file: "images/concepts/combi-bar",
    alt: "Combi Volkswagen aménagé en bar mobile, comptoir ouvert",
    illustration: "combi-bar",
  },
  combiDj: {
    file: "images/concepts/combi-dj",
    alt: "Combi Volkswagen aménagé en cabine DJ pour une soirée",
    illustration: "combi-dj",
  },
  combiPro: {
    file: "images/concepts/combi-pro",
    alt: "Combi Volkswagen utilisé comme stand lors d'un événement professionnel",
    illustration: "combi-pro",
  },
  discoExterior: {
    file: "images/concepts/mini-disco",
    alt: "Caravane vintage transformée en mini-discothèque, illuminée de nuit",
    illustration: "disco-exterior",
  },
  discoDancefloor: {
    file: "images/concepts/mini-disco-piste",
    alt: "Piste de danse et jeux de lumière à l'intérieur de la mini-discothèque",
    illustration: "disco-dancefloor",
  },
  eventWedding: {
    file: "images/evenements/mariage",
    alt: "Ambiance de réception de mariage en extérieur",
    illustration: "event-wedding",
  },
  eventBirthday: {
    file: "images/evenements/anniversaire",
    alt: "Ambiance festive d'anniversaire",
    illustration: "event-birthday",
  },
  eventPrivate: {
    file: "images/evenements/soiree-privee",
    alt: "Soirée privée entre amis",
    illustration: "event-private",
  },
  eventCorporate: {
    file: "images/evenements/entreprise",
    alt: "Événement d'entreprise en extérieur",
    illustration: "event-corporate",
  },
  eventTradeshow: {
    file: "images/evenements/salon",
    alt: "Stand original sur un salon professionnel",
    illustration: "event-tradeshow",
  },
  eventLaunch: {
    file: "images/evenements/lancement",
    alt: "Lancement de produit avec mise en scène",
    illustration: "event-launch",
  },
} satisfies Record<string, MediaSlot>;

export type MediaSlotKey = keyof typeof mediaSlots;

/** Catégories de la galerie : un dossier par catégorie dans public/images/galerie/. */
export const galleryCategories = [
  { slug: "combi-bar", label: "Combi bar" },
  { slug: "dj-soirees", label: "DJ et soirées" },
  { slug: "mini-discotheque", label: "Mini-discothèque" },
  { slug: "mariages", label: "Mariages" },
  { slug: "evenements-pro", label: "Événements professionnels" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["slug"];

/**
 * Illustrations provisoires montrées dans la galerie tant qu'aucune photo
 * n'a été déposée dans la catégorie correspondante.
 */
export const galleryFallbacks: { category: GalleryCategory; slot: MediaSlotKey; caption: string }[] = [
  { category: "combi-bar", slot: "combiBar", caption: "Le combi en configuration bar" },
  { category: "combi-bar", slot: "combiClosed", caption: "Le combi Volkswagen, fermé" },
  { category: "dj-soirees", slot: "combiDj", caption: "Le combi en configuration DJ" },
  { category: "mini-discotheque", slot: "discoExterior", caption: "La mini-discothèque, de nuit" },
  { category: "mini-discotheque", slot: "discoDancefloor", caption: "La piste de danse" },
  { category: "evenements-pro", slot: "combiPro", caption: "Le combi sur un événement professionnel" },
];
