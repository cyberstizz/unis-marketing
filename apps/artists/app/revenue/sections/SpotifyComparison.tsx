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
            Let's take the same person — a dedicated fan who listens to your
            music 20 times a month, streams other artists 300 times a month,
            and is already paying Spotify Premium. Here's what each platform
            pays you for that one human.
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
            title="Spotify Premium user"
            subdued
            rows={[
              { label: "They pay their platform", value: "$11.99/mo" },
              {
                label: "Your share of that payment",
                value: "~$0.003 × 20 streams = $0.06",
              },
              {
                label: "Plus daily activity (non-music)",
                value: "$0",
              },
            ]}
            total="~$0.06"
            totalLabel="Your take per month · this one fan"
          />
          <ComparisonCard
            title="Unis supporter (paid tier)"
            rows={[
              { label: "They pay their platform", value: "$5.99/mo" },
              {
                label: "Your share of that payment",
                value: "50% of $5.99 = $2.99",
              },
              {
                label: "Plus daily activity (supporter share)",
                value: "15% of ~$0.70/mo = $0.11",
              },
            ]}
            total="~$3.10"
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
            That's a{" "}
            <span className="chrome-text">51x difference</span> per dedicated
            fan.
          </p>
          <p className="text-text-secondary text-body-lg mt-6 max-w-[60ch] mx-auto">
            Not because Unis is magic —{" "}
            <em>because Unis is built differently.</em> You're not a number in
            a pool. You're the business.
          </p>
        </motion.div>

        <p className="mt-10 text-text-subtle text-[12px] italic max-w-[80ch] mx-auto text-center">
          Spotify per-stream rate based on 2025 industry average ($0.003–$0.005).
          Assumes ~20 streams/mo of the artist's music in a rotation of ~320
          total monthly streams on Premium. Unis calculation assumes $0.70/month
          display ad revenue per active user, 15% supporter share, 50%
          paid-tier split at $5.99/mo.
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
