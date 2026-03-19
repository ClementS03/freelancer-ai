import type { Metadata } from "next";
import "./globals.css";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: `${content.meta.siteName} — ${content.meta.tagline}`,
  description: content.meta.description,
  openGraph: {
    title: `${content.meta.siteName} — ${content.meta.tagline}`,
    description: content.meta.description,
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.meta.siteName} — ${content.meta.tagline}`,
    description: content.meta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/*
         * FONTS — loaded via standard Google Fonts link (works on Vercel).
         * To swap fonts: change the family names here AND update
         * --font-display / --font-body in globals.css :root block.
         *
         * Current stack:
         *   Display  → Instrument Serif  (editorial, serif)
         *   Body/UI  → DM Sans           (clean, modern sans)
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-bg-base text-text-primary overflow-x-hidden">
        {/* Grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
