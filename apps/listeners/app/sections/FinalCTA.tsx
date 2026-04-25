"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@unis/ui";
import { StoreMapModal } from "./StoreMapModal";

export function FinalCTA() {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <>
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
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl p-8 lg:p-10 flex flex-col"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--divider)",
              }}
            >
              <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-4">
                01
              </div>
              <h3 className="font-display font-semibold text-white text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
                I have a code
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.55] mb-8 flex-1">
                Sign up in 60 seconds with a referral code from a friend. Start
                earning the same day.
              </p>
              <Button as="a" href="/signup" variant="secondary" size="md">
                Sign up <span aria-hidden>→</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl p-8 lg:p-10 flex flex-col"
              style={{
                background: "linear-gradient(135deg, #163387 0%, #2563eb 100%)",
                border: "1px solid rgba(59, 130, 246, 0.5)",
                boxShadow: "0 24px 80px -20px rgba(37, 99, 235, 0.5)",
              }}
            >
              <div className="text-eyebrow uppercase text-white/90 font-semibold mb-4">
                ★ Most people use this
              </div>
              <h3 className="font-display font-semibold text-white text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
                Find a code near you
              </h3>
              <p className="text-white/80 text-[15px] leading-[1.55] mb-8 flex-1">
                See every participating bodega, barbershop, and restaurant in
                Harlem on a live map. Walk in, scan, sign up.
              </p>
              <Button
                onClick={() => setMapOpen(true)}
                variant="primary"
                size="md"
                className="bg-white text-brand-navy hover:bg-white/90"
              >
                Open map <span aria-hidden>→</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-2xl p-8 lg:p-10 flex flex-col"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--divider)",
              }}
            >
              <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-4">
                03
              </div>
              <h3 className="font-display font-semibold text-white text-[28px] lg:text-[32px] leading-[1.1] tracking-[-0.03em] mb-4">
                Outside NYC?
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.55] mb-8 flex-1">
                Join the waitlist. We'll tell you the moment your neighborhood
                opens.
              </p>
              <Button as="a" href="/waitlist" variant="secondary" size="md">
                Join waitlist <span aria-hidden>→</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <StoreMapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </>
  );
}
