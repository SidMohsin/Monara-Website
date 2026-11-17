"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/brand/Logo";
import { site } from "@/content/site";
import { Arrow, Link } from "@/components/ui/Links";
import Positioning from "@/components/brand/Positioning";

// Pages whose first section is dark (header starts transparent with the white logo)
const DARK_TOP = ["/"];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState(null); // section of the one-page home currently in view
  const menuBtn = useRef(null);

  const darkTop = DARK_TOP.includes(pathname);
  const transparent = darkTop && !scrolled && !open;

  useEffect(() => {
    // Header stays visible at all times (sticky); it only compacts once scrolled.
    // On the home page it also tracks which section is in view, for the menu highlight.
    const ids = [...site.nav.map((n) => n.id), site.cta.id];
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the menu on navigation (render-time adjustment, no effect needed)
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (item) => pathname === "/" && section === item.id;
  const close = () => setOpen(false);

  return (
    <>
      <a href="#main" className="sr-only z-[60] bg-teal px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500 ease-out-soft ${open ? "bg-ink" : transparent ? "bg-transparent" : "border-b border-line bg-paper/95 backdrop-blur-md"}`}
      >
        <div className={`container-x flex items-center justify-between transition-[height] duration-500 ease-out-soft ${scrolled ? "h-16" : "h-20 lg:h-24"}`}>
          <NextLink href="/" onClick={() => pathname === "/" && window.scrollTo({ top: 0 })} className="relative block" aria-label="MONARA Productions, home">
            <span className={`block transition-opacity duration-300 ${transparent || open ? "opacity-0" : "opacity-100"}`}>
              <Logo variant="color" height={scrolled ? 28 : 34} priority className="transition-[height] duration-500" />
            </span>
            <span className={`absolute inset-0 block transition-opacity duration-300 ${transparent || open ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
              <Logo variant="reverse" height={scrolled ? 28 : 34} priority className="transition-[height] duration-500" />
            </span>
          </NextLink>

          <nav aria-label="Main" className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item) ? "location" : undefined}
                    className={`group relative flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      transparent ? "text-white/85 hover:text-white" : "text-ink/75 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 ${transparent ? "bg-teal-light" : "bg-teal"} ${
                        isActive(item) ? "scale-100" : "scale-0 group-hover:scale-100"
                      }`}
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={site.cta.href}
              className={`group inline-flex items-center gap-2 border px-5 py-3 text-[12px] font-medium uppercase tracking-[0.18em] transition-colors ${
                transparent ? "border-white/40 text-white hover:border-white hover:bg-white hover:text-ink" : "border-teal bg-teal text-white hover:bg-teal-deep"
              }`}
            >
              {site.cta.label}
              <Arrow className="group-hover:translate-x-0.5" />
            </Link>
          </nav>

          <button
            ref={menuBtn}
            type="button"
            className={`relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden ${transparent || open ? "text-white" : "text-ink"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
            <span className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col bg-ink text-white transition-[opacity,visibility] duration-500 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center pt-20">
          <ul className="space-y-2">
            {[{ label: "Home", href: "/#main", id: null }, ...site.nav].map((item, i) => (
              <li key={item.href} style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }} className={`transition-[opacity,transform] duration-500 ease-out-soft ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                <Link href={item.href} onClick={close} aria-current={isActive(item) ? "location" : undefined} className="flex items-center gap-4 py-2 text-[clamp(2.25rem,9vw,3.5rem)] uppercase leading-none tracking-wide">
                  <span className={`h-2 w-2 rounded-full ${isActive(item) ? "bg-teal-light" : "bg-transparent"}`} aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={site.cta.href} onClick={close} className="mt-10 inline-flex items-center gap-3 self-start bg-white px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-ink">
            {site.cta.label} <Arrow />
          </Link>
        </nav>
        <div className="container-x border-t border-ink-line py-6 text-sm text-muted-dark">
          <p>{site.contact.email}</p>
          <Positioning className="mt-2 text-teal-light" />
        </div>
      </div>
    </>
  );
}
