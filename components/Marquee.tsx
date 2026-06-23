"use client";

import { useRef } from "react";
import { marqueeItems } from "@/data/portfolio";
import { useSectionReveal } from "@/lib/anim";

export default function Marquee() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section ref={rootRef} className="hairline-t hairline-b bg-panel/40">
      <div className="mx-auto max-w-5xl px-5 py-14 text-center md:px-8 md:py-16">
        <p data-reveal className="mb-7 text-[11px] uppercase tracking-[0.4em] text-gold">
          Tools &amp; technologies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {marqueeItems.map((item, i) => (
            <span
              key={item}
              data-reveal
              data-reveal-delay={String((i % 6) * 0.05)}
              className="rounded-full border border-line bg-bg/60 px-4 py-2 font-display text-[13px] tracking-wide text-ink/80 transition-colors duration-300 hover:border-gold/50 hover:text-gold sm:text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
