"use client";

import { Button, ScrubText, SectionEyebrow, VisualPanel } from "@unis/ui";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * "The math, unhidden." — the transparency moment (Spotify's Loud & Clear
 * slot). The statement lights up word by word as you scroll, and the circles
 * grow in step with it. Figures match the in-app Artist Agreement schedule.
 */
export function TheMath() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.5"] });

  return (
    <section ref={ref} id="the-math" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <div className="order-2 lg:order-1 w-full max-w-[560px] mx-auto aspect-square">
          <MathIllustration progress={scrollYProgress} />
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow>Transparency</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.045em] text-[clamp(44px,5.5vw,84px)]">
            The math,
            <br />
            unhidden.
          </h2>
          <ScrubText
            className="font-display font-medium text-white text-[clamp(22px,2.2vw,32px)] leading-[1.3] tracking-[-0.015em] max-w-[34ch] mb-10"
            text="Money your fans spend on you is yours, minus a small fee. Everything Unis earns goes into one pot, and every month that pot is shared out by listening, at percentages anyone can read."
          />
          <Button as="a" href="/math" variant="secondary" size="md">
            See the full breakdown
            <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

const CIRCLES = [
  { label: "100%", caption: "ownership", cx: 150, cy: 210, r: 104, color: "#163387" },
  { label: "90%", caption: "song sales", cx: 340, cy: 140, r: 88, color: "#2563eb" },
  { label: "60%", caption: "Unis Plus", cx: 430, cy: 290, r: 66, color: "#3b82f6" },
  { label: "60%", caption: "audio ads, soon", cx: 260, cy: 360, r: 60, color: "#6d28d9", dashed: true },
  { label: "15%", caption: "supporters", cx: 470, cy: 120, r: 38, color: "#8b5cf6" },
];

function MathIllustration({ progress }: { progress: MotionValue<number> }) {
  return (
    <VisualPanel paper>
      <svg viewBox="0 0 560 480" className="relative w-full h-full" role="img" aria-label="What artists keep: 100% ownership, 90% of song sales, 60% of Unis Plus by plays, 60% of audio ads when they launch, and 15% of each supporter's monthly share.">
        {CIRCLES.map((c, i) => (
          <Circle key={c.caption} c={c} progress={progress} index={i} />
        ))}
        <text
          x="36"
          y="456"
          fontSize="14"
          fill="#374151"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-body)" }}
        >
          what you keep, in writing.
        </text>
      </svg>
    </VisualPanel>
  );
}

function Circle({
  c,
  progress,
  index,
}: {
  c: (typeof CIRCLES)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const reduce = useReducedMotion();
  const start = index * 0.12;
  const scale = useTransform(progress, [start, start + 0.45], [0, 1], { clamp: true });

  return (
    <motion.g style={{ scale: reduce ? 1 : scale, transformOrigin: `${c.cx}px ${c.cy}px` }}>
      <circle
        cx={c.cx}
        cy={c.cy}
        r={c.r}
        fill={c.color}
        opacity={c.dashed ? 0.55 : 0.8}
        stroke={c.dashed ? "#ffffff" : "none"}
        strokeDasharray={c.dashed ? "5 6" : undefined}
        strokeWidth={c.dashed ? 2 : 0}
        style={{ mixBlendMode: "multiply" }}
      />
      <text
        x={c.cx}
        y={c.cy - 2}
        textAnchor="middle"
        fontSize={Math.max(c.r * 0.38, 15)}
        fontWeight="700"
        fill="white"
        style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
      >
        {c.label}
      </text>
      <text
        x={c.cx}
        y={c.cy + Math.max(c.r * 0.3, 14)}
        textAnchor="middle"
        fontSize={Math.max(c.r * 0.16, 10)}
        fontWeight="500"
        fill="white"
        opacity="0.9"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {c.caption}
      </text>
    </motion.g>
  );
}
