"use client";

import { motion } from "motion/react";
import { SectionEyebrow, Button } from "@unis/ui";

/**
 * "The math, unhidden." — the transparency data flex.
 * Replaces Spotify's "Loud & Clear" slot.
 *
 * Illustration is SVG-generated layered circles in the Unis electric palette,
 * labeled with the key revenue percentages. Editorial paper-texture feel on
 * an off-white background to contrast the dark page.
 */
export function TheMath() {
  return (
    <section
      id="the-math"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <MathIllustration />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Transparency</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(44px,5.5vw,84px)]">
            The math,
            <br />
            unhidden.
          </h2>
          <p className="text-text-secondary text-body-lg max-w-[55ch] mb-10">
            Every dollar that enters Unis has a visible path out. No pro-rata
            pools. No ghost artists. No algorithm deciding who deserves what.
            Just a public formula, the same for everyone.
          </p>
          <Button as="a" href="/math" variant="secondary" size="md">
            See the full breakdown
            <span aria-hidden>→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Proportional-circle illustration showing revenue percentages.
 * Inspired by Spotify's Loud & Clear art but built from scratch in the
 * Unis palette: electric blue + violet on an off-white paper texture.
 */
function MathIllustration() {
  const circles = [
    { label: "100%", caption: "masters", cx: 140, cy: 200, r: 100, color: "#163387", delay: 0 },
    { label: "85%", caption: "direct sales", cx: 320, cy: 130, r: 82, color: "#2563eb", delay: 0.15 },
    { label: "60%", caption: "audio ads", cx: 420, cy: 260, r: 66, color: "#3b82f6", delay: 0.3 },
    { label: "50%", caption: "paid tier", cx: 250, cy: 340, r: 58, color: "#6d28d9", delay: 0.45 },
    { label: "15%", caption: "supporters", cx: 410, cy: 100, r: 36, color: "#8b5cf6", delay: 0.6 },
  ];

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fafaf5 0%, #f4f1e8 100%)",
      }}
    >
      {/* Paper-grain texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <svg
        viewBox="0 0 560 460"
        className="relative w-full h-full"
        aria-label="Revenue distribution illustration"
      >
        {/* Hand-drawn arrows */}
        <motion.path
          d="M 60 60 Q 100 40 140 70"
          stroke="#1f2937"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.path
          d="M 500 400 Q 460 420 420 400"
          stroke="#1f2937"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {circles.map((c, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: c.delay,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
          >
            <circle
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={c.color}
              opacity="0.78"
              style={{ mixBlendMode: "multiply" }}
            />
            <text
              x={c.cx}
              y={c.cy - 4}
              textAnchor="middle"
              fontSize={c.r * 0.38}
              fontWeight="700"
              fill="white"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              {c.label}
            </text>
            <text
              x={c.cx}
              y={c.cy + c.r * 0.28}
              textAnchor="middle"
              fontSize={c.r * 0.17}
              fontWeight="500"
              fill="white"
              opacity="0.85"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {c.caption}
            </text>
          </motion.g>
        ))}

        {/* Hand annotation */}
        <text
          x="40"
          y="440"
          fontSize="13"
          fill="#374151"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-body)" }}
        >
          every dollar, tracked.
        </text>
      </svg>
    </div>
  );
}
