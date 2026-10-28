"use client";

import { helpLink, VisualPanel } from "@unis/ui";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FeatureSection, SourceMark } from "./FeatureSection";

/**
 * True shuffle. The demo runs the same Fisher–Yates shuffle as the app's
 * player (src/context/playercontext.jsx), one swap at a time, so people can
 * watch it work.
 */
const SONGS = [
  { id: 1, title: "Lenox After Dark", artist: "Kay Monroe" },
  { id: 2, title: "Sugar Hill Summer", artist: "Dre Vaughn" },
  { id: 3, title: "125th & Late", artist: "Sol Rivers" },
  { id: 4, title: "Brownstone Steps", artist: "Nia Lowe" },
  { id: 5, title: "Convent Ave", artist: "KT Banks" },
  { id: 6, title: "Strivers Row", artist: "Jae Ortiz" },
  { id: 7, title: "St. Nick Morning", artist: "Rae Simone" },
  { id: 8, title: "Morningside Run", artist: "Mo Carter" },
];
const ORIGINAL = SONGS.map((s) => s.id);
const STEPS_TOTAL = SONGS.length - 1;
const STEP_MS = 650;

type Step = { i: number; j: number; order: number[] };

export function TrueShuffle() {
  return (
    <FeatureSection
      id="shuffle"
      eyebrow="Shuffle"
      headline="Shuffle that's actually random."
      body={
        <p>
          Unis shuffles with the Fisher&ndash;Yates method, the textbook way to mix a list fairly. Every possible order
          of your queue is equally likely. No artist is favored, and nothing gets added that you didn&rsquo;t pick.
        </p>
      }
      visual={<ShuffleDemo />}
    >
      <h3 className="font-display font-semibold text-white text-[20px] tracking-[-0.02em] mb-4">How it works</h3>
      <ol className="space-y-3 text-text-secondary text-[15px] leading-[1.6] max-w-[56ch]">
        {[
          "Start at the last song in your queue.",
          "Pick any song from the first one up to this one, at random. It can pick itself.",
          "Swap the two. That place is now settled.",
          "Move one place up and repeat, until you reach the first song.",
        ].map((text, i) => (
          <li key={text} className="grid grid-cols-[2rem_minmax(0,1fr)]">
            <span className="font-display font-semibold text-brand-electric-hover tabular-nums">{i + 1}</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-display font-semibold text-text-secondary text-[17px]">On Spotify</p>
          <p className="text-text-muted text-[15px] leading-[1.6] mt-2">
            Spotify used this exact method from its launch. In 2014 it switched to one that spaces out each
            artist&rsquo;s songs, because pure random didn&rsquo;t feel random to people.
            <SourceMark n={7} /> Its Smart Shuffle mixes in recommended songs, and for free listeners on mobile
            it&rsquo;s always on.
            <SourceMark n={8} />
          </p>
        </div>
        <div>
          <p className="font-display font-semibold text-white text-[17px]">On Unis</p>
          <p className="text-white text-[15px] leading-[1.6] mt-2">
            The song playing keeps playing, and everything else is reordered behind it. Turn shuffle off and your
            queue goes back to its order, with your place kept.
          </p>
          <a
            href={helpLink("queue-shuffle")}
            className="inline-block mt-3 text-[14px] font-medium text-brand-electric-hover underline decoration-brand-electric/40 underline-offset-4 hover:text-white"
          >
            Shuffle, in full
          </a>
        </div>
      </div>
    </FeatureSection>
  );
}

function ShuffleDemo() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState<number[]>(ORIGINAL);
  const [step, setStep] = useState<{ k: number; i: number; j: number } | null>(null);
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current) window.clearInterval(timer.current);
  }, []);

  const shuffle = () => {
    if (state === "running") return;
    const arr = [...order];
    const steps: Step[] = [];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
      steps.push({ i, j, order: [...arr] });
    }

    if (reduce) {
      setOrder(arr);
      setStep(null);
      setState("done");
      return;
    }

    setState("running");
    let k = 0;
    const tick = () => {
      const s = steps[k]!;
      setOrder(s.order);
      setStep({ k: k + 1, i: s.i, j: s.j });
      k += 1;
      if (k >= steps.length) {
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
        window.setTimeout(() => {
          setStep(null);
          setState("done");
        }, STEP_MS);
      }
    };
    tick();
    timer.current = window.setInterval(tick, STEP_MS);
  };

  const restore = () => {
    if (state === "running") return;
    setOrder(ORIGINAL);
    setStep(null);
    setState("idle");
  };

  const caption =
    state === "running" && step
      ? step.i === step.j
        ? `Step ${step.k} of ${STEPS_TOTAL}: place ${step.i + 1} picked itself, so it stays.`
        : `Step ${step.k} of ${STEPS_TOTAL}: place ${step.i + 1} swaps with place ${step.j + 1}, picked at random from places 1 to ${step.i + 1}.`
      : state === "done"
        ? "Done. Eight songs can line up 40,320 ways, and this order had the same chance as every other one."
        : "Press Shuffle to watch it work, one swap at a time.";

  // Places at or after the current step's i are settled for good.
  const settledFrom = state === "running" && step ? step.i : state === "done" ? 0 : SONGS.length;

  return (
    <VisualPanel>
      <div className="p-6 sm:p-8">
        <p className="text-brand-electric text-[13px] font-semibold">Your queue</p>
        <p className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] mt-2">
          Eight songs, shuffled fairly
        </p>

        <ol className="grid grid-cols-2 gap-2 mt-6">
          {order.map((id, place) => {
            const song = SONGS.find((s) => s.id === id)!;
            const isI = state === "running" && step?.i === place;
            const isJ = state === "running" && step?.j === place && step.j !== step.i;
            const settled = place >= settledFrom && !isI;
            return (
              <motion.li
                key={id}
                layout={!reduce}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className={clsx(
                  "relative flex items-center gap-3 rounded-xl border p-3 min-w-0",
                  isI
                    ? "border-brand-electric bg-brand-electric/20"
                    : isJ
                      ? "border-accent-violet bg-accent-violet/20"
                      : settled
                        ? "border-brand-electric/25 bg-white/[0.04]"
                        : "border-white/10 bg-white/[0.03]"
                )}
              >
                <span className="font-display font-semibold text-text-muted text-[13px] w-5 tabular-nums" aria-label={`Place ${place + 1}`}>
                  {place + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-white text-[13px] sm:text-[14px] font-medium truncate">{song.title}</span>
                  <span className="block text-text-muted text-[11px] sm:text-[12px] truncate">{song.artist}</span>
                </span>
              </motion.li>
            );
          })}
        </ol>

        <p className="text-text-secondary text-[14px] leading-[1.5] mt-5 min-h-[3em]" aria-live="polite">
          {caption}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            type="button"
            onClick={shuffle}
            disabled={state === "running"}
            className="h-11 px-6 rounded-full bg-brand-electric text-white font-display font-semibold text-[15px] hover:bg-brand-electric-hover disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-electric"
          >
            {state === "done" ? "Shuffle again" : "Shuffle"}
          </button>
          <button
            type="button"
            onClick={restore}
            disabled={state === "running" || state === "idle"}
            className="h-11 px-5 rounded-full border border-white/20 text-white font-display font-semibold text-[15px] hover:border-white/60 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-electric"
          >
            Shuffle off
          </button>
        </div>
        <p className="text-text-subtle text-[12px] mt-4">
          <span className="inline-block h-2 w-2 rounded-full bg-brand-electric align-middle mr-1.5" aria-hidden />
          The place being settled
          <span className="inline-block h-2 w-2 rounded-full bg-accent-violet align-middle ml-4 mr-1.5" aria-hidden />
          The song it picked
        </p>
      </div>
    </VisualPanel>
  );
}
