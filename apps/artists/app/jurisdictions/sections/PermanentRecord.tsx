"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

const AWARDS = [
  { interval: "Daily", lifetime: "365/yr", color: "var(--brand-electric)" },
  { interval: "Weekly", lifetime: "52/yr", color: "var(--brand-electric-hover)" },
  { interval: "Monthly", lifetime: "12/yr", color: "var(--accent-violet)" },
  { interval: "Quarterly", lifetime: "4/yr", color: "var(--accent-violet-deep)" },
  { interval: "Annual", lifetime: "1/yr", color: "var(--accent-amber)" },
];

export function PermanentRecord() {
  return (
    <section
      style={{
        padding: "var(--section-py) var(--content-px)",
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 max-w-[62ch]"
        >
          <SectionEyebrow>The permanent record</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            The win doesn't disappear{" "}
            <span className="chrome-text">the next day.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Every Unis award at every tier at every interval gets recorded
            forever. In 2056, your grandchildren will be able to look up what
            you won on what block in 2026. Nothing expires. Nothing resets.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <AwardCertificate />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-2xl p-8 lg:p-10"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-4">
              Awards at every interval
            </div>
            <h3 className="font-display font-semibold text-white text-[clamp(22px,2.6vw,32px)] leading-[1.15] tracking-[-0.02em] mb-6">
              Five award cadences ×{" "}
              <span className="chrome-text">seven tiers</span>.
            </h3>
            <p className="text-text-secondary text-[15px] leading-[1.6] mb-6 max-w-[48ch]">
              That's 35 distinct award categories any artist can win across a
              single jurisdiction chain — from Song of the Day in your
              sub-neighborhood to Artist of the Year sitewide. Every single
              one is public, verifiable, and recorded forever.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {AWARDS.map((a) => (
                <div
                  key={a.interval}
                  className="rounded-lg p-3 text-center"
                  style={{
                    background: `${a.color}12`,
                    border: `1px solid ${a.color}30`,
                  }}
                >
                  <div
                    className="font-display font-semibold text-[14px] tracking-tight mb-1"
                    style={{ color: a.color }}
                  >
                    {a.interval}
                  </div>
                  <div className="text-text-muted text-[10px] uppercase tracking-widest">
                    {a.lifetime}
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-8 pt-6 border-t text-text-muted text-[13px] leading-[1.6]"
              style={{ borderColor: "var(--divider)" }}
            >
              <span className="text-brand-electric font-semibold">●</span>{" "}
              Wins are permanent. Looked up by anyone. Linkable from
              anywhere. The internet's first durable, local, music
              hall-of-fame.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Stylized "Artist of the Day" certificate — designed to feel like a physical
 * award being pinned to a wall.
 */
function AwardCertificate() {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[480px] mx-auto rounded-lg overflow-hidden p-10 flex flex-col"
      style={{
        background: "linear-gradient(135deg, #fafaf5 0%, #efebdf 100%)",
        boxShadow:
          "0 32px 80px -20px rgba(0, 0, 0, 0.6), 0 20px 40px -10px rgba(37, 99, 235, 0.2)",
        transform: "perspective(1200px) rotateY(4deg) rotate(-1.5deg)",
        transformOrigin: "center",
      }}
    >
      {/* Paper texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="relative flex flex-col items-center text-center h-full"
        style={{ color: "#0f172a" }}
      >
        <div
          className="font-display font-bold text-[26px] tracking-tight"
          style={{ color: "#163387" }}
        >
          UNIS
        </div>
        <div
          className="h-px w-16 my-4"
          style={{ background: "#2563eb", opacity: 0.5 }}
        />
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-6"
          style={{ color: "#475569" }}
        >
          Certificate of Record
        </div>

        <div
          className="text-[10px] font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#64748b" }}
        >
          Artist of the Day
        </div>
        <div
          className="font-display font-semibold leading-tight tracking-[-0.02em] text-[28px] lg:text-[36px]"
          style={{ color: "#0f172a" }}
        >
          Mila Reyes
        </div>
        <div
          className="text-[13px] italic mt-1 mb-8"
          style={{ color: "#475569" }}
        >
          &ldquo;North Side Summer&rdquo;
        </div>

        <div
          className="flex items-center gap-3 mb-1 text-[11px] uppercase tracking-widest font-semibold"
          style={{ color: "#2563eb" }}
        >
          <span className="h-px w-6" style={{ background: "#2563eb" }} />
          Uptown Harlem
          <span className="h-px w-6" style={{ background: "#2563eb" }} />
        </div>
        <div className="text-[13px]" style={{ color: "#334155" }}>
          October 14, 2026
        </div>

        <div className="flex-1" />

        <div
          className="w-full pt-6 mt-6 border-t flex items-end justify-between text-[10px]"
          style={{ borderColor: "#cbd5e1", color: "#64748b" }}
        >
          <div className="text-left">
            <div className="font-semibold mb-0.5">Votes received</div>
            <div style={{ color: "#0f172a" }} className="text-[14px] font-bold">
              2,418
            </div>
          </div>
          <svg viewBox="0 0 120 40" width="90" height="30">
            <path
              d="M 6 28 Q 20 8, 38 26 T 68 22 Q 84 32, 110 14"
              stroke="#163387"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div
          className="w-full mt-3 text-[9px] uppercase tracking-widest text-center"
          style={{ color: "#94a3b8" }}
        >
          Look up at unismusic.com/records/harlem-uptown
        </div>
      </div>
    </div>
  );
}
