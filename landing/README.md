# Le Combi — page d'accueil

Maquette de page d'accueil pour une société d'événementiel louant un
Volkswagen T1 aménagé en bar, ou nu pour une scénographie libre.

## Fichiers

| Chemin | Rôle |
|---|---|
| `index.html` | La page. Autonome hors photos et bibliothèques CDN. |
| `photos/` | Photos livrées : recadrées, étalonnées, optimisées. |
| `grade.py` | Pipeline photo (recadrage à point focal, étalonnage, grain, vignettage). |
| `build_artifact.py` | Produit `dist/artifact.html`, version autonome à images intégrées. |
| `CREDITS.md` | Attribution et licences — **à lire avant toute mise en ligne**. |

## Lancer

```bash
python3 -m http.server 8000
# http://localhost:8000/index.html
```

Ouvrir `index.html` par `file://` fonctionne aussi, mais un serveur évite
les restrictions de chargement d'images de certains navigateurs.

## Direction artistique

- **Palette** — encre `#14120F`, papier `#EAE7DF`, accent bleu pétrole `#2C5C6E`
  relevé sur la carrosserie du T1, vert d'eau `#7C8A70` en secondaire.
- **Typographie** — Instrument Serif (voix), Archivo (texte).
- **Étalonnage** — toutes les photos passent par un duoton encre/papier dosé,
  qui fait lire des sources disparates comme une même série.

## Mouvement

Défilement inertiel (Lenis), révélations au clip-path, parallaxe, une seule
section épinglée, bandeau piloté par la vélocité du scroll, flou progressif,
et distorsion WebGL légère au survol des vignettes (Three.js).

Principe de robustesse : **l'état final est le défaut CSS**. Les animations
partent d'un état absent (`gsap.from`) et n'y vont jamais. Si GSAP, Lenis ou
Three.js ne se chargent pas, la page reste complète, lisible et utilisable.
`prefers-reduced-motion` coupe le mouvement.

## À remplacer avant mise en production

- Les photos, par celles du véhicule réel.
- Les témoignages et le nom de marque, fictifs.
- Le formulaire de devis, sans back-end : il simule l'envoi.
