"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";

type HeroStageProps = {
  /** Small status line above the headline, e.g. "Opening soon in Harlem". */
  status?: string;
  /** Headline, one entry per line. Each line rises in on its own. */
  lines: ReactNode[];
  body: ReactNode;
  /** Buttons under the body copy. */
  actions: ReactNode;
  videoSrc: string;
  poster?: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-bleed video hero.
 *
 * On load the headline rises in line by line. As you scroll, the video pulls
 * back into a rounded card (scale + corner radius scrubbed to the scroll
 * position) while the copy drifts up faster than the page and fades — the
 * scroll-tied "camera pull" Spotify-tier sites use for their opening shot.
 */
export function HeroStage({ status, lines, body, actions, videoSrc, poster }: HeroStageProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [0, 36]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} className="relative w-full h-[100svh] min-h-[640px]">
      {/* Video card */}
      <motion.div
        className="absolute inset-0 overflow-hidden bg-bg-surface will-change-transform"
        style={reduce ? undefined : { scale, borderRadius: radius, transformOrigin: "50% 0%" }}
      >
        <motion.video
          className="absolute left-0 top-[-8%] w-full h-[116%] object-cover"
          style={reduce ? undefined : { y: videoY }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          aria-hidden
        >
          <source src={videoSrc} type="video/mp4" />
        </motion.video>
        {/* Scrim keeps the copy legible over any frame */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,14,26,0.45) 0%, rgba(10,14,26,0) 28%, rgba(10,14,26,0.35) 62%, rgba(10,14,26,0.96) 100%)",
          }}
        />
      </motion.div>

      {/* Copy */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end mx-auto"
        style={{
          maxWidth: "var(--max-w)",
          padding: "calc(var(--nav-h) + 24px) var(--content-px) clamp(48px, 9vh, 112px)",
          ...(reduce ? {} : { y: copyY, opacity: copyOpacity }),
        }}
      >
        {status && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 bg-bg-deep/40 backdrop-blur-md px-4 py-2 text-[14px] text-text-secondary mb-7"
          >
            <span aria-hidden className="live-dot inline-block w-2 h-2 rounded-full bg-brand-electric text-brand-electric" />
            {status}
          </motion.p>
        )}

        <h1 className="font-display font-semibold text-white leading-[0.9] tracking-[-0.05em] text-[clamp(52px,9vw,148px)] mb-7">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 + lines.length * 0.08, ease: EASE }}
          className="text-text-secondary text-[clamp(17px,1.5vw,21px)] leading-[1.5] max-w-[46ch] mb-9"
        >
          {body}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 + lines.length * 0.08, ease: EASE }}
          className="flex gap-3 flex-wrap"
        >
          {actions}
        </motion.div>
      </motion.div>
    </section>
  );
}
