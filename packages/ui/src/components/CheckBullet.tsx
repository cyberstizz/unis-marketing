"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

type CheckBulletProps = {
  title: string;
  children: ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  /**
   * Optional link for the title — Spotify's checklist items are links to the
   * page that explains them; ours usually point at a help-center article.
   */
  href?: string;
};

/**
 * A checklist item with an animated circular check, title, and description.
 * Used inside every showcase module.
 */
export function CheckBullet({ title, children, delay = 0, href }: CheckBulletProps) {
  const external = href?.startsWith("http");

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: delay / 1000,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="flex gap-4 items-start"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="flex-shrink-0 mt-0.5"
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.6,
            delay: delay / 1000 + 0.2,
            ease: [0.2, 0.8, 0.2, 1],
          }}
        />
      </svg>
      <div>
        {href ? (
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group inline-flex items-baseline gap-1.5 font-display font-semibold text-white text-[17px] mb-1 underline decoration-white/20 underline-offset-4 hover:decoration-brand-electric transition-colors"
          >
            {title}
            <span
              aria-hidden
              className="text-brand-electric transition-transform duration-200 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        ) : (
          <strong className="font-display font-semibold text-white text-[17px] block mb-1">
            {title}
          </strong>
        )}
        <span className="block text-text-secondary text-[16px] leading-[1.55]">{children}</span>
      </div>
    </motion.li>
  );
}
