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
    <section id="services" ref={rootRef} className="hairline-t bg-panel/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
              <span className="h-px w-8 bg-gold/60" />
              Services
            </p>
            <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl">
              What I <span className="text-gold-gradient">do</span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-[13px] leading-relaxed text-muted sm:text-sm">
            Seven service areas, one standard: fast turnaround, clean execution, and 100% accuracy.
          </p>
        </div>

        <ul>
          {services.map((service, i) => (
            <li key={service.title} data-reveal className="hairline-t last:hairline-b">
              <div className="service-row group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8 sm:py-8">
                <span className="font-display text-sm text-gold/70 sm:w-12">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-medium text-ink transition-colors duration-300 sm:w-80 sm:text-[1.7rem]">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">{service.description}</p>
                <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
