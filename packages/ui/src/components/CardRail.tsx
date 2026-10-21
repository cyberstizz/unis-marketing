"use client";

import { motion } from "motion/react";
import { ReactNode, useRef } from "react";
import { SectionEyebrow } from "./SectionEyebrow";

export type RailCard = {
  title: string;
  description: string;
  href: string;
  image: string;
};

type CardRailProps = {
  eyebrow: string;
  headline: ReactNode;
  cards: RailCard[];
};

/**
 * "New & noteworthy" — a row of cards you swipe on a phone and step through
 * with the arrow buttons on a desktop. Cards snap into place.
 */
export function CardRail({ eyebrow, headline, cards }: CardRailProps) {
  const track = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-rail-card]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="mx-auto flex items-end justify-between gap-6 mb-12" style={{ maxWidth: "var(--max-w)", padding: "0 var(--content-px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(36px,4.5vw,64px)]">
            {headline}
          </h2>
        </motion.div>
        <div className="hidden md:flex gap-2 shrink-0">
          <RailButton label="Previous" onClick={() => step(-1)} flip />
          <RailButton label="Next" onClick={() => step(1)} />
        </div>
      </div>

      <div
        ref={track}
        data-lenis-prevent-horizontal
        className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{
          paddingLeft: "max(var(--content-px), calc((100vw - var(--max-w)) / 2 + var(--content-px)))",
          paddingRight: "var(--content-px)",
          scrollPaddingLeft: "max(var(--content-px), calc((100vw - var(--max-w)) / 2 + var(--content-px)))",
        }}
      >
        {cards.map((card, i) => (
          <motion.a
            key={card.href + card.title}
            data-rail-card
            href={card.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            className="group snap-start shrink-0 w-[min(82vw,380px)] block bg-bg-surface rounded-[var(--radius-card)] overflow-hidden border border-divider hover:border-brand-electric/70 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
          >
            <div className="aspect-[16/10] relative overflow-hidden bg-bg-elevated">
              <img
                src={card.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-white text-[20px] leading-[1.2] tracking-tight mb-3">
                {card.title}
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.55]">{card.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

function RailButton({ label, onClick, flip = false }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="w-12 h-12 rounded-full border border-white/15 text-white flex items-center justify-center hover:border-white/50 hover:bg-white/[0.04] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5"
        style={flip ? { transform: "scaleX(-1)" } : undefined}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
