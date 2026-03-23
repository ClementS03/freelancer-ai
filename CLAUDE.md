# CLAUDE.md — Projet clement-seguin.fr

Référence complète du projet pour Claude. À lire en priorité avant toute modification.

---

## Identité

- **Nom :** Clément Seguin
- **Activité :** Webdesigner Webflow freelance + automatisations
- **Cible :** Coachs, consultants, thérapeutes francophones
- **Domaine :** clement-seguin.fr
- **Email :** hello@clement-seguin.fr
- **Hébergement :** Netlify (branche `main` → déploiement auto)
- **Repo GitHub :** ClementS03/freelancer-ai

---

## Stack technique

- **Framework :** Next.js 15.5.14 — App Router, TypeScript
- **CSS :** Tailwind CSS v3 + classes custom dans `app/globals.css`
- **Fonts :** Instrument Serif (display) + DM Sans (body) via `next/font/google`
- **Email :** Resend (`app/api/contact/route.ts`)
- **i18n :** Routing `[lang]` manuel (fr/en) — middleware + JSON
- **Déploiement :** Netlify, région auto

---

## Architecture fichiers

```
app/
  layout.tsx              ← Root layout : fonts, metadata globale, JSON-LD
  globals.css             ← Design system complet (variables CSS, composants)
  [lang]/
    layout.tsx            ← Layout par locale : metadata i18n, Navbar, Footer
    page.tsx              ← Homepage : assemble toutes les sections
    blog/
      page.tsx            ← Liste des articles
      [slug]/page.tsx     ← Article dynamique
    api/contact/route.ts  ← API Resend (formulaire de contact)

components/
  layout/
    Navbar.tsx            ← Nav responsive + switcher FR/EN
    Footer.tsx            ← Footer avec groupes de liens
    HtmlLangSetter.tsx    ← Client component : met à jour document.lang
  sections/
    Hero.tsx              ← SERVER COMPONENT — LCP element, 0 animation sur H1
    Problem.tsx
    Process.tsx
    Offers.tsx
    Testimonials.tsx
    About.tsx
    FAQ.tsx
    CTA.tsx               ← Formulaire de contact + lien Cal.com
    SocialProof.tsx       ← Marquee outils + bande de stats

data/
  fr/
    content.json          ← TOUT le texte FR — seul fichier à modifier pour le contenu
    posts.json            ← Articles de blog FR
  en/
    content.json          ← TOUT le texte EN
    posts.json            ← Articles de blog EN

lib/
  i18n.ts                 ← getContent(locale), getPosts(), localePath()
  useScrollReveal.ts      ← Hook IntersectionObserver pour animations scroll
  utils.ts                ← cn() helper

public/
  favicon-source.svg      ← Source SVG du favicon (monogramme CS vert)
  icon-16/32/192/512.png  ← Favicons générés
  apple-touch-icon.png
  og-image.png            ← Image OG 1200×630
  manifest.webmanifest    ← PWA manifest

middleware.ts             ← Détection locale navigateur → redirect /fr ou /en
tailwind.config.ts        ← Variables couleurs + fonts (sync avec globals.css)
```

---

## Design system

### Couleurs (modifier dans `tailwind.config.ts` ET `app/globals.css`)

| Variable | Valeur | Usage |
|---|---|---|
| `accent.DEFAULT` | `#2D9E6B` | CTAs, accents principaux |
| `accent.hover` | `#35B87C` | Hover state |
| `teal.DEFAULT` | `#4ECBA8` | Checkmarks, badges succès |
| `bg.base` | `#07080A` | Fond de page |
| `bg.surface` | `#0C0F0D` | Cards, panels |
| `bg.elevated` | `#141A15` | Inputs, éléments surélevés |
| `text.primary` | `#EDF2ED` | Texte principal |
| `text.secondary` | `#8A9A8B` | Texte atténué |

### Fonts (modifier dans `tailwind.config.ts` + `app/layout.tsx` + `app/globals.css`)

- **Display :** Instrument Serif — headings, titres
- **Body :** DM Sans — UI, texte courant

### Classes CSS custom (dans `globals.css`)

```css
.btn-primary       /* CTA principal vert */
.btn-secondary     /* CTA secondaire transparent */
.badge-accent      /* Badge vert accent */
.badge-teal        /* Badge teal */
.card              /* Card de base */
.card-hover        /* Card avec hover effect */
.reveal            /* Classe de base pour animations scroll */
.text-gradient-hero  /* Gradient vert sur le H1 */
.text-gradient-step  /* Gradient vert sur les numéros de process */
.section-headline   /* H2 de section standard */
.section-subheadline /* Sous-titre de section standard */
.check-list        /* Liste avec flèches teal */
.input             /* Champ de formulaire */
.label             /* Label de formulaire */
```

---

## i18n — Comment ça marche

1. **Middleware** (`middleware.ts`) : détecte la langue du navigateur → redirige vers `/fr` ou `/en`
2. **Routing** : toutes les pages sont sous `app/[lang]/`
3. **Contenu** : tout vient de `data/[lang]/content.json` via `getContent(locale)`
4. **Switcher** : dans `Navbar.tsx`, le bouton FR/EN calcule l'URL alternate via `getAlternateLocale()` + `localePath()`

**Pour modifier le contenu :** uniquement dans `data/fr/content.json` et `data/en/content.json`.
**Ne jamais hardcoder de texte** dans les composants.

---

## Offres (tarifs actuels)

