import { Button, PageHero, UNIS_LINKS, VideoSlot, VisualPanel } from "@unis/ui";
import type { CSSProperties } from "react";

/**
 * Get heard — hero. Video slot A2 (apps/artists/public/videos/get-heard.mp4):
 * until that file exists, the coded block below plays instead — a row of
 * brownstone windows lighting up floor by floor like equalizer bars.
 */
export function GetHeardHero() {
  return (
    <PageHero
      eyebrow="Get heard"
      lines={[
        "Get heard",
        <span key="pay" className="chrome-text">
          without paying for it.
        </span>,
      ]}
      body="On Spotify, reach is something you pitch for or pay for. On Unis nobody can buy a spot: your neighbors' plays, likes and votes decide who rises."
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up as an artist
          </Button>
          <Button as="a" href="#how-a-song-climbs" variant="secondary" size="lg">
            How a song climbs
          </Button>
        </>
      }
      media={<VideoSlot src="/videos/get-heard.mp4" fallback={<BlockGlow />} />}
    />
  );
}

const COLUMNS = 5;
const FLOORS = 6;
/** Each building pulses at its own speed so the block never moves in lockstep. */
const SPEEDS = [3.1, 2.6, 3.6, 2.8, 3.3];

function BlockGlow() {
  return (
    <VisualPanel>
      <div className="relative h-full flex flex-col">
        {/* Night sky */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #070a14 0%, #0b1226 55%, #10204d 100%)" }}
        />

        {/* The block: five brownstones, windows climbing like EQ bars */}
        <div className="relative mt-auto mx-5 sm:mx-7 h-[66%] grid grid-cols-5 gap-2 sm:gap-3 items-end" aria-hidden>
          {Array.from({ length: COLUMNS }).map((_, col) => (
            <div
              key={col}
              className="rounded-t-[10px] px-2 sm:px-2.5 pt-3 pb-2 grid gap-1.5 sm:gap-2"
              style={{
                background: "linear-gradient(180deg, #2a1d1a 0%, #1d1513 100%)",
                height: `${78 + (col % 2 === 0 ? 4 : -2)}%`,
                gridTemplateRows: `repeat(${FLOORS}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: FLOORS }).map((__, floor) => {
                const fromBottom = FLOORS - 1 - floor;
                const style = {
                  "--dur": `${SPEEDS[col]}s`,
                  "--delay": `${col * 0.35 + fromBottom * 0.16}s`,
                  background: "linear-gradient(180deg, #ffd27a 0%, #f59e0b 100%)",
                  boxShadow: "0 0 18px rgba(245, 158, 11, 0.55)",
                } as CSSProperties;
                return (
                  <span key={floor} className="grid grid-cols-2 gap-1">
                    <span className="window-glow rounded-[3px]" style={style} />
                    <span className="window-glow rounded-[3px]" style={style} />
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Street glow */}
        <div
          aria-hidden
          className="relative h-[16%] min-h-[64px]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.65) 0%, rgba(37,99,235,0.15) 45%, transparent 75%), #0a0e1a",
          }}
        />

        {/* Race card */}
        <div className="absolute left-5 right-5 top-5 sm:left-7 sm:right-auto sm:top-7 rounded-2xl border border-white/10 bg-bg-deep/70 backdrop-blur-md px-4 py-3 sm:px-5 sm:py-4">
          <div className="flex items-center gap-2 text-[12px] sm:text-[13px] text-text-secondary">
            <span aria-hidden className="live-dot inline-block w-2 h-2 rounded-full bg-brand-electric text-brand-electric" />
            Tonight&rsquo;s race
          </div>
          <div className="mt-1 font-display font-semibold text-white text-[18px] sm:text-[20px] tracking-[-0.02em]">
            Song of the Day &middot; Uptown Harlem
          </div>
          <div className="mt-1 text-[13px] text-text-muted">Decided by plays, likes and votes. Not by ads.</div>
        </div>
      </div>
    </VisualPanel>
  );
}
