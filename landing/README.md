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

**Thème sombre verrouillé sur toute la page.** Aucune section ne repasse en clair :
le visiteur ne doit pas croire qu'il a changé de site en cours de défilement.

- **Palette** : encre `#0C0D0F` (noir neutre profond, jamais `#000`), crème `#ECEAE6`,
  accent pétrole `#58A6BC` relevé sur la carrosserie du T1 (6,9:1 sur l'encre).
- **La chaleur vient des photographies, jamais de la palette.** Le beige-laiton-espresso
  est le réflexe par défaut des modèles sur les briefs haut de gamme ; on l'évite
  délibérément. Le bar apporte l'ambre, la charte reste froide et disciplinée.
- **Typographie** : Bricolage Grotesque (affichage), Archivo (texte). Aucune serif :
  Instrument Serif et Fraunces sont des signatures d'IA identifiées.
- **Un seul rayon d'angle** : zéro. **Un seul accent**, sur toute la page.
- **Étalonnage** : duoton encre/crème dosé faible (0,14) pour laisser vivre les photos,
  renforcé ponctuellement (0,30 à 0,34) sur les images à néons magenta, qui sortaient
  de la charte.

## Intro

Au chargement, un plan d'encre couvre la page, **percé d'un trou en forme de
sigle Volkswagen** : on regarde la photo du hero à travers le badge. La molette
agrandit le trou jusqu'à ce qu'il avale l'écran — le logo ne s'efface pas, il
devient la page.

Le geste est piloté à la molette (900 px de course), pas par un `pin` ScrollTrigger :
le trou laisse voir le hero réel, sans copie de la photo, donc aucune couture au
raccord. La page est figée le temps du geste seulement. « Passer », `Échap`, `Entrée`
ou `Espace` la libèrent immédiatement.

Garde-fous : l'intro n'existe pas par défaut en CSS. Un script synchrone l'arme
avant le premier rendu, et un filet de 4 s la retire si le moteur d'animation ne
prend jamais la main. Sans JS, sans GSAP ou en `prefers-reduced-motion`, elle est
purement absente — la page ne peut pas rester bloquée derrière un écran noir.

> **Marque déposée.** Le sigle Volkswagen appartient à Volkswagen AG. Son emploi
> ici relève de la maquette, pour un produit qui *est* un Volkswagen. Avant toute
> mise en ligne, faites valider cet usage ou remplacez-le par une marque propre.

## Mouvement

Défilement inertiel (Lenis), révélations par masque au clip-path, parallaxe,
bandeau dont la vitesse suit celle du scroll, et distorsion WebGL légère au survol
des vignettes (Three.js).

**Aucune section n'est épinglée.** La section « véhicule » utilise un collage CSS
(`position:sticky`). Deux pièges si vous y touchez : `overflow-x:hidden` sur `body`
neutralise `position:sticky`, et la règle sticky doit être déclarée *après*
`.veh__media{position:relative}` pour l'emporter dans la cascade.

Chaque animation a une raison : hiérarchie, récit ou retour de geste. Principe de
robustesse : **l'état final est le défaut CSS**. Les animations partent d'un état
absent (`gsap.from`) et n'y vont jamais. Sans GSAP, Lenis ou Three.js, la page reste
complète et utilisable. `prefers-reduced-motion` coupe tout.

## À remplacer avant mise en production

- Les photos, par celles du véhicule réel.
- Les témoignages et le nom de marque, fictifs.
- Le formulaire de devis, sans back-end : il simule l'envoi.
