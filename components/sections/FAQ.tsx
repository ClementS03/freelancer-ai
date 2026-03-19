"use client";

import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import content from "@/data/content.json";
import { cn } from "@/lib/utils";

export function FAQ() {
  const { faq } = content;
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="section-padding bg-bg-surface/20 border-y border-bg-border relative"
    >
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left — sticky header */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="badge reveal mb-6">{faq.badge}</div>
            <h2 className="section-headline reveal reveal-delay-1 mb-4">
              {faq.headline}
            </h2>
            <p className="text-sm text-text-secondary reveal reveal-delay-2">
              Une question non listée ici ?{" "}
              <a
                href={`mailto:${content.meta.email}`}
                className="text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
              >
                Envoyez-moi un email
              </a>
              , je réponds sous 24h.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-bg-border">
              {faq.items.map((item, i) => (
                <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 5)}`}>
                  <button
                    className="w-full text-left py-5 flex items-start justify-between gap-4 group"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium leading-relaxed transition-colors duration-200 font-body",
                        open === i ? "text-text-primary" : "text-text-secondary group-hover:text-text-primary"
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5",
                        open === i
                          ? "border-accent bg-accent text-white rotate-45"
                          : "border-bg-border text-text-secondary group-hover:border-[rgba(255,255,255,0.2)]"
                      )}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-400",
                      open === i ? "max-h-96 pb-5" : "max-h-0"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  >
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
