# Photos du site

Le site affiche des **illustrations provisoires** (dessinées pour ce projet, sans licence tierce)
tant que les vraies photos ne sont pas déposées. Pour les remplacer, il suffit de
déposer un fichier portant le **nom attendu** puis de relancer `npm run build`.

Formats acceptés : `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png`.
Recommandé : JPEG ou WebP, 2400 px de large maximum, moins de 600 Ko.
Next.js génère automatiquement les versions optimisées (AVIF/WebP, tailles responsives).

## Emplacements fixes

| Fichier (sans extension)           | Où il apparaît                                  | Cadrage conseillé        |
| ---------------------------------- | ----------------------------------------------- | ------------------------ |
| `concepts/hero-combi`              | Grand visuel plein écran de l'accueil           | Paysage, combi à droite  |
| `concepts/combi-ferme`             | Page combi (présentation)                       | Paysage 4:3              |
| `concepts/combi-bar`               | Accueil, page combi (hero + configuration bar)  | Paysage 4:3              |
| `concepts/combi-dj`                | Page combi (configuration DJ)                   | Paysage 4:3              |
| `concepts/combi-pro`               | Page combi, page entreprises                    | Paysage 4:3              |
| `concepts/mini-disco`              | Accueil, page mini-discothèque (hero)           | Paysage 4:3, de nuit     |
| `concepts/mini-disco-piste`        | Page mini-discothèque (piste de danse)          | Paysage 4:3              |
| `evenements/mariage`               | Accueil — « Une prestation pour chaque événement » | Paysage 4:3          |
| `evenements/anniversaire`          | idem                                            | Paysage 4:3              |
| `evenements/soiree-privee`         | idem                                            | Paysage 4:3              |
| `evenements/entreprise`            | idem + page entreprises                         | Paysage 4:3              |
| `evenements/salon`                 | idem + page entreprises                         | Paysage 4:3              |
| `evenements/lancement`             | idem + page entreprises                         | Paysage 4:3              |

Exemple : `public/images/concepts/combi-bar.jpg`.

La photo de référence du combi rouge et blanc en configuration bar peut être utilisée
à la fois comme `concepts/hero-combi` et `concepts/combi-bar`.

Les textes alternatifs (accessibilité / SEO) sont définis dans `src/config/media.ts` :
ajustez-les pour qu'ils décrivent fidèlement chaque photo.

## Galerie

Déposez autant de photos que souhaité dans les dossiers de `galerie/` :

- `galerie/combi-bar/`
- `galerie/dj-soirees/`
- `galerie/mini-discotheque/`
- `galerie/mariages/`
- `galerie/evenements-pro/`

Le nom du fichier sert de légende : `mariage-domaine-des-pins-01.jpg` → « Mariage domaine des pins ».
Un filtre n'apparaît que si sa catégorie contient au moins un visuel. Dès qu'une catégorie contient
une photo, ses illustrations provisoires disparaissent de la galerie.

## Règles

- Utilisez de préférence les photos réelles de l'agence.
- Pour toute photo de banque d'images, vérifiez la licence et notez-la dans `CREDITS.md`.
- Ne présentez jamais une photo d'illustration comme une réalisation de l'agence.
- Obtenez l'accord des personnes reconnaissables avant de publier une photo d'événement.
