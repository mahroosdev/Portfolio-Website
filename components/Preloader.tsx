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
      <div ref={nameRef} className="flex flex-col items-center gap-3">
        <span className="font-display text-[11px] tracking-[0.5em] text-muted uppercase">Portfolio</span>
        <span className="display-xl text-3xl sm:text-5xl text-ink">
          MFM Mahroos <span className="text-gold-gradient">Mahthie</span>
        </span>
      </div>
      <div className="absolute bottom-10 right-10 font-display text-6xl sm:text-8xl font-semibold text-ink/15 tabular-nums">
        <span ref={counterRef}>0</span>
        <span className="text-gold/40">%</span>
      </div>
    </div>
  );
}
