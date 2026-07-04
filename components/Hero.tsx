"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { person } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/Icons";
import { prefersReducedMotion, scrollToHash } from "@/lib/anim";
import Image from "next/image";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // rotating role word
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
      const tl = gsap.timeline({ delay: 2.3, defaults: { ease: "power4.out" } });
      tl.from(".hero-line > *", { yPercent: 115, duration: 1.2, stagger: 0.12 })
        .from(".hero-fade", { y: 28, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7");

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
    <section ref={rootRef} className="hero-bg relative flex min-h-svh flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-36">
      {/* ambient warm glow */}
      <div className="hero-orb-a pointer-events-none absolute -top-32 right-[-5%] h-[500px] w-[500px] rounded-full bg-primary/[0.06] blur-[130px]" />
      <div className="hero-orb-b pointer-events-none absolute bottom-[-15%] left-[-10%] h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[120px]" />

      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 relative z-10">
        <div className="grid gap-6 md:gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Name label */}
            <div className="hero-fade mb-6 hidden md:flex items-center gap-4 text-[11.5px] uppercase tracking-[0.35em] text-secondary sm:text-xs font-bold font-display">
              <span className="h-px w-8 bg-secondary/60" />
              <span>{person.name}</span>
            </div>

            <h1 className="display-xl text-[10vw] leading-[0.95] text-ink sm:text-[8vw] lg:text-[5.8rem] uppercase">
              <span className="line-mask hero-line"><span className="block font-medium">JUNIOR SOFTWARE</span></span>
              <span className="line-mask hero-line"><span className="block text-primary-gradient">ENGINEER</span></span>
            </h1>

            <div className="hero-fade mt-8 max-w-xl">
              <div className="mb-4 flex h-7 items-center gap-2 overflow-hidden font-body text-base text-ink sm:text-lg font-bold" aria-label={person.roles.join(", ")}>
                <span className="text-primary font-bold">{"//"}</span>
                <span key={roleIndex} className="role-swap block font-bold">
                  {person.roles[roleIndex]}
                </span>
              </div>
              <p className="text-[15px] leading-[1.7] text-muted sm:text-base font-light">
                {person.tagline}
              </p>
              {/* Availability Indicator */}
              <div className="mt-6 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-emerald-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-400"></span>
                </span>
                <span className="text-[12px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase font-display">
                  Open to work
                </span>
              </div>
            </div>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#work"
                onClick={(e) => { e.preventDefault(); scrollToHash("#work"); }}
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full border-2 border-primary bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-bg transition-all duration-300 hover:bg-transparent hover:text-primary hover:scale-[1.03]"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Visual (Card on Mobile, Standard Circular Photo on Desktop) */}
          <div className="hero-fade relative flex justify-center lg:justify-end order-1 lg:order-2 hero-visual">
            <div className="relative group hero-profile-card">
              {/* Decorative rings behind (hidden on mobile, shown on desktop) */}
              <div className="absolute -inset-3 rounded-full border border-[rgba(59,130,246,0.18)] opacity-35 transition-all duration-500 group-hover:border-[rgba(59,130,246,0.3)] hidden md:block" />
              <div className="absolute -inset-6 rounded-full border border-[rgba(59,130,246,0.10)] opacity-35 transition-all duration-500 group-hover:border-[rgba(59,130,246,0.18)] hidden md:block" />
              
              <div className="hero-photo-wrap hero-photo">
                <Image
                  src="/profile-clean.jpg"
                  alt={person.name}
                  width={1200}
                  height={1200}
                  quality={100}
                  unoptimized
                  priority
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 rounded-full"
                />
              </div>

              {/* Mobile-only supporting identity text (hidden on desktop) */}
              <div className="mt-4 text-center md:hidden hero-profile-card-text">
                <h3 className="text-sm font-bold tracking-wide hero-profile-card-name">MFM MAHROOS MAHTHIE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-fade pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="flex flex-col items-center gap-2 text-muted/70">
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium">Scroll Down</span>
          <span className="block h-8 w-px bg-gradient-to-b from-primary/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}
