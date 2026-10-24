"use client";

import { SectionEyebrow } from "@unis/ui";
import { motion, useReducedMotion } from "motion/react";

const ITEMS = [
  { thing: "A distributor", instead: "Upload in the app" },
  { thing: "A label", instead: "You keep your masters" },
  { thing: "A fee to join", instead: "Free for artists" },
  { thing: "A playlist pitch", instead: "Your neighborhood decides" },
  { thing: "A waiting period", instead: "Live when you finish" },
];

/** Five things Spotify's path asks for that Unis doesn't, struck out on scroll. */
export function NoNeed() {
  const reduce = useReducedMotion();
  return (
    <section style={{ padding: "clamp(48px, 7vw, 112px) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <SectionEyebrow>What you don&rsquo;t need</SectionEyebrow>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((item, i) => (
            <motion.li
              key={item.thing}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-card)] border border-divider bg-bg-surface p-6"
            >
              <span className="relative inline-block font-display font-semibold text-text-secondary text-[22px] tracking-[-0.02em]">
                {item.thing}
                <motion.span
                  aria-hidden
                  className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand-electric origin-left"
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <span className="sr-only">: not needed.</span>
              <p className="mt-3 text-white text-[15px]">{item.instead}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
