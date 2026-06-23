"use client";

import { useRef, useState, type MouseEvent } from "react";
import { person, socials } from "@/data/portfolio";
import { socialIcons, MailIcon } from "@/components/Icons";
import { useSectionReveal } from "@/lib/anim";

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setOffset({
      x: (e.clientX - rect.left - rect.width / 2) * 0.25,
      y: (e.clientY - rect.top - rect.height / 2) * 0.25,
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      data-cursor-hover
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      className="inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4.5 text-base font-medium text-bg transition-transform duration-200 ease-out hover:scale-[1.03]"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section id="contact" ref={rootRef} className="hairline-t relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[140px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 py-20 text-center sm:py-28 md:px-8 md:py-44">
        <p data-reveal className="mb-6 text-[11px] uppercase tracking-[0.4em] text-gold">
          Have a project in mind?
        </p>

        <h2 data-reveal className="display-xl text-[13vw] text-ink sm:text-7xl md:text-8xl">
          LET&apos;S WORK
          <br />
          <span className="text-gold-gradient">TOGETHER</span>
        </h2>

        <div data-reveal className="mt-8 sm:mt-12">
          <MagneticButton href={`mailto:${person.email}`}>
            <MailIcon className="h-5 w-5" />
            {person.email}
          </MagneticButton>
        </div>

        <div data-reveal className="mt-8 flex items-center gap-7 sm:mt-10">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="text-muted transition-all duration-300 hover:-translate-y-1 hover:text-gold"
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>

        <p data-reveal className="mt-10 text-sm text-muted">
          {person.location} · {person.availability}
        </p>
      </div>
    </section>
  );
}
