"use client";

import { motion } from "motion/react";
import { Button, SectionEyebrow } from "@unis/ui";

/**
 * Ownership page hero. The signed PDF is the product.
 * Left: copy + CTAs. Right: stylized angled mockup of the contract PDF.
 */
export function OwnershipHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: "clamp(60px, 8vw, 120px) var(--content-px)",
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(37, 99, 235, 0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 60%), var(--bg-deep)",
      }}
    >
      <div
        className="mx-auto grid gap-12 lg:gap-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <SectionEyebrow>Ownership</SectionEyebrow>
          <h1 className="font-display font-semibold text-white mt-6 mb-8 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5.5vw,88px)]">
            Every other platform asks you to trust their{" "}
            <span className="text-text-muted">Terms of Service.</span>
            <br />
            <span className="chrome-text">Unis puts it in writing, in your name.</span>
          </h1>
          <p className="text-text-secondary text-body-lg max-w-[58ch] mb-10">
            A downloadable ownership and revenue-share agreement with your name
            and the date on it, from your dashboard, any time. It says in plain
            words that your music is yours, and exactly what you&rsquo;re paid.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              as="a"
              href="/sample-agreement.pdf"
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener"
            >
              Download a sample agreement
            </Button>
            <Button as="a" href="#comparison" variant="secondary" size="lg">
              See how it compares
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: -4 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <ContractMockup />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Stylized angled contract mockup.
 * Mimics the sample PDF visually, treated like a product shot rather than
 * a document preview.
 */
function ContractMockup() {
  return (
    <div
      className="relative w-full max-w-[480px] mx-auto aspect-[8.5/11] rounded-sm overflow-hidden"
      style={{
        background: "#ffffff",
        boxShadow:
          "0 40px 80px -20px rgba(0, 0, 0, 0.6), 0 20px 40px -10px rgba(37, 99, 235, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        transform: "perspective(1200px) rotateY(-8deg)",
        transformOrigin: "center center",
      }}
    >
      <div className="p-8 h-full flex flex-col" style={{ color: "#0f172a" }}>
        <div className="text-center mb-4">
          <div
            className="font-display font-bold text-[22px] tracking-tight"
            style={{ color: "#163387" }}
          >
            UNIS
          </div>
          <div
            className="text-[9px] font-semibold uppercase tracking-[0.15em] mt-1"
            style={{ color: "#2563eb" }}
          >
            — Artist Agreement —
          </div>
        </div>
        <div
          className="h-px w-full mb-4"
          style={{ background: "#2563eb", opacity: 0.4 }}
        />

        <div
          className="font-display font-bold text-center text-[14px] mb-4 leading-tight"
          style={{ color: "#0f172a" }}
        >
          Artist Ownership &amp; Revenue Share Agreement
        </div>

        <div className="text-[8px] leading-[1.5] space-y-2" style={{ color: "#334155" }}>
          <p>
            This Agreement is entered into as of{" "}
            <span style={{ background: "#fef3c7", padding: "0 2px" }}>
              January 7, 2026
            </span>
            .
          </p>
          <p>
            <span className="font-bold">Between:</span> Unis Music Corporation
            ("Unis") and{" "}
            <span
              className="font-semibold"
              style={{ background: "#fef3c7", padding: "0 2px" }}
            >
              rapking
            </span>{" "}
            ("Artist").
          </p>

          <p className="pt-2">
            <span
              className="font-bold"
              style={{ color: "#163387", fontSize: "9px" }}
            >
              2. Ownership of Your Content
            </span>
          </p>
          <p>
            You retain all right, title, and interest in and to your Content, including all Master Recordings and underlying compositions… <span className="font-bold">Unis claims no ownership of your music.</span>
          </p>

          <p className="pt-1">
            <span
              className="font-bold"
              style={{ color: "#163387", fontSize: "9px" }}
            >
              3. License Grant
            </span>
          </p>
          <p>
            You grant Unis a <span className="font-bold">non-exclusive</span>, worldwide, revocable license to host, stream, publicly perform and display your Content on the Platform…
          </p>

          <p className="pt-1">
            <span
              className="font-bold"
              style={{ color: "#163387", fontSize: "9px" }}
            >
              4. Revenue Share Schedule
            </span>
          </p>
          <div
            className="mt-1 text-[7px] border rounded-sm"
            style={{ borderColor: "#e2e8f0" }}
          >
            {[
              ["Direct song sales & downloads", "90% to Artist*"],
              ["Unis Plus subscriptions, by plays", "60% to Artist"],
              ["Audio ads on your songs (coming soon)", "60% to Artist"],
              ["Community Share from your supporters", "15% to Artist"],
            ].map(([what, share], i) => (
              <div
                key={what}
                className="px-2 py-1 flex border-t first:border-t-0"
                style={{ borderColor: "#e2e8f0", background: i % 2 === 0 ? "#f8fafc" : "#ffffff" }}
              >
                <span className="flex-1">{what}</span>
                <span className="font-bold">{share}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* Signature block */}
        <div className="pt-4 mt-4 border-t" style={{ borderColor: "#cbd5e1" }}>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <div
                className="text-[7px] font-bold uppercase tracking-widest"
                style={{ color: "#475569" }}
              >
                Artist
              </div>
              <svg
                viewBox="0 0 120 30"
                className="mt-1"
                style={{ width: "100%", height: "24px" }}
              >
                <path
                  d="M 4 22 Q 14 4, 26 20 T 50 18 Q 64 6, 80 22 T 115 15"
                  stroke="#0f172a"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="text-[7px] mt-0.5 italic"
                style={{ color: "#64748b" }}
              >
                rapking · 1/7/2026
              </div>
            </div>
            <div className="flex-1">
              <div
                className="text-[7px] font-bold uppercase tracking-widest"
                style={{ color: "#475569" }}
              >
                Unis
              </div>
              <svg
                viewBox="0 0 120 30"
                className="mt-1"
                style={{ width: "100%", height: "24px" }}
              >
                <path
                  d="M 6 18 Q 20 8, 38 22 T 70 16 Q 88 24, 112 12"
                  stroke="#163387"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div
                className="text-[7px] mt-0.5 italic"
                style={{ color: "#64748b" }}
              >
                Authorized Officer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
