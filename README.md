# tsaragroupe.com

Site vitrine officiel de **Tsara Groupe**, groupe multisectoriel malgache.

## Stack

- Next.js 15 (App Router, React 19, rendu statique)
- TypeScript strict
- Tailwind CSS v4 (configuration CSS-first dans `app/globals.css`, pas de `tailwind.config`)
- shadcn/ui (style new-york) : `button`, `input`, `textarea`, `label`, `select`, `sheet`
- Icônes : `lucide-react`
- Validation : `zod` (schéma partagé client/serveur)

## Démarrage

```bash
pnpm install        # ou npm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck && pnpm lint
```

Ajouter un composant shadcn : `pnpm dlx shadcn@latest add <composant>`.

## Arborescence

```
app/
  page.tsx                      Accueil
  groupe/                       Le Groupe
  activites/                    Vue globale
  activites/[slug]/             Template commun des activités
  implantations/                Implantations de la Clinique
  actualites/                   Actualités (API prête)
  contact/                      Contact
  mentions-legales/, politique-confidentialite/
  api/contact/route.ts          Réception du formulaire (envoi e-mail à brancher)
  sitemap.ts, robots.ts         SEO
components/
  ui/                           Composants shadcn
  layout/                       Header, MobileNavigation, Footer
  sections/                     Hero, SectionHeader, PageHeader/Breadcrumb, ActivityGrid/ActivityCard,
                                ClinicLocations/LocationList, Ecosystem, Values/ValueItem, NewsSection/NewsCard,
                                CTASection, ContactSection
  contact-form.tsx              Formulaire (validation, chargement, succès, erreur)
  placeholder.tsx               Marqueurs « à compléter »
lib/
  site.ts                       Coordonnées, navigation
  data/activities.ts            Source unique des activités
  data/news.ts                  getLatestNews() : démo ou API
  data/values.ts
  contact-schema.ts
```

## Navigation responsive

- Mobile (< 768px) : barre d'onglets fixée en bas (`components/layout/bottom-nav.tsx`) : Accueil, Groupe, Activités, Contact, Menu (feuille basse avec toutes les pages). Bouton « Appeler » dans le header.
- Tablette (768 à 1279px) : menu latéral (`mobile-navigation.tsx`).
- Desktop (≥ 1280px) : navigation complète dans le header.

## Design system

Tokens dans `app/globals.css` (`:root` + `@theme inline`), dérivés du logo :

- Bleu nuit `#0b2447` (hero sombre, en-têtes de page, footer), bleu royal `#1a4b9b` (primaire : boutons, liens), cyan `#16a9dc` et or `#f2b705` en accents (filets, puces, icônes sur fond sombre), cyan foncé `#0b76a6` pour les libellés et icônes sur fond clair. Palette inspirée des logos Tsara Groupe et Clinique Saint Georges.
- Fond `#ffffff`, surface `#f4f6f8`, texte `#15202d`, titres `#0f1b2a`
- Police unique : Inter (next/font), titres en 600/700, texte en 400/500
- Variantes de bouton : `default`, `outline`, `light` et `outline-light` (sur fond sombre), `ghost`, `link`
- Utilitaires : `container-site` (1240px max), `section-y`
- Échelle : `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-eyebrow`

## Contenus à compléter

Aucune donnée institutionnelle n'est inventée. Côté public, les données manquantes s'affichent « En cours de mise à jour » (`InlinePlaceholder`). Les blocs de contenu à rédiger (`ContentPlaceholder`) ne s'affichent que si `NEXT_PUBLIC_SHOW_CONTENT_MARKERS=true` :

- présentation détaillée et services de chaque activité (`app/activites/[slug]/page.tsx`)
- adresses et horaires des 3 cliniques
- forme juridique, NIF/STAT/RCS, directeur de publication, hébergeur
- durée de conservation des données
- formulation de la Vision (`app/groupe/page.tsx`, à valider)

## Intégrations

- **Actualités** : définir `NEWS_API_URL` (flux JSON tsaranews.mg compatible `NewsItem`). Sans variable, 3 contenus de démonstration clairement signalés s'affichent.
- **Formulaire** : `app/api/contact/route.ts` valide les données ; brancher l'envoi vers `contact@tsaragroupe.com` (SMTP, Resend, Brevo…).
- **Hero** : composant responsive unique dans `components/sections/hero.tsx`, optimisé pour mobile, tablette et desktop.
- **Direction** : PDG défini dans `lib/site.ts` (`leadership.ceo`), affiché sur l'accueil, la page Groupe, les mentions légales et les données structurées.

## Images

Les photos de `public/images/` sont extraites d'un montage fourni, en basse définition. À remplacer par des photos réelles (idéalement ≥ 2000px de large) en conservant les mêmes noms de fichiers.
