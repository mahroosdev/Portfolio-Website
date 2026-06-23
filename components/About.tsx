"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats, skillGroups } from "@/data/portfolio";
import { useSectionReveal, prefersReducedMotion } from "@/lib/anim";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-counter]").forEach((el) => {
        const target = Number(el.dataset.counter);
        const counter = { value: 0 };
        el.textContent = "0";
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
      <div className="grid gap-9 sm:gap-12 md:grid-cols-[180px_1fr] md:gap-16">
        <div>
          <p data-reveal className="sticky top-28 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/60" />
            About
          </p>
        </div>

        <div>
          <h2 data-reveal className="display-xl text-2xl text-ink sm:text-4xl md:text-[2.9rem]">
            Results-driven IT professional working across{" "}
            <span className="text-gold-gradient">AI data operations</span>, software &amp; front-end
            development, and virtual assistance.
          </h2>
          <p data-reveal className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:mt-7 sm:text-base">
            I leverage software development, Python automation, and modern AI tools to deliver fast,
            accurate, high-quality results across multiple domains — consistently maintaining a 100%
            accuracy standard and professional polish on every project. Alongside client work, I build
            and ship my own software: desktop automation apps, a cross-platform remote-control system,
            and an ongoing local-first AI assistant.
          </p>

          <div data-reveal className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line bg-line sm:mt-14 sm:rounded-2xl">
            {stats.map((s) => (
              <div key={s.label} className="bg-panel px-3 py-5 sm:px-6 sm:py-8">
                <div className="font-display text-2xl font-semibold text-ink sm:text-5xl">
                  <span data-counter={s.value}>{s.value}</span>
                  <span className="text-gold">{s.suffix}</span>
                </div>
                <p className="mt-2 text-[10px] leading-tight text-muted sm:text-[13px] sm:leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 sm:grid-cols-2">
            {skillGroups.map((group, gi) => (
              <div key={group.title} data-reveal data-reveal-delay={String(gi * 0.06)}>
                <h3 className="mb-4 text-[11px] uppercase tracking-[0.3em] text-gold">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-ink/80 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
