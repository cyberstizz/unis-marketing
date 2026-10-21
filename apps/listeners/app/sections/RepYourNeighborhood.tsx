"use client";

import { helpLink, UNIS_LINKS, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Module 2: place. The chain is Harlem's real one (findpage.jsx
 * HARLEM_PARENT_CHAIN in unis-sample); voting is live in Harlem, Uptown Harlem
 * and Downtown Harlem first. Waitlist thresholds match the help center.
 */
export const repModule: ShowcaseItem = {
  id: "rep-your-neighborhood",
  label: "Rep your neighborhood",
  headline: (
    <>
      Hear what your
      <br />
      block is playing.
    </>
  ),
  body: "Unis leads with what's moving where you live, then lets you look in on anywhere else.",
  checklist: [
    {
      title: "Your neighborhood first",
      text: "Your feed and the Find page open on what's happening where you live.",
      href: helpLink("jurisdiction-does"),
    },
    {
      title: "Browse any place",
      text: "Open any neighborhood's charts and past winners, even where you can't vote.",
      href: helpLink("jurisdiction-page"),
    },
    {
      title: "Find your sound",
      text: "Browse by subgenre and mood, with music from your own area first.",
      href: helpLink("sounds"),
    },
    {
      title: "Your city is next",
      text: "Unis opens one region at a time, once enough people from it join the waitlist.",
      href: helpLink("waitlist"),
    },
  ],
  cta: { label: "Explore jurisdictions", href: `${UNIS_LINKS.artists}/jurisdictions` },
  visual: <PlaceVisual />,
};

const CHAIN = ["Unis", "New York", "New York City Metro", "New York City", "Manhattan", "Upper Manhattan", "Harlem"];
const HOMES = ["Uptown Harlem", "Downtown Harlem"];
const WAITLIST = [
  { label: "Major metros", need: "1,000" },
  { label: "Mid-size cities", need: "500" },
  { label: "Everywhere else", need: "250" },
];

function PlaceVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] mb-6">
          Every place has
          <span className="block text-text-muted">its own charts.</span>
        </div>

        <ol className="relative pl-6" aria-label="From Unis down to Harlem">
          <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-white/15" />
          {CHAIN.map((name, i) => (
            <motion.li
              key={name}
              initial={reduce ? false : { opacity: 0, x: -10 }}
              animate={inView || reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-between py-1 sm:py-1.5 text-[14px]"
            >
              <span
                aria-hidden
                className={
                  "absolute -left-6 w-[15px] h-[15px] rounded-full border-2 " +
                  (name === "Harlem" ? "border-brand-electric bg-brand-electric" : "border-white/25 bg-bg-deep")
                }
              />
              <span className={name === "Harlem" ? "text-white font-medium" : "text-text-secondary"}>{name}</span>
              {name === "Harlem" && (
                <span className="rounded-full bg-brand-electric/20 text-brand-electric-hover px-2.5 py-0.5 text-[11px] font-medium">
                  Voting opens first
                </span>
              )}
            </motion.li>
          ))}
        </ol>

        <div className="grid grid-cols-2 gap-2 mt-3 pl-6">
          {HOMES.map((h, i) => (
            <motion.div
              key={h}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : 0.45 + i * 0.08 }}
              className="rounded-xl bg-brand-electric text-white px-3 py-2.5 text-[13px] font-medium flex items-center gap-2"
            >
              <span aria-hidden className="live-dot inline-block w-1.5 h-1.5 rounded-full bg-white text-white" />
              {h}
            </motion.div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/10">
          <div className="text-text-muted text-[12px] sm:text-[13px] mb-3">Signups a region needs to open</div>
          <div className="grid grid-cols-3 gap-2">
            {WAITLIST.map((w) => (
              <div key={w.label} className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
                <div className="font-display font-semibold text-white text-[20px] tracking-[-0.02em]">{w.need}</div>
                <div className="text-text-muted text-[11px] leading-tight mt-1">{w.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
