"use client";

import { Button, PageHero, UNIS_LINKS, VisualPanel } from "@unis/ui";
import { motion, useReducedMotion } from "motion/react";

/**
 * Features hero. The visual is a mixing board: each fader is one call that
 * the music business usually makes for you, and on Unis every one of them is
 * pushed up to the people it belongs to. The faders rise once, right after the
 * headline, and that's the page's only motion that plays on its own.
 */
export function FeaturesHero() {
  return (
    <PageHero
      eyebrow="Every feature"
      lines={["Who decides", <span key="2" className="chrome-text">what you hear?</span>]}
      body="On most apps it's editors, algorithms and award academies. On Unis, every feature hands that call back to the people it belongs to: you, your neighbors and the artist."
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up
          </Button>
          <Button as="a" href="#every-feature" variant="secondary" size="lg">
            See every feature
          </Button>
        </>
      }
      media={<FaderBoard />}
    />
  );
}

const CHANNELS = [
  { what: "Winners", who: "Neighbors' votes" },
  { what: "Shuffle", who: "Pure chance" },
  { what: "Song prices", who: "The artist" },
  { what: "Community playlists", who: "The community" },
  { what: "Your support", who: "Your pick" },
  { what: "Artist inbox", who: "Supporters first" },
];

const EASE = [0.16, 1, 0.3, 1] as const;
const TICKS = Array.from({ length: 11 }, (_, i) => i);

function FaderBoard() {
  const reduce = useReducedMotion();

  return (
    <VisualPanel>
      <div className="h-full flex flex-col p-5 sm:p-7">
        <p className="font-display text-white text-[18px] sm:text-[20px] leading-[1.15] tracking-[-0.02em]">
          Who&rsquo;s on the faders
        </p>
        <p className="text-text-muted text-[13px] leading-[1.45] mt-1 max-w-[34ch]">
          Six calls the music business usually makes for you. On Unis, each one is up.
        </p>

        {/* Tracks, between two guide lines: the people at the top, gatekeepers at the bottom */}
        <div className="relative flex-1 mt-6 min-h-[200px]">
          <div className="absolute inset-x-0 top-0 border-t border-dashed border-brand-electric/50" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 border-t border-dashed border-white/15" aria-hidden />
          <span className="absolute -top-5 right-0 text-[11px] font-medium text-brand-electric-hover">
            Decided by people
          </span>
          <span className="absolute -bottom-5 right-0 text-[11px] font-medium text-text-subtle">Decided for you</span>

          <div className="absolute inset-0 grid grid-cols-6" aria-hidden>
            {CHANNELS.map((c, i) => (
              <div key={c.what} className="relative flex justify-center">
                {/* Tick marks */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-[18px] flex flex-col justify-between">
                  {TICKS.map((t) => (
                    <span key={t} className={t % 5 === 0 ? "block h-px w-2 bg-white/25" : "block h-px w-1 bg-white/10"} />
                  ))}
                </div>
                {/* Track */}
                <div className="relative h-full w-1.5 rounded-full bg-black/40 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                  {/* Level, filling as the fader rises */}
                  <motion.span
                    className="absolute inset-0 rounded-full origin-bottom"
                    style={{ background: "linear-gradient(0deg, var(--brand-electric), var(--accent-violet))" }}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.2, delay: 0.75 + i * 0.12, ease: EASE }}
                  />
                </div>
                {/* Cap travel: the box is the track minus the cap, so 100% down is the bottom line */}
                <motion.div
                  className="absolute inset-x-0 top-0 bottom-[26px] flex justify-center"
                  initial={reduce ? false : { y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 0.75 + i * 0.12, ease: EASE }}
                >
                  <span
                    className="relative block h-[26px] w-8 sm:w-10 rounded-[6px] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.8)]"
                    style={{ background: "linear-gradient(180deg, #ffffff 0%, #e5e7eb 40%, #9ca3af 100%)" }}
                  >
                    <span className="absolute inset-x-1.5 top-1/2 h-[2px] -translate-y-1/2 rounded bg-brand-navy" />
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel labels: what's decided, and who holds it on Unis */}
        <ul className="grid grid-cols-6 gap-1 mt-9">
          {CHANNELS.map((c) => (
            <li key={c.what} className="text-center">
              <span className="block font-display font-semibold text-white text-[11px] sm:text-[13px] leading-[1.15] tracking-tight">
                {c.what}
              </span>
              <span className="block text-brand-electric-hover text-[10px] sm:text-[12px] leading-[1.2] mt-1">{c.who}</span>
            </li>
          ))}
        </ul>
      </div>
    </VisualPanel>
  );
}
