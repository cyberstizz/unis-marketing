"use client";

import { AnimatePresence, motion } from "motion/react";
import { ReactNode, useState } from "react";
import { SectionEyebrow } from "@unis/ui";

type FAQ = { question: string; answer: ReactNode };

const FAQS: FAQ[] = [
  {
    question: "Which neighborhood am I competing in?",
    answer: (
      <>
        Every Unis member belongs to one home jurisdiction, found from the
        address they give at signup: the most specific neighborhood that
        contains it. You compete, vote, and chart in the chain that starts
        there and climbs all the way up to Unis. One person, one home chain,
        so votes are never spread across neighborhoods.
      </>
    ),
  },
  {
    question: "Can I rep a neighborhood I don't live in?",
    answer: (
      <>
        Your home jurisdiction is set once, at signup, to keep the charts
        honest (if you move, contact Unis and it gets corrected) — otherwise the whole system gets gamed by artists
        moving votes into whichever neighborhood they want to dominate.
        However, your music is discoverable across every tier, so listeners
        in other neighborhoods can absolutely find you and support you from
        their own chains.
      </>
    ),
  },
  {
    question: "How are winners decided at each tier?",
    answer: (
      <>
        On <strong className="text-white">total points</strong>. Every vote,
        play and like in the period earns points: a vote is worth 10 to 250
        depending on the award, a play 1, a like 5, all added into one number.
        The highest total wins. Ties go to vote points, then plays, likes,
        lifetime score, and finally{" "}
        <strong className="text-white">seniority on Unis</strong>, so every
        award has exactly one winner. A vote still counts for far more than a
        play, but an artist the neighborhood is genuinely listening to can win
        on engagement alone.
      </>
    ),
  },
  {
    question: "When do awards reset?",
    answer: (
      <>
        At midnight, local time (Eastern, for Harlem). Daily awards close every
        night; weekly ones cover Monday through Sunday; monthly ones the 1st to
        the last day; quarterly ones each quarter; midterm ones January–June
        and July–December; annual ones the calendar year. Every result is
        recorded permanently.
      </>
    ),
  },
  {
    question: "What if my neighborhood isn't listed on Unis yet?",
    answer: (
      <>
        Unis is built to cover every neighborhood in the country. Right now,
        Harlem is live. For anywhere else, join the waitlist at
        unismusic.com/waitlist. A region opens for everyone at once when
        enough people from it have signed up: 1,000 for a major metro, 500 for
        a mid-size city, 250 anywhere else.
      </>
    ),
  },
  {
    question: "Can I win in multiple tiers at the same time?",
    answer: (
      <>
        Yes — winning your sub-neighborhood typically means you're also
        competing strongly in your neighborhood tier above. A single great
        song can win Daily at every tier in your chain on a good day. Each
        win is a separate, permanent record entry.
      </>
    ),
  },
  {
    question: "What happens to my wins if I delete my account?",
    answer: (
      <>
        The historical records persist — awards are part of the permanent
        public record, tied to the song and the date, not to your account
        status. Your earnings stop accruing when you delete, but the
        &ldquo;Artist of the Day, Uptown Harlem, October 14, 2026&rdquo;
        entry stays looked-up forever.
      </>
    ),
  },
];

export function JurisdictionsFAQ() {
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
            How the tiers
            <br />
            <span className="chrome-text">actually work.</span>
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
