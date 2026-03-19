"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import content from "@/data/content.json";

export function Process() {
  const { process } = content;
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding bg-bg-surface/40 border-y border-bg-border relative"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(0,212,168,0.05), transparent)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-24">
          <div className="badge reveal mb-6">{process.badge}</div>
          <h2 className="section-headline reveal reveal-delay-1 mb-4">
            {process.headline[0]}{" "}
            <em className="not-italic gradient-text-teal">{process.headline[1]}</em>
          </h2>
          <p className="section-subheadline reveal reveal-delay-2">
            {process.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line */}
          <div
            aria-hidden
            className="absolute left-[39px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/30 via-teal/20 to-transparent hidden lg:block"
          />

          <div className="flex flex-col gap-8 lg:gap-6">
            {process.steps.map((step, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} flex flex-col lg:flex-row items-start gap-6 lg:gap-8 group`}
              >
                {/* Step number circle */}
                <div className="relative flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-bg-elevated border border-bg-border flex items-center justify-center
                                  group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-300">
                    <span
                      className="font-display text-lg tracking-tighter"
                      style={{
                        background: "linear-gradient(135deg, #FF5C00, #FF9A5C)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-3 pb-8 border-b border-bg-border last:border-b-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-body font-semibold text-xl text-text-primary">
                      {step.title}
                    </h3>
                    <span className="text-xs text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full flex-shrink-0 font-body">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
