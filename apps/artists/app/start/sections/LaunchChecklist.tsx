"use client";

import { Button, SectionEyebrow, UNIS_LINKS } from "@unis/ui";
import { motion, useReducedMotion } from "motion/react";

/**
 * The launch-day checklist — the Unis version of Spotify's "Get ready for
 * Wrapped" page. No launch date appears until one is set.
 */
const TASKS = [
  { title: "Three songs up", text: "More songs, more chances to win, and more for new fans to play." },
  { title: "Featured song set", text: "Lead with the one you want the neighborhood to hear first." },
  { title: "Photo and story done", text: "People back artists they can picture." },
  { title: "Phone verified", text: "So votes, messages and your monthly share all work from day one." },
  { title: "Payouts connected", text: "So nothing sits waiting when the first month closes." },
  { title: "Link shared with 10 people", text: "Your first supporters are already in your phone." },
];

export function LaunchChecklist() {
  const reduce = useReducedMotion();
  return (
    <section id="launch-checklist" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-center"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Launch day</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.045em] text-[clamp(40px,5.4vw,84px)]">
            Be ready
            <br />
            <span className="chrome-text">the day Harlem opens.</span>
          </h2>
          <p className="text-text-secondary text-body-lg mt-6 max-w-[46ch]">
            Spotify gets artists ready for Wrapped every year. This is the Unis version, for the neighborhood&rsquo;s first race.
          </p>
          <div className="mt-9">
            <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
              Sign up as an artist
            </Button>
          </div>
        </motion.div>

        <ol className="space-y-3">
          {TASKS.map((task, i) => (
            <motion.li
              key={task.title}
              initial={reduce ? false : { opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 rounded-[var(--radius-card)] border border-divider bg-bg-surface p-5"
            >
              <motion.span
                aria-hidden
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-electric text-white"
                initial={reduce ? false : { scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ type: "spring", stiffness: 420, damping: 22, delay: 0.25 + i * 0.08 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </motion.span>
              <div>
                <div className="font-display font-semibold text-white text-[19px] tracking-tight">{task.title}</div>
                <p className="text-text-secondary text-[15px] mt-1">{task.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
