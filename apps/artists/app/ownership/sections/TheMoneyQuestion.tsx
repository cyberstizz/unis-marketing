"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

const BLOCKS = [
  {
    number: "01",
    title: "Unis keeps 68% of the Community Share.",
    body: (
      <>
        Everything Unis earns goes into one pot each month. Each
        listener&rsquo;s slice splits{" "}
        <strong className="text-white">15% to the artist they back</strong>{" "}
        and <strong className="text-white">17% up their referral chain</strong>;
        Unis runs the platform on the other 68%. Your rights never come into it.
      </>
    ),
  },
  {
    number: "02",
    title: "Unis Plus splits 60/40.",
    body: (
      <>
        60% of each $4.99 subscription, after Stripe&rsquo;s fees, goes to
        artists: 15% to the artist that subscriber supports and 45% to the
        artists they played, by plays. Unis&rsquo;s 40% joins the
        pot. That&rsquo;s how we fund the platform{" "}
        <em>without touching your ownership.</em>
      </>
    ),
  },
  {
    number: "03",
    title: "Song sales: 10%, or the card fee + 1¢.",
    body: (
      <>
        When a fan buys a song from you, Unis takes 10%, or only the card
        company&rsquo;s fee plus one cent on smaller prices.{" "}
        <strong className="text-white">
          The money reaches your Stripe account when they pay.
        </strong>
      </>
    ),
  },
];

export function TheMoneyQuestion() {
  return (
    <section
      style={{
        padding: "var(--section-py) var(--content-px)",
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(37, 99, 235, 0.08) 0%, transparent 60%)",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-16 max-w-[58ch]"
        >
          <SectionEyebrow>The money question</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            &ldquo;If artists keep up to 90%,
            <br />
            how does <span className="chrome-text">Unis</span> stay alive?&rdquo;
          </h2>
          <p className="text-text-secondary text-body-lg">
            Fair question — most artists have been burned enough times to be
            skeptical of a platform that keeps less of their money. Here's
            exactly how it works.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-16">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--divider)",
              }}
            >
              <div className="font-display font-semibold text-brand-electric text-[14px] tracking-[0.12em] mb-4">
                {block.number}
              </div>
              <h3 className="font-display font-semibold text-white text-[22px] leading-[1.15] tracking-[-0.02em] mb-4">
                {block.title}
              </h3>
              <p className="text-text-secondary text-[15px] leading-[1.6]">
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
          <p className="font-display font-semibold text-white tracking-[-0.03em] text-[clamp(22px,3vw,40px)] leading-[1.2] max-w-[24ch] mx-auto">
            We make money when the community uses the platform.{" "}
            <span className="chrome-text">Not when we own your work.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
