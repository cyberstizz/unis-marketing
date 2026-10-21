"use client";

import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { Logo } from "./Logo";
import { useLenis } from "./SmoothScroll";

type NavLink = { label: string; href: string };
type Cta = { label: string; href: string };

type NavBarProps = {
  /** Which site this nav lives on. Controls the label next to the logo. */
  site: "artists" | "listeners";
  links: NavLink[];
  /** The main action, e.g. Sign up. */
  primaryCta: Cta;
  /** Optional quieter action shown beside it on wide screens. */
  secondaryCta?: Cta;
  /** Link to the sister site, shown in the mobile menu and footer-style. */
  crossLink?: Cta;
};

/**
 * Fixed top bar. Transparent over the hero, solid once you scroll, tucks away
 * while you scroll down and comes back the moment you scroll up — the way
 * Spotify's marketing nav behaves. Below 768px the links move into a
 * full-screen menu.
 */
export function NavBar({ site, links, primaryCta, secondaryCta, crossLink }: NavBarProps) {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - lastY.current;
    lastY.current = y;
    setSolid(y > 24);
    if (open) return;
    if (y < 160) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  // Lock the page while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open, lenis]);

  const siteLabel = site === "artists" ? "for Artists" : "for Listeners";

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !reduce ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          solid || open
            ? "bg-bg-deep/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div
          className="flex items-center justify-between gap-4 mx-auto"
          style={{
            maxWidth: "var(--max-w)",
            height: "var(--nav-h)",
            padding: "0 var(--content-px)",
          }}
        >
          <a href="/" className="flex items-center gap-3 group shrink-0" aria-label={`Unis ${siteLabel}, home`}>
            <Logo height={22} />
            <span className="hidden sm:inline text-text-muted text-sm font-display tracking-wide group-hover:text-text-secondary transition-colors">
              {siteLabel}
            </span>
          </a>

          <nav aria-label="Main" className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-full text-[15px] text-text-secondary hover:text-white hover:bg-white/[0.06] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {secondaryCta && (
              <Button
                as="a"
                href={secondaryCta.href}
                variant="secondary"
                size="sm"
                className="hidden md:inline-flex"
              >
                {secondaryCta.label}
              </Button>
            )}
            <Button as="a" href={primaryCta.href} variant="primary" size="sm">
              {primaryCta.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="unis-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden relative w-10 h-10 rounded-full border border-white/15 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
            >
              <span
                aria-hidden
                className={clsx(
                  "absolute h-[1.5px] w-4 bg-white transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[4px]"
                )}
              />
              <span
                aria-hidden
                className={clsx(
                  "absolute h-[1.5px] w-4 bg-white transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="unis-mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 bg-bg-deep/95 backdrop-blur-2xl flex flex-col"
            style={{ padding: "calc(var(--nav-h) + 24px) var(--content-px) 32px" }}
            data-lenis-prevent
          >
            <nav aria-label="Menu" className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-semibold text-white text-[40px] leading-[1.15] tracking-[-0.04em] py-1"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-3">
              <Button as="a" href={primaryCta.href} variant="primary" size="lg" onClick={() => setOpen(false)}>
                {primaryCta.label}
              </Button>
              {secondaryCta && (
                <Button as="a" href={secondaryCta.href} variant="secondary" size="lg" onClick={() => setOpen(false)}>
                  {secondaryCta.label}
                </Button>
              )}
              {crossLink && (
                <a
                  href={crossLink.href}
                  className="text-center text-text-muted text-[15px] py-3 hover:text-white transition-colors"
                >
                  {crossLink.label}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
