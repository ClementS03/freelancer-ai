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

export type ContentBlock =
  | { type: "intro" | "h2" | "h3" | "text"; text: string }
  | { type: "cta"; text: string; link: string; label: string };

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
  const blocks: ContentBlock[] = [];
  let isFirst = true;

  for (const line of markdown.split("\n")) {
    const t = line.trim();
    if (!t) continue;

    // Skip horizontal rules and H1 (title is already shown in the page header)
    if (t === "---" || t === "***" || t === "___") continue;
    if (t.startsWith("# ") && !t.startsWith("## ")) continue;

    if (t.startsWith("## ")) {
      blocks.push({ type: "h2", text: t.slice(3) });
    } else if (t.startsWith("### ")) {
      blocks.push({ type: "h3", text: t.slice(4) });
    } else if (t.startsWith("> **CTA**")) {
      // Format: > **CTA** Text | Button label | /fr#contact
      const inner = t.replace(/^> \*\*CTA\*\*\s*/, "");
      const [text, label, link] = inner.split("|").map((p) => p.trim());
      blocks.push({
        type: "cta",
        text: text ?? "",
        label:
          label ??
          (locale === "fr" ? "Réserver un appel gratuit" : "Book a free call"),
        link: link ?? `/${locale}#contact`,
      });
    } else if (isFirst) {
      blocks.push({ type: "intro", text: t });
      isFirst = false;
    } else {
      // Strip markdown bold/italic for plain text
      const plain = t
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1");
      blocks.push({ type: "text", text: plain });
    }
  }

  return blocks;
}

// ── Main fetch function ────────────────────────────────────────

export async function getNotionPosts(locale: Locale): Promise<NotionPost[]> {
  const token = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_DB_ID;

  if (!token || !dbId) {
    throw new Error("NOTION_TOKEN or NOTION_DB_ID is missing");
  }

  const notion = new Client({ auth: token });
  const n2m = new NotionToMarkdown({ notionClient: notion });
  const today = new Date().toISOString().split("T")[0];

  // Query the database with filters
  const response = await notion.databases.query({
    database_id: dbId,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Language", select: { equals: locale } },
        { property: "Publish Date", date: { on_or_before: today } },
      ],
    },
    sorts: [{ property: "Publish Date", direction: "descending" }],
  });

  const posts: NotionPost[] = [];

  for (const page of response.results) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = page as any;
    const props = p.properties;

    const slug = getText(props["Slug"]);
    if (!slug) continue;

    // Fetch page body and convert to markdown
    let content: ContentBlock[] = [];
    try {
      const mdBlocks = await n2m.pageToMarkdown(p.id);
      const markdown = n2m.toMarkdownString(mdBlocks).parent;
      content = markdownToBlocks(markdown, locale);
    } catch (err) {
      console.warn(`[Notion] Failed to fetch content for slug "${slug}":`, err);
    }

    posts.push({
      slug,
      title: getText(props["Title"]),
      excerpt: getText(props["Excerpt"]),
      category: getSelect(props["Category"]),
      readTime: getText(props["Read Time"]),
      publishedAt: getDate(props["Publish Date"]),
      featured: getCheckbox(props["Featured"]),
      tags: getMultiSelect(props["Tags"]),
      content,
    });
  }

  return posts;
}

export async function getNotionPost(
  locale: Locale,
  slug: string,
): Promise<NotionPost | null> {
  const posts = await getNotionPosts(locale);
  return posts.find((p) => p.slug === slug) ?? null;
}
