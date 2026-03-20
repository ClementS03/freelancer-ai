import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    "#07070A",
          surface: "#0F0F14",
          elevated:"#161620",
          border:  "rgba(255,255,255,0.07)",
        },
        text: {
          primary:  "#F5EDD6",
          secondary:"#999898",
          tertiary: "#555460",
        },
        accent: {
          DEFAULT: "#FF5C00",
          hover:   "#FF7A2E",
          muted:   "rgba(255,92,0,0.12)",
          border:  "rgba(255,92,0,0.35)",
        },
        teal: {
          DEFAULT: "#00D4A8",
          muted:   "rgba(0,212,168,0.1)",
          border:  "rgba(0,212,168,0.3)",
        },
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body:    ['"DM Sans"', "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "glow-accent": "0 0 60px rgba(255,92,0,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
