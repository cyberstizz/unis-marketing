"use client";

import { motion } from "motion/react";
import { Button, SectionEyebrow } from "@unis/ui";
import { WAITLIST_URL } from "../data";

/**
 * Rollout map — stylized US map (not a real GeoJSON, just positioned dots and
 * a minimal outline) showing:
 *  - Harlem as a "LIVE" pulsing marker
 *  - Several coming-soon cities with waitlist counts building
 *
 * This is the "momentum" story.
 */

type CityDot = {
  name: string;
  region: string;
  /** % position on the map viewbox (0-100). */
  x: number;
  y: number;
  status: "live" | "building";
  waitlistLabel: string;
};

const CITIES: CityDot[] = [
  {
    name: "Harlem, NYC",
    region: "New York",
    x: 78,
    y: 34,
    status: "live",
    waitlistLabel: "Live since 2026",
  },
  {
    name: "South Side Chicago",
    region: "Illinois",
    x: 54,
    y: 36,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
  {
    name: "Compton, LA",
    region: "California",
    x: 10,
    y: 50,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
  {
    name: "Fifth Ward, Houston",
    region: "Texas",
    x: 46,
    y: 68,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
  {
    name: "West End, Atlanta",
    region: "Georgia",
    x: 66,
    y: 58,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
  {
    name: "Fishtown, Philly",
    region: "Pennsylvania",
    x: 76,
    y: 38,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
  {
    name: "West Oakland",
    region: "California",
    x: 8,
    y: 40,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
  {
    name: "East Side Detroit",
    region: "Michigan",
    x: 62,
    y: 30,
    status: "building",
    waitlistLabel: "Waitlist building",
  },
];

export function RolloutMap() {
  return (
    <section
      id="rollout"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12 max-w-[60ch]"
        >
          <SectionEyebrow>The rollout</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Harlem first.
            <br />
            <span className="chrome-text">Every neighborhood next.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Unis launches in Harlem and only Harlem. We expand to a new
            neighborhood when waitlist demand from that neighborhood crosses
            our launch threshold. The more signups, the sooner you're on.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative rounded-2xl overflow-hidden p-6 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 70%, rgba(22, 51, 135, 0.35) 100%)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-35 pointer-events-none"
            style={{ background: "var(--glow-electric)" }}
          />

          <div
            className="relative aspect-[2/1] w-full rounded-xl overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(22, 51, 135, 0.45) 0%, var(--bg-deep) 70%)",
              border: "1px solid rgba(37, 99, 235, 0.15)",
            }}
          >
            {/* Very stylized US silhouette — not a real map, just an abstract shape that suggests scale */}
            <svg
              viewBox="0 0 100 50"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(37, 99, 235, 0.08)" />
                  <stop offset="100%" stopColor="rgba(37, 99, 235, 0.02)" />
                </linearGradient>
              </defs>
              {/* Abstract grid dots to suggest geography */}
              {Array.from({ length: 120 }).map((_, i) => {
                const row = Math.floor(i / 20);
                const col = i % 20;
                const cx = col * 5 + 2.5;
                const cy = row * 8 + 5;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="0.4"
                    fill="rgba(37, 99, 235, 0.25)"
                  />
                );
              })}
            </svg>

            {/* City markers */}
            {CITIES.map((city, i) => (
              <CityMarker key={city.name} city={city} delay={0.2 + i * 0.08} />
            ))}
          </div>

          {/* Legend + CTA row */}
          <div className="relative mt-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px]">
              <div className="flex items-center gap-2">
                <span className="relative flex items-center justify-center w-3 h-3">
                  <span
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      background: "rgba(37, 99, 235, 0.4)",
                      animation: "pulse-live-2 1.8s ease-out infinite",
                    }}
                  />
                  <span
                    className="relative w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--brand-electric)" }}
                  />
                </span>
                <span className="text-white font-medium">Live now</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--accent-amber)", opacity: 0.8 }}
                />
                <span className="text-text-secondary">Waitlist building</span>
              </div>
            </div>
            <Button
              as="a"
              href={WAITLIST_URL}
              variant="primary"
              size="md"
              target="_blank"
              rel="noopener"
            >
              Add your neighborhood to the waitlist
              <span aria-hidden>→</span>
            </Button>
          </div>

          <style jsx>{`
            @keyframes pulse-live-2 {
              0% {
                transform: scale(0.8);
                opacity: 0.8;
              }
              70% {
                transform: scale(2.5);
                opacity: 0;
              }
              100% {
                transform: scale(0.8);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
}

function CityMarker({ city, delay }: { city: CityDot; delay: number }) {
  const isLive = city.status === "live";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group"
      style={{ left: `${city.x}%`, top: `${city.y}%` }}
    >
      <div className="relative">
        {isLive && (
          <>
            <span
              className="absolute inset-0 w-4 h-4 -translate-x-1/4 -translate-y-1/4 rounded-full"
              style={{
                background: "rgba(37, 99, 235, 0.4)",
                animation: "pulse-city 1.8s ease-out infinite",
              }}
            />
            <span
              className="absolute inset-0 w-4 h-4 -translate-x-1/4 -translate-y-1/4 rounded-full"
              style={{
                background: "rgba(37, 99, 235, 0.25)",
                animation: "pulse-city 1.8s ease-out infinite 0.6s",
              }}
            />
          </>
        )}
        <span
          className={`relative block ${isLive ? "w-2.5 h-2.5" : "w-2 h-2"} rounded-full`}
          style={{
            background: isLive ? "var(--brand-electric)" : "var(--accent-amber)",
            boxShadow: isLive
              ? "0 0 16px rgba(37, 99, 235, 0.9), 0 0 4px #ffffff"
              : "0 0 8px rgba(245, 158, 11, 0.6)",
          }}
        />
      </div>

      {/* Tooltip on hover */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        style={{ zIndex: 10 }}
      >
        <div
          className="px-3 py-2 rounded-lg text-[12px]"
          style={{
            background: "var(--bg-deep)",
            border: "1px solid var(--divider-soft)",
            boxShadow: "0 8px 24px -8px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div className="text-white font-semibold">{city.name}</div>
          <div
            className="text-[10px] uppercase tracking-widest mt-0.5"
            style={{
              color: isLive ? "var(--brand-electric)" : "var(--accent-amber)",
            }}
          >
            {city.waitlistLabel}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-city {
          0% {
            transform: scale(0.5) translate(0, 0);
            opacity: 0.9;
          }
          70% {
            transform: scale(3.5);
            opacity: 0;
          }
          100% {
            transform: scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </motion.div>
  );
}
