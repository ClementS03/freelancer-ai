// Server Component — pas de "use client"
import { NewsletterForm } from "./NewsletterForm"
import type { getContent } from "@/lib/i18n"

type NewsletterContent = ReturnType<typeof getContent>["newsletter"]

export function Newsletter({ content: c }: { content: NewsletterContent }) {
  return (
    <section className="mt-12 border-y border-bg-border relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(45,158,107,0.06), transparent)",
        }}
      />

      <div className="section-container relative z-10 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* Left: copy — rendu côté serveur */}
          <div className="max-w-lg">
            <div className="badge-accent mb-3 inline-block">{c.badge}</div>
            <h2 className="font-display text-2xl md:text-3xl text-text-primary leading-tight tracking-tight">
              {c.headline}
            </h2>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              {c.subheadline}
            </p>
          </div>

          {/* Right: formulaire interactif — client */}
          <div className="w-full md:w-auto md:min-w-[380px]">
            <NewsletterForm content={c} />
          </div>

        </div>
      </div>
    </section>
  )
}
