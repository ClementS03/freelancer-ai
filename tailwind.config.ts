import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────
      // GLOBAL COLOR VARIABLES
      // Edit these to retheme the entire site
      // ─────────────────────────────────────────
      colors: {
        // Backgrounds
        bg: {
          base:    "#07070A",   // Page background
          surface: "#0F0F14",   // Card / panel background
          elevated:"#161620",   // Elevated surface (modal, dropdown)
          border:  "rgba(255,255,255,0.07)", // Border color
        },
        // Text
        text: {
          primary:  "#F5EDD6",  // Main text (warm cream)
          secondary:"#999898",  // Muted text
          tertiary: "#555460",  // Very muted
        },
        // Brand accent — change here to retheme CTAs
        accent: {
          DEFAULT: "#FF5C00",   // Primary orange
          hover:   "#FF7A2E",   // Hover state
          muted:   "rgba(255,92,0,0.12)", // Soft bg tint
          border:  "rgba(255,92,0,0.35)", // Border tint
        },
        // Secondary accent
        teal: {
          DEFAULT: "#00D4A8",   // Teal highlight
          muted:   "rgba(0,212,168,0.1)",
          border:  "rgba(0,212,168,0.3)",
        },
        // Status
        success: "#22C55E",
        warning: "#F59E0B",
        error:   "#EF4444",
      },

      // ─────────────────────────────────────────
      // GLOBAL FONT VARIABLES
      // ─────────────────────────────────────────
      fontFamily: {
        // Display / Headings — editorial serif
        // Change "Instrument Serif" → any Google Fonts display font
        display: ['"Instrument Serif"', "Georgia", "serif"],
        // Body / UI — clean sans-serif
        // Change "DM Sans" → any Google Fonts body font
        body:    ['"DM Sans"', "system-ui", "sans-serif"],
        // Mono — for code, labels
        mono:    ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem" }],
        xs:    ["0.75rem",   { lineHeight: "1.125rem" }],
        sm:    ["0.875rem",  { lineHeight: "1.375rem" }],
        base:  ["1rem",      { lineHeight: "1.625rem" }],
        lg:    ["1.125rem",  { lineHeight: "1.75rem" }],
        xl:    ["1.25rem",   { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem",    { lineHeight: "2rem" }],
        "3xl": ["1.875rem",  { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem",   { lineHeight: "2.75rem" }],
        "5xl": ["3rem",      { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem",   { lineHeight: "4.25rem" }],
        "7xl": ["4.5rem",    { lineHeight: "5rem" }],
        "8xl": ["6rem",      { lineHeight: "6.5rem" }],
        "9xl": ["8rem",      { lineHeight: "8.5rem" }],
      },

      letterSpacing: {
        tighter: "-0.04em",
        tight:   "-0.02em",
        normal:  "0em",
        wide:    "0.04em",
        wider:   "0.08em",
        widest:  "0.16em",
      },

      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "section": "7rem",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      animation: {
        "fade-up":     "fadeUp 0.7s ease both",
        "fade-in":     "fadeIn 0.5s ease both",
        "slide-right": "slideRight 0.6s ease both",
        "glow-pulse":  "glowPulse 3s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
        "shimmer":     "shimmer 2.5s linear infinite",
        "grain":       "grain 0.4s steps(1) infinite",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":  { transform: "translate(-2%, -3%)" },
          "20%":  { transform: "translate(3%, 2%)" },
          "30%":  { transform: "translate(-1%, 4%)" },
          "40%":  { transform: "translate(3%, -1%)" },
          "50%":  { transform: "translate(-3%, 2%)" },
          "60%":  { transform: "translate(2%, -3%)" },
          "70%":  { transform: "translate(-2%, 3%)" },
          "80%":  { transform: "translate(3%, 1%)" },
          "90%":  { transform: "translate(-1%, -2%)" },
        },
      },

      backgroundImage: {
        "gradient-radial":  "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "noise": "url('/noise.png')",
        "shimmer-gradient": "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
      },

      boxShadow: {
        "glow-accent": "0 0 60px rgba(255,92,0,0.15)",
        "glow-teal":   "0 0 60px rgba(0,212,168,0.12)",
        "card":        "0 1px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
        "card-hover":  "0 20px 60px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1) inset",
        "button":      "0 2px 12px rgba(255,92,0,0.35)",
        "button-hover":"0 4px 24px rgba(255,92,0,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
