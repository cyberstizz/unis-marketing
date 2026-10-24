"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { SectionEyebrow } from "./SectionEyebrow";

export type VersusRow = { point: string; them: ReactNode; us: ReactNode };

type VersusTableProps = {
  id?: string;
  eyebrow: string;
  headline: ReactNode;
  body?: ReactNode;
  themLabel?: string;
  usLabel?: string;
  rows: VersusRow[];
  /** Small print under the table: where the competitor facts come from. */
  footnote?: ReactNode;
};

/**
 * Point-for-point comparison: one row per point, the competitor's answer and
 * Unis's answer side by side, Unis's column lit. On phones each row becomes
 * its own card so nothing scrolls sideways.
 */
export function VersusTable({
  id,
  eyebrow,
  headline,
  body,
  themLabel = "Spotify for Artists",
  usLabel = "Unis",
  rows,
  footnote,
}: VersusTableProps) {
  return (
    <section id={id} style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 max-w-[62ch]"
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            {headline}
          </h2>
          {body && <p className="text-text-secondary text-body-lg mt-6">{body}</p>}
        </motion.div>

        {/* Tablet and up: a real table */}
        <div className="hidden md:block rounded-2xl border border-divider overflow-hidden bg-bg-surface">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th scope="col" className="w-[24%] p-5 lg:p-6 text-left text-eyebrow uppercase text-text-muted font-semibold">
                  <span className="sr-only">Point</span>
                </th>
                <th scope="col" className="w-[38%] p-5 lg:p-6 text-left font-display font-semibold text-text-secondary text-[15px] tracking-tight">
                  {themLabel}
                </th>
                <th
                  scope="col"
                  className="w-[38%] p-5 lg:p-6 text-left font-display font-semibold text-white text-[15px] tracking-tight"
                  style={{ background: "linear-gradient(180deg, rgba(37,99,235,0.28), rgba(37,99,235,0.14))" }}
                >
                  {usLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={row.point}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                  className="border-t border-divider align-top"
                >
                  <th scope="row" className="p-5 lg:p-6 text-left font-display font-semibold text-white text-[16px] tracking-tight leading-[1.3]">
                    {row.point}
                  </th>
                  <td className="p-5 lg:p-6 text-text-muted text-[15px] leading-[1.55]">{row.them}</td>
                  <td className="p-5 lg:p-6 text-white text-[15px] leading-[1.55]" style={{ background: "rgba(37,99,235,0.1)" }}>
                    {row.us}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one card per point */}
        <ul className="md:hidden space-y-3">
          {rows.map((row) => (
            <li key={row.point} className="rounded-2xl border border-divider bg-bg-surface p-5">
              <h3 className="font-display font-semibold text-white text-[17px] tracking-tight mb-4">{row.point}</h3>
              <div className="text-[12px] uppercase tracking-[0.1em] text-text-muted mb-1">{themLabel}</div>
              <p className="text-text-muted text-[15px] leading-[1.55] mb-4">{row.them}</p>
              <div className="rounded-xl p-4" style={{ background: "rgba(37,99,235,0.14)" }}>
                <div className="text-[12px] uppercase tracking-[0.1em] text-brand-electric-hover font-semibold mb-1">{usLabel}</div>
                <p className="text-white text-[15px] leading-[1.55]">{row.us}</p>
              </div>
            </li>
          ))}
        </ul>

        {footnote && <p className="mt-6 text-text-muted text-[13px] leading-[1.6] max-w-[90ch]">{footnote}</p>}
      </div>
    </section>
  );
}
