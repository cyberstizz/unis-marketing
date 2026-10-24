"use client";

import { helpLink, RollingNumber, ShowcaseModules, UNIS_LINKS, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * How you get heard on Unis, as four pinned modules. Every rule here is from
 * the help center: awards ("awards-winner", "awards-worth"), sounds
 * ("sounds-find"), supporters and referrals ("supporter-artist-side",
 * "referrals-levels"), broadcasts ("messaging-broadcast"). Panel figures are
 * made up and labeled as a preview.
 */
const ITEMS: ShowcaseItem[] = [
  {
    id: "how-a-song-climbs",
    label: "How a song climbs",
    headline: (
      <>
        Every play is a point.
        <br />
        Every vote is ten or more.
      </>
    ),
    body: "Awards are decided on one number. A play adds 1, a like adds 5, and a vote adds between 10 and 250 depending on the race. The highest total when the period closes wins.",
    checklist: [
      {
        title: "Six races, six clocks",
        text: "Daily, weekly, monthly, quarterly, midterm and annual, each decided on its own.",
        href: helpLink("awards"),
      },
      {
        title: "Listening counts",
        text: "A neighborhood that's really playing you can carry you to a win without a single vote.",
        href: helpLink("awards-winner"),
      },
      {
        title: "Ties settled in the open",
        text: "Every award records which step decided it, and whether votes or listening made up most of the total.",
        href: helpLink("awards-winner"),
      },
    ],
    cta: { label: "See every place you can win", href: "/jurisdictions" },
    visual: <PointsVisual />,
  },
  {
    id: "local-first",
    label: "Local first",
    headline: (
      <>
        Your neighbors
        <br />
        hear you first.
      </>
    ),
    body: "When a listener opens a song, the recommended row looks for the same sound from the same neighborhood before anywhere else. Sound shelves put local songs on top too.",
    checklist: [
      {
        title: "Recommended next",
        text: "Same subgenre and same neighborhood first, with one spot kept for another song of yours.",
        href: helpLink("sounds-find"),
      },
      {
        title: "Sound shelves",
        text: "Tap a tag like Drill or Afrobeats and songs from the listener's own area come first.",
        href: helpLink("sounds-find"),
      },
      {
        title: "Neighborhood pages",
        text: "Every place has its own page: its song of the week, its leading artists and every past winner.",
        href: helpLink("jurisdiction-page"),
      },
    ],
    visual: <LocalFirstVisual />,
  },
  {
    id: "bring-your-people",
    label: "Bring your people",
    headline: (
      <>
        Your fans are your
        <br />
        marketing budget.
      </>
    ),
    body: "Share your link. Everyone who joins and picks you as their artist adds to your monthly share, and every vote they cast counts in your races.",
    checklist: [
      {
        title: "Supporters",
        text: "15% of each supporter's monthly Community Share slice is yours, from everything they play.",
        href: helpLink("supporter-artist-side"),
      },
      {
        title: "Referrals, three deep",
        text: "10%, 5% and 2% of the monthly share of the people your link brings in, and the people they bring.",
        href: helpLink("referrals-levels"),
      },
      {
        title: "One message to all of them",
        text: "Tell every supporter about a new song at once. Replies come back to you alone.",
        href: helpLink("messaging-broadcast"),
      },
    ],
    cta: { label: "See how it pays", href: "/revenue" },
    visual: <BringVisual />,
  },
  {
    id: "a-win-that-stays",
    label: "A win that stays",
    headline: (
      <>
        Playlist spots rotate out.
        <br />
        Wins don&rsquo;t.
      </>
    ),
    body: "Every Song and Artist of the Day, Week, Month and beyond goes on your profile and on the neighborhood's permanent record.",
    checklist: [
      {
        title: "On your profile",
        text: "Every win shows on your page for good.",
        href: helpLink("awards-worth"),
      },
      {
        title: "On the neighborhood's record",
        text: "Each place keeps every past winner, back to its first day on Unis.",
        href: helpLink("jurisdiction-page"),
      },
      {
        title: "Points that never expire",
        text: "A win adds 50 points for a day up to 5,000 for a year, and they count toward your level for good.",
        href: helpLink("awards-worth"),
      },
    ],
    cta: { label: "Sign up as an artist", href: UNIS_LINKS.signup },
    visual: <RecordVisual />,
  },
];

export function GetHeardModules() {
  return (
    <ShowcaseModules
      intro={{
        eyebrow: "How you get heard",
        headline: (
          <>
            Four ways up.
            <br />
            None of them for sale.
          </>
        ),
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

const TALLY = [
  { label: "Plays", count: 1284, each: 1 },
  { label: "Likes", count: 96, each: 5 },
  { label: "Weekly votes", count: 41, each: 20 },
];

const BOARD = [
  { name: "You", pts: 2584, you: true },
  { name: "Artist B", pts: 2210 },
  { name: "Artist C", pts: 1675 },
];

function PointsVisual() {
  const { ref, show, reduce } = useReveal();
  const total = TALLY.reduce((sum, t) => sum + t.count * t.each, 0);
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="text-text-muted text-[13px]">Artist of the Week &middot; Uptown Harlem &middot; Rap</div>
        <div className="mt-4 space-y-2.5">
          {TALLY.map((t, i) => (
            <motion.div
              key={t.label}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={show ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
              className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3"
            >
              <span className="text-white text-[14px] sm:text-[15px]">{t.label}</span>
              <span className="text-text-muted text-[13px] tabular-nums">
                {t.count.toLocaleString("en-US")} &times; {t.each}
              </span>
              <span className="text-white font-semibold text-[15px] tabular-nums w-[64px] text-right">
                {(t.count * t.each).toLocaleString("en-US")}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-baseline justify-between rounded-xl px-4 py-3" style={{ background: "rgba(37,99,235,0.18)" }}>
          <span className="text-white text-[15px]">Total points</span>
          <RollingNumber
            value={total}
            className="font-display font-semibold text-white text-[32px] tracking-[-0.03em] tabular-nums"
          />
        </div>
        <div className="mt-auto pt-6">
          <div className="text-text-muted text-[13px] mb-3">Standings right now</div>
          <ol className="space-y-2">
            {BOARD.map((b, i) => (
              <li key={b.name} className="grid grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3">
                <span className="text-text-muted text-[13px] tabular-nums">#{i + 1}</span>
                <span className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.span
                    className="block h-full rounded-full origin-left"
                    style={{ width: `${(b.pts / BOARD[0]!.pts) * 100}%`, background: b.you ? "var(--brand-electric)" : "rgba(255,255,255,0.35)" }}
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: show ? 1 : 0 }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: EASE }}
                  />
                </span>
                <span className={b.you ? "text-white text-[13px] font-semibold" : "text-text-secondary text-[13px]"}>{b.name}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </VisualPanel>
  );
}

const UP_NEXT = [
  { title: "Same sound, your block", place: "Uptown Harlem", local: true },
  { title: "Same sound, next door", place: "Downtown Harlem", local: true },
  { title: "Another song by this artist", place: "Uptown Harlem", local: true },
  { title: "Same sound, further out", place: "Manhattan", local: false },
];

const SOUNDS = ["Drill", "Conscious", "Afrobeats", "R&B / Soul", "Punk / Emo"];

function LocalFirstVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="text-text-muted text-[13px]">On a song page in Uptown Harlem</div>
        <div className="mt-1 font-display font-semibold text-white text-[22px] tracking-[-0.02em]">Recommended</div>
        <ul className="mt-4 space-y-2.5">
          {UP_NEXT.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
              className="flex items-center gap-3 rounded-xl bg-white/[0.05] border border-white/10 p-3"
            >
              <span
                aria-hidden
                className="h-11 w-11 shrink-0 rounded-lg"
                style={{
                  background: s.local
                    ? `linear-gradient(135deg, #2563eb, ${i % 2 ? "#7c3aed" : "#0ea5e9"})`
                    : "linear-gradient(135deg, #374151, #1f2937)",
                }}
              />
              <span className="min-w-0 flex-1">
                <span className="block text-white text-[14px] truncate">{s.title}</span>
                <span className="block text-text-muted text-[12px]">{s.place}</span>
              </span>
              {s.local && (
                <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: "rgba(37,99,235,0.35)" }}>
                  Local
                </span>
              )}
            </motion.li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <div className="text-text-muted text-[13px] mb-3">Browse by sound</div>
          <div className="flex flex-wrap gap-2">
            {SOUNDS.map((s) => (
              <span key={s} className="rounded-full border border-white/15 px-3 py-1.5 text-[13px] text-text-secondary">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}

function BringVisual() {
  const { ref, show, reduce } = useReveal();
  const rows = [1, 3, 6];
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-text-muted text-[12px]">Your invite link</div>
            <div className="text-white text-[14px] sm:text-[15px] font-medium truncate">unismusic.com &middot; your code</div>
          </div>
          <span className="rounded-full bg-white text-brand-navy text-[13px] font-semibold px-4 py-2">Copy</span>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-4 py-6" aria-hidden>
          {rows.map((count, level) => (
            <div key={level} className="flex justify-center gap-2 sm:gap-3">
              {Array.from({ length: count }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                  animate={show ? { opacity: 1, scale: 1 } : undefined}
                  transition={{ duration: 0.5, delay: 0.15 + level * 0.25 + i * 0.05, ease: EASE }}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border-2 border-bg-deep"
                  style={{
                    background:
                      level === 0
                        ? "var(--brand-electric)"
                        : ["#7c3aed", "#0f766e", "#b45309", "#be185d", "#0284c7", "#4d7c0f"][(i + level) % 6],
                  }}
                />
              ))}
            </div>
          ))}
          <div className="grid grid-cols-3 gap-2 text-center text-[12px] text-text-muted">
            <span>You</span>
            <span>Your people</span>
            <span>Their people</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(37,99,235,0.14)" }}>
            <RollingNumber value={46} className="block font-display font-semibold text-white text-[26px] tabular-nums" />
            <div className="text-text-muted text-[12px]">supporters</div>
          </div>
          <div className="rounded-xl border border-white/10 p-3" style={{ background: "rgba(37,99,235,0.22)" }}>
            <RollingNumber value={9} className="block font-display font-semibold text-white text-[26px] tabular-nums" />
            <div className="text-text-muted text-[12px]">people you invited</div>
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}

const WINS = [
  { when: "Oct 12", what: "Artist of the Week", who: "Uptown Harlem" },
  { when: "Sep 30", what: "Song of the Day", who: "Harlem" },
  { when: "Sep 18", what: "Artist of the Day", who: "Uptown Harlem" },
  { when: "Sep 02", what: "Song of the Day", who: "Uptown Harlem" },
];

function RecordVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="text-text-muted text-[13px]">Your trophy case</div>
        <div className="mt-1 font-display font-semibold text-white text-[22px] tracking-[-0.02em]">On the record, for good</div>
        <ol className="relative mt-6 space-y-4 pl-6">
          <span aria-hidden className="absolute left-[7px] top-1 bottom-1 w-px bg-white/15" />
          {WINS.map((w, i) => (
            <motion.li
              key={`${w.when}-${w.what}`}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              animate={show ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: EASE }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-6 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-bg-deep"
                style={{ background: i === 0 ? "#f59e0b" : "rgba(245,158,11,0.55)" }}
              />
              <div className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white text-[15px] font-medium">{w.what}</span>
                  <span className="text-text-muted text-[12px] tabular-nums">{w.when}</span>
                </div>
                <div className="text-text-secondary text-[13px]">{w.who}</div>
              </div>
            </motion.li>
          ))}
        </ol>
        <div className="mt-auto pt-6 text-[13px] text-text-muted">Every win also stays on its neighborhood&rsquo;s page.</div>
      </div>
    </VisualPanel>
  );
}
