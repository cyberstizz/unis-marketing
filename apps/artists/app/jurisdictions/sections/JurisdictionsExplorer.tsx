"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionEyebrow, Button } from "@unis/ui";
import {
  JURISDICTIONS,
  JurisdictionChain,
  TierLevel,
  TierNode,
  WAITLIST_URL,
} from "../data";

/**
 * The Jurisdictions Explorer — the interactive centerpiece of this page.
 *
 * Layout:
 *  - Left (narrow): neighborhood picker with search filter and region tabs
 *  - Right (wide): animated tier chain + per-tier winner cards
 *
 * Behaviors:
 *  - Selecting a non-Harlem jurisdiction reveals the full tier structure but
 *    overlays a subtle "Coming soon" scrim with a waitlist link in place of
 *    actual winner data.
 *  - Tier cards cascade in top-to-bottom with a staggered animation.
 *  - Supports deep-linking via #explore=<id>.
 */
export function JurisdictionsExplorer() {
  const firstJurisdiction = JURISDICTIONS[0]!;
  const [selectedId, setSelectedId] = useState<string>(firstJurisdiction.id);
  const [query, setQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"ALL" | JurisdictionChain["region"]>("ALL");

  // Deep-linking via hash: #explore=harlem-uptown
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    const match = hash.match(/#explore=([^&]+)/);
    if (match && match[1] && JURISDICTIONS.some((j) => j.id === match[1])) {
      setSelectedId(match[1]);
    }
  }, []);

  const selected = useMemo(
    () => JURISDICTIONS.find((j) => j.id === selectedId) ?? firstJurisdiction,
    [selectedId, firstJurisdiction]
  );

  const filtered = useMemo(() => {
    return JURISDICTIONS.filter((j) => {
      const matchesQuery =
        query.length === 0 ||
        j.displayName.toLowerCase().includes(query.toLowerCase()) ||
        j.chain.some((t) => t.name.toLowerCase().includes(query.toLowerCase()));
      const matchesRegion = regionFilter === "ALL" || j.region === regionFilter;
      return matchesQuery && matchesRegion;
    });
  }, [query, regionFilter]);

  return (
    <section
      id="explorer"
      className="relative"
      style={{ padding: "var(--section-py) var(--content-px)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-10 max-w-[62ch]"
        >
          <SectionEyebrow>Explore the tiers</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            Pick a neighborhood.
            <br />
            <span className="chrome-text">See the whole chain.</span>
          </h2>
          <p className="text-text-secondary text-body-lg">
            Every neighborhood in America will eventually have a full seven-tier
            chain on Unis. Harlem is the only one live today. The rest are
            building toward it — explore what it'll look like when your block
            gets its turn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
          className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          {/* Left: neighborhood picker */}
          <JurisdictionPicker
            filtered={filtered}
            selectedId={selected.id}
            onSelect={setSelectedId}
            query={query}
            onQuery={setQuery}
            regionFilter={regionFilter}
            onRegion={setRegionFilter}
          />

          {/* Right: tier chain display */}
          <TierChainDisplay selected={selected} />
        </motion.div>
      </div>
    </section>
  );
}

// ── LEFT PANE: neighborhood picker ─────────────────────────────────────────

const REGION_OPTIONS: Array<{
  key: "ALL" | JurisdictionChain["region"];
  label: string;
}> = [
  { key: "ALL", label: "All" },
  { key: "NYC", label: "NYC" },
  { key: "East", label: "East" },
  { key: "South", label: "South" },
  { key: "Midwest", label: "Midwest" },
  { key: "West", label: "West" },
];

function JurisdictionPicker({
  filtered,
  selectedId,
  onSelect,
  query,
  onQuery,
  regionFilter,
  onRegion,
}: {
  filtered: JurisdictionChain[];
  selectedId: string;
  onSelect: (id: string) => void;
  query: string;
  onQuery: (q: string) => void;
  regionFilter: "ALL" | JurisdictionChain["region"];
  onRegion: (r: "ALL" | JurisdictionChain["region"]) => void;
}) {
  return (
    <div
      className="rounded-2xl p-5 lg:p-6 flex flex-col"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--divider)",
        maxHeight: "640px",
      }}
    >
      <div className="text-eyebrow uppercase text-text-muted font-semibold mb-3">
        Pick a neighborhood
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search any neighborhood…"
          className="w-full h-11 rounded-full px-5 text-[14px] text-white placeholder-text-muted outline-none focus:ring-2 focus:ring-brand-electric transition-all"
          style={{
            background: "var(--bg-deep)",
            border: "1px solid var(--divider-soft)",
          }}
        />
      </div>

      {/* Region tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {REGION_OPTIONS.map((r) => {
          const active = regionFilter === r.key;
          return (
            <button
              key={r.key}
              onClick={() => onRegion(r.key)}
              className="relative px-3 py-1.5 rounded-full text-[12px] font-display font-semibold tracking-tight transition-colors"
              style={{
                color: active ? "#ffffff" : "var(--text-muted)",
              }}
            >
              {active && (
                <motion.span
                  layoutId="region-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--brand-electric)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-1.5 -mr-2 pr-2 min-h-[280px]">
        {filtered.length === 0 ? (
          <div className="text-text-muted text-[13px] p-4 text-center">
            No neighborhoods match.
          </div>
        ) : (
          filtered.map((j) => {
            const isSelected = j.id === selectedId;
            const isLive = j.status === "live";
            return (
              <button
                key={j.id}
                onClick={() => onSelect(j.id)}
                className="w-full text-left p-3 rounded-lg transition-all group relative overflow-hidden"
                style={{
                  background: isSelected
                    ? "rgba(37, 99, 235, 0.12)"
                    : "transparent",
                  border: isSelected
                    ? "1px solid rgba(37, 99, 235, 0.4)"
                    : "1px solid transparent",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-[14px] font-semibold tracking-tight truncate">
                        {j.displayName}
                      </span>
                      {isLive ? (
                        <LiveDot />
                      ) : (
                        <span
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap"
                          style={{
                            background: "rgba(245, 158, 11, 0.15)",
                            color: "var(--accent-amber)",
                          }}
                        >
                          Soon
                        </span>
                      )}
                    </div>
                    <div className="text-text-muted text-[11px] mt-0.5 truncate">
                      {j.chain[j.chain.length - 2]?.name ?? j.region} ·{" "}
                      {j.region === "NYC" ? "New York" : j.region}
                    </div>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="flex-shrink-0"
                    style={{
                      color: isSelected
                        ? "var(--brand-electric)"
                        : "var(--text-muted)",
                      opacity: isSelected ? 1 : 0.5,
                    }}
                  >
                    <path
                      d="M5 3L9 7L5 11"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer note */}
      <div
        className="mt-4 pt-4 border-t text-text-muted text-[11px] leading-relaxed"
        style={{ borderColor: "var(--divider)" }}
      >
        <span className="text-brand-electric">●</span>{" "}
        Live in Harlem · Every other neighborhood launches once enough waitlist
        demand is confirmed.
      </div>
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex items-center justify-center">
      <span
        className="absolute w-2.5 h-2.5 rounded-full"
        style={{
          background: "rgba(37, 99, 235, 0.4)",
          animation: "pulse-live 1.8s ease-out infinite",
        }}
        aria-hidden
      />
      <span
        className="relative w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--brand-electric)" }}
      />
      <span
        className="text-[9px] font-semibold uppercase tracking-widest ml-1.5"
        style={{ color: "var(--brand-electric)" }}
      >
        Live
      </span>
      <style jsx>{`
        @keyframes pulse-live {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
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
    </span>
  );
}

// ── RIGHT PANE: tier chain display ──────────────────────────────────────────

function TierChainDisplay({ selected }: { selected: JurisdictionChain }) {
  const isLive = selected.status === "live";

  // Render top (T1 Sitewide) to bottom (T7 sub-neighborhood)
  const displayOrder = [...selected.chain].reverse();

  return (
    <div
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 70%, rgba(22, 51, 135, 0.25) 100%)",
        border: "1px solid rgba(37, 99, 235, 0.25)",
        boxShadow: "0 24px 80px -20px rgba(37, 99, 235, 0.25)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />

      {/* Header */}
      <div
        className="relative p-6 lg:p-8 border-b"
        style={{ borderColor: "var(--divider)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="text-eyebrow uppercase text-brand-electric font-semibold">
            Tier chain
          </div>
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-electric">
              <LiveDot />
            </span>
          ) : (
            <span
              className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-widest"
              style={{
                background: "rgba(245, 158, 11, 0.15)",
                color: "var(--accent-amber)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
              }}
            >
              Coming soon
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-white text-[clamp(26px,3.5vw,44px)] tracking-[-0.02em] leading-tight">
          {selected.displayName}
        </h3>
        <p className="text-text-muted text-[13px] mt-1">
          {isLive
            ? "Winners shown are live mock data. Real data will appear here once you're signed in."
            : selected.comingSoonNote}
        </p>
      </div>

      {/* Tier list */}
      <div className="relative p-6 lg:p-8">
        <AnimatePresence mode="popLayout">
          <div key={selected.id} className="space-y-2.5 relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[26px] top-8 bottom-8 w-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(37,99,235,0.6) 0%, rgba(139,92,246,0.4) 50%, rgba(245,158,11,0.3) 100%)",
              }}
              aria-hidden
            />

            {displayOrder.map((tier, i) => (
              <TierRow
                key={`${selected.id}-${tier.tier}`}
                tier={tier}
                winner={
                  isLive && selected.winners
                    ? selected.winners[tier.tier]
                    : undefined
                }
                isLive={isLive}
                index={i}
              />
            ))}
          </div>
        </AnimatePresence>

        {!isLive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 p-5 rounded-xl"
            style={{
              background: "rgba(245, 158, 11, 0.08)",
              border: "1px dashed rgba(245, 158, 11, 0.35)",
            }}
          >
            <div className="text-eyebrow uppercase text-accent-amber font-semibold mb-2">
              When does {selected.displayName} go live?
            </div>
            <p className="text-text-secondary text-[14px] leading-[1.55] mb-4 max-w-[52ch]">
              When enough people on the waitlist from {selected.displayName}'s
              zip codes sign up, we roll it out. The more demand we see, the
              sooner it launches.
            </p>
            <Button
              as="a"
              href={WAITLIST_URL}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener"
            >
              Join the waitlist for {selected.displayName}
              <span aria-hidden>→</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TierRow({
  tier,
  winner,
  isLive,
  index,
}: {
  tier: TierNode;
  winner?: {
    artist: string;
    song: string;
    votes: number;
    streakDays: number;
  };
  isLive: boolean;
  index: number;
}) {
  // Color gradient runs from electric blue (T1) through violet to amber (T7)
  const colorForTier: Record<TierLevel, string> = {
    1: "#f59e0b",
    2: "#a855f7",
    3: "#8b5cf6",
    4: "#8b5cf6",
    5: "#6d28d9",
    6: "#3b82f6",
    7: "#2563eb",
  };
  const accent = colorForTier[tier.tier];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="relative flex items-stretch gap-4 group"
    >
      {/* Tier badge */}
      <div
        className="flex-shrink-0 w-[52px] h-[52px] rounded-full flex items-center justify-center relative z-10"
        style={{
          background: `${accent}18`,
          border: `1.5px solid ${accent}`,
          boxShadow: `0 0 0 4px ${accent}14`,
        }}
      >
        <span
          className="font-display font-bold text-[15px] tracking-tight tabular-nums"
          style={{ color: accent }}
        >
          T{tier.tier}
        </span>
      </div>

      {/* Tier content */}
      <div
        className="flex-1 min-w-0 rounded-xl p-4 flex items-center justify-between gap-4 transition-all"
        style={{
          background: "rgba(255, 255, 255, 0.025)",
          border: "1px solid var(--divider)",
        }}
      >
        <div className="min-w-0 flex-1">
          <div className="text-white text-[15px] font-display font-semibold tracking-tight truncate">
            {tier.name}
          </div>
          <div className="text-text-muted text-[11px] mt-0.5 truncate">
            {tier.tierLabel}
          </div>
        </div>

        {isLive && winner ? (
          <div className="text-right flex-shrink-0 max-w-[50%] min-w-0">
            <div className="text-white text-[13px] font-semibold truncate">
              {winner.song}
            </div>
            <div className="text-text-muted text-[11px] flex items-center gap-1.5 justify-end">
              <span className="truncate">{winner.artist}</span>
              <span className="text-brand-electric">·</span>
              <span
                className="tabular-nums whitespace-nowrap"
                style={{ color: accent }}
              >
                {winner.votes.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        ) : (
          <div
            className="text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap"
            style={{
              color: isLive ? "var(--text-muted)" : "var(--accent-amber)",
              opacity: 0.7,
            }}
          >
            {isLive ? "—" : "Awaiting launch"}
          </div>
        )}
      </div>
    </motion.div>
  );
}
