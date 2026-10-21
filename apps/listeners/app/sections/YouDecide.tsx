"use client";

import { helpLink, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Module 1: voting. Rules from the help center ("Voting", "Awards",
 * "Phone verification"). The ballot is a preview with made-up songs — the
 * same invented names the Sponsor Harlem page uses in its preview.
 */
export const youDecideModule: ShowcaseItem = {
  id: "you-decide",
  label: "You decide",
  headline: (
    <>
      The charts
      <br />
      listen to you.
    </>
  ),
  body: "No playlist editors. No paid placement. Your neighbors' votes, plays and likes decide who wins, every single day.",
  checklist: [
    {
      title: "Vote where you live",
      text: "In your neighborhood and every place above it, all the way up to Unis.",
      href: helpLink("voting-where"),
    },
    {
      title: "Six award periods",
      text: "Song and Artist of the Day, Week, Month, Quarter, Midterm and Year.",
      href: helpLink("awards"),
    },
    {
      title: "Listening counts too",
      text: "Plays and likes add to a song's total next to votes, so what you play matters.",
      href: helpLink("awards-winner"),
    },
    {
      title: "One person, one vote",
      text: "Voting needs a verified phone number, so every vote comes from a real neighbor.",
      href: helpLink("verification"),
    },
  ],
  cta: { label: "How voting works", href: helpLink("voting") },
  visual: <BallotVisual />,
};

type Entry = { id: string; song: string; artist: string; points: number };

const START: Entry[] = [
  { id: "a", song: "Lenox After Dark", artist: "Kay Monroe", points: 412 },
  { id: "b", song: "Sugar Hill Summer", artist: "Dre Vaughn", points: 396 },
  { id: "c", song: "125th & Late", artist: "Sol Rivers", points: 371 },
  { id: "d", song: "Brownstone Steps", artist: "Nia Lowe", points: 344 },
  { id: "e", song: "Convent Ave", artist: "KT Banks", points: 318 },
];

/** Small, deterministic bumps so the race moves without randomness. */
const BUMPS: [string, number][] = [
  ["b", 24],
  ["c", 10],
  ["a", 18],
  ["d", 40],
  ["c", 30],
  ["e", 12],
  ["a", 26],
];

function BallotVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [entries, setEntries] = useState(START);
  const [moving, setMoving] = useState(false);
  const step = useRef(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => {
      const [target, add] = BUMPS[step.current % BUMPS.length]!;
      step.current += 1;
      setMoving(true);
      setEntries((prev) =>
        prev
          .map((e) => (e.id === target ? { ...e, points: e.points + add } : e))
          .sort((x, y) => y.points - x.points)
      );
    }, 2200);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <VisualPanel preview>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8 pt-14 sm:pt-14">
        <div className="flex items-baseline justify-between gap-3">
          <div className="text-brand-electric text-[13px] font-semibold">Song of the Day</div>
          <div className="text-text-muted text-[12px]">Uptown Harlem, Rap</div>
        </div>
        <div className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] mt-2 mb-6">
          Decided by your neighbors,
          <span className="block text-text-muted">live until midnight.</span>
        </div>

        <ol className="space-y-2.5 mt-auto">
          {entries.map((e, i) => (
            <motion.li
              layout={!reduce}
              key={e.id}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              className={
                "flex items-center gap-3 p-3 rounded-xl border " +
                (i === 0 ? "bg-brand-electric/20 border-brand-electric/50" : "bg-white/[0.03] border-transparent")
              }
            >
              <span
                className={
                  "font-display font-semibold text-[18px] w-6 tabular-nums " +
                  (i === 0 ? "text-brand-electric" : "text-text-muted")
                }
              >
                {i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-white text-[14px] font-medium truncate">{e.song}</span>
                <span className="block text-text-muted text-[12px] truncate">{e.artist}</span>
              </span>
              <span className="text-right">
                <span
                  className={
                    "block font-display font-semibold text-[15px] tabular-nums " +
                    (i === 0 ? "text-brand-electric" : "text-text-secondary")
                  }
                >
                  {e.points.toLocaleString()}
                </span>
                <span className="block text-text-muted text-[10px]">points</span>
              </span>
            </motion.li>
          ))}
        </ol>
        <p className="text-text-muted text-[12px] mt-4">
          Votes, plays and likes, added up.{moving ? " Updating as people listen." : ""}
        </p>
      </div>
    </VisualPanel>
  );
}
