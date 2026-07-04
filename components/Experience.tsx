"use client";

import { useEffect, useRef, useState } from "react";
import { experience, education, certifications } from "@/data/portfolio";
import { useSectionReveal } from "@/lib/anim";

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  const [activeEducation, setActiveEducation] = useState<Set<number>>(new Set());
  const educationRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 640) {
        setActiveEducation(new Set());
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestTop = 0;
      let minDistance = Infinity;

      educationRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - elementCenter);

        if (rect.top < window.innerHeight && rect.bottom > 0 && distance < minDistance) {
          minDistance = distance;
          closestTop = rect.top;
        }
      });

      const active = new Set<number>();
      educationRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (Math.abs(rect.top - closestTop) < 10) {
          active.add(idx);
        }
      });
      setActiveEducation(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" ref={rootRef} className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
      <div className="mb-10 sm:mb-14">
        <p data-reveal className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
          <span className="h-[1px] w-8 bg-secondary/60" />
          Experience
        </p>
        <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl uppercase tracking-tight">
          Where I have <span className="text-primary-gradient">worked</span>
        </h2>
      </div>

      <div className="flex flex-col border-t border-line/60">
        {experience.map((job) => (
          <div key={job.title} data-reveal className="grid gap-4 py-8 sm:py-12 md:grid-cols-[200px_1fr] md:gap-16 border-b border-line/60">
            <div>
              <span className="inline-block border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-primary">
                {job.period}
              </span>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-ink sm:text-xl tracking-wide">{job.title}</h3>
              <p className="mt-1 text-xs sm:text-sm text-muted/90 font-medium">{job.org}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-xs sm:text-sm leading-[1.7] text-ink/80">
                    <span className="text-primary/70 font-semibold shrink-0">—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 sm:mt-24">
        <h3 data-reveal className="mb-8 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
          Education
        </h3>
        <div className="grid grid-cols-1 border-l border-t border-line/60 sm:grid-cols-3">
          {education.map((item, idx) => (
            <div
              key={item.title}
              ref={(el) => {
                educationRefs.current[idx] = el;
              }}
              data-reveal
              className={`group relative min-h-[128px] p-5 sm:aspect-[1.6] sm:min-h-0 sm:p-6 border-r border-b border-line/60 transition-colors duration-500 flex flex-col justify-between ${
                activeEducation.has(idx) ? "bg-panel/40" : "bg-panel/20 hover:bg-panel/40"
              }`}
            >
              <div
                className={`absolute top-0 left-0 right-0 h-px bg-secondary transition-transform duration-500 origin-left ${
                  activeEducation.has(idx) ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100`}
              />

              <span
                className={`font-display text-xl font-light transition-colors duration-300 sm:text-3xl tracking-tight ${
                  activeEducation.has(idx) ? "text-secondary" : "text-secondary/30"
                } group-hover:text-secondary`}
              >
                {item.year}
              </span>
              <div className="mt-3">
                <h4
                  className={`font-display text-[13px] sm:text-sm font-semibold leading-tight transition-colors tracking-wide ${
                    activeEducation.has(idx) ? "text-secondary" : "text-ink"
                  } group-hover:text-secondary`}
                >
                  {item.title}
                </h4>
                <p className="mt-1 text-[10px] sm:text-[11px] leading-snug text-muted">{item.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 sm:mt-20">
        <div data-reveal className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
            Certifications
          </h3>
          <p className="max-w-md text-xs leading-relaxed text-muted sm:text-sm">
            A compact selection of completed learning certificates and technical course work.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {certifications.map((cert) => (
            <a
              key={cert.title}
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="group overflow-hidden border border-line/60 bg-panel/20 transition-colors duration-300 hover:border-secondary/50 hover:bg-panel/40"
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-line/60 bg-bg">
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  loading="lazy"
                  className="h-full w-full object-cover object-center opacity-85 transition-transform duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                />
              </div>
              <div className="p-3">
                <h4 className="font-display text-[11px] font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-secondary sm:text-xs">
                  {cert.title}
                </h4>
                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted sm:text-[10px]">{cert.org}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
