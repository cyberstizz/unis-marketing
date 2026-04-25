"use client";

import { motion } from "motion/react";
import { Button } from "@unis/ui";
import { WAITLIST_URL } from "../data";

export function JurisdictionsFinalCTA() {
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
        style={{ maxWidth: "880px" }}
      >
        <h2 className="font-display font-semibold text-white leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5.5vw,84px)] mb-8">
          Own your block.
          <br />
          <span className="chrome-text">
            Then own the next one up.
          </span>
        </h2>
        <p className="text-text-secondary text-body-lg mb-12 max-w-[56ch] mx-auto">
          Two ways in, depending on where you are. If you're in Harlem, you
          can start competing today. If you're anywhere else, the waitlist
          decides how fast your neighborhood goes live.
        </p>
        <div className="grid gap-4 md:grid-cols-2 max-w-[820px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-2xl p-8 text-left flex flex-col"
            style={{
              background: "linear-gradient(135deg, #163387 0%, #2563eb 100%)",
              border: "1px solid rgba(59, 130, 246, 0.5)",
              boxShadow: "0 24px 80px -20px rgba(37, 99, 235, 0.5)",
            }}
          >
            <div className="text-eyebrow uppercase text-white/90 font-semibold mb-3">
              If you're in Harlem
            </div>
            <h3 className="font-display font-semibold text-white text-[26px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
              Start competing today.
            </h3>
            <p className="text-white/85 text-[15px] leading-[1.55] mb-8 flex-1">
              Sign up with a referral code, upload your music, and you're on
              the Uptown or Downtown Harlem charts before the weekend.
            </p>
            <Button
              as="a"
              href="/#get-access"
              variant="primary"
              size="md"
              className="bg-white text-brand-navy hover:bg-white/90"
            >
              Sign up with a referral code
              <span aria-hidden>→</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-2xl p-8 text-left flex flex-col"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="text-eyebrow uppercase text-accent-amber font-semibold mb-3">
              If you're anywhere else
            </div>
            <h3 className="font-display font-semibold text-white text-[26px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
              Add your neighborhood to the waitlist.
            </h3>
            <p className="text-text-secondary text-[15px] leading-[1.55] mb-8 flex-1">
              The more artists and fans in your zip code join the waitlist,
              the sooner your chain goes live. You'll be notified the day it
              does.
            </p>
            <Button
              as="a"
              href={WAITLIST_URL}
              variant="secondary"
              size="md"
              target="_blank"
              rel="noopener"
            >
              Join the waitlist
              <span aria-hidden>→</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
