"use client";

import { useEffect, useRef } from "react";
import { webGroups } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/Icons";
import { useSectionReveal, prefersReducedMotion } from "@/lib/anim";

// Card sizing — kept in sync with the CSS-reserved heights below so the
// layout never shifts when JS initializes.
const CARD_VW = 65; // card width in vw
const IMG_VW = 90; // portrait image height in vw
const CAPTION_PX = 70; // fixed caption height
const GAP_PX = 12;

export default function WebWork() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    if (!mobileQuery.matches || prefersReducedMotion()) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>(".mobile-scroll-row"));
    let frame = 0;

    const update = () => {
      frame = 0;
      rows.forEach((row) => {
        const sticky = row.querySelector<HTMLElement>(".mobile-scroll-sticky");
        const track = row.querySelector<HTMLElement>(".mobile-scroll-track");
        if (!sticky || !track) return;

        const cards = Array.from(track.children) as HTMLElement[];
        if (cards.length <= 1) return;

        const totalShift = (cards[0].offsetWidth + GAP_PX) * (cards.length - 1);
        const range = row.offsetHeight - sticky.offsetHeight;
        if (range <= 0) return;

        // The resolved px value the sticky locks to (from CSS top: max(...))
        const stickyTopPx = parseFloat(getComputedStyle(sticky).top) || 0;
        const rowTop = row.getBoundingClientRect().top;

        // 0 while the row enters; 1 once it has fully scrolled through the lock
        const progress = Math.min(1, Math.max(0, (stickyTopPx - rowTop) / range));
        track.style.transform = `translate3d(${-totalShift * progress}px,0,0)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="web-work" ref={rootRef} className="hairline-t">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-5 sm:py-24 md:px-8 md:py-36">
        <div className="mb-10 sm:mb-14">
          <p data-reveal className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
            <span className="h-[1px] w-8 bg-secondary/60" />
            Web Work
          </p>
          <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl uppercase tracking-tight">
            Live sites & <span className="text-primary-gradient">tools</span>
          </h2>
          <p data-reveal className="mt-3 max-w-xl text-xs leading-[1.7] text-muted sm:mt-5 sm:text-sm">
            A selection of deployed demo sites and browser tools — every card links to the live build.
            Front-end: HTML, CSS, JavaScript, responsive and SEO-ready.
          </p>
        </div>

        <div className="flex flex-col gap-10 sm:gap-16">
          {webGroups.map((group) => {
            const multi = group.projects.length > 1;
            // Reserve the exact scroll height in CSS so there is no layout shift
            // when JS runs. height = one card + horizontal travel distance.
            const cardH = `calc(${IMG_VW}vw + ${CAPTION_PX}px)`;
            const travel = `calc((${CARD_VW}vw + ${GAP_PX}px) * ${group.projects.length - 1})`;
            const rowHeight = `calc(${cardH} + ${travel})`;
            const stickyTop = `max(7vh, calc(50vh - (${IMG_VW}vw + ${CAPTION_PX}px) / 2))`;

            return (
              <div key={group.title}>
                <div data-reveal className="mb-4 flex flex-col gap-1 sm:mb-6 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="font-display text-[16px] font-medium leading-tight text-ink sm:text-lg tracking-wide">{group.title}</h3>
                  <p className="text-[10px] uppercase tracking-wider text-muted/80">{group.note}</p>
                </div>

                {/* Mobile: sticky-locked horizontal scroll (height reserved in CSS → no jump) */}
                {multi ? (
                  <div
                    className="mobile-scroll-row relative sm:hidden"
                    style={{ height: rowHeight }}
                  >
                    <div
                      className="mobile-scroll-sticky sticky overflow-hidden"
                      style={{ top: stickyTop, height: cardH }}
                    >
                      <div className="mobile-scroll-track flex gap-3 will-change-transform">
                        {group.projects.map((project) => (
                          <MobileCard key={project.slug} project={project} cardH={cardH} />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div data-reveal className="flex sm:hidden" style={{ height: cardH }}>
                    <MobileCard project={group.projects[0]} cardH={cardH} />
                  </div>
                )}

                {/* Desktop: grid layout */}
                <div className="hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                  {group.projects.map((project) => (
                    <a
                      key={project.slug}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-reveal
                      data-cursor-hover
                      className="web-work-card border border-line bg-panel/30 group overflow-hidden transition-colors duration-500 hover:bg-panel/60"
                    >
                      <div className="card-media overflow-hidden aspect-[16/10] bg-bg">
                        <img
                          src={project.image}
                          alt={`${project.name} — screenshot`}
                          loading="lazy"
                          className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                            project.objectPosition ?? "object-top"
                          }`}
                        />
                      </div>
                      <div className="flex items-start justify-between gap-3 p-5 border-t border-line/60">
                        <div className="min-w-0">
                          <h4 className="web-work-card-title break-words font-display text-base font-medium leading-tight text-ink transition-colors duration-300 tracking-wide">
                            {project.name}
                          </h4>
                          <p className="mt-1.5 text-xs leading-[1.6] text-muted">{project.description}</p>
                        </div>
                        <ArrowUpRight className="web-work-card-arrow mt-0.5 h-4 w-4 shrink-0 text-muted transition-all duration-300" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MobileCard({
  project,
  cardH,
}: {
  project: (typeof webGroups)[number]["projects"][number];
  cardH: string;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="web-work-card border border-line bg-panel/30 group flex flex-col overflow-hidden shrink-0 rounded-lg"
      style={{ width: `${CARD_VW}vw`, height: cardH }}
    >
      <div className="overflow-hidden bg-bg flex-1">
        <img
          src={project.mobileImage ?? project.image}
          alt={`${project.name} — mobile`}
          loading="lazy"
          className={`h-full w-full object-cover ${project.objectPosition ?? "object-top"}`}
        />
      </div>
      <div className="p-3 border-t border-line/60" style={{ height: `${CAPTION_PX}px` }}>
        <div className="flex items-start justify-between gap-1">
          <h4 className="web-work-card-title font-display text-xs font-medium leading-tight text-ink tracking-wide">
            {project.name}
          </h4>
          <ArrowUpRight className="web-work-card-arrow mt-0.5 h-3.5 w-3.5 shrink-0 text-muted" />
        </div>
        <p className="mt-1 text-[10px] leading-[1.4] text-muted line-clamp-2">{project.description}</p>
      </div>
    </a>
  );
}
