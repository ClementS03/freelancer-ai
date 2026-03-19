# 🚐 Freelance LP — Next.js + Tailwind

Landing page premium pour freelance Webflow / IA.  
Stack : **Next.js 15** · **Tailwind CSS** · **TypeScript** · Deploy sur **Vercel**

---

## 🚀 Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Copier les variables d'environnement
cp .env.example .env.local

# 3. Lancer en dev
npm run dev
# → http://localhost:3000
```

---

## ✏️ Modifier le contenu

Tout le texte du site est dans **`data/content.json`**.  
Modifie ce fichier pour mettre à jour sans toucher au code.

```
data/
  content.json    ← TOUT le texte du site (hero, nav, offres, FAQ, etc.)
  posts.json      ← Articles de blog
```

### Changer les offres

```json
// data/content.json → "offers" → "items"
{
  "name": "Site Pro + IA",
  "price": "2 500",       ← Modifier le prix ici
  "delivery": "5 jours",
  "features": [...]       ← Ajouter/retirer des features
}
```

### Ajouter un article de blog

Ajoute un objet dans `data/posts.json` :

```json
{
  "slug": "mon-nouvel-article",
  "title": "Titre de l'article",
  "excerpt": "Description courte...",
  "category": "Stratégie web",
  "readTime": "5 min",
  "publishedAt": "2025-04-01",
  "featured": false,
  "tags": ["webflow", "seo"],
  "content": [
    { "type": "intro",  "text": "Introduction..." },
    { "type": "h2",     "text": "Sous-titre" },
    { "type": "text",   "text": "Paragraphe..." },
    { "type": "cta",    "text": "Call to action", "link": "/#contact", "label": "Réserver" }
  ]
}
```

---

## 🎨 Modifier le design

### Couleurs globales

```typescript
// tailwind.config.ts → theme.extend.colors
colors: {
  bg: {
    base:    "#07070A",   // ← Fond de page
    surface: "#0F0F14",   // ← Cards
  },
  accent: {
    DEFAULT: "#FF5C00",   // ← Orange CTA — change ici pour rethemer
  },
  teal: {
    DEFAULT: "#00D4A8",   // ← Accent secondaire
  },
}
```

### Polices globales

```typescript
// app/layout.tsx
import { DM_Sans, Instrument_Serif } from "next/font/google";

// Changer Instrument_Serif → autre police display
// Changer DM_Sans → autre police body
```

---

## 🌐 Déploiement sur Vercel

```bash
# Option 1 : Vercel CLI
npm i -g vercel
vercel

# Option 2 : Via GitHub
# 1. Push sur GitHub
# 2. Import le repo sur vercel.com
# 3. Vercel détecte Next.js automatiquement
# 4. Ajouter les env vars dans l'interface Vercel
```

### Variables d'environnement à configurer sur Vercel :

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://votrenom.fr` |
| `RESEND_API_KEY` | Pour le formulaire de contact |
| `CONTACT_EMAIL_TO` | Email de réception |

---

## 📧 Formulaire de contact

Le formulaire est dans `app/api/contact/route.ts`.

**Option recommandée : Resend**
```bash
npm install resend
```
Puis décommenter le bloc Resend dans `route.ts`.

**Alternative simple : Formspree**
1. Créer un compte sur [formspree.io](https://formspree.io)
2. Copier l'ID de formulaire dans `.env.local`
3. Appeler Formspree directement depuis le composant CTA

---

## 💡 Idées de nom de domaine

### Recommandations

| Domaine | Pourquoi | Dispo probable |
|---|---|---|
| `[prenom]web.fr` | Personnel, mémorable | ✅ |
| `[prenom]studio.fr` | Premium, agence | ✅ |
| `[prenom]digital.fr` | Clair, professionnel | ✅ |
| `site5jours.fr` | Offre différenciante | ✅ |
| `webflow-[ville].fr` | SEO local | ✅ |

### Où acheter (tu es déjà chez Infomaniak ✅)

**Infomaniak** est le bon choix :
- Prix compétitifs (.fr ≈ 6-8€/an)
- Hébergement DNS fiable
- Basé en Suisse (RGPD-friendly)
- Interface simple pour pointer le DNS vers Vercel

#### Connecter Infomaniak → Vercel

1. Dans Vercel → Settings → Domains → Add Domain → `votrenom.fr`
2. Vercel te donne 2 enregistrements DNS
3. Dans Infomaniak → Domaine → Zones DNS :
   - Ajouter `A 76.76.21.21` (Vercel IP)
   - Ajouter `CNAME www → cname.vercel-dns.com`
4. Propagation : 5-30 min

---

## 🗂️ Structure du projet

```
freelance-lp/
├── app/
│   ├── layout.tsx          ← Root layout + fonts
│   ├── page.tsx            ← Homepage
│   ├── globals.css         ← Styles globaux + composants CSS
│   ├── not-found.tsx       ← Page 404
│   ├── sitemap.ts          ← Sitemap SEO auto-généré
│   ├── robots.ts           ← robots.txt
│   ├── api/
│   │   └── contact/
│   │       └── route.ts    ← API formulaire de contact
│   └── blog/
│       ├── layout.tsx      ← Layout blog
│       ├── page.tsx        ← Liste des articles
│       └── [slug]/
│           └── page.tsx    ← Article dynamique
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── SocialProof.tsx
│       ├── Problem.tsx
│       ├── Process.tsx
│       ├── Offers.tsx
│       ├── Testimonials.tsx
│       ├── About.tsx
│       ├── FAQ.tsx
│       └── CTA.tsx
│
├── data/
│   ├── content.json        ← TOUT le texte du site
│   └── posts.json          ← Articles de blog
│
├── lib/
│   ├── utils.ts            ← Utilitaires (cn, etc.)
│   └── useScrollReveal.ts  ← Hook d'animation au scroll
│
├── tailwind.config.ts      ← Design system (couleurs, fonts, animations)
├── next.config.ts
├── vercel.json
└── .env.example
```

---

## 🔮 Prochaines étapes suggérées

- [ ] Connecter le formulaire (Resend ou Formspree)
- [ ] Ajouter des vraies photos/mockups dans la section About
- [ ] Remplir les témoignages avec de vrais clients
- [ ] Activer Vercel Analytics (gratuit, RGPD-OK)
- [ ] Ajouter Vercel Speed Insights
- [ ] Écrire 4-6 articles de blog (SEO organique)
- [ ] Ajouter Open Graph image (`app/opengraph-image.tsx`)
- [ ] Mettre en place Crisp / Tidio pour le chat live
