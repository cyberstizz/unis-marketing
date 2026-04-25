"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";
import {
  SOURCES,
  SOURCE_ORDER,
  PAYEES,
  PayeeKey,
  dollarShare,
  SourceMeta,
} from "../data";

const PAYEE_ORDER: PayeeKey[] = [
  "artist",
  "supporter",
  "referralL1",
  "referralL2",
  "referralL3",
  "mlc",
  "unis",
];

function formatCell(source: SourceMeta, payee: PayeeKey): {
  pct: string;
  dollars: string;
  tone: "win" | "neutral" | "none";
} {
  const cents = source.split[payee] ?? 0;
  if (cents === 0) {
    return { pct: "—", dollars: "—", tone: "none" };
  }
  const pct = `${cents % 1 === 0 ? cents : cents.toFixed(2)}%`;
  const dollars = dollarShare(source, payee);
  const dStr =
    dollars >= 0.1
      ? `$${dollars.toFixed(2)}`
      : dollars >= 0.01
        ? `$${dollars.toFixed(3)}`
        : `$${dollars.toFixed(4)}`;
  const tone: "win" | "neutral" =
    payee === "artist" || payee === "supporter" ? "win" : "neutral";
  return { pct, dollars: dStr, tone };
}

export function EverySplit() {
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
          <SectionEyebrow>Every split, in one place</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            The full table.
            <br />
            <span className="chrome-text">No footnotes hiding fees.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Every revenue source × every payee. Cross-referenced to the page
            where the split is originally introduced. This is the table
            journalists can cite and lawyers can audit.
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
          <table className="w-full border-collapse min-w-[880px]">
            <thead>
              <tr>
                <th
                  className="text-left p-4 text-eyebrow uppercase text-text-muted font-semibold align-bottom"
                  style={{ minWidth: "240px" }}
                >
                  Payee
                </th>
                {SOURCE_ORDER.map((key) => {
                  const s = SOURCES[key];
                  const isComingSoon = s.liveStatus === "coming-soon";
                  return (
                    <th
                      key={key}
                      className="p-4 text-left align-bottom"
                      style={{
                        borderBottom: "2px solid var(--brand-electric)",
                        minWidth: "150px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-display text-[15px] font-semibold tracking-tight">
                          {s.label}
                        </span>
                        {isComingSoon && (
                          <span
                            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-widest"
                            style={{
                              background: "rgba(245, 158, 11, 0.15)",
                              color: "var(--accent-amber)",
                            }}
                          >
                            Soon
                          </span>
                        )}
                      </div>
                      <div className="text-text-muted text-[11px] font-normal">
                        of ${s.gross.toFixed(2)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {PAYEE_ORDER.map((pk, rowIdx) => {
                const p = PAYEES[pk];
                return (
                  <tr
                    key={pk}
                    style={{
                      borderTop: "1px solid var(--divider)",
                      background:
                        rowIdx % 2 === 1
                          ? "rgba(255, 255, 255, 0.015)"
                          : "transparent",
                    }}
                  >
                    <td className="p-4 align-top">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                          style={{
                            background: p.color,
                            boxShadow: `0 0 8px ${p.color}70`,
                          }}
                        />
                        <div>
                          <div className="text-white text-[14px] font-display font-semibold tracking-tight">
                            {p.label}
                          </div>
                          <div className="text-text-muted text-[11px] leading-[1.4] mt-0.5 max-w-[220px]">
                            {p.sublabel}
                          </div>
                        </div>
                      </div>
                    </td>
                    {SOURCE_ORDER.map((sk) => {
                      const cell = formatCell(SOURCES[sk], pk);
                      return (
                        <td key={sk} className="p-4 align-top text-[13px]">
                          {cell.tone === "none" ? (
                            <span className="text-text-subtle">—</span>
                          ) : (
                            <div>
                              <div
                                className="font-display font-semibold text-[15px] tabular-nums tracking-tight"
                                style={{
                                  color:
                                    cell.tone === "win"
                                      ? p.color
                                      : "var(--text-secondary)",
                                }}
                              >
                                {cell.pct}
                              </div>
                              <div className="text-text-muted text-[11px] tabular-nums">
                                {cell.dollars}
                              </div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-text-subtle text-[12px] italic">
          <span>
            Display + paid tier + direct sale are live today. Audio ads are not
            yet active on Unis.
          </span>
          <span>
            Cross-reference: splits first introduced on{" "}
            <a
              href="/ownership"
              className="text-brand-electric hover:text-brand-electric-hover transition-colors"
            >
              /ownership
            </a>{" "}
            and{" "}
            <a
              href="/revenue"
              className="text-brand-electric hover:text-brand-electric-hover transition-colors"
            >
              /revenue
            </a>
            .
          </span>
        </div>
      </div>
    </section>
  );
}
