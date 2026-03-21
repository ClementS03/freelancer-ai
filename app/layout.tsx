import type { Metadata, Viewport } from "next";
import "./globals.css";

/*
 * FONTS — next/font/google auto-héberge les fonts sur Netlify/Vercel
 * → élimine la requête externe render-blocking Google Fonts
 * → ajoute font-display:swap automatiquement
 *
 * Pour changer les polices : modifier les imports ici
 * + les variables --font-display / --font-body dans globals.css
 * + fontFamily dans tailwind.config.ts
 */

// Chargement conditionnel : next/font nécessite accès réseau au build
// Fonctionne sur Netlify/Vercel. En dev local sans réseau → fallback CSS.
let fontClasses = "";
let fontVars = "";

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Instrument_Serif, DM_Sans } = require("next/font/google");

  const displayFont = Instrument_Serif({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal", "italic"],
    variable: "--font-display",
    display: "swap",
    preload: true,
  });

  const bodyFont = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
    variable: "--font-body",
    display: "swap",
    preload: true,
  });

  fontClasses = `${displayFont.variable} ${bodyFont.variable}`;
  fontVars = ""; // next/font injecte les variables automatiquement
} catch {
  // Fallback si les fonts ne peuvent pas être chargées (env sans réseau)
  fontClasses = "";
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://clement-seguin.fr";
const AUTHOR = "Clément Seguin";
const HANDLE = "@clement_seguin";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR} — Webflow Designer & Automatisations | Sites premium en 5 jours`,
    template: `%s — ${AUTHOR}`,
  },
  description:
    "Clément Seguin, webdesigner Webflow spécialisé dans la création de sites premium pour coachs et consultants. Livraison en 5 jours, automatisations sur-mesure, 100% remote.",
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
  authors: [{ name: AUTHOR, url: SITE_URL }],
  creator: AUTHOR,
  publisher: AUTHOR,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: `${AUTHOR} — Webflow & Automatisations`,
    title: `${AUTHOR} — Sites Webflow premium pour coachs & consultants`,
    description:
      "Sites Webflow premium avec automatisations sur-mesure, livrés en 5 jours. Pour coachs, consultants et thérapeutes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${AUTHOR} — Webflow Designer`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: HANDLE,
    creator: HANDLE,
    title: `${AUTHOR} — Sites Webflow premium en 5 jours`,
    description:
      "Sites Webflow premium pour coachs & consultants. Livraison en 5 jours.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      fr: `${SITE_URL}/fr`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/fr`,
    },
  },
  other: {
    "geo.region": "FR",
    "geo.placename": "France",
    language: "French",
    "revisit-after": "7 days",
    rating: "general",
    "application-name": `${AUTHOR} — Webflow Designer`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080A" },
    { media: "(prefers-color-scheme: light)", color: "#07080A" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`scroll-smooth ${fontClasses}`}
    >
      <head>
        {/*
         * Fallback Google Fonts si next/font n'a pas pu charger
         * (dev local sans réseau). En prod Netlify ce bloc est ignoré
         * car next/font injecte les fonts directement.
         */}
        {!fontClasses && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
              rel="stylesheet"
            />
          </>
        )}

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": `${SITE_URL}/#person`,
                  name: AUTHOR,
                  url: SITE_URL,
                  jobTitle: "Webdesigner Webflow & Spécialiste Automatisations",
                  knowsAbout: [
                    "Webflow",
                    "Figma",
                    "Web Design",
                    "Automatisation",
                    "SEO",
                    "UX Design",
                  ],
                  sameAs: [
                    "https://linkedin.com/in/clementseguin",
                    "https://instagram.com/clementseguin_tyneastudio",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: `${AUTHOR} — Webflow Designer`,
                  publisher: { "@id": `${SITE_URL}/#person` },
                  inLanguage: ["fr-FR", "en-US"],
                },
                {
                  "@type": "ProfessionalService",
                  "@id": `${SITE_URL}/#service`,
                  name: `${AUTHOR} — Webdesign & Automatisations`,
                  url: SITE_URL,
                  provider: { "@id": `${SITE_URL}/#person` },
                  areaServed: "FR",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Offres de création de site web",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        name: "Site Express",
                        price: "1500",
                        priceCurrency: "EUR",
                      },
                      {
                        "@type": "Offer",
                        name: "Site + Lead Machine",
                        price: "3500",
                        priceCurrency: "EUR",
                      },
                      {
                        "@type": "Offer",
                        name: "Transformation Digitale",
                        price: "8000",
                        priceCurrency: "EUR",
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
