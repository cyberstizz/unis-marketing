"use client";

import { motion } from "motion/react";
import { SectionEyebrow, Button } from "@unis/ui";

/**
 * The agreement section. Left: styled rendering of the actual contract
 * with three highlighted clauses. Right: copy + download CTA.
 */
export function TheAgreement() {
  return (
    <section
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-start"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <ContractClauseCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:sticky lg:top-28"
        >
          <SectionEyebrow>The document</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Here's the contract.
            <br />
            <span className="chrome-text">Read every word.</span>
          </h2>
          <p className="text-text-secondary text-body-lg mb-8 max-w-[52ch]">
            This is the agreement every Unis artist can download from the
            artist dashboard, any time, with their name and the date on it.
            It&rsquo;s the same document for everyone, with the full revenue
            schedule written in. If Unis ever changes the published terms, the
            change only applies going forward.
          </p>
          <Button
            as="a"
            href="/sample-agreement.pdf"
            variant="primary"
            size="lg"
            target="_blank"
            rel="noopener"
          >
            Download a sample agreement (PDF)
          </Button>
          <p className="text-text-muted text-sm mt-4 italic">
            Find a major competitor that hands you an agreement in your name
            spelling out your rights and your rates. We&rsquo;ll wait.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * The styled contract clause card — stacked highlighted clauses presented
 * as a rendered document.
 */
function ContractClauseCard() {
  const clauses = [
    {
      number: "§ 2",
      title: "Ownership of Your Content",
      highlight: "all right, title, and interest",
      body: (
        <>
          You retain{" "}
          <mark
            style={{
              background: "rgba(37, 99, 235, 0.18)",
              color: "var(--brand-electric)",
              padding: "0 4px",
              borderRadius: "2px",
              fontWeight: 600,
            }}
          >
            all right, title, and interest
          </mark>{" "}
          in and to your Content, including all Master Recordings and
          underlying compositions you own or control. Nothing in this
          Agreement transfers ownership of your Content to Unis.
        </>
      ),
    },
    {
      number: "§ 3",
      title: "License Grant",
      highlight: "non-exclusive",
      body: (
        <>
          You grant Unis a{" "}
          <mark
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              color: "var(--accent-violet)",
              padding: "0 4px",
              borderRadius: "2px",
              fontWeight: 600,
            }}
          >
            non-exclusive
          </mark>
          , worldwide, revocable license to host, stream, publicly perform,
          display and promote your Content on the Platform. This license exists
          only while your Content remains on the Platform.
        </>
      ),
    },
    {
      number: "§ 8",
      title: "Term and Termination",
      highlight: "at any time",
      body: (
        <>
          You may remove your Content or close your account{" "}
          <mark
            style={{
              background: "rgba(245, 158, 11, 0.18)",
              color: "var(--accent-amber)",
              padding: "0 4px",
              borderRadius: "2px",
              fontWeight: 600,
            }}
          >
            at any time
          </mark>
          , which ends the license going forward. Payment for amounts already
          earned survives termination.
        </>
      ),
    },
  ];

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-8 lg:p-10"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)",
        border: "1px solid var(--divider-soft)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />

      <div className="relative">
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-divider">
          <div
            className="font-display font-bold text-brand-electric text-[22px] tracking-tight"
            aria-label="Unis"
          >
            UNIS
          </div>
          <div className="h-4 w-px bg-divider-soft" />
          <div className="text-eyebrow uppercase text-text-muted font-semibold">
            Artist Agreement · Excerpt
          </div>
        </div>

        <div className="space-y-8">
          {clauses.map((clause, i) => (
            <motion.div
              key={clause.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display font-semibold text-brand-electric text-[15px] tracking-tight">
                  {clause.number}
                </span>
                <span className="font-display font-semibold text-white text-[17px] tracking-tight">
                  {clause.title}
                </span>
              </div>
              <p className="text-text-secondary text-[15px] leading-[1.65]">
                {clause.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-10 pt-6 border-t border-divider text-text-muted text-xs italic"
        >
          Full agreement available to download. This excerpt is verbatim from
          the binding artist template.
        </div>
      </div>
    </div>
  );
}
