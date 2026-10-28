"use client";

import { helpLink, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Module 4: referrals. Listeners never earn from their own listening; they
 * earn 10/5/2% of the monthly share of the people they bring in, three steps
 * deep (help center: "Referrals", "Earnings and payouts").
 */
export const bringModule: ShowcaseItem = {
  id: "bring-your-people",
  label: "Bring your people",
  headline: (
    <>
      Bring people in.
      <br />
      Get paid when they listen.
    </>
  ),
  body: "You never earn from your own listening. You earn from the people you invite, the people they invite, and one step further.",
  checklist: [
    {
      title: "Three levels",
      text: "10%, 5% and 2% of their monthly share, for as long as they keep listening.*",
      href: helpLink("referrals-levels"),
    },
    {
      title: "A code that never expires",
      text: "It's made when you sign up, and there's no cap on how many people can use it.",
      href: helpLink("referrals-code"),
    },
    {
      title: "Cash out at $50",
      text: "Withdraw through Stripe. Your bank is paid once a month, on the 1st.",
      href: helpLink("payouts-getting-paid"),
    },
    {
      title: "Verify your phone",
      text: "Add a verified number so your share can reach you.",
      href: helpLink("referrals-when"),
    },
  ],
  cta: { label: "How referrals work", href: helpLink("referrals") },
  note: "*The people you invite need a verified phone number for their listening to count toward your share.",
  visual: <ReferralTreeVisual />,
};

const LEVELS = [
  { y: 230, xs: [140, 280, 420], r: 26, pct: "10%", label: "Who you invite", fill: "#3b82f6" },
  { y: 350, xs: [80, 180, 250, 330, 400, 490], r: 20, pct: "5%", label: "Who they invite", fill: "#6d28d9" },
  { y: 460, xs: [60, 150, 230, 320, 410, 500], r: 15, pct: "2%", label: "One step further", fill: "#8b5cf6" },
];

function ReferralTreeVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const show = inView || !!reduce;

  // Connectors: each node links to the nearest node on the level above.
  const lines: { x1: number; y1: number; x2: number; y2: number; d: number }[] = [];
  const top = { x: 280, y: 90 };
  LEVELS[0]!.xs.forEach((x) => lines.push({ x1: top.x, y1: top.y, x2: x, y2: LEVELS[0]!.y, d: 0 }));
  [1, 2].forEach((li) => {
    const above = LEVELS[li - 1]!;
    const level = LEVELS[li]!;
    level.xs.forEach((x) => {
      const parent = above.xs.reduce((best, px) => (Math.abs(px - x) < Math.abs(best - x) ? px : best), above.xs[0]!);
      lines.push({ x1: parent, y1: above.y, x2: x, y2: level.y, d: li });
    });
  });

  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col">
        <svg viewBox="0 0 560 540" className="w-full flex-1" role="img" aria-label="You at the top. People you invite pay you 10% of their monthly share, the people they invite 5%, and one step further 2%.">
          {lines.map((l, i) => (
            <motion.line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#2563eb"
              strokeWidth="1.2"
              strokeOpacity="0.5"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 0.2 + l.d * 0.35 }}
            />
          ))}

          <g>
            <circle cx={top.x} cy={top.y} r="36" fill="#2563eb" />
            <text x={top.x} y={top.y + 5} textAnchor="middle" fontSize="15" fontWeight="600" fill="white" style={{ fontFamily: "var(--font-display)" }}>
              You
            </text>
          </g>

          {LEVELS.map((level, li) => (
            <g key={level.pct}>
              {level.xs.map((x, i) => (
                <motion.g
                  key={x}
                  initial={reduce ? false : { scale: 0, opacity: 0 }}
                  animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.45, delay: reduce ? 0 : 0.35 + li * 0.35 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${x}px ${level.y}px` }}
                >
                  <circle cx={x} cy={level.y} r={level.r} fill={level.fill} opacity="0.92" />
                  <text
                    x={x}
                    y={level.y + level.r * 0.18}
                    textAnchor="middle"
                    fontSize={level.r * 0.52}
                    fontWeight="700"
                    fill="white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {level.pct}
                  </text>
                </motion.g>
              ))}
            </g>
          ))}
        </svg>

        <div className="grid grid-cols-3 gap-2 px-6 sm:px-8 pb-6 sm:pb-8 -mt-2">
          {LEVELS.map((level) => (
            <div key={level.pct} className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <div className="font-display font-semibold text-white text-[20px] tracking-[-0.02em]">{level.pct}</div>
              <div className="text-text-muted text-[11px] leading-tight mt-1">{level.label}</div>
            </div>
          ))}
        </div>
      </div>
    </VisualPanel>
  );
}
