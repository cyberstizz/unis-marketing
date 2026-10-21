"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CSSProperties, ReactNode, useMemo, useRef } from "react";
import { Button } from "./Button";

type LaunchBannerProps = {
  /** Short time-boxed label, e.g. "Opening soon in Harlem". */
  label: string;
  headline: ReactNode;
  body: ReactNode;
  cta: { label: string; href: string };
  /** Optional quiet text link under the button. */
  note?: { label: string; href: string };
};

/**
 * The campaign slot — where Spotify runs its time-boxed "Submit by Nov 6"
 * Wrapped banner, Unis runs the launch. One message, one button.
 *
 * The panel grows to full size as it scrolls into view, and the equalizer
 * skyline along its base is the same motif as the Coming soon page, so the
 * jump from this site into unismusic.com feels like one place.
 */
export function LaunchBanner({ label, headline, body, cta, note }: LaunchBannerProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 28]);

  // Deterministic bar heights so server and client render the same markup.
  const bars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => {
        const wave = Math.sin(i * 0.55) * 0.5 + Math.sin(i * 1.7) * 0.3;
        return {
          h: 30 + Math.round((wave + 0.8) * 34),
          dur: 1.2 + ((i * 37) % 9) / 10,
          delay: ((i * 53) % 13) / -10,
          from: 0.25 + ((i * 17) % 5) / 20,
        };
      }),
    []
  );

  return (
    <section ref={ref} style={{ padding: "clamp(24px, 4vw, 56px) var(--content-px)" }}>
      <motion.div
        className="relative mx-auto overflow-hidden bg-brand-electric will-change-transform"
        style={{
          maxWidth: "var(--max-w)",
          ...(reduce ? { borderRadius: 28 } : { scale, borderRadius: radius }),
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 85% 0%, rgba(139,92,246,0.55) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(22,51,135,0.9) 0%, transparent 60%)",
          }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] items-end p-8 sm:p-12 lg:p-16 pb-40 sm:pb-44 lg:pb-48">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full bg-white/15 px-4 py-2 text-[14px] font-medium text-white mb-8">
              <span aria-hidden className="live-dot inline-block w-2 h-2 rounded-full bg-white text-white" />
              {label}
            </p>
            <h2 className="font-display font-semibold text-white leading-[0.92] tracking-[-0.045em] text-[clamp(40px,6vw,96px)]">
              {headline}
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="text-white/85 text-[clamp(16px,1.3vw,19px)] leading-[1.55] mb-8 max-w-[42ch]">
              {body}
            </p>
            <div className="flex flex-col items-start gap-4">
              <Button as="a" href={cta.href} variant="light" size="lg">
                {cta.label}
              </Button>
              {note && (
                <a href={note.href} className="text-white/80 hover:text-white text-[15px] underline underline-offset-4 decoration-white/40">
                  {note.label}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Equalizer skyline */}
        <div aria-hidden className="absolute left-0 right-0 bottom-0 h-28 sm:h-32 flex items-end gap-[3px] px-2 opacity-90">
          {bars.map((b, i) => (
            <span
              key={i}
              className="eq-bar flex-1 rounded-t-[3px] bg-white/25"
              style={
                {
                  height: `${b.h}%`,
                  "--dur": `${b.dur}s`,
                  "--delay": `${b.delay}s`,
                  "--from": b.from,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
