"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Full-bleed electric-blue band with "Power to the people." in huge display
 * type. The line slides sideways as you scroll past, so the closing note moves
 * with the page instead of sitting still. Reduced motion: centred and wrapped.
 */
export function PowerToThePeople() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["12%", "-52%"]);

  return (
    <section
      ref={ref}
      className="relative bg-brand-electric overflow-hidden"
      style={{ padding: "clamp(72px, 11vw, 168px) 0" }}
    >
      {/* Subtle noise texture overlay for analog warmth */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      {reduce ? (
        <h2
          className="relative font-display font-semibold text-white text-center leading-[0.9] tracking-[-0.05em] text-[clamp(60px,12vw,220px)]"
          style={{ padding: "0 var(--content-px)" }}
        >
          Power to the people.
        </h2>
      ) : (
        <motion.h2
          style={{ x }}
          className="relative font-display font-semibold text-white whitespace-nowrap leading-[0.9] tracking-[-0.05em] text-[clamp(84px,15vw,260px)] w-max"
        >
          Power to the people.
        </motion.h2>
      )}
    </section>
  );
}
