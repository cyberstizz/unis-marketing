"use client";

import { motion } from "motion/react";
import { SectionEyebrow, CheckBullet } from "@unis/ui";

export function WhyTiersMatter() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Why seven tiers</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            One chart has one winner.
            <br />
            <span className="chrome-text">Seven charts have seven.</span>
          </h2>
          <p className="text-text-secondary text-body-lg max-w-[56ch] mb-10">
            The streaming industry runs on one global chart and one global
            algorithm. You're competing with every artist on Earth for a handful
            of playlist slots decided by an editor you've never met. Unis works
            differently. Every tier is its own competition, its own chart, its
            own story.
          </p>
          <ul className="space-y-6">
            <CheckBullet title="Seven shots, not one." delay={0}>
              You can win at the sub-neighborhood level before you chart in
              your city. You can chart in your city before you chart in your
              state. Each win is real, recorded, and public.
            </CheckBullet>
            <CheckBullet title="The local win is the story that sells." delay={100}>
              &ldquo;I was Artist of the Day in Harlem&rdquo; is a story
              bookers, press, and future fans can verify. &ldquo;I was one of
              11 million artists on Spotify&rdquo; is not.
            </CheckBullet>
            <CheckBullet title="Upward mobility, by design." delay={200}>
              Dominate your sub-neighborhood and your songs surface in the
              neighborhood charts. Dominate the neighborhood and they surface
              in the city charts. Grassroots, but algorithmic.
            </CheckBullet>
            <CheckBullet title="No payola. No editors. No gatekeepers." delay={300}>
              Every tier is decided by votes, plays, and likes from actual
              residents of that tier. The only way in is to be good enough that
              your neighbors say so.
            </CheckBullet>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <ScenarioComparison />
        </motion.div>
      </div>
    </section>
  );
}

function ScenarioComparison() {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden p-8 flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 60%, rgba(22, 51, 135, 0.5) 100%)",
        border: "1px solid rgba(37, 99, 235, 0.25)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />

      <div className="relative">
        <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-3">
          Same artist · two platforms
        </div>
        <div className="font-display text-white text-[22px] leading-tight tracking-[-0.02em] mb-8">
          Which chart
          <br />
          <span className="chrome-text">tells a better story?</span>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-xl p-5"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
              Spotify
            </div>
            <div className="font-display text-[clamp(22px,3vw,32px)] font-semibold text-white leading-tight tracking-[-0.02em] mb-1">
              #47,000
            </div>
            <div className="text-text-muted text-[13px]">
              monthly listeners rank, roughly
            </div>
          </div>

          <div className="text-center text-text-muted text-[12px] uppercase tracking-widest py-2">
            Same artist · same songs · same month
          </div>

          <div
            className="rounded-xl p-5 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)",
              border: "1px solid rgba(37, 99, 235, 0.4)",
              boxShadow: "0 16px 48px -12px rgba(37, 99, 235, 0.4)",
            }}
          >
            <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-2">
              Unis · Uptown Harlem
            </div>
            <div
              className="font-display font-semibold chrome-text leading-none tracking-[-0.03em]"
              style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
            >
              #1
            </div>
            <div className="text-white/80 text-[13px] mt-2">
              Artist of the Day · 3-day streak
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-auto pt-6 text-text-muted text-[12px] italic">
        The #1 is the one that gets booked. Gets covered. Gets remembered.
      </div>
    </div>
  );
}
