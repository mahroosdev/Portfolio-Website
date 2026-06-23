"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Animates every [data-reveal] descendant of the section into view on scroll.
 * Optional data-reveal-delay="0.15" staggers an element manually.
 */
export function useSectionReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.from(node, {
          y: 44,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: parseFloat(node.dataset.revealDelay ?? "0"),
          scrollTrigger: { trigger: node, start: "top 88%" },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [ref]);
}

/** Smooth-scrolls to an anchor, using Lenis when available. */
export function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -72, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}
