"use client";

import { useRef } from "react";
import { featuredProjects, type FeaturedProject } from "@/data/portfolio";
import { ArrowUpRight, GitHubIcon } from "@/components/Icons";
import { useSectionReveal } from "@/lib/anim";

function ProjectMedia({ project }: { project: FeaturedProject }) {
  if (project.media.length === 0) {
    // typographic / terminal-style panel instead of screenshots for concepts
    return (
      <div className="glass-panel relative flex aspect-[16/10] flex-col justify-between overflow-hidden p-6 sm:p-8 border border-line bg-panel/20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-[90px]" />
        
        <div className="font-mono text-[10px] sm:text-[11px] leading-relaxed text-muted/80">
          <p><span className="text-primary font-bold">$</span> amir --local --model qwen2.5:1.5b</p>
          <p className="mt-2 text-ink/70">▸ runtime: Ollama + 4-bit GGUF + CPU-only</p>
          <p className="text-ink/70">▸ memory: SQLite + local vector search</p>
          <p className="text-ink/70">▸ privacy: local-first design, no cloud sync in prototype</p>
          <p className="mt-2 text-primary/80">streaming tokens_</p>
        </div>

        <div className="font-mono text-[9px] sm:text-[10px] text-muted/40 tracking-wider">
          local model • private memory sandbox • staged rollout
        </div>

        <div>
          <p className="display-xl text-4xl text-ink/90 sm:text-6xl tracking-tight">
            Amir<span className="text-primary">.</span>
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-muted">
            AI-FIRST OS / PLATFORM CONCEPT
          </p>
        </div>
      </div>
    );
  }

  const isRemoteLink = project.id === "remotelink";
  const filterStyle = isRemoteLink
    ? { filter: "brightness(1.08) contrast(1.08) saturate(1.05)" }
    : { filter: "brightness(1.06) contrast(1.08)" };

  return (
    <div className="project-mockup">
      <div className="mockup-window">
        {/* Neutral toolbar dots */}
        <div className="mockup-toolbar">
          <span className="mockup-dot" />
          <span className="mockup-dot" />
          <span className="mockup-dot" />
        </div>
        
        {/* Desktop screenshot content */}
        <div className="mockup-window-content">
          <img
            src={project.media[0].src}
            alt={project.media[0].alt}
            loading="lazy"
            style={filterStyle}
          />
        </div>
      </div>
      
      {/* If it has a mobile shot, display it in a clean absolute offset frame on the bottom right */}
      {project.mobileShot && (
        <div className="phone-mockup-overlay">
          <img
            src={project.mobileShot.src}
            alt={project.mobileShot.alt}
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}

export default function FeaturedProjects() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);

  return (
    <section id="work" ref={rootRef} className="mx-auto max-w-6xl px-5 py-16 sm:py-24 md:px-8 md:py-36">
      <div className="mb-10 sm:mb-16">
        <p data-reveal className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">
          <span className="h-[1px] w-8 bg-secondary/60" />
          Featured Work
        </p>
        <h2 data-reveal className="display-xl text-3xl text-ink sm:text-5xl md:text-6xl uppercase tracking-tight">
          Products I have <span className="text-primary-gradient">built</span>
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
            <div>
              <ProjectMedia project={project} />
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="font-display text-xs text-secondary/70 font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <span className="border border-line px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted/90 bg-panel/30 rounded-full">
                  {project.category}
                </span>
                {project.status && (
                  <span className="border border-primary/20 bg-primary/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary rounded-full">
                    {project.status}
                  </span>
                )}
              </div>

              <h3 className="display-xl text-2xl text-ink sm:text-4xl uppercase tracking-tight">{project.name}</h3>
              <p className="mt-3 text-xs sm:text-sm leading-[1.7] text-muted">{project.description}</p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-xs sm:text-sm leading-[1.7] text-ink/80">
                    <span className="text-primary/70 font-bold shrink-0">—</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="skill-badge">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-5 text-xs">
                <span className="text-muted/80">
                  Role — <span className="text-ink/85 font-medium">{project.role}</span>
                </span>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="group inline-flex items-center gap-1.5 font-medium tracking-wide text-muted hover:text-ink transition-colors"
                  >
                    <GitHubIcon className="h-[16px] w-[16px]" />
                    Source
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    className="group inline-flex items-center gap-1.5 font-semibold tracking-wide text-primary hover:text-secondary transition-colors"
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
