import { MetadataRoute } from "next";
import { LOCALES, getPosts } from "@/lib/i18n";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://votrenom.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({ url: `${BASE}/${locale}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 });
    entries.push({ url: `${BASE}/${locale}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
    for (const post of getPosts(locale)) {
      entries.push({ url: `${BASE}/${locale}/blog/${post.slug}`, lastModified: new Date(post.publishedAt), changeFrequency: "monthly", priority: 0.7 });
    }
  }

  return entries;
}
