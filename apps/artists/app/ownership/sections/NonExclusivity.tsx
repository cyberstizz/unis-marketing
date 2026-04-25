"use client";

import { motion } from "motion/react";
import { SectionEyebrow, CheckBullet } from "@unis/ui";

/**
 * Non-exclusivity section. Unis is additive, not replacement — artists can
 * keep everything they already have and just add Unis on top.
 */
export function NonExclusivity() {
  return (
    <section
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
          <StackDiagram />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Non-exclusivity</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            You don't have to leave
            <br />
            <span className="chrome-text">anywhere else to join Unis.</span>
          </h2>
          <p className="text-text-secondary text-body-lg max-w-[55ch] mb-10">
            Unis is non-exclusive by design. You can be on Spotify, Apple
            Music, Tidal, and Unis at the same time — distributed through
            DistroKid or TuneCore or whoever you already trust for the
            majors, and on Unis directly for hyper-local exposure, voting,
            awards, and passive income.
          </p>
          <ul className="space-y-6">
            <CheckBullet title="Keep your existing distribution." delay={0}>
              Your music on Spotify doesn't move. Your DistroKid subscription
              doesn't cancel. Your catalog stays exactly where it is.
            </CheckBullet>
            <CheckBullet title="Add Unis to the stack." delay={100}>
              Upload directly to Unis, get a signed agreement for those
              specific uploads, and start earning from the Unis community
              immediately.
            </CheckBullet>
            <CheckBullet title="Stack the income streams." delay={200}>
              Spotify streaming royalties keep coming. Unis streaming,
              supporter, referral, paid-tier, and direct-sale income starts
              stacking on top.
            </CheckBullet>
            <CheckBullet title="Leave anytime." delay={300}>
              30 days' notice, no exit fee, no catalog hostage situation.
            </CheckBullet>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Horizontal diagram: existing distribution on left → plus → Unis on right.
 * Both platforms earn independently, no conflict.
 */
function StackDiagram() {
  const existing = [
    { label: "Spotify", color: "#1DB954" },
    { label: "Apple Music", color: "#FA2D48" },
    { label: "Tidal", color: "#000000" },
    { label: "YouTube Music", color: "#FF0000" },
  ];

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden p-8"
      style={{
        background: "radial-gradient(circle at center, #1a2338 0%, #0a0e1a 70%)",
        border: "1px solid rgba(37, 99, 235, 0.15)",
      }}
    >
      <div className="h-full flex flex-col justify-between relative">
        <div>
          <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
            Your current setup
          </div>
          <div className="text-white font-display text-[18px] tracking-tight mb-4">
            Distributed via{" "}
            <span className="text-brand-electric">DistroKid / TuneCore / etc.</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {existing.map((e) => (
              <div
                key={e.label}
                className="rounded-lg p-3 flex items-center gap-3"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: e.color, boxShadow: `0 0 12px ${e.color}40` }}
                />
                <span className="text-white text-[13px] font-medium">
                  {e.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Plus divider */}
        <div
          className="flex items-center gap-4 my-2"
          aria-hidden
        >
          <div className="flex-1 h-px bg-divider-soft" />
          <div
            className="font-display font-bold text-white text-[28px] w-12 h-12 rounded-full flex items-center justify-center tracking-tight"
            style={{
              background: "var(--brand-electric)",
              boxShadow: "0 0 0 6px rgba(37, 99, 235, 0.2)",
            }}
          >
            +
          </div>
          <div className="flex-1 h-px bg-divider-soft" />
        </div>

        <div>
          <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-2">
            Add Unis to the stack
          </div>
          <div
            className="rounded-lg p-4 flex items-center gap-3"
            style={{
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.45)",
              boxShadow: "0 16px 48px -12px rgba(37, 99, 235, 0.4)",
            }}
          >
            <div
              className="font-display font-bold text-brand-electric text-[18px] tracking-tight"
            >
              UNIS
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-white text-[13px] leading-tight">
              Hyper-local exposure.
              <br />
              Five income streams.
              <br />
              Signed agreement.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
