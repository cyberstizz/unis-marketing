"use client";

import { helpLink, RollingNumber, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Module 2 of the showcase: income. Every figure matches the help center
 * (unis-sample src/data/helpContent.jsx, "Earnings and payouts") and the
 * revenue schedule in the in-app Artist Agreement (artistDashboard.jsx).
 */
export const getPaidModule: ShowcaseItem = {
  id: "get-paid",
  label: "Get paid",
  headline: (
    <>
      Get paid every time
      <br />
      your supporters listen.
    </>
  ),
  body: "Every listener backs one artist. Each month, 15% of their share of what Unis earns goes to that artist, whatever they were playing. It stacks with everything else here.",
  checklist: [
    {
      title: "Sell songs from $0.94",
      text: "Fans pay your price. Unis keeps 10%, or only the card fee plus 1¢ on small sales.",
      href: helpLink("payouts-sales-fee"),
    },
    {
      title: "Unis Plus pays your backers' share",
      text: "60% of every $4.99 subscription, after Stripe's fees, goes to artists: 15% to the artist that subscriber backs, 45% to the artists they played.",
      href: helpLink("payouts-plus"),
    },
    {
      title: "Supporters, every month",
      text: "15% of each supporter's monthly share of the Community Share comes to you.",
      href: helpLink("supporter-artist-side"),
    },
    {
      title: "Earn three steps deep",
      text: "Invite people and get 10%, 5% and 2% of the monthly share down your chain.*",
      href: helpLink("referrals-levels"),
    },
  ],
  cta: { label: "Explore the revenue model", href: "/revenue" },
  note: "*The people you invite need a verified phone number for their listening to count toward your share.",
  visual: <MoneyVisual />,
};

type Stream = {
  label: string;
  detail: string;
  value: number;
  /** Bar length, 0–100 */
  bar: number;
  suffix?: string;
  soon?: boolean;
};

const STREAMS: Stream[] = [
  { label: "Song sales and support", detail: "Yours, minus 10% (or card fee + 1¢)", value: 90, bar: 90, suffix: "%" },
  { label: "Unis Plus", detail: "15% to their artist + 45% by plays", value: 60, bar: 60, suffix: "%" },
  { label: "Supporters", detail: "Of each supporter's monthly share", value: 15, bar: 15, suffix: "%" },
  { label: "Referrals", detail: "10%, 5% and 2%, three steps down", value: 10, bar: 10, suffix: "%" },
  { label: "Audio ads", detail: "Of ads played with your songs", value: 60, bar: 60, suffix: "%", soon: true },
];

function MoneyVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em]">
          Five ways to earn.
          <span className="block text-text-muted">One payout a month.</span>
        </div>

        <ul className="mt-auto space-y-4 sm:space-y-5">
          {STREAMS.map((s, i) => (
            <li key={s.label} className={s.soon ? "opacity-60" : undefined}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <div className="min-w-0">
                  <div className="text-white text-[14px] sm:text-[15px] font-medium flex items-center gap-2">
                    {s.label}
                    {s.soon && (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-text-secondary">
                        Coming
                      </span>
                    )}
                  </div>
                  <div className="text-text-muted text-[12px] sm:text-[13px] truncate">{s.detail}</div>
                </div>
                <RollingNumber
                  value={s.value}
                  suffix={s.suffix}
                  className="font-display font-semibold text-[22px] sm:text-[26px] tracking-[-0.02em] text-white shrink-0"
                />
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full origin-left"
                  style={{
                    background:
                      i % 2 === 0
                        ? "linear-gradient(90deg, var(--brand-electric), var(--brand-electric-hover))"
                        : "linear-gradient(90deg, var(--accent-violet-deep), var(--accent-violet))",
                    width: `${s.bar}%`,
                  }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: inView || reduce ? 1 : 0 }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 pt-5 border-t border-white/10 text-text-secondary text-[13px] sm:text-[14px] leading-[1.5]">
          Paid through Stripe. Your bank receives it once a month, on the 1st, and Unis covers the payout fees.
        </p>
      </div>
    </VisualPanel>
  );
}
