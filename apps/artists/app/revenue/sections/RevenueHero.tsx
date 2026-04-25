"use client";

import { motion } from "motion/react";
import { Button, SectionEyebrow } from "@unis/ui";

/**
 * Revenue page hero. Left: the 4-way claim. Right: animated stacking column.
 */
export function RevenueHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(60px, 8vw, 120px) var(--content-px)",
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(37, 99, 235, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.14) 0%, transparent 60%), var(--bg-deep)",
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
          <SectionEyebrow>Income</SectionEyebrow>
          <h1 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5.5vw,88px)]">
            One listener on Spotify pays you{" "}
            <span className="text-text-muted">once.</span>
            <br />
            One listener on Unis pays you{" "}
            <span className="chrome-text">four ways.</span>
          </h1>
          <p className="text-text-secondary text-body-lg max-w-[58ch] mb-10">
            Every Unis user funds their chosen artist every day — not just
            when they press play. Plug in your numbers below and see what
            your fanbase is actually worth.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="#calculator" variant="primary" size="lg">
              See the math
            </Button>
            <Button
              as="a"
              href="/sample-agreement.pdf"
              variant="secondary"
              size="lg"
              target="_blank"
              rel="noopener"
            >
              Download a sample agreement
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <IncomeStackColumn />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Stacked-bar "income column" visual — each revenue stream animates in from
 * the bottom up, stacking like a tower.
 */
function IncomeStackColumn() {
  const streams = [
    {
      label: "Direct sales",
      share: "85%",
      color: "var(--accent-amber)",
      delay: 0.3,
      h: "clamp(56px, 7vw, 90px)",
    },
    {
      label: "Paid tier subscriptions",
      share: "50%",
      color: "var(--accent-violet-deep)",
      delay: 0.5,
      h: "clamp(70px, 9vw, 120px)",
    },
    {
      label: "Audio ads (coming soon)",
      share: "60%",
      color: "var(--accent-violet)",
      delay: 0.7,
      h: "clamp(80px, 10vw, 140px)",
      tag: "Coming soon",
    },
    {
      label: "Display ad supporter share",
      share: "15%",
      color: "var(--brand-electric)",
      delay: 0.9,
      h: "clamp(90px, 11vw, 160px)",
    },
  ];

  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden p-8 flex flex-col justify-end"
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
          Revenue stack
        </div>
        <div className="font-display text-white text-[22px] leading-tight tracking-[-0.02em]">
          Four ways to earn.
          <br />
          <span className="chrome-text">Stacked on every fan.</span>
        </div>
      </div>

      <div className="relative space-y-2">
        {streams.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{
              duration: 0.7,
              delay: s.delay,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            style={{
              transformOrigin: "bottom",
              background: s.color,
              height: s.h,
              boxShadow: `0 8px 24px -8px ${s.color}80`,
            }}
            className="relative rounded-lg p-4 flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-white text-[13px] font-semibold flex items-center gap-2">
                {s.label}
                {s.tag && (
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest"
                    style={{
                      background: "rgba(255,255,255,0.25)",
                      color: "#ffffff",
                    }}
                  >
                    {s.tag}
                  </span>
                )}
              </span>
            </div>
            <div
              className="font-display font-bold tracking-[-0.02em] text-white text-[clamp(24px,3vw,36px)] self-end leading-none"
            >
              {s.share}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="relative mt-4 pt-3 border-t border-divider-soft text-text-muted text-[11px] flex justify-between"
      >
        <span>Plus 10/5/2% referrals on every user</span>
        <span className="text-brand-electric">●</span>
      </motion.div>
    </div>
  );
}
