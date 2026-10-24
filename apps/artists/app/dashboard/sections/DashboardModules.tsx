"use client";

import { helpLink, RollingNumber, ShowcaseModules, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";

/**
 * The artist dashboard, section by section. Everything listed exists in the
 * Unis web app today (unis-sample: SupporterSection, fanbaseFunnle,
 * dempgraphicsSection, SongStatsModal, SongSalesModal, revenueSection,
 * TerritoryRankSection). Panel figures are made up and labeled as a preview.
 */
const ITEMS: ShowcaseItem[] = [
  {
    id: "supporters",
    label: "Supporters",
    headline: (
      <>
        The people paying you
        <br />
        have names.
      </>
    ),
    body: "Every listener on Unis picks one artist to support. Your dashboard lists yours: your top supporter, your newest ones, and how many joined lately.",
    checklist: [
      {
        title: "Message all of them at once",
        text: "One message reaches every supporter as a normal conversation. Replies come back to you alone.",
        href: helpLink("messaging-broadcast"),
      },
      {
        title: "They skip the requests folder",
        text: "A supporter's message lands straight in your inbox. You can turn that off.",
        href: helpLink("messaging-artists"),
      },
      {
        title: "Each one pays you monthly",
        text: "15% of each supporter's slice of the Community Share is yours, for as long as they stay.",
        href: helpLink("supporter-artist-side"),
      },
    ],
    visual: <SupportersVisual />,
  },
  {
    id: "fan-funnel",
    label: "Fan funnel",
    headline: (
      <>
        From first play
        <br />
        to supporter.
      </>
    ),
    body: "Watch listeners move from a first play to a like, a follow and finally support. Pick today, this week, this month, this year or all time, and see the change since the last period.",
    checklist: [
      { title: "Filter by who", text: "Narrow any period to an age group or gender." },
      { title: "Filter by where", text: "Narrow it to the neighborhood your listeners are in." },
      { title: "Finished plays", text: "See how many plays made it to the end of the song." },
    ],
    visual: <FunnelVisual />,
  },
  {
    id: "block-by-block",
    label: "Block by block",
    headline: (
      <>
        Your city,
        <br />
        one neighborhood at a time.
      </>
    ),
    body: "Plays, listeners, likes, followers and supporters by place, from the whole country down to your part of Harlem.",
    checklist: [
      { title: "Top places for any measure", text: "Switch between plays, listeners, likes, followers and supporters." },
      {
        title: "Where plays came from",
        text: "The feed, search, neighborhood pages, shared links, playlists or your own page.",
      },
      { title: "Where a show would fill", text: "Your strongest neighborhoods are the ones to play in next." },
    ],
    visual: <PlacesVisual />,
  },
  {
    id: "every-song",
    label: "Every song",
    headline: (
      <>
        Every song,
        <br />
        every dollar.
      </>
    ),
    body: "Open any song for its own fan funnel and its sales: how many sold, what you kept, and the running total. Your earnings and payouts sit on the same screen.",
    checklist: [
      { title: "Per-song funnel", text: "The same play-to-supporter steps, for one song." },
      {
        title: "Per-song sales",
        text: "Copies sold and what you kept after the fee, with a running total.",
        href: helpLink("payouts-sales-fee"),
      },
      {
        title: "Money in the same place",
        text: "Sales, support, your monthly share and payouts in one dashboard. On Spotify, money arrives through your distributor.",
      },
    ],
    cta: { label: "See how the money works", href: "/revenue" },
    visual: <SongMoneyVisual />,
  },
  {
    id: "your-race",
    label: "Your race",
    headline: (
      <>
        Know where you stand,
        <br />
        every day.
      </>
    ),
    body: "Your live rank in every place you belong, overall and in your genre, plus every win in your trophy case.",
    checklist: [
      { title: "Every place you belong", text: "From your part of Harlem up to all of Unis.", href: helpLink("ranking") },
      { title: "Two ranks in each", text: "Against every artist there, and against your genre only.", href: helpLink("ranking-what") },
      { title: "Trophy case", text: "Every artist and song award you've won, with the date and place.", href: helpLink("awards-worth") },
    ],
    cta: { label: "See every place you can win", href: "/jurisdictions" },
    visual: <RaceVisual />,
  },
];

export function DashboardModules() {
  return (
    <ShowcaseModules
      intro={{
        eyebrow: "Inside your dashboard",
        headline: (
          <>
            Everything Spotify shows you.
            <br />
            Plus the people.
          </>
        ),
        body: "Five parts of the Unis artist dashboard, included with every artist account.",
      }}
      items={ITEMS}
    />
  );
}

/* ───────────────────────── Visuals ───────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  return { ref, show: inView || !!reduce, reduce: !!reduce };
}

const SUPPORTERS = [
  { name: "Tasha", note: "Top supporter · since June", color: "#7c3aed" },
  { name: "Malik", note: "New this week", color: "#0f766e" },
  { name: "Dre", note: "New this week", color: "#b45309" },
  { name: "Kim", note: "New this week", color: "#be185d" },
];

function SupportersVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-text-muted text-[13px]">Your supporters</div>
            <RollingNumber
              value={46}
              className="font-display font-semibold text-white text-[44px] leading-none tracking-[-0.04em] tabular-nums"
            />
          </div>
          <span className="rounded-full px-3 py-1 text-[12px] font-semibold text-emerald-300 bg-emerald-400/10">+4 this week</span>
        </div>
        <ul className="mt-5 space-y-2">
          {SUPPORTERS.map((s, i) => (
            <motion.li
              key={s.name}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.09, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3"
            >
              <span
                aria-hidden
                className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-semibold text-white"
                style={{ background: s.color }}
              >
                {s.name[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-white text-[14px] font-medium">{s.name}</span>
                <span className="block text-text-muted text-[12px]">{s.note}</span>
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          className="mt-auto pt-5"
        >
          <div className="rounded-2xl rounded-br-md bg-brand-electric px-4 py-3 text-white text-[14px] ml-8">
            New song Friday. You&rsquo;re hearing it first.
          </div>
          <div className="mt-2 text-right text-text-muted text-[12px]">Sent to all 46 supporters</div>
        </motion.div>
      </div>
    </VisualPanel>
  );
}

const PERIODS = [
  { id: "week", label: "Week", values: [1284, 312, 96, 31, 4] },
  { id: "month", label: "Month", values: [4920, 811, 240, 77, 13] },
  { id: "year", label: "Year", values: [18300, 1960, 610, 128, 46] },
] as const;

const STEPS = ["Plays", "Listeners", "Likes", "Followers", "Supporters"];

function FunnelVisual() {
  const [period, setPeriod] = useState(0);
  const { ref, show, reduce } = useReveal();
  const current = PERIODS[period]!;
  const top = current.values[0];
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div role="group" aria-label="Period" className="flex gap-1 self-start rounded-full bg-white/[0.06] p-1">
          {PERIODS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(i)}
              aria-pressed={i === period}
              className={
                i === period
                  ? "rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-bg-deep"
                  : "rounded-full px-4 py-1.5 text-[13px] text-text-secondary hover:text-white"
              }
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="mt-6 flex-1 flex flex-col justify-center gap-3">
          {STEPS.map((step, i) => {
            const value = current.values[i]!;
            const pct = Math.max(4, (value / top) * 100);
            return (
              <div key={step} className="grid grid-cols-[88px_minmax(0,1fr)_64px] items-center gap-3">
                <span className="text-text-secondary text-[13px]">{step}</span>
                <span className="h-7 rounded-lg bg-white/[0.06] overflow-hidden">
                  <motion.span
                    className="block h-full rounded-lg"
                    style={{ background: i === 4 ? "var(--brand-electric)" : "rgba(147,180,255,0.5)" }}
                    initial={reduce ? false : { width: "0%" }}
                    animate={{ width: show ? `${pct}%` : "0%" }}
                    transition={{ duration: 0.8, delay: show ? i * 0.06 : 0, ease: EASE }}
                  />
                </span>
                <span className="text-right text-white text-[14px] font-semibold tabular-nums">
                  {value.toLocaleString("en-US")}
                </span>
              </div>
            );
          })}
        </div>
        <div className="pt-4 text-text-muted text-[12px]">Try the switch above. The real one also does today and all time.</div>
      </div>
    </VisualPanel>
  );
}

const PLACES = [
  { name: "Uptown Harlem", pct: 54 },
  { name: "Downtown Harlem", pct: 21 },
  { name: "Rest of Manhattan", pct: 15 },
  { name: "Everywhere else", pct: 10 },
];

const SOURCES = [
  { name: "Feed", pct: 38 },
  { name: "Neighborhood pages", pct: 22 },
  { name: "Search", pct: 14 },
  { name: "Shared links", pct: 12 },
];

function Bars({ rows, show, reduce, scale }: { rows: { name: string; pct: number }[]; show: boolean; reduce: boolean; scale: number }) {
  return (
    <ul className="space-y-2.5">
      {rows.map((r, i) => (
        <li key={r.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
          <span className="text-white text-[13px] sm:text-[14px] truncate">{r.name}</span>
          <span className="text-text-secondary text-[13px] tabular-nums">{r.pct}%</span>
          <span className="col-span-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.span
              className="block h-full rounded-full bg-brand-electric origin-left"
              style={{ width: `${Math.min(100, r.pct * scale)}%` }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={{ scaleX: show ? 1 : 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: EASE }}
            />
          </span>
        </li>
      ))}
    </ul>
  );
}

function PlacesVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="text-text-muted text-[13px] mb-3">Listeners this month, by neighborhood</div>
        <Bars rows={PLACES} show={show} reduce={reduce} scale={1.8} />
        <div className="mt-auto pt-6">
          <div className="text-text-muted text-[13px] mb-3">Where plays came from</div>
          <Bars rows={SOURCES} show={show} reduce={reduce} scale={2.4} />
        </div>
      </div>
    </VisualPanel>
  );
}

/** Running total of what the artist kept, one point per week. */
const RUNNING = [0, 1.8, 3.0, 5.4, 6.6, 9.0, 11.4, 14.4];

function SongMoneyVisual() {
  const { ref, show, reduce } = useReveal();
  const w = 300;
  const h = 120;
  const max = RUNNING[RUNNING.length - 1]!;
  const path = RUNNING.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (RUNNING.length - 1)) * w} ${h - (v / max) * (h - 8) - 4}`).join(" ");
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="h-16 w-16 shrink-0 rounded-xl"
            style={{ background: "radial-gradient(circle at 30% 30%, #fbbf24, #c2410c 45%, #3b1a5a 100%)" }}
          />
          <div>
            <div className="text-white text-[18px] font-semibold">Lenox at Night</div>
            <div className="text-text-muted text-[13px]">Sold at $0.94 &middot; you keep $0.60 each</div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <RollingNumber value={24} className="block font-display font-semibold text-white text-[26px] tabular-nums" />
            <div className="text-text-muted text-[12px]">copies sold</div>
          </div>
          <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(37,99,235,0.16)" }}>
            <RollingNumber
              value={14.4}
              format={{ style: "currency", currency: "USD" }}
              className="block font-display font-semibold text-white text-[26px] tabular-nums"
            />
            <div className="text-text-muted text-[12px]">you kept</div>
          </div>
        </div>
        <div className="mt-auto pt-6">
          <div className="text-text-muted text-[13px] mb-2">Running total, last 8 weeks</div>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" role="img" aria-label="Running total rising from $0 to $14.40 over eight weeks">
            <motion.path
              d={path}
              fill="none"
              stroke="var(--brand-electric-hover)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={{ duration: 1.4, ease: EASE }}
            />
          </svg>
        </div>
      </div>
    </VisualPanel>
  );
}

const LADDER = [
  { place: "Uptown Harlem", rank: 3 },
  { place: "Harlem", rank: 8 },
  { place: "Upper Manhattan", rank: 21 },
  { place: "Manhattan", rank: 64 },
  { place: "New York City", rank: 210 },
  { place: "New York", rank: 341 },
  { place: "Unis", rank: 1402 },
];

function RaceVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="text-text-muted text-[13px]">Artist rank today &middot; Rap</div>
        <ol className="mt-4 space-y-2">
          {LADDER.map((l, i) => (
            <motion.li
              key={l.place}
              initial={reduce ? false : { opacity: 0, x: 18 }}
              animate={show ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.07, ease: EASE }}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5"
            >
              <span className="text-white text-[14px]">{l.place}</span>
              <span className="font-display font-semibold text-white text-[18px] tabular-nums">
                #{l.rank.toLocaleString("en-US")}
              </span>
            </motion.li>
          ))}
        </ol>
        <div className="mt-auto pt-5 flex items-center gap-3 rounded-xl px-4 py-3 text-[14px]" style={{ background: "rgba(245,158,11,0.12)", color: "#fcd34d" }}>
          <span aria-hidden>&#9733;</span>
          Latest win: Artist of the Week, Uptown Harlem
        </div>
      </div>
    </VisualPanel>
  );
}
