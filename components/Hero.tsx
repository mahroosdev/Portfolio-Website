"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { person } from "@/data/portfolio";
import { ArrowUpRight, MailIcon } from "@/components/Icons";
import { prefersReducedMotion, scrollToHash } from "@/lib/anim";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // rotating role word — interval + CSS swap (reliable, no GSAP timeline to stall)
  useEffect(() => {
    if (person.roles.length < 2) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % person.roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // intro: lands right after the preloader curtain lifts (~2.4s total)
      const tl = gsap.timeline({ delay: 2.3, defaults: { ease: "power4.out" } });
      tl.from(".hero-line > *", { yPercent: 115, duration: 1.2, stagger: 0.12 })
        .from(".hero-fade", { y: 28, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7");

      // slow parallax on the gold orbs
      gsap.to(".hero-orb-a", {
        yPercent: 28,
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".hero-orb-b", {
        yPercent: -22,
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24">
      {/* ambient gold orbs */}
      <div className="hero-orb-a pointer-events-none absolute -top-32 right-[-12%] h-[480px] w-[480px] rounded-full bg-gold/[0.13] blur-[130px]" />
      <div className="hero-orb-b pointer-events-none absolute bottom-[-18%] left-[-10%] h-[420px] w-[420px] rounded-full bg-gold-deep/[0.1] blur-[120px]" />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <p className="hero-fade mb-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-muted sm:text-xs">
          <span className="h-px w-10 bg-gold/60" />
          {person.location}
        </p>

        <h1 className="display-xl text-[17vw] leading-[0.92] text-ink sm:text-[13vw] lg:text-[10rem]">
          <span className="line-mask hero-line"><span className="block">MAHROOS</span></span>
          <span className="line-mask hero-line"><span className="block text-gold-gradient">MAHTHIE</span></span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <div className="hero-fade max-w-xl">
            <div className="mb-4 flex h-7 items-center gap-2 overflow-hidden font-display text-lg text-ink sm:text-xl" aria-label={person.roles.join(", ")}>
              <span className="text-gold">/</span>
              <span key={roleIndex} className="role-swap block">
                {person.roles[roleIndex]}
              </span>
            </div>
            <p className="text-[15px] leading-relaxed text-muted sm:text-base">{person.tagline}</p>
          </div>

          <div className="hero-fade flex items-center gap-3">
            <a
              href="#work"
              onClick={(e) => { e.preventDefault(); scrollToHash("#work"); }}
              data-cursor-hover
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.04]"
            >
              View work
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={`mailto:${person.email}`}
              data-cursor-hover
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-ink transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              <MailIcon className="h-4 w-4" />
              Get in touch
            </a>
          </div>
        </div>
      </div>

      <div className="hero-fade pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-muted">
          <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
          <span className="block h-9 w-px animate-pulse bg-gradient-to-b from-gold/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
