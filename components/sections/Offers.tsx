"use client";

import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import content from "@/data/content.json";
import { cn } from "@/lib/utils";

export function Offers() {
  const { offers } = content;
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section
      ref={sectionRef}
      id="offres"
      className="section-padding relative"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,92,0,0.07), transparent 60%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="badge reveal mb-6">{offers.badge}</div>
          <h2 className="section-headline reveal reveal-delay-1 mb-4">
            {offers.headline[0]}{" "}
            <em className="not-italic gradient-text-accent">{offers.headline[1]}</em>
          </h2>
          <p className="section-subheadline reveal reveal-delay-2 mb-2">
            {offers.subtitle}
          </p>
          <p className="text-xs text-text-tertiary reveal reveal-delay-2 mt-2">
            {offers.acompte_note}
          </p>
        </div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {offers.items.map((offer, i) => (
            <div
              key={offer.id}
              className={cn(
                "reveal flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden group",
                `reveal-delay-${i + 1}`,
                offer.featured
                  ? "border-accent/40 bg-gradient-to-b from-[rgba(255,92,0,0.06)] to-bg-surface relative"
                  : "border-bg-border bg-bg-surface hover:border-[rgba(255,255,255,0.12)]"
              )}
            >
              {/* Featured glow */}
              {offer.featured && (
                <div
                  aria-hidden
                  className="absolute -inset-px rounded-2xl pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,92,0,0.25) 0%, transparent 50%, rgba(0,212,168,0.1) 100%)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                  }}
                />
              )}

              {/* Badge */}
              {offer.badge && (
                <div className="px-6 pt-5">
                  <span className="badge-accent text-xs">{offer.badge}</span>
                </div>
              )}

              <div className="p-6 pt-5 flex flex-col flex-1">
                {/* Name */}
                <p className="text-xs text-text-tertiary uppercase tracking-widest font-body mb-3">
                  {offer.name}
                </p>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-end gap-1">
                    <span
                      className={cn(
                        "font-display text-5xl tracking-tight",
                        offer.featured ? "gradient-text-accent" : "text-text-primary"
                      )}
                    >
                      {offer.price}
                      <span className="text-3xl">{offer.currency}</span>
                    </span>
                    <span className="text-xs text-text-tertiary pb-2">{offer.vat}</span>
                  </div>
                  <p className="text-xs text-teal mt-1 font-body">
                    Livraison {offer.delivery}
                  </p>
                </div>

                {/* Tagline */}
                <p className="text-sm text-text-secondary leading-relaxed mb-5 pb-5 border-b border-bg-border">
                  {offer.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-text-secondary leading-relaxed mb-5">
                  {offer.description}
                </p>

                {/* Features */}
                <ul className="check-list flex-1 mb-6">
                  {offer.features.map((feat, fi) => (
                    <li key={fi}>{feat}</li>
                  ))}
                </ul>

                {/* Not included */}
                {offer.not_included.length > 0 && (
                  <div className="mb-6">
                    <p className="text-2xs text-text-tertiary uppercase tracking-widest mb-2 font-body">Non inclus</p>
                    <ul className="cross-list">
                      {offer.not_included.map((item, ni) => (
                        <li key={ni}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* For who */}
                <div className="mb-6 p-3 rounded-xl bg-bg-elevated border border-bg-border">
                  <p className="text-2xs text-text-tertiary uppercase tracking-widest mb-1 font-body">Pour qui</p>
                  <p className="text-xs text-text-secondary leading-relaxed">{offer.for_who}</p>
                </div>

                {/* CTA */}
                <Link
                  href={offer.cta_href}
                  className={cn(
                    "btn w-full text-center",
                    offer.featured ? "btn-primary" : "btn-secondary"
                  )}
                >
                  {offer.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Add-on maintenance card */}
        <div className="reveal card border-teal/20 bg-gradient-to-r from-teal/5 to-transparent">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal text-lg flex-shrink-0">
                🔄
              </div>
              <div>
                <h3 className="font-body font-semibold text-base text-text-primary mb-1">
                  {offers.addon.title}{" "}
                  <span className="text-teal font-normal font-body">
                    — {offers.addon.price}
                  </span>
                </h3>
                <p className="text-xs text-text-secondary mb-3">
                  {offers.addon.note}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {offers.addon.features.map((f, fi) => (
                    <li key={fi} className="text-xs text-text-secondary flex items-center gap-1.5">
                      <span className="text-teal">→</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="#contact" className="btn-secondary flex-shrink-0">
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
