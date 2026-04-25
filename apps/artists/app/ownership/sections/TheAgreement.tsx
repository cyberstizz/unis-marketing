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
            This is the actual template every Unis artist receives —
            personalized with their name and the songs they've uploaded,
            countersigned by Unis, and available to download any time from
            the artist dashboard. No hidden amendments. No unilateral
            updates. What you sign is what you have.
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
            Find a major competitor that will email you a signed agreement
            naming you, naming your songs, and naming your rights. We'll
            wait.
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
      title: "Ownership Retained by Artist",
      highlight: "100% ownership",
      body: (
        <>
          Artist retains{" "}
          <mark
            style={{
              background: "rgba(37, 99, 235, 0.18)",
              color: "var(--brand-electric)",
              padding: "0 4px",
              borderRadius: "2px",
              fontWeight: 600,
            }}
          >
            100% ownership
          </mark>{" "}
          of all rights in the sound recordings (masters) and underlying
          musical compositions (publishing). This Agreement does not transfer
          any ownership rights to Unis.
        </>
      ),
    },
    {
      number: "§ 1",
      title: "Grant of Non-Exclusive License",
      highlight: "non-exclusive",
      body: (
        <>
          Artist hereby grants Unis a{" "}
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
          , royalty-free, worldwide license to reproduce, distribute, publicly
          perform, publicly display, and otherwise use the Uploaded Works on
          the Unis platform.
        </>
      ),
    },
    {
      number: "§ 5",
      title: "Artist Warranties & Termination",
      highlight: "terminable by Artist",
      body: (
        <>
          This Agreement is perpetual but{" "}
          <mark
            style={{
              background: "rgba(245, 158, 11, 0.18)",
              color: "var(--accent-amber)",
              padding: "0 4px",
              borderRadius: "2px",
              fontWeight: 600,
            }}
          >
            terminable by Artist with thirty (30) days notice.
          </mark>{" "}
          Upon termination, Unis shall cease distribution and the license
          granted herein shall automatically terminate.
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
