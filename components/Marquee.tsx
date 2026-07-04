"use client";
 
import { useRef } from "react";
import { skillGroups } from "@/data/portfolio";
import { useSectionReveal } from "@/lib/anim";
 
export default function Marquee() {
  const rootRef = useRef<HTMLElement>(null);
  useSectionReveal(rootRef);
 
  return (
    <section ref={rootRef} className="hairline-t bg-panel/10 relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-14 text-center">
          <p data-reveal className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
            EXPERTISE & STACK
          </p>
          <h2 data-reveal className="display-xl mt-3 text-2xl sm:text-4xl text-ink uppercase tracking-tight">
            Technologies <span className="text-primary-gradient">I Leverage</span>
          </h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {skillGroups.map((group, idx) => (
            <div
              key={group.title}
              data-reveal
              data-reveal-delay={String(idx * 0.08)}
              className="relative p-6 sm:p-8 bg-panel/20 border border-line rounded-2xl hover:border-primary/20 transition-all duration-500 flex flex-col"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <h3 className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary mb-6 flex items-center gap-2">
                <span className="text-[10px] text-primary/50">0{idx + 1}.</span>
                {group.title}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-line bg-panel/30 px-3.5 py-1.5 text-xs font-medium text-ink transition-all duration-300 hover:border-primary/55 hover:bg-primary/5 hover:text-primary rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
