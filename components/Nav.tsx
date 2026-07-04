"use client";

import { useEffect, useState } from "react";
import { person, socials } from "@/data/portfolio";
import { socialIcons, MailIcon } from "@/components/Icons";
import { scrollToHash } from "@/lib/anim";

const links = [
  { label: "About", hash: "#about" },
  { label: "Services", hash: "#services" },
  { label: "Work", hash: "#work" },
  { label: "Experience", hash: "#experience" },
  { label: "Contact", hash: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    links.forEach((l) => {
      if (l.hash.startsWith("#")) {
        const el = document.querySelector(l.hash);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
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
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 border-b border-line backdrop-blur-md ${
          scrolled ? "bg-panel/90 shadow-md shadow-black/20" : "bg-bg/50"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#top"
            onClick={go("body")}
            className="font-display text-sm font-semibold tracking-[0.25em] text-ink uppercase transition-opacity hover:opacity-85"
            aria-label="Back to top"
          >
            PORTFOLIO<span className="text-primary">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <li key={l.hash}>
                <a
                  href={l.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHash(l.hash);
                  }}
                  className={`text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                    activeSection === l.hash ? "text-secondary" : "text-muted hover:text-secondary"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
            {person.resume && (
              <li>
                <a
                  href={person.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[12px] tracking-[0.16em] uppercase text-muted transition-colors hover:text-secondary"
                >
                  Resume
                </a>
              </li>
            )}
          </ul>

          <div className="hidden items-center gap-4 md:flex">
            {socials.filter(s => s.icon === "linkedin" || s.icon === "github").map((s) => {
              const Icon = socialIcons[s.icon as "linkedin" | "github"];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="text-muted transition-colors hover:text-secondary"
                >
                  <Icon className="h-[17px] w-[17px]" />
                </a>
              );
            })}
            <a
              href={`mailto:${person.email}`}
              aria-label="Email"
              title="Email"
              className="text-muted transition-colors hover:text-secondary"
            >
              <MailIcon className="h-[18px] w-[18px]" />
            </a>
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
        className={`fixed inset-0 z-[85] flex flex-col justify-center bg-bg/98 backdrop-blur-xl px-8 transition-opacity duration-400 md:hidden ${
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
                className="display-xl block py-2 text-4xl tracking-tight text-ink transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
          {person.resume && (
            <li
              style={{ transitionDelay: open ? `${links.length * 60 + 100}ms` : "0ms" }}
              className={`transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            >
              <a
                href={person.resume}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="display-xl block py-2 text-4xl tracking-tight text-ink transition-colors hover:text-secondary"
              >
                Resume
              </a>
            </li>
          )}
        </ul>
        <div className="mt-12 flex items-center gap-6">
          {socials.filter(s => s.icon === "linkedin" || s.icon === "github").map((s) => {
            const Icon = socialIcons[s.icon as "linkedin" | "github"];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-muted transition-colors hover:text-secondary"
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
          <a
            href={`mailto:${person.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-secondary"
          >
            <MailIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </>
  );
}
