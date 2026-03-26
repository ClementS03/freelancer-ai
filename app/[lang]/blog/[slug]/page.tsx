import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isValidLocale, getContent, type Locale } from "@/lib/i18n";
import { Newsletter } from "@/components/sections/Newsletter";

// Force SSR — always fetch fresh data from Notion on each request
export const dynamic = "force-dynamic";

// ── Fetch helpers ─────────────────────────────────────────────

async function fetchPosts(locale: Locale) {
  if (process.env.NOTION_TOKEN && process.env.NOTION_DB_ID) {
    try {
      const { getNotionPosts } = await import("@/lib/notion");
      return await getNotionPosts(locale);
    } catch {
      // fallback
    }
  }
  const { getPosts } = await import("@/lib/i18n");
  return getPosts(locale);
}

async function fetchPost(locale: Locale, slug: string) {
  if (process.env.NOTION_TOKEN && process.env.NOTION_DB_ID) {
    try {
      const { getNotionPost } = await import("@/lib/notion");
      return await getNotionPost(locale, slug);
    } catch {
      // fallback
    }
  }
  const { getPost } = await import("@/lib/i18n");
  return getPost(locale, slug);
}

// ── Static params ─────────────────────────────────────────────

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    const posts = await fetchPosts(lang as Locale);
    for (const post of posts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  const c = getContent(lang as Locale);
  const post = await fetchPost(lang as Locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${c.meta.siteName}`,
    description: post.excerpt,
  };
}

// ── Page ──────────────────────────────────────────────────────

type ContentBlock =
  | { type: "intro" | "h2" | "h3" | "text"; text: string }
  | { type: "cta"; text: string; link: string; label: string };

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale = lang as Locale;
  const c = getContent(locale);
  const t = c.blog;
  const post = await fetchPost(locale, slug);
  if (!post) notFound();

  // Related posts
  const allPosts = await fetchPosts(locale);
  const related = allPosts
    .filter(
      (p) => p.slug !== slug && p.tags?.some((tag) => post.tags?.includes(tag)),
    )
    .slice(0, 3);

  return (
    <div className="pt-28 pb-24">
      <div className="section-container max-w-3xl">
        {/* Back */}
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors mb-10"
        >
          ← {t.backLabel}
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="badge-accent text-xs">{post.category}</span>
            <span className="text-xs text-text-tertiary">
              {post.readTime} {t.readTimeLabel}
            </span>
            <span className="text-xs text-text-tertiary">
              {new Date(post.publishedAt).toLocaleDateString(
                locale === "fr" ? "fr-FR" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl tracking-tight text-text-primary leading-[1.1] mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="glow-line mb-10" />

        {/* Content */}
        <article className="prose-custom">
          {(post.content as ContentBlock[]).map((block, i) => {
            if (block.type === "intro") {
              return (
                <p
                  key={i}
                  className="text-lg text-text-secondary leading-relaxed mb-8 font-medium"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="font-display text-2xl md:text-3xl text-text-primary mt-12 mb-4"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "h3") {
              return (
                <h3
                  key={i}
                  className="font-body font-semibold text-xl text-text-primary mt-8 mb-3"
                >
                  {block.text}
                </h3>
              );
            }
            if (block.type === "text") {
              return (
                <p
                  key={i}
                  className="text-base text-text-secondary leading-relaxed mb-5"
                >
                  {block.text}
                </p>
              );
            }
            if (block.type === "cta") {
              return (
                <div
                  key={i}
                  className="my-10 p-6 rounded-2xl bg-accent/8 border border-accent/20"
                >
                  <p className="text-base text-text-primary mb-4 font-medium">
                    {block.text}
                  </p>
                  <Link href={block.link} className="btn-primary inline-flex">
                    {block.label}
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </article>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10">
            {post.tags.map((tag) => (
              <span key={tag} className="pill text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-bg-surface border border-bg-border">
          <div className="flex items-start gap-4">
            <img
              src="/icon-192.png"
              alt={c.meta.siteName}
              width={48}
              height={48}
              className="w-12 h-12 rounded-xl flex-shrink-0 object-cover"
            />
            <div>
              <p className="font-body font-semibold text-text-primary mb-1">
                {c.meta.siteName}
              </p>
              <p className="text-xs text-text-secondary mb-3">
                {c.meta.tagline}
              </p>
              <Link
                href={`/${locale}#contact`}
                className="btn-primary btn-sm inline-flex"
              >
                {t.authorCta}
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-bg-border">
            <h3 className="font-body font-semibold text-text-primary mb-6">
              {t.relatedTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${locale}/blog/${p.slug}`}
                  className="card card-hover group block p-5"
                >
                  <span className="badge text-xs mb-3 inline-block">
                    {p.category}
                  </span>
                  <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors leading-snug">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <Newsletter content={c.newsletter} />
      </div>
    </div>
  );
}
