"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import clsx from "clsx";

type NavLink = { label: string; href: string };

type NavBarProps = {
  /** Which site this nav lives on. Controls the label next to the logo. */
  site: "artists" | "listeners";
  links: NavLink[];
  /** Where Get access points. Usually the auth flow on the app. */
  getAccessHref: string;
  loginHref: string;
};

export function NavBar({ site, links, getAccessHref, loginHref }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-quart",
        scrolled
          ? "bg-bg-deep/85 backdrop-blur-xl border-b border-divider"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{
          maxWidth: "var(--max-w)",
          padding: "20px var(--content-px)",
        }}
      >
        <a href="/" className="flex items-center gap-3 group">
          <Logo size={100} />
          <span className="hidden sm:inline text-text-muted text-sm font-display tracking-wide group-hover:text-text-secondary transition-colors">
            for {site === "artists" ? "Artists" : "Listeners"}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] text-text-secondary hover:text-white transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button as="a" href={loginHref} variant="secondary" size="sm">
            Log in
          </Button>
          <Button as="a" href={getAccessHref} variant="primary" size="sm">
            Get access
          </Button>
        </div>
      </div>
    </header>
  );
}
