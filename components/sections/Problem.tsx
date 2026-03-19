"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";
import content from "@/data/content.json";

export function Problem() {
  const { problem } = content;
  const sectionRef = useScrollReveal() as React.RefObject<HTMLElement>;

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="section-padding relative"
    >
      {/* Background tint */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(255,92,0,0.04), transparent)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — text */}
          <div>
            <div className="badge reveal mb-6">{problem.badge}</div>

            <h2 className="section-headline reveal reveal-delay-1 mb-6">
              {problem.headline[0]}{" "}
              <em className="not-italic gradient-text-accent">
                {problem.headline[1]}
              </em>
            </h2>

            <p className="section-subheadline reveal reveal-delay-2 mb-8">
              {problem.intro}
            </p>

            <Link
              href="#offres"
              className="btn-primary reveal reveal-delay-3"
            >
              {problem.cta}
            </Link>
          </div>

          {/* Right — cards */}
          <div className="flex flex-col gap-4">
            {problem.points.map((point, i) => (
              <div
                key={i}
                className={`card card-hover reveal reveal-delay-${i + 1} group`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-accent/10 transition-colors duration-300">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-base text-text-primary mb-1.5">
                      {point.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
