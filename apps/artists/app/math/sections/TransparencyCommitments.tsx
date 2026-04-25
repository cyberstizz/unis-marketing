"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";
import { COMMITMENTS } from "../data";

export function TransparencyCommitments() {
  const now = COMMITMENTS.filter((c) => c.status === "committed-now");
  const later = COMMITMENTS.filter((c) => c.status === "committed-post-audio");

  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 max-w-[62ch]"
        >
          <SectionEyebrow>Transparency commitments</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            What we'll publish.{" "}
            <span className="chrome-text">When we'll publish it.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Spotify publishes aggregate Loud &amp; Clear data once a year.
            We're committing to quarterly, per-jurisdiction, broken out by
            revenue source. Some commitments activate today. Some activate
            when audio ads launch and we can track those streams.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:gap-10 lg:grid-cols-2">
          <CommitmentColumn
            title="Publishing now"
            subtitle="Active commitments. Published from our first full quarter post-launch."
            accent="var(--brand-electric)"
            commitments={now}
          />
          <CommitmentColumn
            title="Once audio ads launch"
            subtitle="Activates when Unis finalizes an audio ad partnership and begins serving pre-roll ads."
            accent="var(--accent-amber)"
            commitments={later}
            isSoon
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-12 text-center"
        >
          <p className="font-display font-semibold text-white tracking-[-0.03em] text-[clamp(22px,3vw,40px)] leading-[1.2] max-w-[26ch] mx-auto">
            Spotify publishes once a year.{" "}
            <span className="chrome-text">Unis commits to four.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CommitmentColumn({
  title,
  subtitle,
  accent,
  commitments,
  isSoon = false,
}: {
  title: string;
  subtitle: string;
  accent: string;
  commitments: typeof COMMITMENTS;
  isSoon?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="rounded-2xl p-6 lg:p-8 h-full flex flex-col"
      style={{
        background: isSoon
          ? "rgba(245, 158, 11, 0.04)"
          : "var(--bg-surface)",
        border: `1px solid ${isSoon ? "rgba(245, 158, 11, 0.25)" : "var(--divider)"}`,
      }}
    >
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: accent,
              boxShadow: `0 0 10px ${accent}90`,
            }}
          />
          <div
            className="text-eyebrow uppercase font-semibold"
            style={{ color: accent }}
          >
            {title}
          </div>
        </div>
        <p className="text-text-secondary text-[14px] leading-[1.55]">
          {subtitle}
        </p>
      </div>

      <div className="flex-1 space-y-4">
        {commitments.map((c) => (
          <div
            key={c.id}
            className="rounded-lg p-4"
            style={{
              background: "rgba(255, 255, 255, 0.025)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-display font-semibold text-white text-[15px] tracking-tight leading-[1.25] flex-1">
                {c.metric}
              </h3>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest flex-shrink-0 whitespace-nowrap"
                style={{
                  background: `${accent}18`,
                  color: accent,
                  border: `1px solid ${accent}40`,
                }}
              >
                {c.cadence}
              </span>
            </div>
            <p className="text-text-secondary text-[13px] leading-[1.6]">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
