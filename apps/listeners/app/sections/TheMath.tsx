"use client";

import { Button, ScrubText, SectionEyebrow, UNIS_LINKS, VisualPanel } from "@unis/ui";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/**
 * Listener-side transparency moment. Nobody is paid for seeing ads: Unis's
 * income goes into one monthly pot (the Community Share), each listener's
 * slice is set by their listening, and that slice is split outward
 * (help center COMMUNITY_SPLIT: 68 / 15 / 10 / 5 / 2).
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
          <ShareFlow progress={scrollYProgress} />
        </div>

        <div className="order-1 lg:order-2">
          <SectionEyebrow>Transparency</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.045em] text-[clamp(44px,5.5vw,84px)]">
            Your listening
            <br />
            pays the room.
          </h2>
          <ScrubText
            className="font-display font-medium text-white text-[clamp(22px,2.2vw,32px)] leading-[1.3] tracking-[-0.015em] max-w-[34ch] mb-10"
            text="On other apps, the ads you sit through pay the platform. On Unis, everything Unis earns goes into one pot, and every month it's shared out by listening: to the artists people back and the people who brought them in."
          />
          <Button as="a" href={`${UNIS_LINKS.artists}/math`} variant="secondary" size="md">
            See how every dollar moves
            <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

const CENTER = { x: 280, y: 236 };

const NODES = [
  { label: "Your artist", pct: "15%", cx: 130, cy: 104, r: 54, color: "#6d28d9" },
  { label: "Who invited you", pct: "10%", cx: 440, cy: 92, r: 48, color: "#2563eb" },
  { label: "Who invited them", pct: "5%", cx: 478, cy: 258, r: 40, color: "#3b82f6" },
  { label: "One more back", pct: "2%", cx: 418, cy: 392, r: 34, color: "#8b5cf6" },
  { label: "Unis", pct: "68%", cx: 122, cy: 352, r: 76, color: "#163387" },
];

function ShareFlow({ progress }: { progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const centerScale = useTransform(progress, [0, 0.25], [0, 1], { clamp: true });

  return (
    <VisualPanel paper>
      <svg
        viewBox="0 0 560 500"
        className="relative w-full h-full"
        role="img"
        aria-label="One listener's monthly share: 15% to the artist they support, 10% to who invited them, 5% to who invited that person, 2% one step further back, and 68% to Unis."
      >
        {NODES.map((n, i) => (
          <FlowLine key={`line-${n.label}`} n={n} progress={progress} index={i} />
        ))}

        <motion.g style={{ scale: reduce ? 1 : centerScale, transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}>
          <circle cx={CENTER.x} cy={CENTER.y} r="62" fill="#0a0e1a" />
          <text x={CENTER.x} y={CENTER.y - 8} textAnchor="middle" fontSize="13" fontWeight="600" fill="white" style={{ fontFamily: "var(--font-body)" }}>
            Your monthly
          </text>
          <text x={CENTER.x} y={CENTER.y + 14} textAnchor="middle" fontSize="20" fontWeight="700" fill="#3b82f6" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
            share
          </text>
        </motion.g>

        {NODES.map((n, i) => (
          <FlowNode key={n.label} n={n} progress={progress} index={i} />
        ))}

        <text x="36" y="476" fontSize="14" fill="#374151" fontStyle="italic" style={{ fontFamily: "var(--font-body)" }}>
          five places it goes. none of them you.
        </text>
      </svg>
    </VisualPanel>
  );
}

function FlowLine({ n, progress, index }: { n: (typeof NODES)[number]; progress: MotionValue<number>; index: number }) {
  const reduce = useReducedMotion();
  const start = 0.2 + index * 0.1;
  const length = useTransform(progress, [start, start + 0.25], [0, 1], { clamp: true });
  return (
    <motion.line
      x1={CENTER.x}
      y1={CENTER.y}
      x2={n.cx}
      y2={n.cy}
      stroke="#374151"
      strokeWidth="1.2"
      strokeDasharray="3 5"
      style={{ pathLength: reduce ? 1 : length, opacity: 0.6 }}
    />
  );
}

function FlowNode({ n, progress, index }: { n: (typeof NODES)[number]; progress: MotionValue<number>; index: number }) {
  const reduce = useReducedMotion();
  const start = 0.3 + index * 0.1;
  const scale = useTransform(progress, [start, start + 0.25], [0, 1], { clamp: true });
  return (
    <motion.g style={{ scale: reduce ? 1 : scale, transformOrigin: `${n.cx}px ${n.cy}px` }}>
      <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity="0.88" style={{ mixBlendMode: "multiply" }} />
      <text x={n.cx} y={n.cy - 2} textAnchor="middle" fontSize={n.r * 0.42} fontWeight="700" fill="white" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.02em" }}>
        {n.pct}
      </text>
      <text x={n.cx} y={n.cy + n.r * 0.34} textAnchor="middle" fontSize={Math.max(n.r * 0.2, 9)} fontWeight="500" fill="white" opacity="0.92" style={{ fontFamily: "var(--font-body)" }}>
        {n.label}
      </text>
    </motion.g>
  );
}
