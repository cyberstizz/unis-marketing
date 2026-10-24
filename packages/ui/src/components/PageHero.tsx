"use client";

import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";
import { SectionEyebrow } from "./SectionEyebrow";

type PageHeroProps = {
  eyebrow: string;
  /** Headline, one entry per line. Each line rises in on its own. */
  lines: ReactNode[];
  body: ReactNode;
  actions?: ReactNode;
  /** Usually a <VideoSlot>, or a coded visual. */
  media: ReactNode;
  /**
   * "portrait": copy on the left, a 4:5 media card on the right.
   * "wide": copy on top, a 16:9 media card below that grows to full size as
   * it scrolls into view.
   */
  mediaShape?: "portrait" | "wide";
};

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The opening section of every sub-page: Spotify's sub-page heroes put a
 * big headline beside (or above) the product in motion. Lines rise in on
 * load; the media card drifts against the scroll.
 */
export function PageHero({ eyebrow, lines, body, actions, media, mediaShape = "portrait" }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const grow = useTransform(enter, [0, 0.6], [0.92, 1]);

  const wide = mediaShape === "wide";

  const copy = (
    <div className={clsx(wide && "max-w-[1100px]")}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
      >
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
      </motion.div>
      <h1 className="font-display font-semibold text-white mt-6 mb-7 leading-[0.92] tracking-[-0.05em] text-[clamp(46px,6.6vw,108px)]">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
            <motion.span
              className="block"
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.05, delay: 0.15 + i * 0.11, ease: EASE }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45 + lines.length * 0.08, ease: EASE }}
        className="text-text-secondary text-[clamp(17px,1.5vw,21px)] leading-[1.55] max-w-[50ch]"
      >
        {body}
      </motion.p>
      {actions && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 + lines.length * 0.08, ease: EASE }}
          className="flex flex-wrap gap-3 mt-9"
        >
          {actions}
        </motion.div>
      )}
    </div>
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(40px, 6vw, 96px) var(--content-px) clamp(64px, 8vw, 128px)",
        background:
          "radial-gradient(ellipse at 15% 20%, rgba(37, 99, 235, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(139, 92, 246, 0.12) 0%, transparent 55%)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        {wide ? (
          <>
            {copy}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
              className="mt-14 lg:mt-20"
            >
              <motion.div
                className="relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9] origin-top"
                style={reduce ? undefined : { scale: grow }}
              >
                {media}
              </motion.div>
            </motion.div>
          </>
        ) : (
          <div className="grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center">
            {copy}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
            >
              <motion.div
                className="relative w-full max-w-[520px] mx-auto aspect-[4/5]"
                style={reduce ? undefined : { y: drift }}
              >
                {media}
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