| Offre | Prix | Délai |
|---|---|---|
| Site Express | 1 500€ HT | 5 jours |
| Site + Lead Machine | 3 500€ HT | 7 jours |
| Transformation Digitale | 8 000€ HT | 10-14 jours |
| Maintenance mensuelle | 150-300€/mois | — |

---

## Formulaire de contact

- **Route :** `POST /api/contact`
- **Service :** Resend
- **From :** `onboarding@resend.dev` (temp) → à remplacer par `noreply@clement-seguin.fr` une fois le domaine vérifié dans Resend
- **Variables d'environnement requises :**
  - `RESEND_API_KEY` — clé API Resend
  - `CONTACT_EMAIL_TO` — email de réception (hello@clement-seguin.fr)
  - `NEXT_PUBLIC_SITE_URL` — https://clement-seguin.fr

---

## Blog — Ajouter un article

Ajouter un objet dans `data/fr/posts.json` ET `data/en/posts.json` :

```json
{
  "slug": "mon-article-url",
  "title": "Titre de l'article",
  "excerpt": "Description courte (155 chars max pour SEO)",
  "category": "Stratégie web",
  "readTime": "5 min",
  "publishedAt": "2025-04-01",
  "featured": false,
  "tags": ["webflow", "seo"],
  "content": [
    { "type": "intro",  "text": "Introduction accrocheuse..." },
    { "type": "h2",     "text": "Sous-titre 1" },
    { "type": "text",   "text": "Paragraphe..." },
    { "type": "h2",     "text": "Sous-titre 2" },
    { "type": "text",   "text": "Paragraphe..." },
    { "type": "cta",    "text": "Appel à l'action", "link": "/fr#contact", "label": "Réserver un appel" }
  ]
}
```

**Types de blocs disponibles :** `intro`, `h2`, `h3`, `text`, `cta`

---

## SEO — Checklist par article

- [ ] `slug` : kebab-case, inclut le mot-clé principal
- [ ] `title` : 50-60 caractères, mot-clé en début
- [ ] `excerpt` : 150-155 caractères, inclut le mot-clé
- [ ] `content` : minimum 800 mots, 1 `h2` toutes les 300 mots
- [ ] `tags` : 3-5 tags pertinents
- [ ] `featured: true` pour les articles piliers
- [ ] Bloc `cta` en fin d'article obligatoire
- [ ] Article EN avec slug traduit dans `data/en/posts.json`

---

## Workflow blog automatisé (2 articles/semaine)

**Prompt Claude à utiliser** (dans une nouvelle conversation) :

```
Tu es un expert SEO et webdesign. Rédige un article de blog pour Clément Seguin,
webdesigner Webflow freelance spécialisé pour coachs et consultants.

Sujet : [SUJET]
Mot-clé principal : [MOT-CLÉ]
Longueur cible : 900-1100 mots

Format de réponse : JSON valide uniquement, respectant exactement cette structure :
{
  "slug": "...",
  "title": "...",
  "excerpt": "...",
  "category": "...",
  "readTime": "X min",
  "publishedAt": "YYYY-MM-DD",
  "featured": false,
  "tags": [...],
  "content": [
    { "type": "intro", "text": "..." },
    { "type": "h2", "text": "..." },
    { "type": "text", "text": "..." },
    ...
    { "type": "cta", "text": "...", "link": "/fr#contact", "label": "Réserver un appel gratuit" }
  ]
}

Règles SEO :
- Le mot-clé principal dans le titre, l'excerpt et le premier paragraphe
- Structure : intro + 4-5 h2 + cta final
- Ton : direct, expert, sans jargon inutile
- Parle à la cible (coach/consultant) pas à des développeurs
```

**Idées d'articles FR (2/semaine pendant 2 mois) :**

| Semaine | Article 1 | Article 2 |
|---|---|---|
| 1 | Pourquoi votre site Wix vous coûte des clients | 5 signes qu'il est temps de refaire votre site |
| 2 | Webflow vs WordPress pour un coach en 2025 | Comment un chatbot peut doubler vos prises de RDV |
| 3 | Le secret des sites de coachs qui convertissent | SEO local pour thérapeutes : guide pratique |
| 4 | Combien coûte vraiment un site web professionnel | Site web vs réseaux sociaux : les 2 sont nécessaires |
| 5 | Comment rédiger une page À propos qui vend | Les 5 pages indispensables sur le site d'un consultant |
| 6 | Automatiser sa prise de RDV en 2025 | RGPD pour indépendants : ce que votre site doit avoir |
| 7 | Pourquoi le mobile est critique pour votre site | Google Analytics pour coachs : ce qu'il faut surveiller |
| 8 | Créer une offre irrésistible sur son site | Comment transformer les visiteurs en clients |

---

## Variables d'environnement (Netlify)

```
NEXT_PUBLIC_SITE_URL=https://clement-seguin.fr
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_EMAIL_TO=hello@clement-seguin.fr
```

---

## Commandes utiles

```bash
npm run dev      # Dev local → localhost:3000
npm run build    # Build de prod (test avant push)
npm run lint     # Lint TypeScript
```

---

## Règles importantes pour Claude

1. **Ne jamais hardcoder de texte** dans les composants — tout passe par les JSON
2. **Ne jamais utiliser d'inline styles** avec des couleurs — utiliser les classes CSS de `globals.css`
3. **Hero.tsx est un Server Component** (pas de `"use client"`) — ne pas changer
4. **Toujours modifier les 2 JSON** (fr + en) quand on change du contenu
5. **Tester le build** (`npm run build`) avant de livrer des fichiers modifiés
6. **Ne donner que les fichiers qui changent** — pas tout le projet
