import type { Config } from "tailwindcss";

/**
 * ═══════════════════════════════════════════════════════════
 * DESIGN SYSTEM — Fichier de variables globales
 * ═══════════════════════════════════════════════════════════
 *
 * COULEURS : Modifie la section "accent" pour rethemer tout le site.
 * FONTS    : Modifie "fontFamily" + le <link> Google Fonts dans app/layout.tsx
 *            + les variables --font-display / --font-body dans app/globals.css
 *
 * ⚠️  Ces 3 fichiers doivent rester en sync :
 *      tailwind.config.ts  ← ici (utilitaires Tailwind)
 *      app/globals.css     ← variables CSS custom
 *      app/layout.tsx      ← import Google Fonts
 * ═══════════════════════════════════════════════════════════
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      // ─────────────────────────────────────────────────────
      // COULEURS — changer "accent.DEFAULT" pour rethemer tout
      // ─────────────────────────────────────────────────────
      colors: {
        bg: {
          base:    "#07080A",
          surface: "#0C0F0D",
          elevated:"#141A15",
          border:  "rgba(255,255,255,0.07)",
        },
        text: {
          primary:  "#EDF2ED",
          secondary:"#8A9A8B",
          tertiary: "#4A574B",
        },
        // ── ACCENT PRINCIPAL — Vert premium ───────────────
        accent: {
          DEFAULT: "#2D9E6B",
          hover:   "#35B87C",
          muted:   "rgba(45,158,107,0.12)",
          border:  "rgba(45,158,107,0.30)",
        },
        // ── ACCENT SECONDAIRE — Vert menthe ───────────────
        teal: {
          DEFAULT: "#4ECBA8",
          muted:   "rgba(78,203,168,0.10)",
          border:  "rgba(78,203,168,0.28)",
        },
      },

      // ─────────────────────────────────────────────────────
      // FONTS — aussi dans app/layout.tsx + app/globals.css
      // ─────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body:    ['"DM Sans"',          "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"',   "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },

      letterSpacing: {
        tighter: "-0.04em",
        tight:   "-0.02em",
        wide:    "0.06em",
        wider:   "0.10em",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      boxShadow: {
        "glow-accent":  "0 0 60px rgba(45,158,107,0.18)",
        "glow-teal":    "0 0 60px rgba(78,203,168,0.12)",
        "card":         "0 1px 0 rgba(255,255,255,0.05) inset",
        "card-hover":   "0 20px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset",
        "button":       "0 2px 14px rgba(45,158,107,0.35)",
        "button-hover": "0 4px 28px rgba(45,158,107,0.55)",
      },

      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring":   "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-18px)" },
        },
        grain: {
          "0%,100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-3%)" },
          "20%": { transform: "translate(3%,2%)" },
          "30%": { transform: "translate(-1%,4%)" },
          "40%": { transform: "translate(3%,-1%)" },
          "50%": { transform: "translate(-3%,2%)" },
          "60%": { transform: "translate(2%,-3%)" },
          "70%": { transform: "translate(-2%,3%)" },
          "80%": { transform: "translate(3%,1%)" },
          "90%": { transform: "translate(-1%,-2%)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        borderBeam: {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },

      animation: {
        "fade-up":    "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in":    "fadeIn 0.5s ease both",
        "scale-in":   "scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float":      "float 7s ease-in-out infinite",
        "grain":      "grain 0.4s steps(1) infinite",
        "marquee":    "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
