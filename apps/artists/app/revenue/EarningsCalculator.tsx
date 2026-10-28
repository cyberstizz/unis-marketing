"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionEyebrow } from "@unis/ui";
import { AnimatedCounter } from "./AnimatedCounter";
import { Slider } from "./Slider";
import {
  artistReceives,
  CalculatorInputs,
  CalculatorMode,
  computeBreakdown,
  DEFAULT_INPUTS,
  formatPercent,
  inputsFromQueryString,
  inputsToQueryString,
  MIN_SONG_PRICE,
  REVENUE_ASSUMPTIONS,
} from "./math";

/** Whole cents, rounded down, matching how the Unis app shows Plus amounts (67¢, $2.02). */
const centsDown = (dollars: number) => (Math.floor(dollars * 100 + 1e-9) / 100).toFixed(2);

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
            Drag the sliders. Watch the number change. Every dollar below runs
            through the same rules the Unis platform uses: your 15% of each
            supporter&rsquo;s monthly Community Share, 15% of every supporter&rsquo;s
            Unis Plus fee plus 45% of Plus by plays, what you keep from song sales, and 10% of your direct
            referrals&rsquo; shares.
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
              hint="People who picked you as the artist they support."
              value={inputs.supporters}
              onChange={(v) => updateInput("supporters", v)}
              min={0}
              max={10000}
              logarithmic
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Plays per listener, per month"
              hint="Counted plays of any music by each supporter or referral. Up to 50 a day count."
              value={inputs.playsPerListener}
              onChange={(v) => updateInput("playsPerListener", v)}
              min={0}
              max={REVENUE_ASSUMPTIONS.maxCountedPlaysPerMonth}
              step={10}
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Community Share per 1,000 plays"
              hint="What Unis earned that month, divided by every counted play. The help center's example works out to $10."
              value={inputs.poolPer1000Plays}
              onChange={(v) => updateInput("poolPer1000Plays", v)}
              min={0.5}
              max={10}
              step={0.1}
              roundTo="currency"
              formatValue={(v) => `$${v.toFixed(2)}`}
            />

            <Slider
              label="Supporters with Unis Plus"
              hint={`Each one sends you about $${centsDown(REVENUE_ASSUMPTIONS.plusSupportedShare)} a month, whatever they play.`}
              value={inputs.plusSupporters}
              onChange={(v) => updateInput("plusSupporters", v)}
              min={0}
              max={2000}
              logarithmic
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Unis Plus subscribers who play you"
              hint={`Each pays $${REVENUE_ASSUMPTIONS.plusPrice}/mo; about $${centsDown(REVENUE_ASSUMPTIONS.plusPlayedPool)} of it is shared among the artists they played.`}
              value={inputs.plusListeners}
              onChange={(v) => updateInput("plusListeners", v)}
              min={0}
              max={2000}
              logarithmic
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Your share of their plays"
              hint="Of everything those subscribers played this month, how much was you."
              value={inputs.plusShareOfPlays}
              onChange={(v) => updateInput("plusShareOfPlays", v)}
              min={0.01}
              max={1}
              step={0.01}
              roundTo="percent"
              formatValue={formatPercent}
            />

            <Slider
              label="Direct referrals"
              hint="People who signed up with your code (level 1)."
              value={inputs.referralsL1}
              onChange={(v) => updateInput("referralsL1", v)}
              min={0}
              max={500}
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Songs sold per month"
              hint={`At $${inputs.salePrice.toFixed(2)} you keep $${artistReceives(inputs.salePrice).toFixed(2)} of each.`}
              value={inputs.monthlySales}
              onChange={(v) => updateInput("monthlySales", v)}
              min={0}
              max={200}
              formatValue={(v) => v.toLocaleString("en-US")}
            />

            <Slider
              label="Song price"
              hint={`You set it. The minimum is $${MIN_SONG_PRICE.toFixed(2)}, 5¢ under the iTunes Store.`}
              value={inputs.salePrice}
              onChange={(v) => updateInput("salePrice", v)}
              min={MIN_SONG_PRICE}
              max={9.99}
              step={0.05}
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
                    hint="Plays of your songs by people who see ads."
                    value={inputs.monthlyAudioPlays}
                    onChange={(v) => updateInput("monthlyAudioPlays", v)}
                    min={0}
                    max={100000}
                    logarithmic
                    formatValue={(v) => v.toLocaleString("en-US")}
                  />

                  <Slider
                    label="Audio ad fill rate"
                    hint="% of those plays that carry an audio ad."
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
          These are estimates, not promises. The Community Share depends on
          what Unis actually earns each month and on how much everyone listens,
          so the per-1,000-plays figure will move month to month. Supporter and
          referral money needs a verified phone number to reach you, and is
          paid once the month closes (usually the second half of the next
          month). Song sales land in your Stripe account when they happen; the
          Community Share can be withdrawn once your balance reaches $50; Stripe
          pays your bank once a month, on the 1st. Audio ads aren&rsquo;t live
          yet. The second tab models them once they launch, at an assumed $
          {REVENUE_ASSUMPTIONS.audioNetPerFill.toFixed(3)} net per filled ad.
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
        key: "supporters",
        label: "Supporters",
        detail: "15% of each supporter's monthly Community Share",
        amount: breakdown.supporters,
        color: "var(--brand-electric)",
      },
      {
        key: "plus",
        label: "Unis Plus",
        detail: "15% from supporters on Plus + 45% by plays",
        amount: breakdown.plus,
        color: "var(--accent-violet-deep)",
      },
      {
        key: "sales",
        label: "Song sales",
        detail: "Your price, minus 10% (or card fee + 1¢)",
        amount: breakdown.sales,
        color: "var(--accent-amber)",
      },
      {
        key: "ref",
        label: "Level 1 referrals",
        detail: "10% of each referral's monthly share",
        amount: breakdown.referralL1,
        color: "var(--brand-electric-hover)",
      },
    ];
    if (mode === "with-audio") {
      base.splice(1, 0, {
        key: "audio",
        label: "Audio ads",
        detail: "60% of ads played with your songs · not live yet",
        amount: breakdown.audio,
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
