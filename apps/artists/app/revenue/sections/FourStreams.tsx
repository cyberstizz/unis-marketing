"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { SectionEyebrow } from "@unis/ui";

type Stream = {
  number: string;
  name: string;
  tag: string;
  tagColor: string;
  comingSoon?: boolean;
  headline: string;
  what: ReactNode;
  compare: ReactNode;
  math: ReactNode;
  accent: string;
};

const STREAMS: Stream[] = [
  {
    number: "01",
    name: "Display ad supporter income",
    tag: "15% of display ad revenue · passive · daily",
    tagColor: "var(--brand-electric)",
    headline: "Every day your fan opens the app, you earn. Even if they don't press play.",
    accent: "var(--brand-electric)",
    what: (
      <>
        When someone picks you as their artist at signup, Unis sends{" "}
        <strong className="text-white">15% of every display ad</strong> they
        generate — scrolling, browsing, tapping around the app — straight to
        you. Every day. Whether they press play on your music or not.
      </>
    ),
    compare: (
      <>
        Spotify has no mechanism for a listener to fund a specific artist
        without streaming. On Unis, you're earning from every second they have
        the app open.
      </>
    ),
    math: (
      <>
        <div>
          An active supporter sees ~<strong className="text-white">$0.70</strong>{" "}
          in display ads per month.
        </div>
        <div>
          After the 15% supporter share →{" "}
          <strong className="text-white">$0.11</strong> to you, per active
          supporter, per month.
        </div>
        <div className="pt-3 mt-3 border-t border-divider">
          <div>100 supporters · 40% daily active = <strong className="text-brand-electric">~$4/month</strong> passive.</div>
          <div>1,000 supporters · 40% active = <strong className="text-brand-electric">~$42/month</strong> passive.</div>
          <div className="text-text-muted text-[12px] pt-1">(Active-day rate adjustable in the calculator above.)</div>
        </div>
      </>
    ),
  },
  {
    number: "02",
    name: "Audio ad streaming income",
    tag: "60% of net audio ad revenue · performance-based",
    tagColor: "var(--accent-violet)",
    comingSoon: true,
    headline: "Your plays fund you directly. Not a shared pool.",
    accent: "var(--accent-violet)",
    what: (
      <>
        Pre-roll audio ads before your songs. Artist gets{" "}
        <strong className="text-white">60% of net</strong> after MLC
        compulsory royalties are paid. The referral pool (10/5/2%) fires on
        top. Unis keeps 23%.{" "}
        <strong className="text-white">
          This stream is not yet live — audio ads launch once Unis completes
          agreements with an audio ad partner.
        </strong>
      </>
    ),
    compare: (
      <>
        Spotify's pro-rata pool means your streams get averaged against
        Drake's and Taylor Swift's, so a small artist earns $0.003–$0.005
        per stream. Unis pays you directly on <em>your</em> ad revenue, not a
        shared pool.
      </>
    ),
    math: (
      <>
        <div>5,000 monthly plays · 60% audio ad fill rate · $0.015 per filled ad</div>
        <div>= ~$45 gross revenue tied to your plays</div>
        <div>After MLC (~15.3%) → ~$38 net</div>
        <div className="pt-3 mt-3 border-t border-divider">
          Artist's 60% →{" "}
          <strong className="text-accent-violet">~$23/month</strong> for that
          level of play.
        </div>
      </>
    ),
  },
  {
    number: "03",
    name: "Paid tier subscription income",
    tag: "50% of $5.99/month · direct · predictable",
    tagColor: "var(--accent-violet-deep)",
    headline: "Every paid fan sends you $2.99 a month. Directly. No pool.",
    accent: "var(--accent-violet-deep)",
    what: (
      <>
        Every Unis user who upgrades to ad-free is still tied to their
        supported artist. When they pay $5.99/month, half of that —{" "}
        <strong className="text-white">$2.99</strong> — goes straight to
        you. Not pooled. Not pro-rata. Direct.
      </>
    ),
    compare: (
      <>
        Spotify Premium revenue goes into a global pool that splits across
        every artist by stream share. Your share of a Premium user who
        streams Drake 90% of the time is effectively zero. On Unis, if that
        user <em>chose you</em>, you get half their subscription no matter
        what they listen to.
      </>
    ),
    math: (
      <>
        <div>100 supporters · 8% paid conversion rate = 8 paid supporters</div>
        <div>8 × $2.99 = <strong className="text-white">$23.92/month</strong></div>
        <div className="pt-3 mt-3 border-t border-divider">
          500 supporters at 8% conversion = 40 paid →{" "}
          <strong style={{ color: "var(--accent-violet-deep)" }}>
            $119.60/month
          </strong>{" "}
          predictable.
        </div>
      </>
    ),
  },
  {
    number: "04",
    name: "Direct sales",
    tag: "85% of sale price · paid in 2 business days",
    tagColor: "var(--accent-amber)",
    headline: "Sell directly to your fans. Keep 85%. Paid in 2 business days.",
    accent: "var(--accent-amber)",
    what: (
      <>
        Set your own price ($1.99 floor, no ceiling). Fan pays, you keep{" "}
        <strong className="text-white">85%</strong>. Unis takes 15% to cover
        payment processing and platform costs. Stripe deposits to your bank
        in two business days.
      </>
    ),
    compare: (
      <>
        Bandcamp takes 15% and pays at similar speed, so we're comparable on
        cut — but most streaming platforms don't offer direct sales at all.
        Compared to iTunes, you net more per sale and wait days instead of
        months.
      </>
    ),
    math: (
      <>
        <div>20 tracks sold at $1.99/month → $39.80 gross</div>
        <div>
          85% to artist →{" "}
          <strong className="text-white">$33.83/month</strong>
        </div>
        <div className="pt-3 mt-3 border-t border-divider">
          Paid out{" "}
          <strong style={{ color: "var(--accent-amber)" }}>
            twice a week
          </strong>
          , not monthly.
        </div>
      </>
    ),
  },
];

