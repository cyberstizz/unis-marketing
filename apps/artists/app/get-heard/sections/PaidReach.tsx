"use client";

import { SectionEyebrow } from "@unis/ui";
import { motion } from "motion/react";

/**
 * "No pay-to-play" — Spotify's three reach tools (Campaign Kit) beside what
 * Unis does instead. Spotify facts from artists.spotify.com/discovery-mode,
 * /display-campaigns and /playlisting (October 2026).
 */
const TOOLS = [
  {
    name: "Discovery Mode",
    spotify: "Flag a song for Spotify's personalized playlists. Spotify takes a commission on the streams it drives there.",
    unis: "There's no boost to buy. Songs from a listener's own area come first on song pages and sound shelves, for every artist.",
    tag: "Costs a commission",
  },
  {
    name: "Marquee & Showcase",
    spotify: "Paid ads inside the Spotify app: a full-screen takeover or a banner on Home.",
    unis: "No artist can buy a placement. Plays, likes and votes are the only things that move a song.",
    tag: "Costs money",
  },
  {
    name: "Playlist pitching",
    spotify: "Pitch one song per release, at least 7 days ahead. Editors get thousands of pitches a week, and nothing is guaranteed.",
    unis: "No editors to win over. Every Song and Artist of the Day is decided by the neighborhood, in the open.",
    tag: "Free, but a long shot",
  },
];

export function PaidReach() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-[64ch] mb-12 lg:mb-16"
        >
          <SectionEyebrow>No pay-to-play</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.045em] text-[clamp(40px,5.4vw,84px)]">
            Spotify has three ways to reach new listeners.
            <br />
            <span className="chrome-text">Two of them cost you.</span>
          </h2>
          <p className="text-text-secondary text-body-lg mt-6">
            Here&rsquo;s what each one asks of you, and what Unis does instead.
          </p>
        </motion.div>

        <div className="grid gap-4 lg:gap-6 md:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <motion.article
              key={tool.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-[var(--radius-card)] border border-divider bg-bg-surface overflow-hidden"
            >
              <div className="p-6 lg:p-8 flex-1">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-[12px] uppercase tracking-[0.12em] text-text-muted font-semibold">On Spotify</span>
                  <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[12px] text-text-secondary">{tool.tag}</span>
                </div>
                <h3 className="font-display font-semibold text-white text-[26px] lg:text-[30px] leading-[1.05] tracking-[-0.03em] mb-4">
                  {tool.name}
                </h3>
                <p className="text-text-muted text-[15px] leading-[1.6]">{tool.spotify}</p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.35 + i * 0.12 }}
                className="p-6 lg:p-8"
                style={{ background: "linear-gradient(140deg, rgba(22,51,135,0.9) 0%, rgba(37,99,235,0.85) 100%)" }}
              >
                <span className="text-[12px] uppercase tracking-[0.12em] text-white/80 font-semibold">On Unis</span>
                <p className="mt-3 text-white text-[16px] leading-[1.55]">{tool.unis}</p>
              </motion.div>
            </motion.article>
          ))}
        </div>

        <p className="mt-6 text-text-muted text-[13px] leading-[1.6]">
          Spotify details from its{" "}
          <a className="underline hover:text-white" href="https://artists.spotify.com/discovery-mode" target="_blank" rel="noopener noreferrer">
            Discovery Mode
          </a>
          ,{" "}
          <a className="underline hover:text-white" href="https://artists.spotify.com/display-campaigns" target="_blank" rel="noopener noreferrer">
            display campaigns
          </a>{" "}
          and{" "}
          <a className="underline hover:text-white" href="https://artists.spotify.com/playlisting" target="_blank" rel="noopener noreferrer">
            playlisting
          </a>{" "}
          pages, October 2026.
        </p>
      </div>
    </section>
  );
}
