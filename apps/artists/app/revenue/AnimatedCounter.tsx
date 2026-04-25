"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

type AnimatedCounterProps = {
  /** Target numeric value. */
  value: number;
  /** Number of decimal places to display. Default 2. */
  decimals?: number;
  /** Optional $ prefix. Default true. */
  prefix?: string;
  /** className forwarded to the span. */
  className?: string;
  /** Apply locale formatting with thousands separator. Default true. */
  withCommas?: boolean;
};

/**
 * Smoothly animates a numeric value via a Motion spring. Mounts at the current
 * target, then any future change tweens.
 */
export function AnimatedCounter({
  value,
  decimals = 2,
  prefix = "$",
  className,
  withCommas = true,
}: AnimatedCounterProps) {
  const motionVal = useMotionValue(value);
  const rendered = useTransform(motionVal, (latest) => {
    const fixed = latest.toFixed(decimals);
    if (!withCommas) return `${prefix}${fixed}`;
    const [whole, decPart] = fixed.split(".");
    const wholeWithCommas = Number(whole).toLocaleString("en-US");
    return decPart !== undefined
      ? `${prefix}${wholeWithCommas}.${decPart}`
      : `${prefix}${wholeWithCommas}`;
  });

  useEffect(() => {
    const controls = animate(motionVal, value, {
      duration: 0.55,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return controls.stop;
  }, [value, motionVal]);

  return <motion.span className={className}>{rendered}</motion.span>;
}
