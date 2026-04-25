"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, ReactNode } from "react";
import { SectionEyebrow } from "@unis/ui";

type FAQ = {
  question: string;
  answer: ReactNode;
};

const FAQS: FAQ[] = [
  {
    question: "What happens to my music if Unis shuts down?",
    answer: (
      <>
        Your signed agreement grants Unis a{" "}
        <strong className="text-white">non-exclusive</strong> license. If Unis
        ceases operations, that license becomes moot — your rights were never
        transferred in the first place. Your downloaded PDF remains legal proof
        of the original terms. Your masters are still on whatever other
        distributor you used for Spotify, Apple, etc. Nothing is trapped on
        Unis.
      </>
    ),
  },
  {
    question: "Can I distribute to Spotify and Apple while I'm on Unis?",
    answer: (
      <>
        Yes. Unis is explicitly non-exclusive. Keep using DistroKid, TuneCore,
        CD Baby, or whoever — and upload to Unis in parallel. Your Spotify
        listeners and your Unis neighborhood vote for you independently, and{" "}
        <strong className="text-white">both streams of income stack.</strong>
      </>
    ),
  },
  {
    question: "If I delete my Unis account, who owns my music?",
    answer: (
      <>
        You do. You always did. Deletion simply terminates the non-exclusive
        license you granted Unis. Your masters and publishing rights are
        unaffected. Your downloaded agreement is your legal record of the
        terms you agreed to.
      </>
    ),
  },
  {
    question: "Do I need to register with ASCAP, BMI, or SESAC separately?",
    answer: (
      <>
        Yes — performing rights organizations (PROs) collect public performance
        royalties from radio, TV, and live venues, and every artist should be
        registered with one regardless of platform. Unis handles your{" "}
        <em>mechanical</em> royalties with the MLC for free (that's the
        streaming-specific compulsory portion). PRO registration is separate
        and covers a different income stream.
      </>
    ),
  },
  {
    question: "What if a label wants to sign a song I've already uploaded?",
    answer: (
      <>
        Go for it. Your non-exclusive license to Unis doesn't prevent you from
        signing any other deal — including an exclusive one with a label.
        You'd simply give 30 days' notice to remove the song from Unis (or
        keep it on, if the label agrees, because Unis is non-exclusive).
      </>
    ),
  },
  {
    question: "What about sync licensing for film, TV, and ads?",
    answer: (
      <>
        Sync deals are negotiated directly between you (or your publisher) and
        the licensee. Unis doesn't claim any sync rights. If a music supervisor
        wants your song for a Netflix show,{" "}
        <strong className="text-white">you keep 100% of that deal.</strong>
      </>
    ),
  },
];

export function OwnershipFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "960px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 text-center"
        >
          <div className="flex justify-center mb-6">
            <SectionEyebrow>Common questions</SectionEyebrow>
          </div>
          <h2 className="font-display font-semibold text-white leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            The questions
            <br />
            <span className="chrome-text">every serious artist asks.</span>
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
                      transition={{
                        duration: 0.4,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
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
