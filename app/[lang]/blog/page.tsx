import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, isValidLocale, getContent, getPosts, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function BlogIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = getContent(locale).blog;
  const posts = getPosts(locale);
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  const dateLocale = locale === "fr" ? "fr-FR" : "en-US";

  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-2xl mb-16">
          <div className="badge mb-6">{t.badge}</div>
          <h1 className="font-display text-5xl lg:text-6xl tracking-tight text-text-primary mb-4">
            {t.headline[0]} <em className="not-italic gradient-text-accent">{t.headline[1]}</em>
          </h1>
          <p className="section-subheadline">{t.subheadline}</p>
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {featured.map((post) => (
              <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group card card-hover p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="badge-accent text-2xs">{post.category}</span>
                  <span className="text-2xs text-text-tertiary">{post.readTime} {t.readTimeLabel}</span>
                </div>
                <h2 className="font-display text-2xl lg:text-3xl text-text-primary group-hover:text-accent/90 transition-colors mb-3 leading-tight">{post.title}</h2>
                <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-bg-border">
                  <time className="text-xs text-text-tertiary">{new Date(post.publishedAt).toLocaleDateString(dateLocale, { day:"numeric",month:"long",year:"numeric" })}</time>
                  <span className="text-xs text-accent group-hover:translate-x-1 transition-transform inline-block">{t.readMoreLabel}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group card card-hover p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="badge text-2xs">{post.category}</span>
                <span className="text-2xs text-text-tertiary">{post.readTime}</span>
              </div>
              <h2 className="font-display text-xl text-text-primary group-hover:text-accent/90 transition-colors mb-3 leading-tight">{post.title}</h2>
              <p className="text-sm text-text-secondary line-clamp-2 mb-5">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-bg-border">
                <time className="text-xs text-text-tertiary">{new Date(post.publishedAt).toLocaleDateString(dateLocale, { day:"numeric",month:"long",year:"numeric" })}</time>
                <span className="text-xs text-accent group-hover:translate-x-1 transition-transform inline-block">{t.readMoreLabel}</span>
              </div>
            </Link>
          ))}
        </div>
        {posts.length === 0 && <p className="text-center py-24 text-text-secondary">{t.noPostsLabel}</p>}
      </div>
    </div>
  );
}
