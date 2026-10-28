"use client";

import { helpLink, VisualPanel } from "@unis/ui";
import clsx from "clsx";
import { useState } from "react";
import { FactList, FeatureSection } from "./FeatureSection";

/**
 * Playlists. The demo follows the app's real rule (PlaylistService): a
 * suggestion joins a community playlist at 5 more up votes than down, and is
 * dropped at 3 more down than up.
 */
const JOIN_AT = 5;
const DROP_AT = -3;
const START = 3;

export function Playlists() {
  return (
    <FeatureSection
      id="playlists"
      eyebrow="Playlists"
      headline="Three kinds of playlists. One belongs to the block."
      body={
        <p>
          Make your own, follow other people&rsquo;s, or help build your neighborhood&rsquo;s. Plays from any playlist
          count exactly like plays anywhere else, for you, the song and the artist.
        </p>
      }
      visual={<SuggestionDemo />}
      flip
    >
      <FactList
        items={[
          {
            lead: "Yours",
            text: "Private by default. Make one unlisted to share by link, or public so anyone on Unis can find and follow it.",
          },
          {
            lead: "The neighborhood's",
            text: "Community playlists belong to a place, not a person. Anyone can suggest a song, and the community votes on what stays. You can't vote on your own suggestion.",
          },
          {
            lead: "Unis's",
            text: "Built from award winners, plus a few picked by hand. The fastest way to hear what a neighborhood has actually been voting for.",
          },
        ]}
      />
      <a
        href={helpLink("playlists")}
        className="inline-block mt-6 text-[14px] font-medium text-brand-electric-hover underline decoration-brand-electric/40 underline-offset-4 hover:text-white"
      >
        Playlists, in full
      </a>
    </FeatureSection>
  );
}

function SuggestionDemo() {
  const [net, setNet] = useState(START);
  const [mine, setMine] = useState<"up" | "down" | null>(null);

  // Your vote moves the tally by one. Changing your mind moves it back.
  const vote = (dir: "up" | "down") => {
    if (net >= JOIN_AT || net <= DROP_AT) return;
    if (mine === dir) return;
    const step = dir === "up" ? 1 : -1;
    setNet((n) => n + step * (mine ? 2 : 1));
    setMine(dir);
  };

  // Other neighbors vote too: each tap adds one more up vote from someone else.
  const neighbor = () => {
    if (net >= JOIN_AT || net <= DROP_AT) return;
    setNet((n) => n + 1);
  };

  const reset = () => {
    setNet(START);
    setMine(null);
  };

  const joined = net >= JOIN_AT;
  const dropped = net <= DROP_AT;
  const status = joined
    ? "In. It joined the playlist."
    : dropped
      ? "Out. The neighborhood passed on it."
      : `${JOIN_AT - net} more to join, or ${net - DROP_AT} down to drop.`;

  // Meter from -3 to +5: where the tally sits on the way in or out.
  const pct = ((net - DROP_AT) / (JOIN_AT - DROP_AT)) * 100;

  return (
    <VisualPanel preview>
      <div className="p-6 sm:p-8 pt-14 sm:pt-14">
        <p className="text-brand-electric text-[13px] font-semibold">Community playlist</p>
        <p className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] mt-2">
          Uptown Late Nights
        </p>
        <p className="text-text-muted text-[13px] mt-1">Suggestions, waiting on the neighborhood</p>

        <div
          className={clsx(
            "mt-6 rounded-2xl border p-4 transition-colors",
            joined ? "border-brand-electric/60 bg-brand-electric/15" : dropped ? "border-white/10 bg-white/[0.02] opacity-60" : "border-white/10 bg-white/[0.04]"
          )}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="h-12 w-12 shrink-0 rounded-lg"
              style={{ background: "linear-gradient(135deg, var(--brand-navy), var(--accent-violet-deep))" }}
            />
            <span className="flex-1 min-w-0">
              <span className="block text-white text-[15px] font-medium truncate">Lenox After Dark</span>
              <span className="block text-text-muted text-[13px] truncate">Kay Monroe, suggested by a neighbor</span>
            </span>
            <span className="text-right">
              <span className="block font-display font-semibold text-white text-[22px] tabular-nums">
                {net > 0 ? `+${net}` : net}
              </span>
              <span className="block text-text-muted text-[11px]">net votes</span>
            </span>
          </div>

          <div className="relative h-2 rounded-full bg-white/10 mt-5" aria-hidden>
            <span
              className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-500"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--accent-violet), var(--brand-electric))" }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-text-subtle mt-1.5" aria-hidden>
            <span>Dropped at &minus;3</span>
            <span>Joins at +5</span>
          </div>

          <p className="text-white text-[14px] mt-4 min-h-[1.5em]" aria-live="polite">
            {status}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            <VoteButton label="Vote up" active={mine === "up"} disabled={joined || dropped} onClick={() => vote("up")} />
            <VoteButton label="Vote down" active={mine === "down"} disabled={joined || dropped} onClick={() => vote("down")} />
            <button
              type="button"
              onClick={neighbor}
              disabled={joined || dropped}
              className="h-10 px-4 rounded-full text-[14px] font-medium text-text-secondary bg-white/[0.06] hover:bg-white/10 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-electric"
            >
              A neighbor votes up
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-4 text-[13px] font-medium text-text-muted underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-electric rounded-sm"
        >
          Start over
        </button>
      </div>
    </VisualPanel>
  );
}

function VoteButton({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "h-10 px-4 rounded-full text-[14px] font-display font-semibold transition-colors disabled:opacity-40",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-electric",
        active ? "bg-white text-brand-navy" : "bg-brand-electric text-white hover:bg-brand-electric-hover"
      )}
    >
      {label}
    </button>
  );
}
