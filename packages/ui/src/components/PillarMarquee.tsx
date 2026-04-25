"use client";

import clsx from "clsx";

type MarqueeRow = {
  label: string;
  href: string;
  style: "solid-white" | "outline-blue" | "solid-blue";
  direction: "left" | "right";
};

type PillarMarqueeProps = {
  rows: MarqueeRow[];
};

/**
 * The massive rotating pillar marquee band. Each row scrolls infinitely
 * in alternating directions. Clicking a pillar name jumps to that section.
 */
export function PillarMarquee({ rows }: PillarMarqueeProps) {
  return (
    <section className="overflow-hidden border-y border-divider py-16 lg:py-24 relative">
      {/* subtle electric glow behind */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />
      <div className="relative flex flex-col gap-6 lg:gap-10">
        {rows.map((row, i) => (
          <MarqueeRow key={`${row.label}-${i}`} row={row} />
        ))}
      </div>
    </section>
  );
}

function MarqueeRow({ row }: { row: MarqueeRow }) {
  // Repeat the label enough times to fill at least 2x the viewport width,
  // so the scroll loop feels seamless.
  const repeat = 6;
  const items = Array.from({ length: repeat }, (_, i) => i);

  const animationClass =
    row.direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  const textClass = clsx(
    "font-display font-semibold text-[clamp(38px,10vw,120px)] leading-none whitespace-nowrap tracking-[-0.04em]",
    row.style === "solid-white" && "text-white",
    row.style === "solid-blue" && "text-brand-electric",
    row.style === "outline-blue" && "outline-text"
  );

  return (
    <a
      href={row.href}
      className="group block overflow-hidden hover:opacity-100 transition-opacity"
      aria-label={row.label}
    >
      <div className={clsx("flex gap-12 lg:gap-16 w-max", animationClass, "group-hover:[animation-play-state:paused]")}>
        {items.map((i) => (
          <span key={i} className={textClass}>
            {row.label}
            <span className="inline-block mx-6 lg:mx-10 text-brand-electric opacity-60 align-middle text-[0.6em]">
              ●
            </span>
          </span>
        ))}
      </div>
    </a>
  );
}
