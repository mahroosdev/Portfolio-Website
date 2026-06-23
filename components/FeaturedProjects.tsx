"use client";

import { useEffect, useRef } from "react";
import { featuredProjects, type FeaturedProject } from "@/data/portfolio";
import { ArrowUpRight } from "@/components/Icons";
import { useSectionReveal } from "@/lib/anim";

function ProjectMedia({ project }: { project: FeaturedProject }) {
  if (project.media.length === 0) {
    // NexaOS — typographic / terminal-style panel instead of screenshots
    return (
      <div className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-xl border border-line bg-bg p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-[90px]" />
        <div className="font-mono text-[11px] leading-relaxed text-muted sm:text-xs">
          <p><span className="text-gold">$</span> amir --local --model qwen2.5:1.5b</p>
          <p className="mt-2 text-ink/70">▸ runtime: ollama · 4-bit GGUF · CPU-only</p>
          <p className="text-ink/70">▸ memory: sqlite + local vector search</p>
          <p className="text-ink/70">▸ privacy: 100% on-device, zero cloud</p>
          <p className="mt-2 text-gold/80">streaming tokens…</p>
        </div>
        <div>
          <p className="display-xl text-4xl text-ink/90 sm:text-6xl">
            Amir<span className="text-gold">.</span>
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted">
            Local-first AI → NexaOS
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="project-media-stack relative">
      {/* main desktop — fills the box; lifts above the overlays on hover / tap */}
      <div className="card-media relative z-10 overflow-hidden rounded-xl border border-line bg-panel transition-transform duration-500 hover:z-30 active:z-30">
        <img
          src={project.media[0].src}
          alt={project.media[0].alt}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top"
        />
      </div>
      {project.media[1] && (
        <div className="project-media-float project-media-float-left absolute -bottom-6 -left-4 z-20 hidden w-[44%] overflow-hidden rounded-lg border border-line bg-panel shadow-2xl shadow-black/50 sm:block">
          <img
            src={project.media[1].src}
            alt={project.media[1].alt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </div>
      )}
      {project.mobileShot && (
        <div className="project-media-float project-media-float-right absolute -bottom-8 right-3 z-20 w-[23%] overflow-hidden rounded-[16px] border-[3px] border-[#1d1d20] bg-panel shadow-2xl shadow-black/60">
          <img
            src={project.mobileShot.src}
            alt={project.mobileShot.alt}
            loading="lazy"
            className="aspect-[9/18] w-full object-cover object-top"
          />
        </div>
      )}
    </div>
  );
}

export default function FeaturedProjects() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mediaStacks = Array.from(root.querySelectorAll<HTMLElement>(".project-media-stack"));
    const mobileQuery = window.matchMedia("(max-width: 639px)");
    let frame = 0;

    const clearActiveStacks = () => {
      mediaStacks.forEach((stack) => stack.classList.remove("is-mobile-active"));
    };

    const updateActiveStack = () => {
      frame = 0;

      if (!mobileQuery.matches) {
        clearActiveStacks();
        return;
      }

      const viewportHeight = window.innerHeight;
      const focusLine = viewportHeight * 0.42;
      let activeStack: HTMLElement | null = null;
      let activeDistance = Number.POSITIVE_INFINITY;

      mediaStacks.forEach((stack) => {
        const rect = stack.getBoundingClientRect();
        const stackCenter = rect.top + rect.height / 2;
        const isVisible = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.12;

        if (!isVisible) return;

        const distance = Math.abs(stackCenter - focusLine);
        if (distance < activeDistance) {
          activeDistance = distance;
          activeStack = stack;
        }
      });

      mediaStacks.forEach((stack) => {
        stack.classList.toggle("is-mobile-active", stack === activeStack);
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveStack);
    };

    const handleModeChange = () => {
      if (mobileQuery.matches) {
        requestUpdate();
      } else {
        clearActiveStacks();
      }
    };

    updateActiveStack();
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
    <section id="work" ref={rootRef} className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
      <div className="mb-10 sm:mb-16">
        <p data-reveal className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-gold">
          <span className="h-px w-8 bg-gold/60" />
          Featured Work
        </p>
        <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl md:text-6xl">
          Products I have <span className="text-gold-gradient">built</span>
        </h2>
      </div>

      <div className="flex flex-col gap-16 sm:gap-24 md:gap-32">
        {featuredProjects.map((project, i) => (
          <article
            key={project.id}
            data-reveal
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className={project.mobileShot || project.media[1] ? "pb-10" : ""}>
              <ProjectMedia project={project} />
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-display text-sm text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full border border-line px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted">
                  {project.category}
                </span>
                {project.status && (
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold">
                    {project.status}
                  </span>
                )}
              </div>

              <h3 className="display-xl text-2xl text-ink sm:text-4xl">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-[15px]">{project.description}</p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-ink/75">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full bg-panel px-3 py-1.5 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
                <span className="text-muted">
                  Role — <span className="text-ink/80">{project.role}</span>
                </span>
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="group inline-flex items-center gap-1.5 font-medium text-gold transition-colors hover:text-ink"
                  >
                    {project.link.label}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
