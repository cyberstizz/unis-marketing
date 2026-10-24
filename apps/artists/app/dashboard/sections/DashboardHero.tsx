import { Button, PageHero, UNIS_LINKS, VideoSlot, VisualPanel } from "@unis/ui";

/**
 * Know your fans — hero. Video slot A3
 * (apps/artists/public/videos/know-your-fans.mp4): a screen recording of the
 * real dashboard. Until it exists, a coded preview of the dashboard's Home
 * screen shows instead, labeled as example figures.
 */
export function DashboardHero() {
  return (
    <PageHero
      eyebrow="Know your fans"
      mediaShape="wide"
      lines={[
        "Know every fan",
        <span key="name" className="chrome-text">
          by name.
        </span>,
      ]}
      body="Spotify shows you segments. Unis shows you people: who supports you, where they listen, and how to reach every one of them with one message."
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up as an artist
          </Button>
          <Button as="a" href="#supporters" variant="secondary" size="lg">
            See what&rsquo;s inside
          </Button>
        </>
      }
      media={<VideoSlot src="/videos/know-your-fans.mp4" fallback={<DashboardPreview />} />}
    />
  );
}

const STATS = [
  { label: "Plays", value: "1,284", delta: "+18%" },
  { label: "Listeners", value: "312", delta: "+9%" },
  { label: "Likes", value: "96", delta: "+11" },
  { label: "Followers", value: "128", delta: "+6" },
  { label: "Supporters", value: "46", delta: "+4" },
];

const FUNNEL = [
  { label: "Plays", pct: 100 },
  { label: "Listeners", pct: 62 },
  { label: "Likes", pct: 34 },
  { label: "Followers", pct: 18 },
  { label: "Supporters", pct: 8 },
];

const RANKS = [
  { place: "Uptown Harlem", rank: "#3" },
  { place: "Harlem", rank: "#8" },
  { place: "Manhattan", rank: "#64" },
];

function DashboardPreview() {
  return (
    <VisualPanel preview>
      <div className="h-full flex flex-col gap-4 p-5 sm:p-8 pt-14 sm:pt-16 overflow-hidden">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display font-semibold text-white text-[20px] sm:text-[24px] tracking-[-0.02em]">Your dashboard</span>
          <span className="text-text-muted text-[12px] sm:text-[13px]">This week vs last week</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-xl border border-white/10 bg-white/[0.05] p-3 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <div className="text-text-muted text-[12px]">{s.label}</div>
              <div className="font-display font-semibold text-white text-[22px] sm:text-[26px] tracking-[-0.02em] tabular-nums">
                {s.value}
              </div>
              <span className="text-[12px] font-semibold text-emerald-300">{s.delta}</span>
            </div>
          ))}
        </div>

        <div className="grid flex-1 min-h-0 gap-3 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
            <div className="text-white text-[14px] font-medium mb-3">From a play to a supporter</div>
            <div className="space-y-2">
              {FUNNEL.map((f) => (
                <div key={f.label} className="grid grid-cols-[84px_minmax(0,1fr)] items-center gap-3">
                  <span className="text-text-secondary text-[12px]">{f.label}</span>
                  <span className="h-4 rounded-md bg-white/[0.06] overflow-hidden">
                    <span
                      className="block h-full rounded-md"
                      style={{
                        width: `${f.pct}%`,
                        background: f.label === "Supporters" ? "var(--brand-electric)" : "rgba(147,180,255,0.55)",
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
              <div className="text-white text-[14px] font-medium mb-2">Where you stand today</div>
              {RANKS.map((r) => (
                <div key={r.place} className="flex justify-between py-1 text-[13px]">
                  <span className="text-text-secondary">{r.place}</span>
                  <span className="text-white font-semibold">{r.rank}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 text-white text-[14px] font-semibold text-center bg-brand-electric">
              Message all 46 supporters
            </div>
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
