import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import posts from "@/data/posts.json";
import content from "@/data/content.json";

// Generate static params from posts.json
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

// Dynamic metadata per post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${content.meta.siteName}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

// Render a single content block
function Block({ block }: { block: { type: string; text?: string; link?: string; label?: string } }) {
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

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="section-padding">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-text-tertiary mb-8">
            <Link href="/" className="hover:text-text-secondary transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-text-secondary truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="badge-accent">{post.category}</span>
            <span className="text-xs text-text-tertiary">{post.readTime} de lecture</span>
            <span className="text-xs text-text-tertiary">·</span>
            <time className="text-xs text-text-tertiary">
              {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl lg:text-5xl text-text-primary tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-lg text-text-secondary leading-relaxed mb-10 pb-10 border-b border-bg-border">
            {post.excerpt}
          </p>

          {/* Content */}
          {post.content && post.content.length > 0 ? (
            <article>
              {post.content.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </article>
          ) : (
            <div className="text-center py-16 text-text-secondary">
              <p>Article complet bientôt disponible.</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-bg-border">
            {post.tags.map((tag) => (
              <span key={tag} className="pill">#{tag}</span>
            ))}
          </div>

          {/* Author CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-bg-surface border border-bg-border">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-teal/20 flex-shrink-0" />
              <div>
                <p className="font-body font-semibold text-text-primary mb-1">
                  {content.meta.siteName}
                </p>
                <p className="text-xs text-text-secondary mb-3">
                  Webdesigner Webflow · IA · Livraison en 5 jours
                </p>
                <Link href="/#contact" className="btn-primary btn-sm inline-flex">
                  Réserver un appel gratuit →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-bg-border">
            <h2 className="font-display text-2xl text-text-primary mb-8">
              Continuer la lecture
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="group card card-hover p-5"
                >
                  <span className="badge text-2xs mb-3 inline-block">{rp.category}</span>
                  <h3 className="font-display text-lg text-text-primary group-hover:text-accent/90 transition-colors leading-tight mb-2">
                    {rp.title}
                  </h3>
                  <p className="text-xs text-text-tertiary">
                    {rp.readTime} · Lire →
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
