"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

const BLOCKS = [
  {
    number: "01",
    title: "Unis's part of the Community Share",
    pct: "68%",
    sub: "of each listener's monthly slice",
    body: "Everything Unis earns (ads, local sponsorships, its small fee margins) goes into one monthly pot. Each listener's slice splits 15% to their artist and 17% up their referral chain. Unis runs the platform on the other 68%.",
  },
  {
    number: "02",
    title: "Unis Plus",
    pct: "40%",
    sub: "of each subscription, after Stripe's fees",
    body: "60% goes to the artists each subscriber played, by plays. Unis's 40% joins the Community Share pot.",
  },
  {
    number: "03",
    title: "Song sales and support",
    pct: "10%",
    sub: "or card fee + 1¢ on small sales",
    body: "Covers the card company's fee and leaves Unis about a cent on small sales. Whatever Unis keeps after the card fee joins the pot.",
  },
  {
    number: "04",
    title: "Audio ads",
    pct: "40%",
    sub: "of net · once audio launches",
    body: "Artists get 60% of the net from ads played with their songs. Unis's 40% joins the Community Share pot.",
  },
];

export function BusinessModel() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 max-w-[58ch]"
        >
          <SectionEyebrow>The business model</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Where does{" "}
            <span className="chrome-text">Unis's</span> revenue come from,
            then?
          </h2>
          <p className="text-text-secondary text-body-lg">
            Fair question. A platform that pays artists 60–90% of what they
            bring in needs to fund itself somehow. Here&rsquo;s exactly where.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="rounded-2xl p-6 lg:p-8 flex flex-col"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--divider)",
              }}
            >
              <div className="font-display font-semibold text-brand-electric text-[12px] tracking-[0.14em] mb-3">
                {block.number}
              </div>
              <div
                className="font-display font-semibold chrome-text leading-none tracking-[-0.03em]"
                style={{ fontSize: "clamp(40px, 5vw, 64px)" }}
              >
                {block.pct}
              </div>
              {block.sub && (
                <div className="text-text-muted text-[11px] uppercase tracking-widest mt-2 mb-4">
                  {block.sub}
                </div>
              )}
              <h3 className="font-display font-semibold text-white text-[17px] leading-[1.25] tracking-[-0.01em] mt-4 mb-3">
                {block.title}
              </h3>
              <p className="text-text-secondary text-[14px] leading-[1.55]">
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.2, 0.8, 0.2, 1],
          }}
          className="text-center"
        >
          <p className="font-display font-semibold text-white tracking-[-0.03em] text-[clamp(22px,3vw,40px)] leading-[1.2] max-w-[28ch] mx-auto">
            We make money when the community uses the platform.{" "}
            <span className="chrome-text">
              Not when we own your work.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
