"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

const CARDS = [
  {
    title: "Why we built Unis in Harlem",
    description:
      "Founder's note on the problem with algorithmic discovery — and why geography is the fix.",
    href: "/blog/why-harlem",
    image: "/why.png",
    accent: "var(--brand-electric)",
  },
  {
    title: "The math behind 60/85/100",
    description:
      "How we pay artists more without charging fans more. A line-by-line breakdown.",
    href: "/blog/the-math",
    image: "/themathBehind.png",
    accent: "var(--accent-violet)",
  },
  {
    title: "Artist of the Day is a feature that lasts forever",
    description:
      "Why permanent public records beat trending charts. The case for verifiable legacy.",
    href: "/blog/permanent-record",
    image: "/artistOfTheDay.png",
    accent: "var(--brand-electric-hover)",
  },
  {
    title: "Jurisdiction analytics — coming soon",
    description:
      "See who's actually listening, block by block. Book the tour where the fans already are.",
    href: "/blog/jurisdiction-analytics",
    image: "/jurisdictionAnalytics.png",
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
              {/* Thumbnail */}
              <div
                className="aspect-[16/10] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${card.accent} 0%, var(--bg-deep) 100%)`,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
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