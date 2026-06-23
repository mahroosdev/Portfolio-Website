"use client";

import { useEffect, useRef } from "react";
import { webGroups } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/Icons";
import { useSectionReveal } from "@/lib/anim";

export default function WebWork() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>(".web-work-card"));
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    let frame = 0;

    const clearActiveCards = () => {
      cards.forEach((card) => card.classList.remove("is-mobile-active"));
    };

    const updateActiveCards = () => {
      frame = 0;

      if (!mobileQuery.matches) {
        clearActiveCards();
        return;
      }

      const viewportHeight = window.innerHeight;
      const focusLine = viewportHeight * 0.48;
      let activeTop = 0;
      let activeDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const isVisible = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.16;

        if (!isVisible) return;

        const distance = Math.abs(cardCenter - focusLine);
        if (distance < activeDistance) {
          activeDistance = distance;
          activeTop = rect.top;
        }
      });

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const isSameRow = Math.abs(rect.top - activeTop) < 24;
        const isVisible = rect.top < viewportHeight * 0.86 && rect.bottom > viewportHeight * 0.12;
        card.classList.toggle("is-mobile-active", isSameRow && isVisible);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveCards);
    };

    const handleModeChange = () => {
      if (mobileQuery.matches) {
        requestUpdate();
      } else {
        clearActiveCards();
      }
    };

    updateActiveCards();
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
    <section id="web-work" ref={rootRef} className="hairline-t bg-panel/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-36">
        <div className="mb-10 sm:mb-14">
          <p data-reveal className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
            <span className="h-px w-8 bg-gold/60" />
            Web Work
          </p>
          <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl">
            Live sites & <span className="text-gold-gradient">tools</span>
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-[12px] leading-snug text-muted sm:mt-5 sm:text-sm sm:leading-relaxed">
            A selection of deployed demo sites and browser tools — every card links to the live build.
            Front-end: HTML, CSS, JavaScript, responsive and SEO-ready.
          </p>
        </div>

        <div className="flex flex-col gap-10 sm:gap-16">
          {webGroups.map((group) => (
            <div key={group.title}>
              <div data-reveal className="mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-[17px] font-medium leading-tight text-ink sm:text-xl">{group.title}</h3>
                <p className="text-[11px] leading-snug text-muted sm:text-xs">{group.note}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.projects.map((project) => (
                  <a
                    key={project.slug}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-reveal
                    data-cursor-hover
                    className="web-work-card group overflow-hidden rounded-lg border border-line bg-panel transition-colors duration-300 sm:rounded-xl"
                  >
                    <div className="card-media overflow-hidden">
                      {/* mobile screenshot on small screens, desktop on sm+ */}
                      <img
                        src={project.mobileImage ?? project.image}
                        alt={`${project.name} — mobile screenshot`}
                        loading="lazy"
                        className="block aspect-square w-full object-cover object-center sm:hidden"
                      />
                      <img
                        src={project.image}
                        alt={`${project.name} — homepage screenshot`}
                        loading="lazy"
                        className="hidden aspect-[16/10] w-full object-cover object-top sm:block"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-1.5 p-3 sm:gap-3 sm:p-5">
                      <div className="min-w-0">
                        <h4 className="web-work-card-title break-words font-display text-[13px] font-medium leading-tight text-ink transition-colors duration-300 sm:text-base">
                          {project.name}
                        </h4>
                        <p className="mt-1 text-[11px] leading-snug text-muted sm:text-[13px]">{project.description}</p>
                      </div>
                      <ArrowUpRight className="web-work-card-arrow mt-0.5 h-3.5 w-3.5 shrink-0 text-muted transition-all duration-300 sm:mt-1 sm:h-4 sm:w-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
