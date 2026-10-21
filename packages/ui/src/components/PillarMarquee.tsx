"use client";

import clsx from "clsx";
import {
  motion,
  MotionValue,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";

type MarqueeRow = {
  label: string;
  href: string;
  style: "solid-white" | "outline-blue" | "solid-blue";
  direction: "left" | "right";
};

type PillarMarqueeProps = {
  rows: MarqueeRow[];
  /** Accessible name for the group of jump links. */
  label?: string;
};

/** Copies of the label per half-track. Two halves make the loop seamless. */
const COPIES = 8;

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * The jump bands under the hero — Spotify's "Amplify your music / Connect with
 * fans / …" strips, in Unis colours. Each band is one link to its section.
 *
 * The bands drift on their own, speed up while you scroll, and run backwards
 * while you scroll up. Hovering a band holds it still so it's easy to click.
 * With reduced motion they sit still.
 */
export function PillarMarquee({ rows, label = "Jump to a section" }: PillarMarqueeProps) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  // px/s of scroll → extra multiplier. Negative while scrolling up.
  const boost = useTransform(smooth, [-2400, 0, 2400], [-5, 0, 5], { clamp: false });

  return (
    <nav aria-label={label} className="relative overflow-hidden py-10 lg:py-16">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />
      <div className="relative flex flex-col gap-3 lg:gap-4">
        {rows.map((row, i) => (
          <Band key={row.href} row={row} boost={boost} index={i} />
        ))}
      </div>
    </nav>
  );
}

function Band({ row, boost, index }: { row: MarqueeRow; boost: MotionValue<number>; index: number }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(index * -7);
  const hovering = useRef(false);
  const direction = row.direction === "left" ? -1 : 1;
  // Percent of the track per second. Alternate rows run at slightly different speeds.
  const speed = 1.6 + (index % 2) * 0.5;
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || hovering.current) return;
    const b = boost.get();
    const flip = b < -0.15 ? -1 : 1;
    const factor = 1 + Math.abs(b);
    base.set(base.get() + direction * flip * speed * factor * (delta / 1000));
  });

  const chip = clsx(
    "inline-flex items-center gap-[0.35em] shrink-0 rounded-full whitespace-nowrap mr-3 lg:mr-4",
    // Margin (not flex gap) keeps the two halves exactly 50% each, so the loop never jumps.
    "font-display font-semibold tracking-[-0.035em] leading-none",
    "text-[clamp(26px,4.6vw,64px)] px-[0.62em] py-[0.32em]",
    "transition-colors duration-300",
    row.style === "solid-white" && "bg-white text-bg-deep group-hover:bg-white/90",
    row.style === "solid-blue" && "bg-brand-electric text-white group-hover:bg-brand-electric-hover",
    row.style === "outline-blue" &&
      "border border-brand-electric/70 text-white group-hover:border-white group-hover:bg-white/[0.04]"
  );

  return (
    <a
      href={row.href}
      aria-label={`Jump to ${row.label}`}
      className="group block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => (hovering.current = false)}
    >
      <motion.div
        style={{ x: reduce ? "0%" : x }}
        className="flex w-max"
        aria-hidden
      >
        {Array.from({ length: COPIES * 2 }, (_, i) => (
          <span key={i} className={chip}>
            {row.label}
            <svg
              viewBox="0 0 24 24"
              className="w-[0.55em] h-[0.55em] transition-transform duration-300 group-hover:translate-y-[0.08em]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4v16M5 13l7 7 7-7" />
            </svg>
          </span>
        ))}
      </motion.div>
    </a>
  );
}
