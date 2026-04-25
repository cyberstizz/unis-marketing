"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionEyebrow } from "@unis/ui";
import { AnimatedCounter } from "./AnimatedCounter";
import { Slider } from "./Slider";
import {
  CalculatorInputs,
  CalculatorMode,
  computeBreakdown,
  DEFAULT_INPUTS,
  formatMoney,
  formatPercent,
  inputsFromQueryString,
  inputsToQueryString,
  REVENUE_ASSUMPTIONS,
} from "./math";

export function EarningsCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("at-launch");
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [shareConfirm, setShareConfirm] = useState<string | null>(null);

  // Read the URL on mount so shared links pre-fill the calculator
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash.startsWith("#calc?")) return;
    const query = hash.substring("#calc?".length);
    const { inputs: parsed, mode: parsedMode } = inputsFromQueryString(
      query,
      DEFAULT_INPUTS
    );
    setInputs(parsed);
    setMode(parsedMode);
  }, []);

  const breakdown = useMemo(() => computeBreakdown(inputs, mode), [inputs, mode]);

  const updateInput = useCallback(
    <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const query = inputsToQueryString(inputs, mode);
    const url = `${window.location.origin}${window.location.pathname}#calc?${query}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareConfirm("Link copied to clipboard");
    } catch {
      setShareConfirm(url);
    }
    setTimeout(() => setShareConfirm(null), 3000);
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setMode("at-launch");
  };

  return (
    <section
      id="calculator"
      className="relative"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-10 max-w-[60ch]"
        >
          <SectionEyebrow>Project your earnings</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            See what your fanbase
            <br />
            <span className="chrome-text">is actually worth.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Drag the sliders. Watch the number change. Every dollar below is
            routed through the same splits encoded in the Unis platform — the
            15% supporter share on display ads, the 10/5/2% referral chain,
            the 50/50 paid-tier split, and the 85% direct-sales share.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-flex gap-1 p-1 rounded-full mb-8"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--divider)",
          }}
          role="tablist"
        >
          <button
            role="tab"
            aria-selected={mode === "at-launch"}
            onClick={() => setMode("at-launch")}
            className="relative px-5 py-2.5 rounded-full text-[14px] font-display font-semibold tracking-tight transition-colors"
            style={{
              color: mode === "at-launch" ? "#ffffff" : "var(--text-muted)",
            }}
          >
            {mode === "at-launch" && (
              <motion.span
                layoutId="calc-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--brand-electric)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">At launch</span>
          </button>
          <button
            role="tab"
            aria-selected={mode === "with-audio"}
            onClick={() => setMode("with-audio")}
            className="relative px-5 py-2.5 rounded-full text-[14px] font-display font-semibold tracking-tight transition-colors flex items-center gap-2"
            style={{
              color: mode === "with-audio" ? "#ffffff" : "var(--text-muted)",
            }}
          >
            {mode === "with-audio" && (
              <motion.span
                layoutId="calc-tab-pill"
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--brand-electric)" }}
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">Once audio ads launch</span>
            <span
              className="relative text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest"
              style={{
                background:
                  mode === "with-audio"
                    ? "rgba(255,255,255,0.25)"
                    : "rgba(37, 99, 235, 0.18)",
                color: mode === "with-audio" ? "#ffffff" : "var(--brand-electric)",
              }}
            >
              Coming soon
            </span>
          </button>
        </motion.div>

        {/* Two-column layout: sliders | output */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        >
          {/* Sliders */}
          <div
            className="rounded-2xl p-6 lg:p-8"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-6">
              Your inputs
            </div>

            <Slider
              label="Supporters"
              hint="People who've chosen you as their supported artist."
              value={inputs.supporters}
              onChange={(v) => updateInput("supporters", v)}
              min={0}
              max={10000}
              logarithmic
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Active-day rate"
              hint="% of your supporters who open the app each day."
              value={inputs.activeDayRate}
              onChange={(v) => updateInput("activeDayRate", v)}
              min={0.1}
              max={1}
              step={0.01}
              roundTo="percent"
              formatValue={formatPercent}
            />

            <Slider
              label="Paid tier conversion"
              hint={`% of your supporters who upgrade to ad-free at $${REVENUE_ASSUMPTIONS.paidTierPrice}/mo.`}
              value={inputs.paidTierConversion}
              onChange={(v) => updateInput("paidTierConversion", v)}
              min={0}
              max={0.5}
              step={0.01}
              roundTo="percent"
              formatValue={formatPercent}
            />

            <Slider
              label="Direct referrals"
              hint="Users you've personally brought to Unis (level 1)."
              value={inputs.referralsL1}
              onChange={(v) => updateInput("referralsL1", v)}
              min={0}
              max={500}
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Monthly direct sales"
              hint={`Tracks sold directly at $${inputs.directSalePrice.toFixed(2)} each.`}
              value={inputs.monthlyDirectSales}
              onChange={(v) => updateInput("monthlyDirectSales", v)}
              min={0}
              max={100}
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Direct-sale price"
              hint="What you charge per track (minimum $1.99)."
              value={inputs.directSalePrice}
              onChange={(v) => updateInput("directSalePrice", v)}
              min={1.99}
              max={9.99}
              step={0.1}
              roundTo="currency"
              formatValue={(v) => `$${v.toFixed(2)}`}
            />

            {mode === "with-audio" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div
                  className="mt-6 pt-6 border-t"
                  style={{ borderColor: "var(--divider)" }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="text-eyebrow uppercase text-accent-violet font-semibold">
                      Audio ad inputs
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest"
                      style={{
                        background: "rgba(139, 92, 246, 0.15)",
                        color: "var(--accent-violet)",
                      }}
                    >
                      Coming soon
                    </span>
                  </div>

                  <Slider
                    label="Monthly audio plays"
                    hint="Total plays of your songs across all Unis users."
                    value={inputs.monthlyAudioPlays}
                    onChange={(v) => updateInput("monthlyAudioPlays", v)}
                    min={0}
                    max={100000}
                    logarithmic
                    formatValue={(v) => v.toLocaleString("en-US")}
                  />

                  <Slider
                    label="Audio ad fill rate"
                    hint="% of plays that include a pre-roll ad."
                    value={inputs.audioAdFillRate}
                    onChange={(v) => updateInput("audioAdFillRate", v)}
                    min={0.2}
                    max={1}
                    step={0.01}
                    roundTo="percent"
                    formatValue={formatPercent}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Output */}
          <OutputPanel
            breakdown={breakdown}
            mode={mode}
            onShare={handleShare}
            onReset={handleReset}
            shareConfirm={shareConfirm}
          />
        </motion.div>

        {/* Disclosure */}
        <p className="mt-8 text-text-subtle text-[13px] leading-[1.6] max-w-[80ch] italic">
          These projections are estimates based on Unis's launch assumptions:
          ${REVENUE_ASSUMPTIONS.adRevenuePerActiveUserMonthly.toFixed(2)}/month average ad
          revenue per active user, paid tier at ${REVENUE_ASSUMPTIONS.paidTierPrice}/month.
          Audio ad projections apply MLC compulsory royalties at{" "}
          {formatPercent(REVENUE_ASSUMPTIONS.mlcRate)} per 2026 CRB Phonorecords IV
          rates. Audio ads are not yet available on Unis — the audio tab models
          earnings <em>once audio ads launch</em> after Unis completes agreements
          with an audio advertising partner. Actual earnings will depend on
          platform-wide ad fill rates, geography, and your supporters' activity.
          Unis will publish real platform averages quarterly once we have
          statistically significant data.
        </p>
      </div>
    </section>
  );
}

// ── Output Panel ──

function OutputPanel({
  breakdown,
  mode,
  onShare,
  onReset,
  shareConfirm,
}: {
  breakdown: ReturnType<typeof computeBreakdown>;
  mode: CalculatorMode;
  onShare: () => void;
  onReset: () => void;
  shareConfirm: string | null;
}) {
  const tiles = useMemo(() => {
    const base = [
      {
        key: "display",
        label: "Display ad supporter share",
        detail: "15% of supporter ad revenue, daily",
        amount: breakdown.displaySupporter,
        color: "var(--brand-electric)",
      },
      {
        key: "paid",
        label: "Paid tier subscriptions",
        detail: "50% of $5.99/mo · direct",
        amount: breakdown.paidTier,
        color: "var(--accent-violet-deep)",
      },
      {
        key: "direct",
        label: "Direct sales",
        detail: "85% · paid in 2 business days",
        amount: breakdown.directSales,
        color: "var(--accent-amber)",
      },
      {
        key: "ref",
        label: "Level 1 referrals",
        detail: "10% of referred-user ad revenue",
        amount: breakdown.referralL1,
        color: "var(--brand-navy)",
      },
    ];
    if (mode === "with-audio") {
      base.splice(1, 0, {
        key: "audio",
        label: "Audio ad streaming",
        detail: "60% of net · after MLC · coming soon",
        amount: breakdown.audioStreaming,
        color: "var(--accent-violet)",
      });
    }
    return base;
  }, [breakdown, mode]);

  const maxTile = Math.max(...tiles.map((t) => t.amount), 0.01);

  return (
    <div
      className="relative rounded-2xl p-6 lg:p-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 60%, rgba(22, 51, 135, 0.5) 100%)",
        border: "1px solid rgba(37, 99, 235, 0.3)",
        boxShadow: "0 24px 80px -20px rgba(37, 99, 235, 0.35)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />
      <div className="relative flex flex-col h-full">
        <div className="flex items-baseline justify-between mb-6">
          <div className="text-eyebrow uppercase text-brand-electric font-semibold">
            Projected monthly earnings
          </div>
          <div className="text-text-muted text-[11px] uppercase tracking-widest hidden sm:block">
            Total / month
          </div>
        </div>

        <div className="mb-10">
          <div
            className="font-display font-semibold leading-[0.95] tracking-[-0.04em] chrome-text"
            style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
          >
            <AnimatedCounter value={breakdown.total} />
          </div>
          <div className="text-text-muted text-[13px] mt-2">per month</div>
        </div>

        <div className="space-y-4 mb-8">
          <AnimatePresence initial={false}>
            {tiles.map((tile) => (
              <motion.div
                key={tile.key}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  duration: 0.35,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <span className="text-white text-[14px] font-medium truncate">
                      {tile.label}
                    </span>
                    <span
                      className="font-display font-semibold text-[15px] tracking-tight tabular-nums whitespace-nowrap"
                      style={{ color: tile.color }}
                    >
                      <AnimatedCounter value={tile.amount} />
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: tile.color }}
                      animate={{
                        width: `${(tile.amount / maxTile) * 100}%`,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                    />
                  </div>
                  <div className="text-text-muted text-[11px] mt-1">
                    {tile.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4 mt-auto pt-6 border-t border-divider">
          <div className="flex items-center gap-3">
            <button
              onClick={onShare}
              className="text-[13px] font-display font-semibold px-4 py-2 rounded-full bg-brand-electric text-white hover:bg-brand-electric-hover transition-colors"
            >
              Share this projection
            </button>
            <button
              onClick={onReset}
              className="text-[13px] text-text-muted hover:text-white transition-colors"
            >
              Reset
            </button>
          </div>
          <AnimatePresence>
            {shareConfirm && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-[13px] text-brand-electric font-medium"
              >
                {shareConfirm}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
