"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

type Row = {
  label: string;
  values: Array<{
    text: string;
    tone: "win" | "neutral" | "loss";
    bold?: boolean;
  }>;
};

const COLUMNS = [
  "Unis",
  "DistroKid",
  "TuneCore",
  "CD Baby",
  "UnitedMasters",
  "Traditional label",
];

const ROWS: Row[] = [
  {
    label: "Keeps your masters",
    values: [
      { text: "Yes", tone: "win", bold: true },
      { text: "Yes", tone: "neutral" },
      { text: "Yes", tone: "neutral" },
      { text: "Yes", tone: "neutral" },
      { text: "Yes (SELECT)", tone: "neutral" },
      { text: "No — labels typically own masters", tone: "loss" },
    ],
  },
  {
    label: "Personalized signed agreement",
    values: [
      { text: "Yes — downloadable PDF with your name + songs", tone: "win", bold: true },
      { text: "No — clickwrap ToS", tone: "loss" },
      { text: "No — clickwrap ToS", tone: "loss" },
      { text: "No — clickwrap ToS", tone: "loss" },
      { text: "No — clickwrap ToS", tone: "loss" },
      { text: "Yes — but you're signing rights away", tone: "loss" },
    ],
  },
  {
    label: "Agreement lists your specific songs",
    values: [
      { text: "Yes", tone: "win", bold: true },
      { text: "No", tone: "loss" },
      { text: "No", tone: "loss" },
      { text: "No", tone: "loss" },
      { text: "No", tone: "loss" },
      { text: "Varies", tone: "neutral" },
    ],
  },
  {
    label: "Annual fee to stay listed",
    values: [
      { text: "$0", tone: "win", bold: true },
      { text: "$22.99+/yr", tone: "loss" },
      { text: "$24.99+/yr", tone: "loss" },
      { text: "$9.99 per release", tone: "neutral" },
      { text: "$59.99/yr for SELECT", tone: "loss" },
      { text: "n/a", tone: "neutral" },
    ],
  },
  {
    label: "Payout speed on direct sales",
    values: [
      { text: "2 business days", tone: "win", bold: true },
      { text: "~monthly after accrual", tone: "neutral" },
      { text: "~monthly after accrual", tone: "neutral" },
      { text: "~monthly after accrual", tone: "neutral" },
      { text: "~monthly after accrual", tone: "neutral" },
      { text: "Quarterly, after recoupment", tone: "loss" },
    ],
  },
  {
    label: "Artist share of streaming",
    values: [
      { text: "60% of net, direct", tone: "win", bold: true },
      { text: "Pro-rata pool share", tone: "neutral" },
      { text: "Pro-rata pool share", tone: "neutral" },
      { text: "91% of pro-rata share", tone: "neutral" },
      { text: "100% SELECT / 70% free", tone: "neutral" },
      { text: "10–20% after advance recouped", tone: "loss" },
    ],
  },
  {
    label: "Mechanical royalty handling",
    values: [
      { text: "Free. We pay MLC on your behalf.", tone: "win", bold: true },
      { text: "Extra fee for publishing admin", tone: "loss" },
      { text: "TuneCore Publishing: extra fee", tone: "loss" },
      { text: "CDB Boost: 15% forever", tone: "loss" },
      { text: "Not included", tone: "loss" },
      { text: "Handled by label, taken from your share", tone: "loss" },
    ],
  },
  {
    label: "Non-exclusive",
    values: [
      { text: "Yes — use alongside any distributor", tone: "win", bold: true },
      { text: "Yes", tone: "neutral" },
      { text: "Yes", tone: "neutral" },
      { text: "Yes", tone: "neutral" },
      { text: "Yes", tone: "neutral" },
      { text: "No — typically exclusive", tone: "loss" },
    ],
  },
  {
    label: "Delete & walk away anytime",
    values: [
      { text: "Yes — 30 days notice, no fee", tone: "win", bold: true },
      { text: "Yes (pay to re-upload elsewhere)", tone: "neutral" },
      { text: "Yes (pay to re-upload elsewhere)", tone: "neutral" },
      { text: "Yes (upload fee is sunk)", tone: "neutral" },
      { text: "Yes", tone: "neutral" },
      { text: "No — locked for contract term", tone: "loss" },
    ],
  },
];

export function ComparisonTable() {
  return (
    <section
      id="comparison"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 max-w-[62ch]"
        >
          <SectionEyebrow>The actual difference</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            What &ldquo;100% ownership&rdquo; actually looks like.
          </h2>
          <p className="text-text-secondary text-body-lg">
            Every major distribution platform claims artists keep their
            masters. It's true — nobody's taking your copyrights. But the{" "}
            <em>way</em> each platform documents that claim is very different.
            Here's what you're actually agreeing to.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="overflow-x-auto rounded-2xl border border-divider"
          style={{ background: "var(--bg-surface)" }}
        >
          <table className="w-full border-collapse min-w-[1000px]">
            <thead>
              <tr>
                <th
                  className="text-left p-4 text-eyebrow uppercase text-text-muted font-semibold"
                  style={{ minWidth: "220px" }}
                >
                  &nbsp;
                </th>
                {COLUMNS.map((col, i) => (
                  <th
                    key={col}
                    className="p-4 text-left text-[14px] font-display font-semibold tracking-tight"
                    style={{
                      color: i === 0 ? "var(--brand-electric)" : "var(--text-secondary)",
                      background:
                        i === 0 ? "rgba(37, 99, 235, 0.08)" : "transparent",
                      borderBottom:
                        i === 0
                          ? "2px solid var(--brand-electric)"
                          : "1px solid var(--divider)",
                      minWidth: "160px",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, rowIdx) => (
                <tr
                  key={row.label}
                  style={{
                    borderTop: "1px solid var(--divider)",
                    background:
                      rowIdx % 2 === 1 ? "rgba(255, 255, 255, 0.015)" : "transparent",
                  }}
                >
                  <td className="p-4 text-[14px] text-text-secondary font-medium align-top">
                    {row.label}
                  </td>
                  {row.values.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="p-4 text-[13px] align-top"
                      style={{
                        background:
                          cellIdx === 0 ? "rgba(37, 99, 235, 0.06)" : "transparent",
                        color:
                          cell.tone === "win"
                            ? "#ffffff"
                            : cell.tone === "loss"
                              ? "var(--text-subtle)"
                              : "var(--text-secondary)",
                        fontWeight: cell.bold ? 600 : 400,
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="flex-shrink-0 mt-1"
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background:
                              cell.tone === "win"
                                ? "var(--brand-electric)"
                                : cell.tone === "loss"
                                  ? "var(--text-subtle)"
                                  : "var(--accent-violet)",
                            opacity: cell.tone === "loss" ? 0.5 : 1,
                          }}
                        />
                        <span>{cell.text}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="mt-6 text-text-subtle text-[13px] italic">
          Sources: DistroKid Help Center, TuneCore distribution terms, CD Baby
          standard agreement, UnitedMasters SELECT terms (2026). Industry
          royalty rates per CRB Phonorecords IV rulings.
        </p>
      </div>
    </section>
  );
}
