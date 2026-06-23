"use client";

import { useRef } from "react";
import { experience, certifications } from "@/data/portfolio";
import { useSectionReveal } from "@/lib/anim";

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section id="experience" ref={rootRef} className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
      <div className="mb-10 sm:mb-14">
        <p data-reveal className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold/60" />
          Experience
        </p>
        <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl">
          Where I have <span className="text-gold-gradient">worked</span>
        </h2>
      </div>

      <ol className="relative ml-2 border-l border-line pl-7 sm:ml-4 sm:pl-12">
        {experience.map((job) => (
          <li key={job.title} data-reveal className="relative pb-10 last:pb-0 sm:pb-14">
            <span className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border border-gold bg-bg sm:-left-[53px]" />
            <p className="mb-2 inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold">
              {job.period}
            </p>
            <h3 className="font-display text-lg font-medium text-ink sm:text-2xl">{job.title}</h3>
            <p className="mt-1 text-sm text-muted">{job.org}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {job.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                  {point}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-14 sm:mt-20">
        <h3 data-reveal className="mb-6 text-[11px] uppercase tracking-[0.4em] text-gold">
          Certifications
        </h3>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:rounded-2xl lg:grid-cols-4">
          {certifications.map((cert) => (
            <div key={cert.title} data-reveal className="group bg-panel px-4 py-5 transition-colors duration-300 hover:bg-bg sm:px-6 sm:py-7">
              <p className="font-display text-2xl font-semibold text-gold/40 transition-colors duration-300 group-hover:text-gold sm:text-3xl">
                {cert.year}
              </p>
              <p className="mt-2 font-display text-sm font-medium leading-tight text-ink sm:mt-3 sm:text-base">{cert.title}</p>
              <p className="mt-1 text-[11px] leading-snug text-muted sm:text-xs">{cert.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
