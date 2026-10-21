"use client";

import clsx from "clsx";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type ScrubTextProps = {
  text: string;
  className?: string;
  /** Rendered element. Defaults to a paragraph. */
  as?: "p" | "h2" | "h3";
};

/**
 * A statement that lights up word by word as you scroll through it.
 * Each word goes from dim to full white over its own slice of the scroll, so
 * reading speed and scroll speed line up. Screen readers get the plain text.
 */
export function ScrubText({ text, className, as = "p" }: ScrubTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag ref={ref as never} className={clsx("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} still={!!reduce}>
              {word}
            </Word>
          );
        })}
      </span>
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }}>{children}</motion.span>{" "}
    </>
  );
}
