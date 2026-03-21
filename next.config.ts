import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  // ── Optimisation images ────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes:  [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
  },

  async headers() {
    return [
      // ── HTML pages — jamais mises en cache ─────────────
      // Empêche le navigateur de servir du HTML périmé
      // qui référencerait d'anciens chunks JS
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-XSS-Protection",          value: "1; mode=block" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
          // Pas de cache sur le HTML — le JS et CSS sont content-hashed eux-mêmes
          { key: "Cache-Control",             value: "public, max-age=0, must-revalidate" },
        ],
      },
      // ── JS/CSS chunks — cache immutable (content-hashed) ─
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // ── Images publiques ───────────────────────────────
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|svg|ico|gif)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // ── Manifest PWA ──────────────────────────────────
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Content-Type",  value: "application/manifest+json" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
