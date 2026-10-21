"use client";

import { motion } from "motion/react";
import { Button, UNIS_LINKS } from "@unis/ui";

export function MathFinalCTA() {
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
          Bookmark this page.
          <br />
          <span className="chrome-text">Every change gets a date.</span>
        </h2>
        <p className="text-text-secondary text-body-lg mb-10 max-w-[52ch] mx-auto">
          The splits are written into the platform code, and any change is
          announced ahead of time and only applies going forward. The example
          figures will be replaced with real platform data once there&rsquo;s
          enough of it. Every update gets a dated review note.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button as="a" href="#simulator" variant="secondary" size="lg">
            Replay the simulator
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
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up as an artist
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
