"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useState } from "react";
import { SectionEyebrow } from "@unis/ui";

type FAQ = { question: string; answer: ReactNode };

const FAQS: FAQ[] = [
  {
    question: "When do I actually get paid?",
    answer: (
      <>
        Direct sales are paid in{" "}
        <strong className="text-white">two business days</strong> via Stripe.
        All other earnings (display ads, paid-tier share, audio ads when
        they launch, referrals) accumulate in your dashboard balance and can
        be withdrawn once the balance hits $50. Payouts go to your bank
        account via Stripe Connect.
      </>
    ),
  },
  {
    question: "Why the $50 minimum?",
    answer: (
      <>
        Stripe payout fees eat small transfers. Below $50, we'd be sending
        you $47 and pocketing the fees. Above $50, the fees are negligible
        and you get every dollar you earned.{" "}
        <strong className="text-white">Your earnings never expire</strong> —
        they roll over until you hit the threshold.
      </>
    ),
  },
  {
    question: "Will I get a 1099 for taxes?",
    answer: (
      <>
        Yes — US artists earning over $600/year get a{" "}
        <strong className="text-white">1099-NEC</strong> automatically.
        Non-US artists get the equivalent documentation for their
        jurisdiction. We handle the tax paperwork.
      </>
    ),
  },
  {
    question: "How do I set up Stripe?",
    answer: (
      <>
        Three-minute flow inside your dashboard. Click "Set Up Payouts,"
        Stripe walks you through bank verification, and you're done. US
        artists can typically complete it same-day. International takes
        slightly longer depending on country.
      </>
    ),
  },
  {
    question: "What happens if someone games the referral system?",
    answer: (
      <>
        Every ad impression is attributed and verified on the backend. Fraud
        detection flags unusual patterns (click farms, bot traffic, duplicate
        accounts) and withholds those earnings pending review. The{" "}
        <strong className="text-white">invite-only model</strong> makes
        large-scale fraud structurally difficult — every user was brought in
        by a real human who's also earning from them, which means real
        humans have skin in the game at every node.
      </>
    ),
  },
  {
    question: "Can I see my earnings in real time?",
    answer: (
      <>
        Yes. Your dashboard shows current balance, this-month total,
        per-referral breakdown, per-supporter count, payout history, and a
        30-day earnings chart. Updates as ads are attributed, typically
        within minutes of impression.
      </>
    ),
  },
];

export function RevenueFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 text-center"
        >
          <div className="flex justify-center mb-6">
            <SectionEyebrow>Questions</SectionEyebrow>
          </div>
          <h2 className="font-display font-semibold text-white leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            The practical questions
            <br />
            <span className="chrome-text">every artist asks.</span>
          </h2>
        </motion.div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--divider)",
          }}
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--divider)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 lg:p-8 text-left hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-white text-[17px] lg:text-[19px] tracking-tight leading-[1.3]">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[22px] leading-none font-light"
                    style={{
                      background: isOpen
                        ? "var(--brand-electric)"
                        : "rgba(255,255,255,0.06)",
                      color: isOpen ? "#ffffff" : "var(--text-muted)",
                    }}
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 lg:px-8 pb-8 text-text-secondary text-[15px] lg:text-[16px] leading-[1.65] max-w-[72ch]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
