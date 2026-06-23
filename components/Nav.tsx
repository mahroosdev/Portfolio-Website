"use client";

import { useEffect, useState } from "react";
import { socials } from "@/data/portfolio";
import { socialIcons } from "@/components/Icons";
import { scrollToHash } from "@/lib/anim";

const links = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Work", hash: "#work" },
  { label: "Experience", hash: "#experience" },
  { label: "Contact", hash: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // wait one tick so the overlay closes before scrolling
    requestAnimationFrame(() => scrollToHash(hash));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          scrolled ? "backdrop-blur-md bg-bg/70 hairline-b" : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#top"
            onClick={go("body")}
            className="font-display text-base font-semibold tracking-[0.2em] text-ink"
            aria-label="Back to top"
          >
            PORTFOLIO<span className="text-gold">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.hash}>
                <a
                  href={l.hash}
                  onClick={go(l.hash)}
                  className="text-[13px] tracking-[0.14em] uppercase text-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="text-muted transition-colors hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              );
            })}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      {/* mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-[85] flex flex-col justify-center bg-bg px-8 transition-opacity duration-400 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {links.map((l, i) => (
            <li
              key={l.hash}
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
              className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <a
                href={l.hash}
                onClick={go(l.hash)}
                className="display-xl block py-2 text-5xl text-ink transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex items-center gap-6">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors hover:text-gold"
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
