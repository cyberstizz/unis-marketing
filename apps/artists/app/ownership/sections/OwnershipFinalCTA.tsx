"use client";

import { motion } from "motion/react";
import { Button } from "@unis/ui";

export function OwnershipFinalCTA() {
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
          Start with the agreement.
          <br />
          <span className="chrome-text">Not the marketing.</span>
        </h2>
        <p className="text-text-secondary text-body-lg mb-10 max-w-[52ch] mx-auto">
          The contract is the truth of the relationship. Everything else is
          decoration. Download it. Read it. Take it to a lawyer. Then decide.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            as="a"
            href="/sample-agreement.pdf"
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener"
          >
            Download a sample agreement
          </Button>
          <Button as="a" href="/#get-access" variant="secondary" size="lg">
            Sign up with a referral code
          </Button>
        </div>
        <p className="text-text-muted text-sm">
          Questions about the agreement?{" "}
          <a
            href="mailto:legal@unismusic.com"
            className="text-brand-electric hover:text-brand-electric-hover transition-colors"
          >
            legal@unismusic.com
          </a>
        </p>
      </motion.div>
    </section>
  );
}
