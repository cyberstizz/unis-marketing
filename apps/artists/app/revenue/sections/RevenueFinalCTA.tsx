"use client";

import { motion } from "motion/react";
import { Button } from "@unis/ui";

export function RevenueFinalCTA() {
  return (
    <section
      style={{
        padding: "clamp(100px, 14vw, 180px) var(--content-px)",
        borderTop: "1px solid var(--divider)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="mx-auto text-center"
        style={{ maxWidth: "800px" }}
      >
        <h2 className="font-display font-semibold text-white leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5.5vw,84px)] mb-8">
          Your fans are the business.
          <br />
          <span className="chrome-text">
            Come get paid like it.
          </span>
        </h2>
        <p className="text-text-secondary text-body-lg mb-10 max-w-[52ch] mx-auto">
          Download the agreement. Sign up with a code. Start accruing the
          same day.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button as="a" href="#calculator" variant="secondary" size="lg">
            See the calculator again
          </Button>
          <Button
            as="a"
            href="/sample-agreement.pdf"
            variant="secondary"
            size="lg"
            target="_blank"
            rel="noopener"
          >
            Download a sample agreement
          </Button>
          <Button as="a" href="/#get-access" variant="primary" size="lg">
            Sign up with a referral code
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
