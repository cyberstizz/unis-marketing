"use client";

import { motion } from "motion/react";
import { Button, SectionEyebrow } from "@unis/ui";

/**
 * Math page hero. Left: the "every dollar, every split" claim.
 * Right: a pre-built miniature of the flow visualization.
 */
export function MathHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(60px, 8vw, 120px) var(--content-px)",
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(37, 99, 235, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), var(--bg-deep)",
      }}
    >
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Transparency</SectionEyebrow>
          <h1 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5.5vw,88px)]">
            Every dollar.
            <br />
            Every split.
            <br />
            Every assumption.{" "}
            <span className="chrome-text">Public.</span>
          </h1>
          <p className="text-text-secondary text-body-lg max-w-[58ch] mb-10">
            This is the page you bookmark when someone doubts a claim about
            Unis. Every number we publish anywhere on this site is derived
            from what's below. Every assumption is documented. Every
            commitment comes with a date.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="#simulator" variant="primary" size="lg">
              Watch a dollar flow
            </Button>
            <Button as="a" href="#assumptions" variant="secondary" size="lg">
              See the assumptions
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <FlowPreview />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Static-ish preview tile — $1 dropped, fanning out to five payees.
 * Simple SVG to set expectations before the real simulator below.
 */
function FlowPreview() {
  const nodes = [
    { x: 86, y: 18, label: "Unis", pct: "68¢", color: "#163387" },
    { x: 86, y: 36, label: "Artist", pct: "15¢", color: "#8b5cf6" },
    { x: 86, y: 54, label: "L1", pct: "10¢", color: "#3b82f6" },
    { x: 86, y: 72, label: "L2", pct: "5¢", color: "#6d28d9" },
    { x: 86, y: 86, label: "L3", pct: "2¢", color: "#a855f7" },
  ];

  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden p-8"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)",
        border: "1px solid rgba(37, 99, 235, 0.2)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />

      <div className="relative mb-4">
        <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-2">
          Display ad · $1.00
        </div>
        <div className="font-display text-white text-[20px] leading-tight tracking-[-0.02em]">
          Drop a dollar in.
          <br />
          <span className="chrome-text">Watch where it lands.</span>
        </div>
      </div>

      <svg
        viewBox="0 0 100 100"
        className="relative w-full aspect-square"
        aria-hidden
      >
        {/* Source node */}
        <circle cx="12" cy="50" r="8" fill="#0a0e1a" stroke="#2563eb" strokeWidth="1" />
        <text
          x="12"
          y="52"
          textAnchor="middle"
          fontSize="4"
          fontWeight="700"
          fill="#2563eb"
          style={{ fontFamily: "var(--font-display)" }}
        >
          $1
        </text>

        {/* Flow paths + animated particles */}
        {nodes.map((n, i) => {
          const pathId = `flow-${i}`;
          const d = `M 20 50 Q ${(20 + n.x) / 2 + 10} ${50 + (n.y - 50) * 0.3}, ${n.x - 4} ${n.y}`;
          return (
            <g key={i}>
              <path
                id={pathId}
                d={d}
                stroke={n.color}
                strokeWidth="0.5"
                strokeDasharray="2 2"
                fill="none"
                opacity="0.35"
              />
              {/* animated particle */}
              <circle r="1.1" fill={n.color}>
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${i * 0.25}s`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
              <circle r="0.6" fill={n.color} opacity="0.6">
                <animateMotion
                  dur="2.4s"
                  repeatCount="indefinite"
                  begin={`${i * 0.25 + 0.12}s`}
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="linear"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Destination nodes */}
        {nodes.map((n) => (
          <g key={`dest-${n.label}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="5"
              fill={`${n.color}22`}
              stroke={n.color}
              strokeWidth="0.8"
            />
            <text
              x={n.x}
              y={n.y + 0.8}
              textAnchor="middle"
              fontSize="2.6"
              fontWeight="700"
              fill={n.color}
              style={{ fontFamily: "var(--font-display)" }}
            >
              {n.pct}
            </text>
            <text
              x={n.x}
              y={n.y - 6}
              textAnchor="middle"
              fontSize="2.2"
              fill="#d1d5db"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="relative mt-3 pt-3 border-t border-divider-soft text-text-muted text-[11px]">
        <span className="text-brand-electric">●</span>{" "}
        Interactive version below. Four sources. Every penny tracked.
      </div>
    </div>
  );
}
