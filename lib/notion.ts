/**
 * lib/notion.ts
 * ─────────────────────────────────────────────────────────────
 * Fetches blog posts from Notion database.
 *
 * DATABASE SETUP (one database, two languages):
 * Create a Notion database with these EXACT property names:
 *
 * | Property      | Type     | Notes                              |
 * |---------------|----------|------------------------------------|
 * | Title         | Title    | Article title (required)           |
 * | Slug          | Text     | URL slug, e.g. "my-article"        |
 * | Language      | Select   | Options: "fr" or "en"              |
 * | Published     | Checkbox | ✅ = visible on site               |
 * | Publish Date  | Date     | Auto-publishes on this date        |
 * | Excerpt       | Text     | Short description (155 chars max)  |
 * | Category      | Select   | e.g. "Stratégie web", "Design"     |
 * | Read Time     | Text     | e.g. "5 min"                       |
 * | Featured      | Checkbox | Show at top of blog list           |
 * | Tags          | Multi-select | e.g. "webflow", "seo"          |
 *
 * The article BODY is written directly in the Notion page content
 * using headings (H2, H3), paragraphs, and callout blocks.
 *
 * ENV VARIABLES NEEDED:
 * NOTION_TOKEN      → your Notion integration secret
 * NOTION_DB_ID      → your database ID (from the URL)
 * ─────────────────────────────────────────────────────────────
 */

import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { Locale } from "./i18n";

// ── Types ──────────────────────────────────────────────────────

export type NotionPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
  tags: string[];
  content: ContentBlock[];
};

type ContentBlock =
  | { type: "intro" | "h2" | "h3" | "text"; text: string }
  | { type: "cta"; text: string; link: string; label: string };

// ── Notion client (lazy init) ──────────────────────────────────

function getClient() {
  if (!process.env.NOTION_TOKEN) {
    throw new Error("NOTION_TOKEN is not set");
  }
  return new Client({ auth: process.env.NOTION_TOKEN });
}

// ── Property helpers ───────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "rich_text") return prop.rich_text?.[0]?.plain_text ?? "";
  if (prop.type === "title") return prop.title?.[0]?.plain_text ?? "";
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSelect(prop: any): string {
  return prop?.select?.name ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMultiSelect(prop: any): string[] {
  return prop?.multi_select?.map((s: { name: string }) => s.name) ?? [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDate(prop: any): string {
  return prop?.date?.start ?? "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCheckbox(prop: any): boolean {
  return prop?.checkbox ?? false;
}

// ── Markdown → ContentBlock[] ──────────────────────────────────

function markdownToBlocks(markdown: string, locale: Locale): ContentBlock[] {
  const lines = markdown.split("\n").filter((l) => l.trim());
  const blocks: ContentBlock[] = [];
  let isFirst = true;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.replace(/^## /, "") });
    } else if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.replace(/^### /, "") });
    } else if (trimmed.startsWith("> **CTA")) {
      // Special callout syntax: > **CTA** Text | Label | /link
      const inner = trimmed.replace(/^> \*\*CTA\*\*\s*/, "");
      const parts = inner.split("|").map((p) => p.trim());
      blocks.push({
        type: "cta",
        text: parts[0] ?? "",
        label: parts[1] ?? (locale === "fr" ? "Réserver un appel gratuit" : "Book a free call"),
        link: parts[2] ?? `/${locale}#contact`,
      });
    } else if (isFirst) {
      blocks.push({ type: "intro", text: trimmed });
      isFirst = false;
    } else {
      blocks.push({ type: "text", text: trimmed });
    }
  }

  return blocks;
}

// ── Main fetch function ────────────────────────────────────────

/**
 * Fetches all published posts for a given locale from Notion.
 * Posts are published if:
 *   - "Published" checkbox is checked ✅
 *   - "Publish Date" is today or in the past
 *   - "Language" matches the requested locale
 */
export async function getNotionPosts(locale: Locale): Promise<NotionPost[]> {
  const dbId = process.env.NOTION_DB_ID;
  if (!dbId) throw new Error("NOTION_DB_ID is not set");

  const notion = getClient();
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Use the search API to find pages in the database
  // (databases.query is not available in this SDK version)
  const response = await notion.search({
    filter: { property: "object", value: "page" },
    sort: { direction: "descending", timestamp: "last_edited_time" },
  });

  // Filter pages that belong to our database manually
  const pages = response.results.filter((r: any) => {
    return (
      r.object === "page" &&
      r.parent?.type === "database_id" &&
      r.parent.database_id?.replace(/-/g, "") === dbId.replace(/-/g, "")
    );
  });

  // Apply filters manually (Published, Language, Publish Date)
  const filtered = pages.filter((p: any) => {
    const props = p.properties;
    const isPublished = getCheckbox(props["Published"]);
    const lang = getSelect(props["Language"]);
    const publishDate = getDate(props["Publish Date"]);
    return isPublished && lang === locale && publishDate <= today;
  });

  // Sort by Publish Date descending
  filtered.sort((a: any, b: any) => {
    const dateA = getDate(a.properties["Publish Date"]);
    const dateB = getDate(b.properties["Publish Date"]);
    return dateB.localeCompare(dateA);
  });

  // Process each page
  const posts: NotionPost[] = [];

  for (const page of filtered) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = page as any;
    const props = p.properties;

    const slug = getText(props["Slug"]);
    if (!slug) continue; // Skip if no slug

    // Convert page body to markdown
    let content: ContentBlock[] = [];
    try {
      const mdBlocks = await n2m.pageToMarkdown(p.id);
      const markdown = n2m.toMarkdownString(mdBlocks).parent;
      content = markdownToBlocks(markdown, locale);
    } catch {
      content = [];
    }

    posts.push({
      slug,
      title:       getText(props["Title"]),
      excerpt:     getText(props["Excerpt"]),
      category:    getSelect(props["Category"]),
      readTime:    getText(props["Read Time"]),
      publishedAt: getDate(props["Publish Date"]),
      featured:    getCheckbox(props["Featured"]),
      tags:        getMultiSelect(props["Tags"]),
      content,
    });
  }

  return posts;
}

/**
 * Fetches a single post by slug.
 */
export async function getNotionPost(
  locale: Locale,
  slug: string
): Promise<NotionPost | null> {
  const posts = await getNotionPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}

/**
 * Returns all slugs for a given locale (used for generateStaticParams).
 */
export async function getNotionSlugs(locale: Locale): Promise<string[]> {
  const posts = await getNotionPosts(locale);
  return posts.map((p) => p.slug);
}
