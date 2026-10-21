"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";
import { PLATFORMS } from "../data";

export function PlatformAvailability() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 max-w-[62ch]"
        >
          <SectionEyebrow>Where Unis runs</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(36px,4.5vw,60px)]">
            iPhone. Android. Web.{" "}
            <span className="chrome-text">Same day.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Unis opens on iOS, Android and the web on the same day. Until then,
            sign up on the web and your account is ready on every device the
            day Unis opens.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {PLATFORMS.map((p, i) => {
            const inner = (
              <>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-eyebrow uppercase font-semibold mb-1.5"
                    style={{ color: p.href ? "var(--brand-electric)" : "var(--text-muted)" }}
                  >
                    {p.status}
                  </div>
                  <div className="font-display font-semibold text-white text-[17px] leading-tight tracking-tight">
                    {p.label}
                  </div>
                </div>
                {p.href && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden
                    className="flex-shrink-0 text-text-muted group-hover:text-brand-electric transition-colors"
                  >
                    <path
                      d="M5 13L13 5M13 5H7M13 5V11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </>
            );
            const motionProps = {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-40px" },
              transition: { duration: 0.6, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] as const },
              className:
                "group rounded-2xl p-6 flex items-center justify-between gap-4 transition-all" +
                (p.href ? " hover:border-brand-electric" : ""),
              style: { background: "var(--bg-surface)", border: "1px solid var(--divider)" },
            };
            return p.href ? (
              <motion.a key={p.label} href={p.href} target="_blank" rel="noopener" {...motionProps}>
                {inner}
              </motion.a>
            ) : (
              <motion.div key={p.label} {...motionProps}>
                {inner}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
