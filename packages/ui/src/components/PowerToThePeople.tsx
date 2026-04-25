"use client";

import { motion } from "motion/react";

/**
 * Full-bleed electric-blue band with "Power to the people." in huge display type.
 * The final emotional note before the footer on both sites.
 */
export function PowerToThePeople() {
  return (
    <section
      className="relative bg-brand-electric overflow-hidden"
      style={{ padding: "clamp(80px, 12vw, 180px) var(--content-px)" }}
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
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative font-display font-semibold text-white text-center leading-[0.9] tracking-[-0.05em] text-[clamp(60px,12vw,220px)]"
      >
        Power to the people.
      </motion.h2>
    </section>
  );
}
