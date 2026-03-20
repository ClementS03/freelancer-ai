"use client";
import Link from "next/link";
import type { getContent } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type HeroContent = ReturnType<typeof getContent>["hero"];

export function Hero({ content: c, locale }: { content: HeroContent; locale: Locale }) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Ambient glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,92,0,0.10), transparent 70%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(0,212,168,0.06), transparent 60%)"
      }} />
      {/* Grid lines */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.022]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="badge-accent mb-8 animate-fade-up" style={{ animationFillMode: "both" }}>
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {c.badge}
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[1.02] tracking-tight text-text-primary mb-6 animate-fade-up"
            style={{ animationDelay: "80ms", animationFillMode: "both" }}
          >
            {c.headline[0]}{" "}
            <span className="italic" style={{
              background: "linear-gradient(135deg, #FF5C00 0%, #FF9A5C 60%, #FF5C00 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>
              {c.headline[1]}
            </span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10 animate-fade-up"
            style={{ animationDelay: "160ms", animationFillMode: "both" }}>
            {c.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16 animate-fade-up"
            style={{ animationDelay: "240ms", animationFillMode: "both" }}>
            <Link href={c.ctaPrimary.href} className="btn-primary btn-lg">{c.ctaPrimary.label}</Link>
            <Link href={c.ctaSecondary.href} className="btn-ghost btn-lg">{c.ctaSecondary.label}</Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-bg-border animate-fade-up"
            style={{ animationDelay: "320ms", animationFillMode: "both" }}>
            {c.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-display text-3xl text-text-primary tracking-tight">{stat.value}</span>
                <span className="text-xs text-text-secondary uppercase tracking-wider mt-0.5 font-body">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <p className="mt-6 text-xs text-text-tertiary tracking-wide animate-fade-up"
            style={{ animationDelay: "400ms", animationFillMode: "both" }}>
            {c.trust}
          </p>
        </div>
      </div>

      {/* Decorative rings */}
      <div aria-hidden className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden xl:block">
        {[1,2,3,4,5].map((i) => (
          <div key={i} className="absolute inset-0 border border-[rgba(255,255,255,0.03)] rounded-full animate-float"
            style={{ inset: `${(i-1)*60}px`, animationDelay: `${i*0.4}s`, animationDuration: `${5+i}s` }} />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-accent opacity-60 animate-glow-pulse" />
        </div>
      </div>
    </section>
  );
}
