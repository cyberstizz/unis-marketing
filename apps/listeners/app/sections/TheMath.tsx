"use client";

import { motion } from "motion/react";
import { SectionEyebrow, Button } from "@unis/ui";

/**
 * Listener-side data flex. Mirrors the Artist-side "The math, unhidden."
 * but from the listener's POV: the flow of a single ad dollar outward to
 * the people it pays. The illustration is a center node with satellites.
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
          <AdDollarFlow />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Transparency</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(44px,5.5vw,84px)]">
            Every ad
            <br />
            pays the room.
          </h2>
          <p className="text-text-secondary text-body-lg max-w-[55ch] mb-10">
            On other platforms, you watch ads and the platform pockets the
            money. On Unis, every ad you see or hear is tracked — and a piece
            of that revenue goes to the artist you support, the person who
            invited you, and the people who invited them. The platform's cut
            is published, fixed, and public.
          </p>
          <Button as="a" href="/math" variant="secondary" size="md">
            See how every dollar moves
            <span aria-hidden>→</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Illustration: center circle = "One ad," satellites flow outward to show
 * each party that gets paid. Rendered on an off-white paper texture so it
 * feels editorial and trustworthy (same paper-grain trick as the Artist math).
 */
function AdDollarFlow() {
  const nodes = [
    { label: "Your artist", pct: "15%", cx: 140, cy: 100, r: 52, color: "#6d28d9", delay: 0.15 },
    { label: "You", pct: "10%", cx: 440, cy: 90, r: 48, color: "#2563eb", delay: 0.3 },
    { label: "Your referrer", pct: "5%", cx: 480, cy: 250, r: 40, color: "#3b82f6", delay: 0.45 },
    { label: "Their referrer", pct: "2%", cx: 420, cy: 380, r: 34, color: "#8b5cf6", delay: 0.6 },
    { label: "Unis", pct: "68%", cx: 120, cy: 340, r: 74, color: "#163387", delay: 0.75 },
  ];

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fafaf5 0%, #f4f1e8 100%)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <svg
        viewBox="0 0 560 500"
        className="relative w-full h-full"
        aria-label="Ad revenue flow illustration"
      >
        {/* Center ad circle */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ transformOrigin: "280px 230px" }}
        >
          <circle cx="280" cy="230" r="56" fill="#0a0e1a" />
          <text
            x="280"
            y="222"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="white"
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            One ad
          </text>
          <text
            x="280"
            y="245"
            textAnchor="middle"
            fontSize="22"
            fontWeight="700"
            fill="#2563eb"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            $1.00
          </text>
        </motion.g>

        {/* Flow lines from center to each node */}
        {nodes.map((n, i) => (
          <motion.line
            key={`line-${i}`}
            x1="280"
            y1="230"
            x2={n.cx}
            y2={n.cy}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: n.delay - 0.1 }}
          />
        ))}

        {nodes.map((n, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: n.delay,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          >
            <circle
              cx={n.cx}
              cy={n.cy}
              r={n.r}
              fill={n.color}
              opacity="0.85"
              style={{ mixBlendMode: "multiply" }}
            />
            <text
              x={n.cx}
              y={n.cy - 4}
              textAnchor="middle"
              fontSize={n.r * 0.4}
              fontWeight="700"
              fill="white"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
              }}
            >
              {n.pct}
            </text>
            <text
              x={n.cx}
              y={n.cy + n.r * 0.32}
              textAnchor="middle"
              fontSize={n.r * 0.2}
              fontWeight="500"
              fill="white"
              opacity="0.9"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {n.label}
            </text>
          </motion.g>
        ))}

        <text
          x="40"
          y="478"
          fontSize="13"
          fill="#374151"
          fontStyle="italic"
          style={{ fontFamily: "var(--font-body)" }}
        >
          one ad. five people paid.
        </text>
      </svg>
    </div>
  );
}
