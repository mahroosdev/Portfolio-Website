"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/anim";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      root.style.display = "none";
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        root.style.display = "none";
        document.documentElement.style.overflow = "";
      },
    });

    tl.from(nameRef.current, { y: 36, opacity: 0, duration: 0.6, ease: "power3.out" })
      .to(counter, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.value));
        },
      }, "<")
      .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut", delay: 0.15 });

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <div ref={rootRef} className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-bg">
      {/* subtle warm ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-[100px]" />

      <div ref={nameRef} className="flex flex-col items-center gap-3 relative z-10">
        <span className="font-display text-[10px] tracking-[0.4em] text-muted/80 uppercase font-medium">DEVELOPER PORTFOLIO</span>
        <span className="display-xl text-3xl sm:text-5xl text-ink">
          MFM Mahroos <span className="text-primary-gradient">Mahthie</span>
        </span>
      </div>
      <div className="absolute bottom-10 right-10 font-display text-6xl sm:text-8xl font-semibold text-ink/10 tabular-nums select-none z-10">
        <span ref={counterRef}>0</span>
        <span className="text-primary/20">%</span>
      </div>
    </div>
  );
}
