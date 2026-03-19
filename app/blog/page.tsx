import Link from "next/link";
import posts from "@/data/posts.json";

// Reusable post card
function PostCard({ post, large = false }: { post: typeof posts[0]; large?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block card card-hover ${large ? "p-8" : "p-6"}`}
    >
      {/* Category + read time */}
      <div className="flex items-center gap-3 mb-4">
        <span className="badge-accent text-2xs">{post.category}</span>
        <span className="text-2xs text-text-tertiary">{post.readTime} de lecture</span>
      </div>

      {/* Title */}
      <h2
        className={`font-display text-text-primary group-hover:text-accent/90 transition-colors duration-200 mb-3 leading-tight ${
          large ? "text-2xl lg:text-3xl" : "text-xl"
        }`}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-2">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-bg-border">
        <time className="text-xs text-text-tertiary">
          {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span className="text-xs text-accent group-hover:translate-x-1 transition-transform duration-200 inline-block">
          Lire →
        </span>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  const allCategories = ["Tout", ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <div className="section-padding">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="badge mb-6">Blog</div>
          <h1 className="font-display text-5xl lg:text-6xl tracking-tight text-text-primary mb-4">
            Ressources pour coachs{" "}
            <em className="not-italic gradient-text-accent">& consultants.</em>
          </h1>
          <p className="section-subheadline">
            Conseils pratiques sur le webdesign, l&apos;IA, et les stratégies qui convertissent les visiteurs en clients.
          </p>
        </div>

        {/* Category filter (static for now, interactive with JS later) */}
        <div className="flex flex-wrap gap-2 mb-12">
          {allCategories.map((cat) => (
            <button
              key={cat}
              className={`pill cursor-pointer hover:border-accent/40 hover:text-text-primary transition-all duration-200 ${
                cat === "Tout" ? "border-accent/40 text-accent bg-accent/8" : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured posts — large cards */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} large />
            ))}
          </div>
        )}

        {/* All posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-24 text-text-secondary">
            <p className="text-lg mb-2">Premiers articles bientôt disponibles.</p>
            <p className="text-sm">Revenez très vite !</p>
          </div>
        )}
      </div>
    </div>
  );
}
