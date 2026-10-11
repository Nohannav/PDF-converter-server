/** Construit un lien mailto: avec objet et message préremplis (solution de secours). */
export function buildMailto(to: string, subject: string, body: string) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
