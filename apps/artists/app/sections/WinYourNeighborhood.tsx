"use client";

import { helpLink, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Module 1 of the showcase: exposure. The chain below is Harlem's real one
 * (findpage.jsx HARLEM_PARENT_CHAIN in unis-sample), top tier first.
 */
const CHAIN = [
  "Unis",
  "New York",
  "New York City Metro",
  "New York City",
  "Manhattan",
  "Upper Manhattan",
  "Harlem",
  "Uptown Harlem",
];

/** The six award periods (help center INTERVAL_WEIGHTS). */
const PERIODS = ["Day", "Week", "Month", "Quarter", "Midterm", "Year"];

export const winModule: ShowcaseItem = {
  id: "win-your-neighborhood",
  label: "Win your neighborhood",
  headline: (
    <>
      Where you&rsquo;re from
      <br />
      is the feature.
    </>
  ),
  body: "Unis ranks you where you live. Your neighbors vote, every play counts, and every win goes on a public record that never expires.",
  checklist: [
    {
      title: "Start local, then climb",
      text: "Uptown Harlem, Harlem, Manhattan, New York City, and on up to all of Unis. Win where you live first.",
      href: helpLink("jurisdiction-upward"),
    },
    {
      title: "Six award periods",
      text: "Day, week, month, quarter, midterm and year, in Rap, Rock and Pop.",
      href: helpLink("awards"),
    },
    {
      title: "Votes and plays both count",
      text: "Votes, plays and likes add up to one total, so the winner is who the neighborhood actually backs.",
      href: helpLink("awards-winner"),
    },
    {
      title: "A record that lasts",
      text: "Every winner stays on their neighborhood's page for good.",
      href: helpLink("jurisdiction-page"),
    },
  ],
  cta: { label: "Explore jurisdictions", href: "/jurisdictions" },
  visual: <JurisdictionLadder />,
};

/**
 * The climb: the eight places a Harlem artist competes in, narrowest at the
 * bottom. Rows light up from home upward when the panel appears, and the
 * award periods cycle along the top.
 */
function JurisdictionLadder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [period, setPeriod] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setPeriod((p) => (p + 1) % PERIODS.length), 1600);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Award periods">
          {PERIODS.map((p, i) => (
            <span
              key={p}
              className={
                "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors duration-500 " +
                (i === period ? "bg-brand-electric text-white" : "bg-white/[0.06] text-text-muted")
              }
            >
              {p}
            </span>
          ))}
        </div>

        <div className="font-display text-white text-[22px] sm:text-[24px] leading-[1.1] tracking-[-0.02em] mb-auto">
          Song of the {PERIODS[period]}
          <span className="block text-text-muted text-[15px] tracking-normal font-body mt-1">
            decided in every place you belong to
          </span>
        </div>

        <ol className="flex flex-col items-center gap-[6px] mt-6">
          {CHAIN.map((name, i) => {
            const fromBottom = CHAIN.length - 1 - i;
            // Unis (top) spans the full width; home (bottom) is the narrowest.
            const width = 100 - (i * 54) / (CHAIN.length - 1);
            const isHome = fromBottom === 0;
            return (
              <motion.li
                key={name}
                initial={reduce ? false : { opacity: 0.25 }}
                animate={inView ? { opacity: 1 } : { opacity: 0.25 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.15 + fromBottom * 0.12 }}
                className={
                  "relative flex items-center justify-between rounded-full px-4 h-8 sm:h-9 text-[13px] font-medium " +
                  (isHome
                    ? "bg-brand-electric text-white shadow-[0_8px_30px_-8px_rgba(37,99,235,0.8)]"
                    : "border border-white/10 bg-white/[0.04] text-text-secondary")
                }
                style={{ width: `${width}%` }}
              >
                <span className="truncate">{name}</span>
                {isHome && <span className="text-[11px] text-white/80 shrink-0 ml-2">Home</span>}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </VisualPanel>
  );
}
