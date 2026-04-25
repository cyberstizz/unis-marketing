"use client";

import clsx from "clsx";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { SectionEyebrow } from "./SectionEyebrow";
import { Button } from "./Button";

type PillarSectionProps = {
  id?: string;
  eyebrow: string;
  headline: ReactNode;
  body: ReactNode;
  /** Visual content for the other column — can be an image, video, or illustration */
  visual: ReactNode;
  /** Which side the visual goes on */
  visualSide?: "left" | "right";
  /** The bullet CheckBullets */
  children: ReactNode;
  cta?: {
    label: string;
    href: string;
  };
};

/**
 * Alternating 60/40 pillar block. Content on one side, visual on the other.
 * Matches the rhythm Spotify uses on their artist site but asymmetric (not 50/50).
 */
export function PillarSection({
  id,
  eyebrow,
  headline,
  body,
  visual,
  visualSide = "right",
  children,
  cta,
}: PillarSectionProps) {
  const visualFirst = visualSide === "left";

  return (
    <section
      id={id}
      className="relative"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div
        className="mx-auto grid gap-16 lg:gap-24 items-center"
        style={{
          maxWidth: "var(--max-w)",
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <div
          className={clsx(
            "grid gap-12 lg:gap-20 items-center",
            "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          )}
        >
          {visualFirst && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="order-1 lg:order-1"
            >
              {visual}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className={clsx(
              "order-2",
              visualFirst ? "lg:order-2" : "lg:order-1"
            )}
          >
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
              {headline}
            </h2>
            <p className="text-text-secondary text-body-lg max-w-[60ch] mb-10">
              {body}
            </p>
            <ul className="space-y-6 mb-10">{children}</ul>
            {cta && (
              <Button as="a" href={cta.href} variant="secondary" size="md">
                {cta.label}
                <span aria-hidden>→</span>
              </Button>
            )}
          </motion.div>

          {!visualFirst && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="order-1 lg:order-2"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