export function FourStreams() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 max-w-[62ch]"
        >
          <SectionEyebrow>Four ways your fans pay you</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            The math, broken down.
          </h2>
          <p className="text-text-secondary text-body-lg">
            Here's exactly what each stream is, how it pays, and what it looks
            like in dollars. Every split below is encoded in the Unis platform —
            not marketing, not promise. Code.
          </p>
        </motion.div>

        <div className="space-y-6 lg:space-y-8">
          {STREAMS.map((stream, i) => (
            <StreamCard key={stream.number} stream={stream} index={i} />
          ))}
        </div>

        {/* Referrals additive block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 rounded-2xl p-8 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(22, 51, 135, 0.3) 0%, rgba(37, 99, 235, 0.1) 100%)",
            border: "1px solid rgba(37, 99, 235, 0.25)",
          }}
        >
          <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-3">
            Plus, for every Unis user · not just artists
          </div>
          <h3 className="font-display font-semibold text-white text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.02em] mb-4">
            10% / 5% / 2% referrals, three levels deep. Lifetime.
          </h3>
          <p className="text-text-secondary text-[16px] leading-[1.6] max-w-[72ch]">
            When you bring someone to Unis, you earn{" "}
            <strong className="text-white">10%</strong> of their ad revenue
            for as long as they use the app. Their referrals earn you{" "}
            <strong className="text-white">5%</strong>. Their referrals'
            referrals earn you <strong className="text-white">2%</strong>.
            Applied to both display and audio ads. Not artist-specific —
            every Unis user earns this way, stacked on top of whatever else
            they have going.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StreamCard({ stream, index }: { stream: Stream; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] rounded-2xl p-6 lg:p-10"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--divider)",
      }}
    >
      {/* Left rail */}
      <div className="flex flex-col gap-4">
        <div
          className="font-display font-semibold text-[14px] tracking-[0.12em]"
          style={{ color: stream.accent }}
        >
          {stream.number}
        </div>
        <h3 className="font-display font-semibold text-white text-[22px] lg:text-[26px] leading-[1.15] tracking-[-0.02em]">
          {stream.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{
              background: `${stream.tagColor}18`,
              color: stream.tagColor,
              border: `1px solid ${stream.tagColor}30`,
            }}
          >
            {stream.tag}
          </span>
          {stream.comingSoon && (
            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                color: "var(--accent-amber)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              Coming soon
            </span>
          )}
        </div>
      </div>

      {/* Right content */}
      <div>
        <div
          className="font-display font-semibold text-white text-[clamp(20px,2.4vw,30px)] leading-[1.2] tracking-[-0.02em] mb-6"
        >
          {stream.headline}
        </div>

        <div className="space-y-5 text-text-secondary text-[15px] leading-[1.65]">
          <div>
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
              What it is
            </div>
            <p>{stream.what}</p>
          </div>
          <div>
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
              How it compares
            </div>
            <p>{stream.compare}</p>
          </div>
          <div
            className="rounded-lg p-5 font-mono text-[14px] leading-[1.8] space-y-1"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-3 font-sans">
              Illustrated math
            </div>
            <div className="text-text-secondary">{stream.math}</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
