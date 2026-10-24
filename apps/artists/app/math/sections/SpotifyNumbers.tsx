"use client";

import { RollingNumber, SectionEyebrow } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Spotify's own numbers (Loud & Clear, 2025 data, published 2026), set
 * beside the Unis rule. Sources: Music Business Worldwide's breakdown of the
 * report and artists.spotify.com/trusted-platform (1,000-stream minimum).
 *
 * The dot field is 1,000 dots; 6 are lit, about 0.62% (81,100 of roughly
 * 13 million people who have uploaded music).
 */
const DOTS = 1000;
const LIT = new Set([137, 288, 455, 612, 733, 901]);

const FACTS = [
  { value: 13, suffix: " million", label: "people have uploaded at least one track to Spotify" },
  { value: 81100, suffix: "", label: "of them generated $10,000 or more there in 2025, about 0.62%" },
  { value: 1000, suffix: " streams", label: "a track needs in a year before it earns recording royalties" },
];

export function SpotifyNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  return (
    <section id="spotify-numbers" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-[64ch] mb-12"
        >
          <SectionEyebrow>Spotify&rsquo;s own numbers</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Six in a thousand.
          </h2>
          <p className="text-text-secondary text-body-lg mt-6">
            Spotify publishes who earns what each year. Of everyone who has uploaded music there, about six in every
            thousand generated $10,000 or more on Spotify in 2025.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] items-center">
          <div
            ref={ref}
            role="img"
            aria-label="A field of 1,000 dots with 6 lit, showing about 0.62% of uploaders generating $10,000 or more"
            className="grid gap-[3px] sm:gap-1 rounded-[var(--radius-panel)] border border-[color:var(--panel-border)] p-5 sm:p-7"
            style={{ gridTemplateColumns: "repeat(40, minmax(0, 1fr))", background: "var(--panel-gradient)" }}
          >
            {Array.from({ length: DOTS }).map((_, i) => {
              const lit = LIT.has(i);
              return (
                <motion.span
                  key={i}
                  className="block aspect-square rounded-full"
                  style={{
                    background: lit ? "#f59e0b" : "rgba(255,255,255,0.16)",
                    boxShadow: lit ? "0 0 10px rgba(245,158,11,0.9)" : undefined,
                  }}
                  initial={reduce ? false : { opacity: 0, scale: lit ? 0.2 : 1 }}
                  animate={inView || reduce ? { opacity: 1, scale: lit ? 1.6 : 1 } : undefined}
                  transition={
                    lit
                      ? { type: "spring", stiffness: 300, damping: 12, delay: 1.1 }
                      : { duration: 0.5, delay: (i % 40) * 0.012 + Math.floor(i / 40) * 0.01 }
                  }
                />
              );
            })}
          </div>

          <div>
            <ul className="space-y-4">
              {FACTS.map((f) => (
                <li key={f.label} className="rounded-[var(--radius-card)] border border-divider bg-bg-surface p-5 sm:p-6">
                  <RollingNumber
                    value={f.value}
                    suffix={f.suffix}
                    className="block font-display font-semibold text-white text-[34px] sm:text-[40px] tracking-[-0.03em] tabular-nums"
                  />
                  <p className="text-text-secondary text-[15px] mt-1">{f.label}</p>
                </li>
              ))}
            </ul>
            <div
              className="mt-4 rounded-[var(--radius-card)] p-5 sm:p-6"
              style={{ background: "linear-gradient(140deg, var(--brand-navy) 0%, var(--brand-electric) 100%)" }}
            >
              <p className="text-white text-[17px] leading-[1.5]">
                On Unis there is no stream minimum. A supporter&rsquo;s listening pays you from the first counted play.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-text-muted text-[13px] leading-[1.6] max-w-[90ch]">
          &ldquo;Generated&rdquo; is what an artist&rsquo;s music earned on Spotify, recording and publishing together, paid to
          labels, distributors and publishers before their cut reaches the artist. Sources:{" "}
          <a
            className="underline hover:text-white"
            href="https://musicbusinessworldwide.com/80-artists-generated-10m-each-from-spotify-last-year-1500-generated-1m-heres-the-full-breakdown"
            target="_blank"
            rel="noopener noreferrer"
          >
            Music Business Worldwide on Spotify&rsquo;s Loud &amp; Clear report
          </a>{" "}
          and{" "}
          <a className="underline hover:text-white" href="https://artists.spotify.com/trusted-platform" target="_blank" rel="noopener noreferrer">
            artists.spotify.com/trusted-platform
          </a>
          , October 2026.
        </p>
      </div>
    </section>
  );
}
