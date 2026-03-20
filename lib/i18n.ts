import frContent from "@/data/fr/content.json";
import enContent from "@/data/en/content.json";
import frPosts from "@/data/fr/posts.json";
import enPosts from "@/data/en/posts.json";

// ─────────────────────────────────────────────────────────
// Supported locales — add more here as needed
// ─────────────────────────────────────────────────────────
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

/** Type-safe locale guard */
export function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

// ─────────────────────────────────────────────────────────
// Content loader — returns typed JSON for the given locale
// Falls back to default locale if not found
// ─────────────────────────────────────────────────────────
const contentMap: Record<Locale, typeof frContent> = {
  fr: frContent,
  en: enContent as typeof frContent,
};

const postsMap: Record<Locale, typeof frPosts> = {
  fr: frPosts,
  en: enPosts as typeof frPosts,
};

export function getContent(locale: Locale) {
  return contentMap[locale] ?? contentMap[DEFAULT_LOCALE];
}

export function getPosts(locale: Locale) {
  return postsMap[locale] ?? postsMap[DEFAULT_LOCALE];
}

export function getPost(locale: Locale, slug: string) {
  const posts = getPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

// ─────────────────────────────────────────────────────────
// URL helpers
// ─────────────────────────────────────────────────────────

/** Build a localised path: localePath("fr", "/blog") → "/fr/blog" */
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

/** Strip locale prefix from pathname */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
    if (pathname === `/${locale}`) return "/";
  }
  return pathname;
}

/** Get the alternate locale */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
