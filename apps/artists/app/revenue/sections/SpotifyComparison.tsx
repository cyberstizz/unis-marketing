"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

export function SpotifyComparison() {
  return (
    <section
      style={{
        padding: "var(--section-py) var(--content-px)",
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)",
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
          <SectionEyebrow>Same fan. Different math.</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            One fan on Spotify
            <br />
            vs. one fan{" "}
            <span className="chrome-text">on Unis.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Take the same person: a dedicated fan who plays your music 20
            times a month, plays other artists 300 times a month, and pays for
            ad-free listening. Here&rsquo;s what each platform pays you for
            that one human.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-4 lg:gap-6 md:grid-cols-2"
        >
          <ComparisonCard
            title="Spotify Premium subscriber"
            subdued
            rows={[
              { label: "They pay Spotify", value: "$12.99/mo" },
              {
                label: "Your share of their 20 plays",
                value: "~$0.003–$0.005 × 20",
              },
              {
                label: "From their other 300 plays",
                value: "$0",
              },
            ]}
            total="~$0.08"
            totalLabel="Your take per month · this one fan"
          />
          <ComparisonCard
            title="Unis Plus subscriber who backs you"
            rows={[
              { label: "They pay Unis Plus", value: "$4.99/mo" },
              {
                label: "Unis Plus by plays: 20 of their 320 are you",
                value: "$2.70 × 6.25% = $0.17",
              },
              {
                label: "Supporter share of all 320 plays",
                value: "15% of $3.20 = $0.48",
              },
            ]}
            total="~$0.65"
            totalLabel="Your take per month · this one fan"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-12 text-center"
        >
          <p className="font-display font-semibold text-white tracking-[-0.03em] text-[clamp(28px,4vw,56px)] leading-[1.15] max-w-[22ch] mx-auto">
            About{" "}
            <span className="chrome-text">8x more</span> per dedicated fan.
          </p>
          <p className="text-text-secondary text-body-lg mt-6 max-w-[60ch] mx-auto">
            Not because Unis is magic, but because a fan who backs you pays you
            from <em>all</em> of their listening, and their subscription follows
            their own plays instead of a global pool.
          </p>
        </motion.div>

        <p className="mt-10 text-text-subtle text-[12px] italic max-w-[80ch] mx-auto text-center">
          Spotify Premium Individual is $12.99/month in the US (from February
          2026). Spotify per-stream rate is the commonly cited industry range of
          $0.003–$0.005. The Unis figures assume the month&rsquo;s Community
          Share works out to 1¢ per counted play (the help center&rsquo;s own
          example); the real value depends on what Unis earns each month and
          will be lower in the early months. Unis Plus artists&rsquo; pool is
          60% of $4.99 after Stripe&rsquo;s fees, about $2.70.
        </p>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  rows,
  total,
  totalLabel,
  subdued = false,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
  total: string;
  totalLabel: string;
  subdued?: boolean;
}) {
  return (
    <div
      className="rounded-2xl p-8 lg:p-10 flex flex-col"
      style={{
        background: subdued
          ? "var(--bg-surface)"
          : "linear-gradient(135deg, rgba(22, 51, 135, 0.5) 0%, rgba(37, 99, 235, 0.25) 100%)",
        border: subdued
          ? "1px solid var(--divider)"
          : "1px solid rgba(59, 130, 246, 0.45)",
        boxShadow: subdued
          ? "none"
          : "0 24px 80px -20px rgba(37, 99, 235, 0.4)",
      }}
    >
      <div
        className="font-display font-semibold text-[20px] tracking-tight mb-8"
        style={{ color: subdued ? "var(--text-muted)" : "#ffffff" }}
      >
        {title}
      </div>

      <div className="space-y-5 flex-1">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex justify-between items-baseline gap-4 pb-3 border-b"
            style={{
              borderColor: subdued
                ? "var(--divider)"
                : "rgba(255, 255, 255, 0.12)",
            }}
          >
            <span
              className="text-[13px] leading-tight"
              style={{
                color: subdued ? "var(--text-muted)" : "rgba(255,255,255,0.75)",
              }}
            >
              {row.label}
            </span>
            <span
              className="text-[14px] font-display font-semibold tracking-tight text-right whitespace-nowrap"
              style={{
                color: subdued ? "var(--text-secondary)" : "#ffffff",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t" style={{ borderColor: subdued ? "var(--divider)" : "rgba(255, 255, 255, 0.25)" }}>
        <div
          className="text-eyebrow uppercase font-semibold mb-2"
          style={{ color: subdued ? "var(--text-muted)" : "rgba(255,255,255,0.8)" }}
        >
          {totalLabel}
        </div>
        <div
          className="font-display font-semibold leading-none tracking-[-0.03em]"
          style={{
            fontSize: "clamp(40px, 5vw, 72px)",
            color: subdued ? "var(--text-secondary)" : "#ffffff",
          }}
        >
          {total}
        </div>
      </div>
    </div>
  );
}
