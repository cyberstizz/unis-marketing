"use client";

import Lenis from "lenis";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);

/** The running Lenis instance, or null when smooth scroll is off. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Inertial smooth scrolling for the whole page (Lenis).
 *
 * Every scroll-linked effect on the site reads the native scroll position, so
 * Lenis only changes how the page glides — nothing depends on it being on.
 * Visitors who ask for reduced motion get the browser's own scrolling.
 * Hash links (#own-it-all) glide too, and land below the fixed nav because
 * Lenis honours each section's scroll-margin-top.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      autoRaf: true,
      anchors: true,
      // Touch devices keep their native momentum scrolling.
      syncTouch: false,
    });
    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
