import frContent from "@/data/fr/content.json";
import enContent from "@/data/en/content.json";
import frPosts from "@/data/fr/posts.json";
import enPosts from "@/data/en/posts.json";

// ─────────────────────────────────────────────────────────
// Supported locales
// ─────────────────────────────────────────────────────────
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export function isValidLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

// ─────────────────────────────────────────────────────────
// Content (always from JSON — not in Notion)
// ─────────────────────────────────────────────────────────
const contentMap: Record<Locale, typeof frContent> = {
  fr: frContent,
  en: enContent as typeof frContent,
};

export function getContent(locale: Locale) {
  return contentMap[locale] ?? contentMap[DEFAULT_LOCALE];
}

// ─────────────────────────────────────────────────────────
// Posts — from Notion if token is set, from JSON otherwise
//
// NOTE: These sync functions (getPosts, getPost) use JSON
// as fallback for compatibility with static build.
// Use the async Notion functions directly in page.tsx for
// the real Notion data.
// ─────────────────────────────────────────────────────────
export type Post = (typeof frPosts)[number];

const jsonPostsMap: Record<Locale, Post[]> = {
  fr: frPosts,
  en: enPosts as Post[],
};

/** Sync — always returns JSON posts (for compatibility) */
export function getPosts(locale: Locale): Post[] {
  return jsonPostsMap[locale] ?? jsonPostsMap[DEFAULT_LOCALE];
}

/** Sync — find post by slug in JSON */
export function getPost(locale: Locale, slug: string): Post | null {
  return getPosts(locale).find((p) => p.slug === slug) ?? null;
}

// ─────────────────────────────────────────────────────────
// URL helpers
// ─────────────────────────────────────────────────────────
export function localePath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname.startsWith(`/${locale}/`))
      return pathname.slice(locale.length + 1);
    if (pathname === `/${locale}`) return "/";
  }
  return pathname;
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}
