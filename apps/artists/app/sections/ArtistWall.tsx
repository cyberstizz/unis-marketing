"use client";

import { DriftGallery, SectionEyebrow } from "@unis/ui";
import { motion } from "motion/react";

/**
 * "Every sound" — the portrait wall, reworked.
 *
 * The portraits are illustrations, so they carry no names and make no claim
 * about who is on Unis. The section says what is true for every artist: three
 * awards races, with subgenres and moods inside them (help center, "Genres,
 * subgenres and moods").
 *
 * Images: apps/artists/public/01.webp – 08.webp (web-sized copies of the PNGs).
 */
const PORTRAITS = ["01", "02", "03", "04", "05", "06", "07", "08"].map((n) => ({
  src: `/${n}.webp`,
  alt: "",
}));

const RACES = ["Rap", "Rock", "Pop"];
const TAGS = ["Drill", "Conscious", "Afrobeats", "R&B / Soul", "Punk / Emo", "Hype", "Chill", "Heartbreak"];

export function ArtistWall() {
  return (
    <section id="artists" style={{ padding: "var(--section-py) 0" }}>
      <div className="mx-auto mb-14 lg:mb-20" style={{ maxWidth: "var(--max-w)", padding: "0 var(--content-px)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end"
        >
          <div>
            <SectionEyebrow>Every sound</SectionEyebrow>
            <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.045em] text-[clamp(40px,5.4vw,84px)]">
              Rap. Rock. Pop.
              <br />
              And everything inside them.
            </h2>
          </div>
          <div>
            <p className="text-text-secondary text-body-lg mb-6">
              Three awards races. Inside each, subgenres and moods help the right
              listeners find you, and songs from their own area come up first.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Awards races and example tags">
              {RACES.map((r) => (
                <li key={r} className="rounded-full bg-white text-bg-deep px-4 py-1.5 text-[14px] font-semibold">
                  {r}
                </li>
              ))}
              {TAGS.map((t) => (
                <li key={t} className="rounded-full border border-white/15 px-4 py-1.5 text-[14px] text-text-secondary">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <DriftGallery images={PORTRAITS} />
    </section>
  );
}
