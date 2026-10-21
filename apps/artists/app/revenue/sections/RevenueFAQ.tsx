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
        Song sales and support go to your Stripe account{" "}
        <strong className="text-white">the moment someone pays</strong>. The
        Community Share and Unis Plus build up in your Unis balance once a
        month, when the month is closed (usually the second half of the next
        month, once Unis itself has been paid), and you can withdraw them to
        Stripe once the balance reaches $50. Stripe then pays your bank{" "}
        <strong className="text-white">once a month, on the 1st</strong>, and
        Unis covers Stripe&rsquo;s payout fees.
      </>
    ),
  },
  {
    question: "Why the $50 minimum?",
    answer: (
      <>
        Every payout has a cost, and Unis pays it, so Community Share balances
        go out in amounts where that cost stays small. Below $50 your balance
        simply keeps building up. Song sales and support aren&rsquo;t affected
        — they reach your Stripe account straight away.
      </>
    ),
  },
  {
    question: "Will I get a tax form?",
    answer: (
      <>
        If you&rsquo;re paid enough in a year, yes, filed through Stripe as the
        law requires: usually a <strong className="text-white">1099-MISC</strong>{" "}
        once withdrawn Community Share money reaches $2,000 in a calendar year,
        and a <strong className="text-white">1099-K</strong> for song sales and
        support once they pass $20,000 and 200 payments. Stripe collects your
        tax details when you set up payouts. Some states report at lower
        amounts, and the money is income either way.
      </>
    ),
  },
  {
    question: "How do I set up Stripe?",
    answer: (
      <>
        From the Earnings page in Unis: connect a Stripe account and Stripe
        walks you through verifying your identity and your bank. Add a verified
        phone number on Unis too, or Community Share money can&rsquo;t reach
        you.
      </>
    ),
  },
  {
    question: "What stops people from gaming it?",
    answer: (
      <>
        Nobody is paid for seeing or clicking ads, so there&rsquo;s nothing to
        click-farm. A play only counts toward the Community Share when the
        listener is signed in and it&rsquo;s someone else&rsquo;s song, and each
        person counts for <strong className="text-white">at most 50 plays a
        day</strong>. You can&rsquo;t earn from your own listening, earning
        needs a verified phone, and a referral link is made once, at signup.
      </>
    ),
  },
  {
    question: "Where do I see what I've earned?",
    answer: (
      <>
        On your Earnings page: your balance, each income stream, and your
        payout history. Song sales show up as they happen; the Community Share
        and Unis Plus are credited when each month closes.
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
