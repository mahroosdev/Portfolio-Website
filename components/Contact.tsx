"use client";

import { useRef, useState, type MouseEvent } from "react";
import { person } from "@/data/portfolio";
import { MailIcon } from "@/components/Icons";
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
      className="inline-flex items-center gap-3 rounded-full border-2 border-primary bg-primary px-8 py-4 sm:px-10 sm:py-5 text-xs font-bold uppercase tracking-widest text-bg transition-all duration-300 hover:bg-transparent hover:text-primary hover:scale-[1.02]"
    >
      {children}
    </a>
  );
}

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section id="contact" ref={rootRef} className="hairline-t relative overflow-hidden flex flex-1 flex-col">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[140px]" />

      <div className="relative mx-auto flex max-w-6xl flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:py-24 md:px-8">
        <p data-reveal className="mb-6 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
          Get in touch
        </p>

        <h2 data-reveal className="display-xl text-[9vw] leading-[1.05] text-ink sm:text-7xl md:text-8xl uppercase tracking-tight">
          Let&apos;s build something
          <br />
          <span className="text-primary-gradient">exceptional</span>
        </h2>

        <div data-reveal className="mt-8 sm:mt-12">
          <MagneticButton href={`mailto:${person.email}`}>
            <MailIcon className="h-4 w-4" />
            {person.email}
          </MagneticButton>
        </div>

        <div data-reveal className="mt-10 flex w-full max-w-3xl flex-col items-center gap-5 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-medium text-ink">
            {person.phones.map((phone, index) => (
              <span key={phone.href} className="flex items-center gap-x-4">
                <a
                  href={`tel:${phone.href}`}
                  className="transition-colors hover:text-primary"
                >
                  {phone.label}
                </a>
                {index < person.phones.length - 1 && <span className="h-3 w-px bg-line" />}
              </span>
            ))}
          </div>

          <div className="h-px w-16 bg-primary/45" />

          <div className="flex max-w-xl flex-col items-center gap-2 text-center text-sm leading-relaxed text-muted">
            <p>{person.contactLocation}</p>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-secondary">
              {person.availability}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
