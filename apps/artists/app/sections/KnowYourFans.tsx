"use client";

import { helpLink, RollingNumber, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Module 3 of the showcase: audience — Spotify's "Understand your audience"
 * slot. Everything listed exists in the artist dashboard today
 * (dempgraphicsSection, fanbaseFunnle, TerritoryRankSection, artist
 * broadcasts). The panel's figures are made up and labeled as a preview.
 */
export const knowFansModule: ShowcaseItem = {
  id: "know-your-fans",
  label: "Know your fans",
  headline: (
    <>
      See who&rsquo;s listening,
      <br />
      block by block.
    </>
  ),
  body: "Your dashboard shows where your plays, likes, followers and supporters come from, down to the neighborhood, and who they are.",
  checklist: [
    {
      title: "Where they are",
      text: "Drill from the city down to the neighborhood, for any period from today to all time.",
    },
    {
      title: "Who they are",
      text: "Break your fanbase down by age and gender, from first listen to supporter.",
    },
    {
      title: "Where you rank",
      text: "See your live standing in every place you compete, overall and in your genre.",
      href: helpLink("ranking"),
    },
    {
      title: "Talk to your supporters",
      text: "Send one message to everyone who supports you. Their replies come back to you alone.",
      href: helpLink("messaging-broadcast"),
    },
  ],
  cta: { label: "Explore your dashboard", href: "/dashboard" },
  visual: <DashboardVisual />,
};

const PLACES = [
  { name: "Uptown Harlem", pct: 46 },
  { name: "Downtown Harlem", pct: 27 },
  { name: "Rest of Manhattan", pct: 15 },
  { name: "Everywhere else", pct: 12 },
];

const FUNNEL = [
  { label: "Listeners", value: 1240 },
  { label: "Liked a song", value: 410 },
  { label: "Followers", value: 182 },
  { label: "Supporters", value: 37 },
];

function DashboardVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="rounded-2xl bg-white/[0.05] border border-white/10 p-4 sm:p-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-text-muted text-[12px] sm:text-[13px]">Your rank this week</div>
            <div className="text-white text-[14px] sm:text-[15px] font-medium">Uptown Harlem, Rap</div>
          </div>
          <RollingNumber
            value={3}
            prefix="#"
            from={9}
            className="font-display font-semibold text-brand-electric text-[40px] sm:text-[48px] leading-none tracking-[-0.04em]"
          />
        </div>

        <div className="mt-6">
          <div className="text-text-muted text-[12px] sm:text-[13px] mb-3">Where your plays come from</div>
          <ul className="space-y-2.5">
            {PLACES.map((p, i) => (
              <li key={p.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
                <span className="text-white text-[13px] sm:text-[14px] truncate">{p.name}</span>
                <span className="text-text-secondary text-[13px] tabular-nums">{p.pct}%</span>
                <span className="col-span-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.span
                    className="block h-full rounded-full bg-brand-electric origin-left"
                    style={{ width: `${p.pct * 2}%` }}
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: inView || reduce ? 1 : 0 }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-6">
          <div className="text-text-muted text-[12px] sm:text-[13px] mb-3">From first listen to supporter</div>
          <div className="grid grid-cols-4 gap-2">
            {FUNNEL.map((f, i) => (
              <div
                key={f.label}
                className="rounded-xl border border-white/10 p-2.5 sm:p-3"
                style={{ background: `rgba(37, 99, 235, ${0.06 + i * 0.07})` }}
              >
                <RollingNumber
                  value={f.value}
                  className="block font-display font-semibold text-white text-[17px] sm:text-[20px] tracking-[-0.02em] tabular-nums"
                />
                <div className="text-text-muted text-[11px] leading-tight mt-1">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
