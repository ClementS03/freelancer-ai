import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  LOCALES,
  isValidLocale,
  getContent,
  getPosts,
  getPost,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    getPosts(lang).map((post) => ({ lang, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return {};
  const post = getPost(lang as Locale, slug);
  if (!post) return {};
  const c = getContent(lang as Locale);
  return {
    title: `${post.title} — ${c.meta.siteName}`,
    description: post.excerpt,
  };
}

type Block = { type: string; text?: string; link?: string; label?: string };

function Block({ block }: { block: Block }) {
  switch (block.type) {
    case "intro":
      return (
        <p className="text-lg text-text-secondary leading-relaxed mb-8 font-display italic">
          {block.text}
        </p>
      );
    case "h2":
      return (
        <h2 className="font-display text-2xl lg:text-3xl text-text-primary mt-12 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl text-text-primary mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "text":
      return (
        <p className="text-base text-text-secondary leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "cta":
      return (
        <div className="my-10 p-6 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/8 to-bg-surface">
          <p className="text-base text-text-primary mb-4">{block.text}</p>
          {block.link && (
            <Link href={block.link} className="btn-primary">
              {block.label} →
            </Link>
          )}
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const post = getPost(locale, slug);
  if (!post) notFound();
  const c = getContent(locale);
  const t = c.blog;
  const related = getPosts(locale)
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  const dateLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-text-tertiary mb-8">
            <Link
              href={`/${locale}`}
              className="hover:text-text-secondary transition-colors"
            >
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/blog`}
              className="hover:text-text-secondary transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-text-secondary truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge-accent">{post.category}</span>
            <span className="text-xs text-text-tertiary">
              {post.readTime} {t.readTimeLabel}
            </span>
            <span className="text-xs text-text-tertiary">·</span>
            <time className="text-xs text-text-tertiary">
              {new Date(post.publishedAt).toLocaleDateString(dateLocale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          <h1 className="font-display text-4xl lg:text-5xl text-text-primary tracking-tight mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-10 pb-10 border-b border-bg-border">
            {post.excerpt}
          </p>

          {post.content && post.content.length > 0 ? (
            <article>
              {post.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </article>
          ) : (
            <div className="text-center py-16 text-text-secondary">
              <p>
                {locale === "fr"
                  ? "Article complet bientôt disponible."
                  : "Full article coming soon."}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-bg-border">
            {post.tags.map((tag) => (
              <span key={tag} className="pill">
                #{tag}
              </span>
            ))}
          </div>

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
        </div>

        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-bg-border">
            <h2 className="font-display text-2xl text-text-primary mb-8">
              {t.relatedTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/${locale}/blog/${rp.slug}`}
                  className="group card card-hover p-5"
                >
                  <span className="badge text-2xs mb-3 inline-block">
                    {rp.category}
                  </span>
                  <h3 className="font-display text-lg text-text-primary group-hover:text-accent/90 transition-colors leading-tight mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-text-tertiary">
                    {rp.readTime} · {t.readMoreLabel}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
