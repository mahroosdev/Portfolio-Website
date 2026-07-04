"use client";

import { useEffect, useRef } from "react";
import { services } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/Icons";
import { prefersReducedMotion, useSectionReveal } from "@/lib/anim";

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>(".service-row"));
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    let frame = 0;

    const clearActiveRows = () => {
      rows.forEach((row) => row.classList.remove("is-active"));
    };

    const updateActiveRow = () => {
      frame = 0;

      if (!mobileQuery.matches) {
        clearActiveRows();
        return;
      }

      const viewportHeight = window.innerHeight;
      const focusLine = viewportHeight * 0.42;
      let activeRow: HTMLElement | null = null;
      let activeDistance = Number.POSITIVE_INFINITY;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const isReadable = rect.top < viewportHeight * 0.78 && rect.bottom > viewportHeight * 0.18;

        if (!isReadable) return;

        const distance = Math.abs(rowCenter - focusLine);
        if (distance < activeDistance) {
          activeDistance = distance;
          activeRow = row;
        }
      });

      rows.forEach((row) => {
        row.classList.toggle("is-active", row === activeRow);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveRow);
    };

    const handleModeChange = () => {
      if (mobileQuery.matches) {
        requestUpdate();
      } else {
        clearActiveRows();
      }
    };

    updateActiveRow();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    mobileQuery.addEventListener("change", handleModeChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      mobileQuery.removeEventListener("change", handleModeChange);
    };
  }, []);

  return (
    <section id="services" ref={rootRef} className="hairline-t bg-panel/10">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
              <span className="h-[1px] w-8 bg-secondary/60" />
              Core Competencies
            </p>
            <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl uppercase tracking-tight">
              What I <span className="text-primary-gradient">Build</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-xs leading-[1.7] text-muted sm:text-sm">
            Focused on building scalable web apps, robust integrations, and responsive interfaces with modern tools.
          </p>
        </div>

        <ul>
          {services.map((service, i) => (
            <li key={service.title} data-reveal className="hairline-t last:hairline-b">
              <div className="service-row group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-8 sm:py-9">
                <span className="font-display text-xs text-secondary/70 sm:w-12 font-medium">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-medium text-ink transition-colors duration-300 sm:w-80 sm:text-[1.5rem] tracking-wide">
                  {service.title}
                </h3>
                <p className="flex-1 text-xs sm:text-sm leading-[1.7] text-muted">{service.description}</p>
                <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-secondary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
