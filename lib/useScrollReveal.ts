"use client";

import { useEffect, useRef } from "react";

/**
 * Hook that adds scroll reveal behaviour to a container.
 * All children with class `reveal` will animate in when they enter the viewport.
 */
export function useScrollReveal(rootMargin = "-60px") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { rootMargin }
    );

    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".reveal");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
