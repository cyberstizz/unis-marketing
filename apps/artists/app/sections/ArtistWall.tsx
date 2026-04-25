"use client";

import { motion } from "motion/react";
import { SectionEyebrow } from "@unis/ui";

/**
 * Artist wall — 12-up portrait grid.
 *
 * Tile images: Replace the gradient placeholders with the AI-generated
 * portraits (see BRAND.md for the Midjourney/Flux prompts — one per
 * neighborhood, consistent navy/purple color grading).
 */

type Artist = {
  name: string;
  neighborhood: string;
  genre: string;
  // Placeholder gradient until real portraits are dropped in /public/artists/
  gradient: string;
};

const ARTISTS: Artist[] = [
  { name: "Mila Reyes", neighborhood: "Washington Heights", genre: "R&B", gradient: "linear-gradient(135deg, #163387 0%, #8b5cf6 100%)" },
  { name: "KT Banks", neighborhood: "Harlem", genre: "Hip-hop", gradient: "linear-gradient(135deg, #2563eb 0%, #163387 100%)" },
  { name: "Dee Vance", neighborhood: "Bed-Stuy", genre: "Soul", gradient: "linear-gradient(135deg, #6d28d9 0%, #2563eb 100%)" },
  { name: "Luz Marín", neighborhood: "South Bronx", genre: "Latin trap", gradient: "linear-gradient(135deg, #f59e0b 0%, #6d28d9 100%)" },
  { name: "Obi Ajayi", neighborhood: "Crown Heights", genre: "Afrobeat", gradient: "linear-gradient(135deg, #163387 0%, #3b82f6 100%)" },
  { name: "Jacinta Wu", neighborhood: "LES", genre: "Electronic", gradient: "linear-gradient(135deg, #8b5cf6 0%, #163387 100%)" },
  { name: "Ray Soto", neighborhood: "East Harlem", genre: "Jazz", gradient: "linear-gradient(135deg, #0a0e1a 0%, #2563eb 100%)" },
  { name: "Nico Beaumont", neighborhood: "Flatbush", genre: "Dancehall", gradient: "linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)" },
  { name: "Saige Ifeoma", neighborhood: "Morningside", genre: "Neo-soul", gradient: "linear-gradient(135deg, #6d28d9 0%, #163387 100%)" },
  { name: "Terry Klein", neighborhood: "Bushwick", genre: "Indie rock", gradient: "linear-gradient(135deg, #3b82f6 0%, #6d28d9 100%)" },
  { name: "Cam Ogilvie", neighborhood: "Inwood", genre: "Drill", gradient: "linear-gradient(135deg, #163387 0%, #0a0e1a 100%)" },
  { name: "Shae Dubois", neighborhood: "Sugar Hill", genre: "Gospel", gradient: "linear-gradient(135deg, #8b5cf6 0%, #2563eb 100%)" },
];

export function ArtistWall() {
  return (
    <section
      id="artists"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-16 max-w-[60ch]"
        >
          <SectionEyebrow>Built in Harlem</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Made by an artist.
            <br />
            For every artist.
          </h2>
          <p className="text-text-secondary text-body-lg">
            Unis was built by an independent artist who got tired of watching
            good music disappear into a scroll. Everyone below is already
            earning while you read this.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {ARTISTS.map((artist, i) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              style={{ background: artist.gradient }}
            >
              {/* Placeholder initials — swap for real portrait <img> */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <span className="font-display font-semibold text-white text-[56px] tracking-[-0.04em]">
                  {artist.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              {/* Hover scrim with name + neighborhood */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,14,26,0) 40%, rgba(10,14,26,0.95) 100%)",
                }}
              >
                <div className="text-white font-display font-semibold text-[17px] tracking-tight">
                  {artist.name}
                </div>
                <div className="text-text-muted text-[13px] flex items-center gap-1.5 mt-0.5">
                  <span>{artist.neighborhood}</span>
                  <span className="text-brand-electric">·</span>
                  <span>{artist.genre}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
