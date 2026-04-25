"use client";

import { motion } from "motion/react";
import { Button, SectionEyebrow } from "@unis/ui";

/**
 * Hero for the Jurisdictions page.
 * The visual on the right is an abbreviated version of the explorer's main
 * tier-chain view — gives people a taste of what they're about to interact with.
 */
export function JurisdictionsHero() {
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
          <SectionEyebrow>Exposure</SectionEyebrow>
          <h1 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5.5vw,88px)]">
            The first platform where your{" "}
            <span className="chrome-text">neighborhood</span> is on the map.
          </h1>
          <p className="text-text-secondary text-body-lg max-w-[58ch] mb-10">
            Unis runs on seven tiers of geographic competition — from your
            block, up through your city, up to nationwide. You can win in any
            of them. Your wins are public, permanent, and looked-up-able
            forever.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="#explorer" variant="primary" size="lg">
              Explore the tiers
            </Button>
            <Button as="a" href="#rollout" variant="secondary" size="lg">
              See where Unis is live
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <TierChainPreview />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Preview column: a compressed version of the tier chain stacking from bottom
 * to top with labels and a subtle connector.
 */
function TierChainPreview() {
  const tiers = [
    { name: "Uptown Harlem", tier: "T7", label: "Sub-neighborhood", accent: "#2563eb" },
    { name: "Harlem", tier: "T6", label: "Neighborhood", accent: "#3b82f6" },
    { name: "Uptown Manhattan", tier: "T5", label: "Upper borough", accent: "#6d28d9" },
    { name: "Manhattan", tier: "T4", label: "Borough", accent: "#8b5cf6" },
    { name: "New York City", tier: "T3", label: "City", accent: "#8b5cf6" },
    { name: "New York", tier: "T2", label: "State", accent: "#a855f7" },
    { name: "Sitewide", tier: "T1", label: "Nationwide", accent: "#f59e0b" },
  ];
  // Display top-to-bottom (T1 first in the stack visually on top)
  const displayOrder = [...tiers].reverse();

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
          Tier chain · Uptown Harlem
        </div>
        <div className="font-display text-white text-[20px] leading-tight tracking-[-0.02em]">
          One artist. Seven tiers.
          <br />
          <span className="chrome-text">Seven chances to win.</span>
        </div>
      </div>

      <div className="relative space-y-1.5">
        {displayOrder.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.3 + i * 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="relative rounded-lg p-3 flex items-center gap-3"
            style={{
              background: "rgba(255, 255, 255, 0.04)",
              border: `1px solid ${t.accent}30`,
            }}
          >
            <span
              className="font-display font-bold text-[12px] tracking-tight px-2 py-0.5 rounded-full"
              style={{
                background: `${t.accent}22`,
                color: t.accent,
                border: `1px solid ${t.accent}44`,
              }}
            >
              {t.tier}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-white text-[13px] font-semibold truncate">
                {t.name}
              </div>
              <div className="text-text-muted text-[11px] truncate">
                {t.label}
              </div>
            </div>
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: t.accent,
                boxShadow: `0 0 12px ${t.accent}80`,
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="relative mt-4 pt-3 border-t border-divider-soft text-text-muted text-[11px]"
      >
        <span className="text-brand-electric">●</span>{" "}
        Live in Harlem now · Everywhere else: coming soon
      </motion.div>
    </div>
  );
}
