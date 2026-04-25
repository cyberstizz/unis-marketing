"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, animate, useMotionValue, useTransform } from "motion/react";
import { SectionEyebrow, Button } from "@unis/ui";
import {
  SOURCES,
  SOURCE_ORDER,
  SourceKey,
  PAYEES,
  PayeeKey,
  dollarShare,
} from "../data";

/**
 * Dollar Flow Simulator — the Math page's centerpiece.
 *
 * How it works:
 *  1. User picks a revenue source from four tabs (display / audio / paid / sale).
 *  2. Clicks "Drop $1" (or autoplay is active).
 *  3. 100 SVG particles emit from the source node and animate along paths to
 *     the destination payees, distributed according to the source's split.
 *  4. Each destination has a bucket that counts up (via spring tween) to the
 *     actual dollar share as particles arrive.
 *  5. "Reset" clears buckets and stops any in-flight particles.
 *  6. Current source is encoded in the URL hash (#flow=display) so links are
 *     shareable.
 */

type FlowDestination = {
  payee: PayeeKey;
  /** Fraction of gross, 0-1. */
  share: number;
  /** Dollar amount this destination receives. */
  dollars: number;
  /** Total particles allocated to this destination. */
  particles: number;
};

const TOTAL_PARTICLES = 100;

export function DollarFlowSimulator() {
  const [sourceKey, setSourceKey] = useState<SourceKey>("display");
  const [runId, setRunId] = useState(0);
  const [shareConfirm, setShareConfirm] = useState<string | null>(null);
  const source = SOURCES[sourceKey];

  // Load source from URL hash on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const match = window.location.hash.match(/#flow=(display|audio|paidTier|directSale)/);
    if (match) {
      setSourceKey(match[1] as SourceKey);
    }
  }, []);

  // Auto-run on source change and on initial mount
  useEffect(() => {
    setRunId((r) => r + 1);
  }, [sourceKey]);

  const destinations = useMemo<FlowDestination[]>(() => {
    const entries = Object.entries(source.split) as Array<[PayeeKey, number]>;
    // Distribute 100 particles across payees in proportion to split
    const totalCents = entries.reduce((acc, [, v]) => acc + v, 0);
    const raw = entries.map<FlowDestination>(([payee, cents]) => {
      const share = cents / 100;
      return {
        payee,
        share,
        dollars: dollarShare(source, payee),
        particles: Math.max(1, Math.round((cents / totalCents) * TOTAL_PARTICLES)),
      };
    });
    // Adjust last particle count so they sum to TOTAL_PARTICLES
    const sumParticles = raw.reduce((acc, d) => acc + d.particles, 0);
    const diff = TOTAL_PARTICLES - sumParticles;
    if (raw.length > 0 && diff !== 0) {
      raw[raw.length - 1]!.particles += diff;
    }
    return raw;
  }, [source]);

  const handleReset = () => {
    setRunId((r) => r + 1);
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#flow=${sourceKey}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareConfirm("Link copied");
    } catch {
      setShareConfirm(url);
    }
    setTimeout(() => setShareConfirm(null), 2500);
  };

  return (
    <section
      id="simulator"
      className="relative"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-10 max-w-[62ch]"
        >
          <SectionEyebrow>Dollar flow simulator</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Drop a dollar into any source.
            <br />
            <span className="chrome-text">Watch exactly where it lands.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Every split shown below is encoded in the Unis platform. The
            animation is illustrative; the math is exact.
          </p>
        </motion.div>

        {/* Source tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex flex-wrap gap-2 mb-6"
          role="tablist"
        >
          {SOURCE_ORDER.map((key) => {
            const s = SOURCES[key];
            const active = key === sourceKey;
            const comingSoon = s.liveStatus === "coming-soon";
            return (
              <button
                key={key}
                role="tab"
                aria-selected={active}
                onClick={() => setSourceKey(key)}
                className="relative px-5 py-3 rounded-full text-[14px] font-display font-semibold tracking-tight transition-colors flex items-center gap-2"
                style={{
                  color: active ? "#ffffff" : "var(--text-muted)",
                  background: active
                    ? "transparent"
                    : "var(--bg-surface)",
                  border: active
                    ? "1px solid transparent"
                    : "1px solid var(--divider)",
                }}
              >
                {active && (
                  <motion.span
                    layoutId="flow-tab-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--brand-electric)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{s.label} · ${s.gross.toFixed(2)}</span>
                {comingSoon && (
                  <span
                    className="relative text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-widest"
                    style={{
                      background: active
                        ? "rgba(255,255,255,0.25)"
                        : "rgba(245, 158, 11, 0.15)",
                      color: active ? "#ffffff" : "var(--accent-amber)",
                    }}
                  >
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Stage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="rounded-2xl overflow-hidden p-6 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 60%, rgba(22, 51, 135, 0.35) 100%)",
            border: "1px solid rgba(37, 99, 235, 0.25)",
            boxShadow: "0 24px 80px -20px rgba(37, 99, 235, 0.25)",
          }}
        >
          {/* Current source caption */}
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div className="max-w-[52ch]">
              <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-2">
                {source.label} · ${source.gross.toFixed(2)}
              </div>
              <p className="text-text-secondary text-[14px] leading-[1.6]">
                {source.tagline}
                {source.note && (
                  <span className="text-accent-amber">
                    {" "}· {source.note}
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="secondary" size="sm">
                Replay
              </Button>
              <Button
                onClick={handleShare}
                variant="primary"
                size="sm"
              >
                Share
              </Button>
            </div>
          </div>

          <FlowStage
            source={sourceKey}
            destinations={destinations}
            runId={runId}
          />

          {shareConfirm && (
            <div className="mt-4 text-[13px] text-brand-electric font-medium">
              {shareConfirm}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── Flow stage ────────────────────────────────────────────────────────────

function FlowStage({
  source,
  destinations,
  runId,
}: {
  source: SourceKey;
  destinations: FlowDestination[];
  runId: number;
}) {
  // Lay out destination nodes vertically on the right
  const layoutY = useMemo(() => {
    const count = destinations.length;
    const startY = 50 / count / 2 + 50 / count * 0.2;
    return destinations.map((_, i) => startY + ((85 - startY * 2) * i) / Math.max(1, count - 1) + 7);
  }, [destinations]);

  return (
    <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-stretch">
      {/* Left: animated SVG flow */}
      <div
        className="relative rounded-xl overflow-hidden min-h-[320px] lg:min-h-[460px]"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(37, 99, 235, 0.1) 0%, transparent 60%), rgba(10, 14, 26, 0.4)",
          border: "1px solid var(--divider)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Source node */}
          <defs>
            <radialGradient id="source-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="12" cy="50" r="12" fill="url(#source-glow)" />
          <circle
            cx="12"
            cy="50"
            r="7"
            fill="#0a0e1a"
            stroke="#2563eb"
            strokeWidth="0.6"
          />
          <text
            x="12"
            y="51.5"
            textAnchor="middle"
            fontSize="3.6"
            fontWeight="700"
            fill="#2563eb"
            style={{ fontFamily: "var(--font-display)" }}
          >
            $1
          </text>
          <text
            x="12"
            y="66"
            textAnchor="middle"
            fontSize="2"
            fill="#9ca3af"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Source
          </text>

          {/* Flow paths + particles */}
          {destinations.map((dest, idx) => {
            const payeeMeta = PAYEES[dest.payee];
            const y = layoutY[idx] ?? 50;
            const pathId = `flow-path-${source}-${dest.payee}`;
            const d = `M 19 50 Q ${40 + idx * 2} ${50 + (y - 50) * 0.6}, ${86 - 6} ${y}`;

            return (
              <g key={`${runId}-${dest.payee}`}>
                <path
                  id={pathId}
                  d={d}
                  stroke={payeeMeta.color}
                  strokeWidth="0.4"
                  strokeDasharray="1.5 1.5"
                  fill="none"
                  opacity="0.35"
                />
                {/* Emit particles — count proportional to dest.particles but
                    capped to keep SVG reasonable */}
                {Array.from({ length: Math.min(dest.particles, 30) }).map((_, pi) => {
                  const delay = pi * 0.08;
                  const dur = 1.6 + (pi % 3) * 0.15;
                  return (
                    <circle
                      key={pi}
                      r={1.1 + (pi % 2) * 0.3}
                      fill={payeeMeta.color}
                      opacity="0.95"
                    >
                      <animateMotion
                        key={`${runId}-${pi}`}
                        dur={`${dur}s`}
                        begin={`${delay}s`}
                        repeatCount="1"
                        fill="freeze"
                        keyPoints="0;1"
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0.95;0.95;0"
                        dur={`${dur}s`}
                        begin={`${delay}s`}
                        keyTimes="0;0.15;0.9;1"
                        repeatCount="1"
                        fill="freeze"
                      />
                    </circle>
                  );
                })}
              </g>
            );
          })}

          {/* Destination nodes */}
          {destinations.map((dest, idx) => {
            const payeeMeta = PAYEES[dest.payee];
            const y = layoutY[idx] ?? 50;
            return (
              <g key={`dest-${dest.payee}-${runId}`}>
                <circle
                  cx={86}
                  cy={y}
                  r="5.5"
                  fill={`${payeeMeta.color}22`}
                  stroke={payeeMeta.color}
                  strokeWidth="0.6"
                />
                <text
                  x={86}
                  y={y + 1}
                  textAnchor="middle"
                  fontSize="2.6"
                  fontWeight="700"
                  fill={payeeMeta.color}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {Math.round(dest.share * 100)}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Right: destination breakdown */}
      <div
        className="rounded-xl overflow-hidden flex flex-col"
        style={{
          background: "var(--bg-deep)",
          border: "1px solid var(--divider)",
        }}
      >
        <div
          className="px-5 py-4 border-b"
          style={{ borderColor: "var(--divider)" }}
        >
          <div className="text-eyebrow uppercase text-text-muted font-semibold">
            Payees · live count
          </div>
        </div>
        <div className="flex-1 p-2">
          {destinations.map((dest) => (
            <PayeeBucket key={dest.payee} dest={dest} runId={runId} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Single destination bucket — animates its dollar value as particles arrive.
 */
function PayeeBucket({ dest, runId }: { dest: FlowDestination; runId: number }) {
  const payee = PAYEES[dest.payee];
  const motionVal = useMotionValue(0);
  const rendered = useTransform(motionVal, (latest) => {
    // Dynamic precision: sub-cent values need extra digits
    const v = latest;
    if (v >= 0.1) return `$${v.toFixed(2)}`;
    if (v >= 0.01) return `$${v.toFixed(3)}`;
    return `$${v.toFixed(4)}`;
  });

  useEffect(() => {
    motionVal.set(0);
    const controls = animate(motionVal, dest.dollars, {
      duration: 1.6,
      delay: 0.3,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return controls.stop;
  }, [runId, dest.dollars, motionVal]);

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-lg"
      style={{
        borderLeft: `2px solid ${payee.color}`,
        marginLeft: "4px",
        marginBottom: "4px",
      }}
    >
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{
          background: payee.color,
          boxShadow: `0 0 8px ${payee.color}80`,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-white text-[13px] font-semibold tracking-tight truncate">
          {payee.label}
        </div>
        <div className="text-text-muted text-[11px] truncate">
          {payee.sublabel}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <motion.div
          className="font-display font-semibold text-[15px] tabular-nums tracking-tight"
          style={{ color: payee.color }}
        >
          {rendered}
        </motion.div>
        <div className="text-text-muted text-[10px] uppercase tracking-widest">
          {Math.round(dest.share * 100)}%
        </div>
      </div>
    </div>
  );
}
