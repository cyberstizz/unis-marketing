"use client";

import { motion } from "motion/react";
import { Button } from "@unis/ui";

/**
 * Final CTA section. Three columns:
 *  1. "I have a code" — direct signup
 *  2. "Find a code near you" — the killer map of participating stores
 *  3. "Outside NYC?" — waitlist pre-registration
 *
 * The middle column is the move no competitor can replicate — turning
 * the invite-only constraint into a foot-traffic-generating feature.
 */
export function FinalCTA() {
  return (
    <section
      id="get-access"
      className="relative"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-semibold text-white leading-[0.95] tracking-[-0.05em] text-[clamp(48px,6.5vw,104px)] mb-6">
            Ready to claim
            <br />
            <span className="chrome-text">your neighborhood?</span>
          </h2>
          <p className="text-text-secondary text-body-lg max-w-[50ch] mx-auto">
            Unis is invite-only. Three ways to get in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <CTACard
            index={0}
            label="I have a code"
            description="Enter it and sign up in 60 seconds. Keep 100% of your music. Start earning the same day."
            ctaLabel="Sign up"
            ctaHref="https://unismusic.com"
            variant="primary"
          />
          <CTACard
            index={1}
            label="Find a code near you"
            description="See every participating bodega, barbershop, and restaurant in Harlem on a live map. Walk in, scan, sign up."
            ctaLabel="Open map"
            ctaHref="/map"
            variant="featured"
          />
          <CTACard
            index={2}
            label="Outside NYC?"
            description="Join the waitlist. We'll tell you the moment your neighborhood opens."
            ctaLabel="Join waitlist"
            ctaHref="/waitlist"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}

type CTACardProps = {
  index: number;
  label: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  variant: "primary" | "featured";
};

function CTACard({
  index,
  label,
  description,
  ctaLabel,
  ctaHref,
  variant,
}: CTACardProps) {
  const featured = variant === "featured";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="rounded-2xl p-8 lg:p-10 flex flex-col"
      style={{
        background: featured
          ? "linear-gradient(135deg, #163387 0%, #2563eb 100%)"
          : "var(--bg-surface)",
        border: featured
          ? "1px solid rgba(59, 130, 246, 0.5)"
          : "1px solid var(--divider)",
        boxShadow: featured
          ? "0 24px 80px -20px rgba(37, 99, 235, 0.5)"
          : "none",
      }}
    >
      <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-4">
        {featured ? "★ Most people use this" : `0${index + 1}`}
      </div>
      <h3 className="font-display font-semibold text-white text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
        {label}
      </h3>
      <p className="text-text-secondary text-[15px] leading-[1.55] mb-8 flex-1">
        {description}
      </p>
      <Button
        as="a"
        href={ctaHref}
        variant={featured ? "primary" : "secondary"}
        size="md"
        className={featured ? "bg-white text-brand-navy hover:bg-white/90" : ""}
      >
        {ctaLabel}
        <span aria-hidden>→</span>
      </Button>
    </motion.div>
  );
}
