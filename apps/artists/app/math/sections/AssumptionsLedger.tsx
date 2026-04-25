"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";
import { ASSUMPTIONS } from "../data";

export function AssumptionsLedger() {
  return (
    <section
      id="assumptions"
      style={{
        padding: "var(--section-py) var(--content-px)",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 max-w-[62ch]"
        >
          <SectionEyebrow>The assumptions ledger</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Every number.
            <br />
            <span className="chrome-text">Every source.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            If a number appears anywhere on the Unis marketing site, it traces
            back to one of the entries below. Each line lists the value, the
            methodology behind it, the citable source, the date we last
            reviewed it, and whether we expect to revise it with real
            platform data.
          </p>
        </motion.div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--divider)",
          }}
        >
          {/* Header row */}
          <div
            className="hidden lg:grid gap-4 px-6 py-4 text-eyebrow uppercase text-text-muted font-semibold border-b"
            style={{
              gridTemplateColumns:
                "minmax(0, 3fr) minmax(0, 2fr) minmax(0, 5fr) minmax(0, 3fr) minmax(0, 1.5fr)",
              borderColor: "var(--divider)",
            }}
          >
            <div>Assumption</div>
            <div>Value</div>
            <div>Methodology</div>
            <div>Source</div>
            <div>Reviewed</div>
          </div>

          {ASSUMPTIONS.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="grid gap-4 px-6 py-6 border-t"
              style={{
                borderColor: "var(--divider)",
                gridTemplateColumns: "1fr",
              }}
            >
              <div className="lg:grid lg:gap-4" style={{ gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr) minmax(0, 5fr) minmax(0, 3fr) minmax(0, 1.5fr)" }}>
                {/* Mobile-visible compact layout */}
                <div className="lg:hidden space-y-3">
                  <div>
                    <div className="text-white font-display font-semibold text-[15px] tracking-tight mb-1">
                      {a.label}
                    </div>
                    <div className="font-display font-semibold text-brand-electric text-[20px] tracking-[-0.02em] tabular-nums">
                      {a.value}
                    </div>
                  </div>
                  <div>
                    <div className="text-eyebrow uppercase text-text-muted font-semibold mb-1">
                      Methodology
                    </div>
                    <p className="text-text-secondary text-[13px] leading-[1.55]">
                      {a.methodology}
                    </p>
                  </div>
                  <div>
                    <div className="text-eyebrow uppercase text-text-muted font-semibold mb-1">
                      Source
                    </div>
                    <p className="text-text-secondary text-[13px] leading-[1.55] italic">
                      {a.source}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-text-muted">
                    <span className="uppercase tracking-widest">
                      Reviewed {a.lastReviewed}
                    </span>
                    <RevisableTag revisable={a.revisable} />
                  </div>
                </div>

                {/* Desktop grid layout */}
                <div className="hidden lg:block">
                  <div className="text-white font-display font-semibold text-[15px] tracking-tight">
                    {a.label}
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="font-display font-semibold text-brand-electric text-[18px] tracking-[-0.02em] tabular-nums">
                    {a.value}
                  </div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-text-secondary text-[13px] leading-[1.55]">
                    {a.methodology}
                  </p>
                </div>
                <div className="hidden lg:block">
                  <p className="text-text-secondary text-[12px] leading-[1.55] italic">
                    {a.source}
                  </p>
                </div>
                <div className="hidden lg:flex flex-col gap-2 items-start">
                  <span className="text-[11px] text-text-muted uppercase tracking-widest">
                    {a.lastReviewed}
                  </span>
                  <RevisableTag revisable={a.revisable} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-text-subtle text-[12px] italic max-w-[80ch]">
          Last full ledger review: April 2026. We revise this table whenever a
          platform rate changes, an industry benchmark shifts meaningfully, or
          real Unis data replaces an estimate. All prior versions of this
          ledger remain accessible by going to the &ldquo;Math&rdquo; page of
          the{" "}
          <a
            href="https://web.archive.org/web/*/artists.unismusic.com/math"
            className="text-brand-electric hover:text-brand-electric-hover transition-colors"
            target="_blank"
            rel="noopener"
          >
            Internet Archive
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function RevisableTag({ revisable }: { revisable: boolean }) {
  if (revisable) {
    return (
      <span
        className="text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap"
        style={{
          background: "rgba(245, 158, 11, 0.12)",
          color: "var(--accent-amber)",
          border: "1px solid rgba(245, 158, 11, 0.3)",
        }}
      >
        Revises with data
      </span>
    );
  }
  return (
    <span
      className="text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap"
      style={{
        background: "rgba(37, 99, 235, 0.12)",
        color: "var(--brand-electric)",
        border: "1px solid rgba(37, 99, 235, 0.3)",
      }}
    >
      Fixed
    </span>
  );
}
