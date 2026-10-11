/**
 * Contenus liés aux prestations.
 *
 * IMPORTANT : ne renseignez dans `practicalInfo` que des informations
 * CONFIRMÉES par l'agence. Une valeur `null` est affichée comme
 * « Précisé lors du devis » — jamais comme une donnée inventée.
 */

export type PracticalInfo = { label: string; value: string | null };

export const combiPracticalInfo: PracticalInfo[] = [
  { label: "Zone d'intervention", value: null },
  { label: "Durée de la prestation", value: null },
  { label: "Installation et démontage", value: null },
  { label: "Espace nécessaire sur place", value: null },
  { label: "Alimentation électrique", value: null },
  { label: "Personnel (barman, DJ…)", value: null },
  { label: "Boissons et matériel de service", value: null },
  { label: "Frais de déplacement", value: null },
];

export const discoPracticalInfo: PracticalInfo[] = [
  { label: "Zone d'intervention", value: null },
  { label: "Capacité simultanée de la piste", value: null },
  { label: "Équipements son et lumière", value: null },
  { label: "Durée de la prestation", value: null },
  { label: "Surface et accès pour l'installation", value: null },
  { label: "Alimentation électrique", value: null },
  { label: "Utilisation en intérieur / extérieur", value: null },
  { label: "Contraintes sonores et horaires", value: null },
];

/** Libellés partagés par les formulaires (et les e-mails envoyés à l'agence). */
export const eventTypeOptions = [
  { value: "mariage", label: "Mariage" },
  { value: "anniversaire", label: "Anniversaire" },
  { value: "soiree-privee", label: "Soirée privée" },
  { value: "entreprise", label: "Événement d'entreprise" },
  { value: "salon", label: "Salon professionnel" },
  { value: "lancement", label: "Lancement de produit / opération de marque" },
  { value: "autre", label: "Autre" },
] as const;

export const conceptOptions = [
  { value: "combi-bar", label: "Combi bar" },
  { value: "combi-dj", label: "Combi DJ" },
  { value: "combi-pro", label: "Combi événementiel professionnel" },
  { value: "mini-disco", label: "Mini-discothèque" },
  { value: "plusieurs", label: "Plusieurs concepts" },
  { value: "conseil", label: "Je souhaite être conseillé(e)" },
] as const;

export const guestOptions = [
  { value: "moins-50", label: "Moins de 50 personnes" },
  { value: "50-100", label: "50 à 100 personnes" },
  { value: "100-200", label: "100 à 200 personnes" },
  { value: "200-500", label: "200 à 500 personnes" },
  { value: "plus-500", label: "Plus de 500 personnes" },
  { value: "inconnu", label: "Je ne sais pas encore" },
] as const;

export const contactPreferenceOptions = [
  { value: "email", label: "Par e-mail" },
  { value: "telephone", label: "Par téléphone" },
  { value: "indifferent", label: "Indifférent" },
] as const;

/** Centres d'intérêt — ce sont des souhaits du client, pas des promesses de service. */
export const serviceOptions = [
  { value: "bar", label: "Bar / service de boissons" },
  { value: "musique", label: "Animation musicale / DJ" },
  { value: "piste", label: "Piste de danse" },
  { value: "decoration", label: "Élément de décoration / photo" },
  { value: "marque", label: "Habillage aux couleurs d'une marque" },
  { value: "conseil", label: "Conseil sur la configuration" },
] as const;

export const callbackSlotOptions = [
  { value: "matin", label: "Le matin" },
  { value: "midi", label: "Autour de midi" },
  { value: "apres-midi", label: "L'après-midi" },
  { value: "fin-journee", label: "En fin de journée" },
] as const;

export const callbackReasonOptions = [
  { value: "devis", label: "Préparer une demande de devis" },
  { value: "disponibilite", label: "Vérifier une disponibilité" },
  { value: "question", label: "Poser une question sur un concept" },
  { value: "entreprise", label: "Projet d'entreprise" },
  { value: "autre", label: "Autre" },
] as const;

export function labelOf(
  options: readonly { value: string; label: string }[],
  value: string | undefined | null,
) {
  return options.find((o) => o.value === value)?.label ?? value ?? "";
}
