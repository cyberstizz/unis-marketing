"use client";

import { helpLink, RollingNumber, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Module 3: supporting an artist. Split and worked example are the help
 * center's own ("Earnings and payouts" → "What exactly is the 15% … a
 * percentage of?"): a $1,000 pot, 100,000 counted plays, Maya plays 500.
 */
export const backModule: ShowcaseItem = {
  id: "back-an-artist",
  label: "Back an artist",
  headline: (
    <>
      Back one artist.
      <br />
      It costs you nothing.
    </>
  ),
  body: "Pick an artist when you sign up. Every month, 15% of your share of what Unis earns goes to them, from your listening to anyone.",
  checklist: [
    {
      title: "Your listening is the support",
      text: "Nothing extra to pay. Be signed in when you listen and it counts.",
      href: helpLink("supporter-what"),
    },
    {
      title: "Switch on the 1st",
      text: "Change artists whenever you like. The switch takes effect at the start of next month.",
      href: helpLink("supporter-switch"),
    },
    {
      title: "Unis Plus, $4.99 a month",
      text: "No ads, and 60% of it goes to the artists you play.",
      href: helpLink("plus-what"),
    },
    {
      title: "Songs from $0.94",
      text: "Buy a song and the artist keeps most of what you pay.",
      href: helpLink("payouts-sales-fee"),
    },
  ],
  cta: { label: "How supporting works", href: helpLink("supporter") },
  visual: <ShareVisual />,
};

const SPLIT = [
  { label: "Her artist", pct: 15, amount: 0.75, color: "var(--brand-electric)" },
  { label: "Who invited her", pct: 10, amount: 0.5, color: "var(--brand-electric-hover)" },
  { label: "Who invited them", pct: 5, amount: 0.25, color: "var(--accent-violet)" },
  { label: "One more back", pct: 2, amount: 0.1, color: "var(--accent-violet-deep)" },
  { label: "Unis", pct: 68, amount: 3.4, color: "rgba(255,255,255,0.14)" },
];

const USD = { style: "currency", currency: "USD" } as const;

function ShareVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="text-brand-electric text-[13px] font-semibold">An example from the help center</div>
        <div className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] mt-2">
          Maya played 500 songs
          <span className="block text-text-muted">this month.</span>
        </div>
        <p className="text-text-secondary text-[14px] leading-[1.5] mt-3">
          Her share of the month&rsquo;s pot comes to{" "}
          <span className="text-white font-semibold">$5.00</span>. None of it goes to her. Here&rsquo;s where it goes.
        </p>

        <div className="flex h-4 rounded-full overflow-hidden mt-6 bg-white/5" aria-hidden>
          {SPLIT.map((s, i) => (
            <motion.span
              key={s.label}
              className="h-full origin-left"
              style={{ width: `${s.pct}%`, background: s.color }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: inView || reduce ? 1 : 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>

        <ul className="mt-auto pt-6 space-y-3">
          {SPLIT.map((s) => (
            <li key={s.label} className="flex items-center gap-3">
              <span aria-hidden className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              <span className="flex-1 text-[14px] text-text-secondary">
                <span className="text-white font-medium">{s.label}</span>
                <span className="text-text-muted"> &nbsp;{s.pct}%</span>
              </span>
              <RollingNumber
                value={s.amount}
                format={USD}
                className="font-display font-semibold text-white text-[18px] tabular-nums"
              />
            </li>
          ))}
        </ul>
      </div>
    </VisualPanel>
  );
}
