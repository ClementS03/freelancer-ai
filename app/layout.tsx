import type { Metadata, Viewport } from "next";
import "./globals.css";

// ─────────────────────────────────────────────────────────
// METADATA GLOBALE — SEO + GEO + Social sharing
// À mettre à jour dans data/fr/content.json et data/en/content.json
// pour le contenu localisé. Ce fichier gère les métadonnées techniques.
// ─────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://clementseguin.fr";
const AUTHOR   = "Clément Seguin";
const HANDLE   = "@clementseguin";

export const metadata: Metadata = {
  // ── Identité ──────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default:  `${AUTHOR} — Webflow Designer & Automatisations | Sites premium en 5 jours`,
    template: `%s — ${AUTHOR}`,
  },
  description:
    "Clément Seguin, webdesigner Webflow spécialisé dans la création de sites premium pour coachs et consultants. Livraison en 5 jours, automatisations sur-mesure, 100% remote.",

  // ── Mots-clés SEO ─────────────────────────────────────
  keywords: [
    "webdesigner Webflow freelance",
    "création site web coach consultant",
    "site Webflow premium",
    "webdesigner freelance France",
    "site web thérapeute",
    "création site web 5 jours",
    "automatisation site web",
    "Clément Seguin webdesigner",
    "Clément Seguin Webflow",
    "site web conversion freelance",
  ],

  // ── Auteur & robots ───────────────────────────────────
  authors:  [{ name: AUTHOR, url: SITE_URL }],
  creator:  AUTHOR,
  publisher: AUTHOR,
  robots: {
    index:           true,
    follow:          true,
    googleBot: {
      index:          true,
      follow:         true,
      "max-image-preview":  "large",
      "max-snippet":        -1,
      "max-video-preview":  -1,
    },
  },

  // ── Open Graph (partage lien) ──────────────────────────
  openGraph: {
    type:        "website",
    locale:      "fr_FR",
    alternateLocale: ["en_US"],
    url:         SITE_URL,
    siteName:    `${AUTHOR} — Webflow & Automatisations`,
    title:       `${AUTHOR} — Sites Webflow premium pour coachs & consultants`,
    description: "Sites Webflow premium avec automatisations sur-mesure, livrés en 5 jours. Pour coachs, consultants et thérapeutes qui veulent une présence en ligne à la hauteur de leur expertise.",
    images: [
      {
        url:    "/og-image.png",   // 1200×630 — à créer dans /public
        width:  1200,
        height: 630,
        alt:    `${AUTHOR} — Webflow Designer`,
        type:   "image/png",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────
  twitter: {
    card:        "summary_large_image",
    site:        HANDLE,
    creator:     HANDLE,
    title:       `${AUTHOR} — Sites Webflow premium en 5 jours`,
    description: "Sites Webflow premium pour coachs & consultants. Livraison en 5 jours, automatisations incluses.",
    images:      ["/og-image.png"],
  },

  // ── Icons / Favicon ───────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico",             sizes: "any" },
      { url: "/icon-16.png",  type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png",  type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple:     [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut:  [{ url: "/favicon.ico" }],
  },

  // ── Web app manifest ──────────────────────────────────
  manifest: "/manifest.webmanifest",

  // ── Verification (à remplir quand tu as les comptes) ──
  verification: {
    // google: "VOTRE_CODE_GOOGLE_SEARCH_CONSOLE",
  },

  // ── Canonical & alternates ────────────────────────────
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr":         `${SITE_URL}/fr`,
      "en":         `${SITE_URL}/en`,
      "x-default":  `${SITE_URL}/fr`,
    },
  },

  // ── GEO (géolocalisation pour les moteurs régionaux) ──
  // Ces balises aident les moteurs régionaux (Bing, Yahoo, Baidu)
  // et certains algorithmes de pertinence locale
  other: {
    "geo.region":      "FR",
    "geo.placename":   "France",
    "language":        "French",
    "revisit-after":   "7 days",
    "rating":          "general",
    // Structured data hint
    "application-name": `${AUTHOR} — Webflow Designer`,
  },
};

// ── Viewport & couleur de thème (barre navigateur mobile) ──
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#07080A" },
    { media: "(prefers-color-scheme: light)", color: "#07080A" },
  ],
  colorScheme:    "dark",
  width:          "device-width",
  initialScale:   1,
  maximumScale:   5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/*
         * FONTS — changer les noms ici + tailwind.config.ts + globals.css
         *
         * Display : Instrument Serif  (élégant, éditorial)
         * Body    : DM Sans           (propre, moderne, lisible)
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />

        {/* DNS prefetch pour les ressources tierces */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Structured Data — JSON-LD (Person + WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id":   `${SITE_URL}/#person`,
                  name:    AUTHOR,
                  url:     SITE_URL,
                  jobTitle: "Webdesigner Webflow & Spécialiste Automatisations",
                  description: "Webdesigner freelance spécialisé dans la création de sites Webflow premium pour coachs, consultants et thérapeutes. Livraison en 5 jours, automatisations sur-mesure.",
                  knowsAbout: ["Webflow", "Figma", "Web Design", "Automatisation", "SEO", "UX Design"],
                  worksFor: {
                    "@type": "Organization",
                    name:    AUTHOR,
                    url:     SITE_URL,
                  },
                  contactPoint: {
                    "@type":             "ContactPoint",
                    contactType:         "customer service",
                    availableLanguage:   ["French", "English"],
                  },
                  sameAs: [
                    "https://linkedin.com/in/clementseguin",
                    "https://instagram.com/clementseguin",
                  ],
                },
                {
                  "@type":        "WebSite",
                  "@id":          `${SITE_URL}/#website`,
                  url:            SITE_URL,
                  name:           `${AUTHOR} — Webflow Designer`,
                  description:    "Sites Webflow premium pour coachs & consultants — livraison en 5 jours",
                  publisher:      { "@id": `${SITE_URL}/#person` },
                  inLanguage:     ["fr-FR", "en-US"],
                  potentialAction: {
                    "@type":  "SearchAction",
                    target:   `${SITE_URL}/blog?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type":          "ProfessionalService",
                  "@id":            `${SITE_URL}/#service`,
                  name:             `${AUTHOR} — Webdesign & Automatisations`,
                  url:              SITE_URL,
                  description:      "Création de sites Webflow premium avec automatisations pour coachs, consultants et thérapeutes",
                  provider:         { "@id": `${SITE_URL}/#person` },
                  areaServed:       "FR",
                  hasOfferCatalog:  {
                    "@type": "OfferCatalog",
                    name:    "Offres de création de site web",
                    itemListElement: [
                      {
                        "@type":          "Offer",
                        name:             "Site Express",
                        description:      "Site Webflow 5 pages livré en 5 jours",
                        price:            "1500",
                        priceCurrency:    "EUR",
                        priceSpecification: { "@type": "UnitPriceSpecification", price: "1500", priceCurrency: "EUR" },
                      },
                      {
                        "@type":          "Offer",
                        name:             "Site + Lead Machine",
                        description:      "Site Webflow 8-10 pages + automatisations livré en 7 jours",
                        price:            "3500",
                        priceCurrency:    "EUR",
                      },
                      {
                        "@type":          "Offer",
                        name:             "Transformation Digitale",
                        description:      "Site complet + système d'acquisition multi-canal livré en 10-14 jours",
                        price:            "8000",
                        priceCurrency:    "EUR",
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-body antialiased bg-bg-base text-text-primary overflow-x-hidden"
      >
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
