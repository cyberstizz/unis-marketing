"use client";

import { motion, useScroll } from "motion/react";

/**
 * Thin 2px electric-blue progress bar fixed to the top of the viewport.
 * Quiet but present. Scales on the X axis as the user scrolls.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}
