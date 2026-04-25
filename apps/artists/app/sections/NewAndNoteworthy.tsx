"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

const CARDS = [
  {
    title: "Why we built Unis in Harlem",
    description:
      "Founder's note on the problem with algorithmic discovery — and why geography is the fix.",
    href: "/blog/why-harlem",
    accent: "var(--brand-electric)",
  },
  {
    title: "The math behind 60/85/100",
    description:
      "How we pay artists more without charging fans more. A line-by-line breakdown.",
    href: "/blog/the-math",
    accent: "var(--accent-violet)",
  },
  {
    title: "Artist of the Day is a feature that lasts forever",
    description:
      "Why permanent public records beat trending charts. The case for verifiable legacy.",
    href: "/blog/permanent-record",
    accent: "var(--brand-electric-hover)",
  },
  {
    title: "Jurisdiction analytics — coming soon",
    description:
      "See who's actually listening, block by block. Book the tour where the fans already are.",
    href: "/blog/jurisdiction-analytics",
    accent: "var(--accent-violet-deep)",
  },
];

export function NewAndNoteworthy() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14"
        >
          <SectionEyebrow>New & noteworthy</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(36px,4.5vw,60px)]">
            Go deeper.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((card, i) => (
            <motion.a
              key={card.href}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group block bg-bg-surface rounded-2xl overflow-hidden border border-divider hover:border-brand-electric transition-all duration-300 ease-out-quart"
            >
              {/* Thumbnail — gradient placeholder */}
              <div
                className="aspect-[16/10] relative"
                style={{
                  background: `linear-gradient(135deg, ${card.accent} 0%, var(--bg-deep) 100%)`,
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-white text-[19px] leading-[1.2] tracking-tight mb-3 group-hover:text-brand-electric transition-colors">
                  {card.title}
                </h3>
                <p className="text-text-secondary text-[14px] leading-[1.55]">
                  {card.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
