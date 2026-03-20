"use client";
import { useEffect, useRef } from "react";

export function useScrollReveal(rootMargin = "-60px") {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { rootMargin }
    );
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll(".reveal").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
