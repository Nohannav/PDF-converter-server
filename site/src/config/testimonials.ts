/**
 * Témoignages clients.
 *
 * N'ajoutez ici QUE des avis authentiques, avec l'accord écrit du client pour
 * leur publication. Tant que la liste est vide, la section « Avis clients »
 * est masquée sur le site.
 *
 * Aucun avis n'est publié dans les données structurées (pas de note étoilée
 * auto-déclarée), conformément aux règles de Google.
 */
export type Testimonial = {
  quote: string;
  /** Prénom + initiale, ou nom complet si le client l'a accepté. */
  author: string;
  /** Contexte, ex. « Mariage, juin 2026 ». */
  context: string;
  /** Lien vers l'avis d'origine (Google, etc.), si disponible. */
  sourceUrl?: string;
};

export const testimonials: Testimonial[] = [];
