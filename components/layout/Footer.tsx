import Link from "next/link";
import content from "@/data/content.json";

export function Footer() {
  const { footer, meta } = content;

  return (
    <footer className="border-t border-bg-border bg-bg-surface/30">
      <div className="section-container py-16 lg:py-20">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display text-2xl text-text-primary mb-3">
              {footer.logo}
            </div>
            <p className="text-sm text-text-secondary max-w-xs leading-relaxed">
              {footer.tagline}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                href={meta.linkedin}
                target="_blank"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                LinkedIn
              </Link>
              <span className="text-text-tertiary">·</span>
              <Link
                href={meta.instagram}
                target="_blank"
                className="text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Instagram
              </Link>
              <span className="text-text-tertiary">·</span>
              <Link
                href={`mailto:${meta.email}`}
                className="text-text-secondary hover:text-accent transition-colors text-sm"
              >
                {meta.email}
              </Link>
            </div>
          </div>

          {/* Links */}
          {footer.links.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-medium text-text-tertiary uppercase tracking-widest mb-4 font-body">
                {group.group}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">{footer.copyright}</p>
          <div className="flex items-center gap-4">
            {footer.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
