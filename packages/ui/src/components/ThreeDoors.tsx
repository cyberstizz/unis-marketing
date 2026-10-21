"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { Button } from "./Button";

export type Door = {
  /** Who this door is for, e.g. "Live in Harlem?" */
  title: string;
  description: ReactNode;
  cta: { label: string; href: string };
  featured?: boolean;
};

type ThreeDoorsProps = {
  id?: string;
  headline: ReactNode;
  body?: ReactNode;
  doors: Door[];
};

/**
 * Closing call to action: one heading, then a door for each kind of visitor.
 * The featured door is the main path; the others catch everyone it doesn't fit.
 */
export function ThreeDoors({ id = "get-started", headline, body, doors }: ThreeDoorsProps) {
  return (
    <section id={id} className="relative" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-14 lg:mb-16"
        >
          <h2 className="font-display font-semibold text-white leading-[0.95] tracking-[-0.05em] text-[clamp(44px,6.5vw,104px)] mb-6">
            {headline}
          </h2>
          {body && (
            <p className="text-text-secondary text-body-lg max-w-[50ch] mx-auto">{body}</p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {doors.map((door, i) => (
            <motion.div
              key={door.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className={clsx(
                "rounded-[var(--radius-card)] p-8 lg:p-10 flex flex-col",
                door.featured
                  ? "border border-brand-electric-hover/50 shadow-[0_24px_80px_-20px_rgba(37,99,235,0.55)]"
                  : "bg-bg-surface border border-divider"
              )}
              style={
                door.featured
                  ? { background: "linear-gradient(140deg, var(--brand-navy) 0%, var(--brand-electric) 100%)" }
                  : undefined
              }
            >
              <h3 className="font-display font-semibold text-white text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
                {door.title}
              </h3>
              <p
                className={clsx(
                  "text-[15px] leading-[1.6] mb-8 flex-1",
                  door.featured ? "text-white/85" : "text-text-secondary"
                )}
              >
                {door.description}
              </p>
              <div>
                <Button
                  as="a"
                  href={door.cta.href}
                  variant={door.featured ? "light" : "secondary"}
                  size="md"
                >
                  {door.cta.label}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
