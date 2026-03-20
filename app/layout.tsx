import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio — Webflow + IA",
  description: "Sites Webflow premium avec IA intégrée, livrés en 5 jours.",
};

/**
 * ROOT LAYOUT — unique <html> et <body> de toute l'app.
 * suppressHydrationWarning sur <html> car le lang="..." est
 * mis à jour côté client par HtmlLangSetter selon la locale.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/*
         * FONTS — changer les noms de famille ici ET dans :
         *   globals.css   → --font-display / --font-body
         *   tailwind.config.ts → fontFamily
         *
         * Actuel : Instrument Serif (display) + DM Sans (body)
         */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
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
