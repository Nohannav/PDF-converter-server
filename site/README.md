# Site web — agence événementielle (combi Volkswagen & mini-discothèque)

Site vitrine et de conversion pour une agence qui loue un **combi Volkswagen vintage**
aménagé (bar, DJ, stand professionnel) et **« la plus petite discothèque du monde »**
(caravane transformée en mini-discothèque).

> Ce dossier `site/` est indépendant de l'API Flask de conversion PDF située à la racine du
> dépôt (`server.py`, `Procfile`), qui n'a pas été modifiée.

## Sommaire

1. [Démarrage](#démarrage)
2. [Pages et fonctionnalités](#pages-et-fonctionnalités)
3. [Personnalisation](#personnalisation)
4. [Formulaires et e-mails](#formulaires-et-e-mails)
5. [Prise de rendez-vous (Cal.com)](#prise-de-rendez-vous-calcom)
6. [Photos](#photos)
7. [SEO](#seo)
8. [Confidentialité et RGPD](#confidentialité-et-rgpd)
9. [Déploiement](#déploiement)
10. [Tests et qualité](#tests-et-qualité)

## Démarrage

Prérequis : Node.js ≥ 22.18.

```bash
cd site
npm install
cp .env.example .env.local   # puis compléter les valeurs
npm run dev                  # http://localhost:3000
```

| Commande               | Rôle                                                        |
| ---------------------- | ----------------------------------------------------------- |
| `npm run dev`          | Serveur de développement                                    |
| `npm run build`        | Build de production                                         |
| `npm start`            | Lance le build de production                                |
| `npm run check`        | TypeScript + ESLint + tests                                 |
| `npm test`             | Tests automatisés (validation, anti-spam, API d'envoi)      |
| `npm run check:config` | Liste les informations et variables restant à configurer    |

En développement, un bandeau jaune (en bas à gauche) rappelle ce qui reste à configurer.
Il n'apparaît jamais en production.

**Stack** : Next.js 16 (App Router, TypeScript), Tailwind CSS 4, Zod (validation partagée
navigateur/serveur), Resend ou SMTP via Nodemailer, Lucide (icônes). Pas de base de données.

## Pages et fonctionnalités

| URL                             | Contenu                                                                   |
| ------------------------------- | ------------------------------------------------------------------------- |
| `/`                             | Hero, 2 concepts, usages, avantages, galerie, processus, avis*, CTA       |
| `/combi-volkswagen`             | Concept, configurations bar / DJ / pro / sur mesure, usages, galerie, modalités, FAQ, devis prérempli « Combi » |
| `/mini-discotheque`             | Page nocturne : concept, expérience, événements, galerie, infos pratiques, FAQ, devis prérempli « Mini-discothèque » |
| `/evenements-professionnels`    | Bénéfices, cas d'usage entreprises, FAQ, formulaire pro (entreprise obligatoire) |
| `/galerie`                      | Galerie filtrable + visionneuse plein écran (clavier, Échap)              |
| `/contact`                      | Devis (4 étapes + récapitulatif), rendez-vous, rappel, coordonnées        |
| `/mentions-legales`, `/politique-de-confidentialite` | Modèles à compléter et faire vérifier                  |
| 404, `sitemap.xml`, `robots.txt`, image Open Graph | Générés automatiquement                                |

\* La section « Avis clients » est masquée tant que `src/config/testimonials.ts` est vide :
aucun faux avis n'est publié.

Redirections : `/combi`, `/discotheque`, `/entreprises`, `/devis`, `/rendez-vous` → pages canoniques.

## Personnalisation

Tout ce qui est modifiable est centralisé dans `src/config/` :

| Fichier            | Contenu                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `site.ts`          | **Nom (provisoire : « Combi & Disco »)**, coordonnées, adresse, zone d'intervention, horaires, réseaux sociaux, Google Business Profile, informations légales |
| `offers.ts`        | Modalités pratiques (valeurs `null` = « Précisé lors du devis »), options des formulaires |
| `faq.ts`           | Questions fréquentes par page                                                      |
| `testimonials.ts`  | Avis clients authentiques (vide = section masquée)                                 |
| `media.ts`         | Emplacements photo et textes alternatifs                                           |
| `booking.ts`       | Lecture de la configuration Cal.com                                                |
| `navigation.ts`    | Menus                                                                              |

**Règle** : une coordonnée vide n'est jamais affichée ni publiée dans les données structurées.
Les boutons qui en dépendent (appel, e-mail direct, réseaux) apparaissent automatiquement dès
qu'elle est renseignée. Les pages légales signalent en surbrillance les champs « à compléter ».

À renseigner en priorité : nom définitif, téléphone, e-mail public, ville et zone
d'intervention, informations légales, puis les modalités confirmées dans `offers.ts`
(durée, installation, électricité, capacité de la mini-discothèque…). Aucune
caractéristique technique ni aucun tarif n'a été inventé.

Le logo (`src/components/layout/Logo.tsx`, `src/app/icon.svg`) est un monogramme provisoire.

## Formulaires et e-mails

Deux formulaires envoient réellement un e-mail à l'agence via `/api/quote` et `/api/callback` :

- validation côté navigateur **et** côté serveur (mêmes schémas Zod, `src/lib/schemas.ts`) ;
- anti-abus : champ « pot de miel », délai minimal de remplissage, limitation par IP,
  contrôle d'origine, taille maximale, Cloudflare Turnstile optionnel ;
- états : chargement, succès **uniquement après acceptation par le fournisseur d'e-mail**,
  erreurs explicites (configuration absente, échec d'envoi, réseau, limite atteinte) ;
- e-mail à l'agence (avec `Reply-To` = client) et accusé de réception facultatif au client ;
- lien de secours `mailto:` prérempli affiché en cas d'échec (si l'e-mail public est renseigné) ;
- aucune donnée stockée côté serveur, aucun contenu personnel dans les journaux.

Si aucun fournisseur n'est configuré, l'API répond `503 EMAIL_NOT_CONFIGURED` et le
formulaire affiche que la demande **n'a pas été transmise**.

### Option A — Resend (recommandée)

1. Créer un compte sur <https://resend.com> et **vérifier le domaine** de l'agence (DNS).
2. Créer une clé API.
3. Renseigner : `EMAIL_PROVIDER=resend`, `RESEND_API_KEY`, `EMAIL_FROM` (adresse du domaine
   vérifié), `CONTACT_TO_EMAIL`.

### Option B — SMTP

`EMAIL_PROVIDER=smtp`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`,
`EMAIL_FROM`, `CONTACT_TO_EMAIL`.

Après configuration, **envoyez une demande de test depuis le site en production** et vérifiez
la réception (y compris dans les indésirables).

> La limitation par IP est conservée en mémoire du processus : efficace sur un serveur Node
> unique, partielle sur une plateforme serverless. Dans ce cas, activez Turnstile
> (`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`).

## Prise de rendez-vous (Cal.com)

1. Créer un compte sur <https://cal.com> (ou une instance auto-hébergée) et connecter l'agenda
   de l'agence (Google, Outlook…).
2. Créer un type d'événement « Appel découverte » : durée (15 ou 20 min, à confirmer),
   disponibilités, délai de prévenance, questions **téléphone** (obligatoire) et **sujet de l'appel**.
3. Renseigner `NEXT_PUBLIC_BOOKING_URL=https://cal.com/<compte>/<evenement>` et
   `NEXT_PUBLIC_BOOKING_DURATION_MINUTES`, puis rebuild.

Les créneaux proviennent exclusivement de Cal.com (aucun créneau codé en dur). Le calendrier
n'est chargé qu'au clic du visiteur. Tant que l'URL n'est pas définie, la section propose le
formulaire de rappel. Une URL Calendly fonctionne également.

## Photos

Aucune photo n'était présente dans le projet (la photo de référence du combi n'a pas été
fournie dans le dépôt). Le site utilise des **illustrations vectorielles provisoires**,
dessinées pour ce projet, fidèles au concept (combi rouge et blanc, caravane-discothèque) et
signalées comme telles dans la galerie.

Pour les remplacer : déposer les photos sous les noms indiqués dans
[`public/images/LISEZ-MOI.md`](public/images/LISEZ-MOI.md) puis rebuild. La détection est
automatique ; les crédits se tiennent dans `public/images/CREDITS.md`.

## SEO

Réalisé :

- une URL descriptive, un titre unique, une méta-description et une URL canonique par page ;
- un seul `h1` par page, hiérarchie `h2`/`h3` cohérente, fil d'Ariane ;
- `sitemap.xml`, `robots.txt` (exclut `/api/`), image Open Graph générée, balises Twitter ;
- données structurées : `LocalBusiness` (ou `Organization` tant que la ville n'est pas
  renseignée), `Service` sur chaque page concept, `BreadcrumbList` ; uniquement à partir des
  informations configurées, **sans avis, note, prix ni adresse inventés** ;
- `FAQPage` volontairement non balisé : depuis 2023 Google n'affiche plus ces résultats
  enrichis pour ce type de site ; les FAQ restent visibles et utiles pour le référencement ;
- maillage interne entre concepts, usages, galerie et contact ; page 404 personnalisée ;
- **indexation bloquée par défaut** (`NEXT_PUBLIC_ALLOW_INDEXING=false`) pour ne pas indexer
  une version incomplète. Passer à `true` au lancement.

Pistes de mots-clés par page (à valider avec Google Search Console / Keyword Planner et la
zone géographique réelle ; aucun volume de recherche n'est supposé) :

| Page                       | Requêtes ciblées                                                               |
| -------------------------- | ------------------------------------------------------------------------------ |
| Accueil                    | animation originale pour mariage, location bar mobile événementiel, location matériel événementiel insolite |
| Combi Volkswagen           | location combi Volkswagen pour mariage, combi Volkswagen bar mobile, location combi DJ, bar mobile pour soirée privée |
| Mini-discothèque           | mini-discothèque pour mariage, caravane transformée en piste de danse          |
| Événements professionnels  | combi Volkswagen pour événement d'entreprise, stand original salon professionnel |

SEO local, une fois la zone confirmée : renseigner ville, zone et horaires dans `site.ts`,
ajouter la ville dans les titres (ex. « … à Lyon »), créer/lier la fiche Google Business
Profile, garder des coordonnées identiques partout.

## Confidentialité et RGPD

- Aucun cookie publicitaire ni outil d'analyse : pas de bandeau cookies (inutile en l'état).
  Si un outil d'audience est ajouté, il faudra un recueil de consentement préalable.
- Polices auto-hébergées (aucune requête vers Google au chargement).
- Cal.com et Turnstile ne sont chargés qu'à l'action de l'utilisateur ou à l'étape d'envoi.
- Les pages légales sont des **modèles** : à compléter (`siteConfig.legal`) et à faire
  vérifier par un professionnel avant la mise en ligne. Ils ne garantissent pas à eux seuls
  la conformité.

## Déploiement

Variables à définir chez l'hébergeur : voir [`.env.example`](.env.example). Les variables
`NEXT_PUBLIC_*` et les photos sont prises en compte **au build** : redéployer après chaque
modification.

**Vercel (le plus simple)** : importer le dépôt, définir *Root Directory* = `site`, ajouter
les variables d'environnement, déployer, puis brancher le nom de domaine.

**Railway / serveur Node** : créer un service distinct de l'API PDF avec *Root Directory* =
`site`, commande de build `npm run build`, commande de démarrage `npm start`
(port fourni par `PORT`). Le `Procfile` racine reste réservé à l'API Flask.

Checklist de mise en ligne :

1. `npm run check:config` ne signale plus rien d'essentiel.
2. Photos réelles déposées, textes alternatifs ajustés.
3. Envoi de devis et de rappel testés en production (réception vérifiée).
4. Réservation Cal.com testée de bout en bout.
5. Mentions légales et politique de confidentialité complétées et relues.
6. `NEXT_PUBLIC_ALLOW_INDEXING=true`, puis déclaration du sitemap dans Google Search Console.

## Tests et qualité

- `npm test` : 24 tests (schémas de validation, anti-spam, API avec fournisseur simulé :
  succès, échec fournisseur, configuration absente, origine étrangère, limitation, Turnstile,
  échappement HTML des e-mails).
- Accessibilité : navigation clavier, lien d'évitement, focus visibles, champs étiquetés,
  erreurs reliées aux champs (`aria-describedby`), menu mobile avec gestion du focus,
  `prefers-reduced-motion` respecté, cibles tactiles ≥ 44 px.
- Performance : pages statiques, images `next/image` (AVIF/WebP, lazy-loading, dimensions
  réservées), JavaScript limité aux composants interactifs, services tiers chargés à la demande.
