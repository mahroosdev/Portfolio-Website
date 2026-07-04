"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stats } from "@/data/portfolio";
import { useSectionReveal, prefersReducedMotion } from "@/lib/anim";

const approaches = [
  {
    title: "Clean & Scalable Code",
    description: "Writing well-structured, maintainable code with consistent patterns — readability and scalability over clever shortcuts.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
  },
  {
    title: "User-First Interfaces",
    description: "Building intuitive, responsive UIs that prioritize usability, accessibility, and smooth interactions across every device.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    ),
  },
  {
    title: "Continuous Growth",
    description: "Actively exploring new frameworks, APIs, and architectures — always iterating, always improving through hands-on experimentation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
    ),
  },
  {
    title: "Team-Ready Mindset",
    description: "Effective communicator who thrives in collaborative environments — quick to adapt, open to feedback, and focused on shared goals.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
  },
];

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
          <div className="sticky top-28">
            <p data-reveal className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
              <span className="h-[1px] w-8 bg-secondary/60" />
              About
            </p>
            <div data-reveal className="hidden md:block relative">
              <div className="group h-40 w-40 overflow-hidden rounded-full border-2 border-primary/25 hover:border-primary/50 transition-colors duration-500 [isolation:isolate]">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={400}
                  height={400}
                  quality={100}
                  unoptimized
                  className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 data-reveal className="font-display font-bold text-2xl text-ink leading-snug sm:text-4xl sm:leading-snug md:text-[2.9rem] md:leading-[1.35]">
            Motivated Junior Software Engineer focused on{" "}
            <span className="text-primary-gradient">clean interfaces</span> and robust applications.
          </h2>
          <p data-reveal className="mt-5 max-w-2xl text-sm leading-[1.75] text-muted sm:mt-7 sm:text-base sm:leading-[1.8]">
            I am passionate about building useful tools, clean interfaces, and reliable user flows using React, TypeScript, and modern frontend ecosystems. I thrive in team environments, learning quickly and iteratively improving projects through feedback and debugging. Alongside client work, I continuously experiment with new web APIs and desktop integrations to broaden my technical foundation.
          </p>

          <div data-reveal className="mt-10 grid grid-cols-2 border border-line bg-panel/30 sm:mt-14">
            {stats.map((s, idx) => (
              <div key={s.label} className={`px-5 py-6 sm:px-8 sm:py-10 relative group ${idx === 0 ? 'border-r border-line' : ''}`}>
                <div className="font-display text-3xl font-light text-ink sm:text-6xl tracking-tight">
                  <span data-counter={s.value}>{s.value}</span>
                  <span className="text-primary font-medium">{s.suffix}</span>
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-widest text-muted/90 sm:text-xs font-semibold">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16">
            <h3 data-reveal className="mb-6 text-[10px] font-bold uppercase tracking-[0.35em] text-primary">My Approach</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {approaches.map((item, i) => (
                <div
                  key={item.title}
                  data-reveal
                  data-reveal-delay={String(i * 0.06)}
                  className="group p-5 sm:p-6 border border-line bg-panel/20 rounded-xl hover:border-primary/30 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 text-primary/60 group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink mb-1.5">{item.title}</h4>
                      <p className="text-xs leading-relaxed text-muted">{item.description}</p>
                    </div>
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
