"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type CheckBulletProps = {
  title: string;
  children: ReactNode;
  /** Stagger delay in ms */
  delay?: number;
};

/**
 * A bullet with an animated circular check, title, and description.
 * Used inside every pillar section.
 */
export function CheckBullet({ title, children, delay = 0 }: CheckBulletProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="flex gap-4 items-start"
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="flex-shrink-0 mt-1"
        aria-hidden
      >
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke="var(--brand-electric)"
          strokeWidth="1.5"
          fill="rgba(37, 99, 235, 0.08)"
        />
        <motion.path
          d="M7 12.5L10.5 16L17 9"
          stroke="var(--brand-electric)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.6,
            delay: delay / 1000 + 0.2,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      </motion.svg>
      <div>
        <strong className="font-display font-semibold text-white text-[17px] block mb-1">
          {title}
        </strong>
        <span className="text-text-secondary text-[16px] leading-[1.55]">
          {children}
        </span>
      </div>
    </motion.li>
  );
}
