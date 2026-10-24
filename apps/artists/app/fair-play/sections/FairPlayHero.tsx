"use client";

import { Button, PageHero, UNIS_LINKS, VideoSlot, VisualPanel } from "@unis/ui";
import { motion, useReducedMotion } from "motion/react";

/**
 * Fair play — hero. Video slot A4 (apps/artists/public/videos/fair-play.mp4).
 * Until that file exists, the coded crowd below plays instead: a field of
 * grey placeholder accounts fades out and a few verified people stay lit.
 */
export function FairPlayHero() {
  return (
    <PageHero
      eyebrow="Fair play"
      lines={[
        "Real people.",
        "Real plays.",
        <span key="win" className="chrome-text">
          Real winners.
        </span>,
      ]}
      body="Everything that decides a winner or a payout on Unis assumes one account is one person. Here is how that's kept true, rule by rule, in plain words."
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up as an artist
          </Button>
          <Button as="a" href={UNIS_LINKS.report} variant="secondary" size="lg">
            Report a problem
          </Button>
        </>
      }
      media={<VideoSlot src="/videos/fair-play.mp4" fallback={<Crowd />} />}
    />
  );
}

const COLS = 9;
const ROWS = 11;
/** The few that are real, verified people. Everyone else fades out. */
const REAL = new Set([12, 30, 41, 58, 67, 83]);

function Crowd() {
  const reduce = useReducedMotion();
  return (
    <VisualPanel>
      <div className="relative h-full flex flex-col p-6 sm:p-8">
        <div
          className="grid flex-1 gap-2 sm:gap-2.5 place-items-center"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          aria-hidden
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => {
            const real = REAL.has(i);
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            return (
              <motion.span
                key={i}
                className="relative block aspect-square w-full max-w-[30px] rounded-full"
                style={{
                  background: real
                    ? "radial-gradient(circle at 35% 30%, #fde68a, #f59e0b 60%, #b45309 100%)"
                    : "rgba(156,163,175,0.55)",
                  boxShadow: real ? "0 0 22px rgba(245,158,11,0.6)" : undefined,
                }}
                initial={false}
                animate={
                  reduce
                    ? { opacity: real ? 1 : 0.18 }
                    : real
                      ? { opacity: 1, scale: [1, 1.12, 1] }
                      : { opacity: [0.7, 0.12] }
                }
                transition={
                  real
                    ? { duration: 2.4, delay: 1.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
                    : { duration: 1.6, delay: 0.4 + (Math.abs(col - 4) + Math.abs(row - 5)) * 0.07, ease: "easeOut" }
                }
              />
            );
          })}
        </div>
        <div className="relative mt-6 rounded-2xl border border-white/10 bg-bg-deep/70 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4">
          <div className="text-[13px] text-text-muted">Counted in tonight&rsquo;s vote</div>
          <div className="mt-1 font-display font-semibold text-white text-[18px] sm:text-[20px] tracking-[-0.02em]">
            6 verified people. 6 votes.
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
