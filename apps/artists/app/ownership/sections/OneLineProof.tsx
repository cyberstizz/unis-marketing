"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

/**
 * The one-line proof. A deliberate quiet moment between the hero and the
 * comparison table. Just the claim, centered, breathing.
 */
export function OneLineProof() {
  return (
    <section
      className="relative"
      style={{
        padding: "clamp(100px, 14vw, 200px) var(--content-px)",
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative mx-auto text-center"
        style={{ maxWidth: "1000px" }}
      >
        <div className="mb-8 flex justify-center">
          <SectionEyebrow>The receipt that makes it real</SectionEyebrow>
        </div>
        <h2 className="font-display font-semibold text-white leading-[1.0] tracking-[-0.04em] text-[clamp(36px,5.5vw,76px)]">
          They all say{" "}
          <span className="text-text-muted italic">&ldquo;you keep your music.&rdquo;</span>
          <br />
          We're the only ones who put it{" "}
          <span className="chrome-text">in writing.</span>
        </h2>
      </motion.div>
    </section>
  );
}
