import { PillarSection, CheckBullet } from "@unis/ui";

export function YouDecide() {
  return (
    <PillarSection
      id="you-decide"
      eyebrow="Democratic discovery"
      headline={
        <>
          The only charts
          <br />
          that listen
          <br />
          <span className="chrome-text">to you.</span>
        </>
      }
      body={
        <>
          Forget playlist editors. Forget ghost artists filling your chill mix.
          Forget songs paid into your rotation. On Unis, charts are decided by
          the people who actually live where the music is made — and your vote
          counts the same as everyone else's.
        </>
      }
      visual={<VotingVisual />}
      visualSide="left"
      cta={{ label: "See how voting works", href: "/voting" }}
    >
      <CheckBullet title="Vote in your neighborhood." delay={0}>
        Pick your song of the day, week, month, quarter, or year. Your vote
        competes in six jurisdiction tiers from sub-neighborhood to nationwide.
      </CheckBullet>
      <CheckBullet title="Don't feel like voting? Your plays still count." delay={100}>
        Listens and likes feed the tiebreaker system, so even passive listening
        rewards the artists you care about.
      </CheckBullet>
      <CheckBullet title="No payola." delay={200}>
        No Discovery Mode. No ghost artists. No label money buying slots in
        your feed.
      </CheckBullet>
      <CheckBullet title="Permanent public record." delay={300}>
        The songs and artists your neighborhood crowns get documented forever —
        so ten years from now, you can show someone what the block sounded
        like in 2026.
      </CheckBullet>
    </PillarSection>
  );
}

function VotingVisual() {
  const ballot = [
    { rank: 1, artist: "Mila Reyes", song: "North Side Summer", votes: "2,418" },
    { rank: 2, artist: "KT Banks", song: "Convent Ave", votes: "2,104" },
    { rank: 3, artist: "Dee Vance", song: "Brown Paper", votes: "1,877" },
    { rank: 4, artist: "Obi Ajayi", song: "Morningside", votes: "1,502" },
    { rank: 5, artist: "Ray Soto", song: "116 Blues", votes: "1,298" },
  ];

  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden p-8"
      style={{
        background:
          "linear-gradient(135deg, #0a0e1a 0%, #111828 60%, #163387 100%)",
        border: "1px solid rgba(37, 99, 235, 0.2)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />

      <div className="relative">
        <div className="flex items-baseline justify-between mb-2">
          <div className="text-eyebrow uppercase text-brand-electric font-semibold">
            Song of the day
          </div>
          <div className="text-text-muted text-xs">Live · Harlem</div>
        </div>
        <div className="font-display text-white text-[26px] leading-[1.1] tracking-[-0.02em] mb-6">
          Decided by 9,499 votes
          <br />
          from your neighbors.
        </div>

        <div className="space-y-2.5">
          {ballot.map((item, i) => (
            <div
              key={item.rank}
              className="flex items-center gap-3 p-3 rounded-lg"
              style={{
                background:
                  i === 0
                    ? "rgba(37, 99, 235, 0.18)"
                    : "rgba(255, 255, 255, 0.03)",
                border:
                  i === 0
                    ? "1px solid rgba(37, 99, 235, 0.4)"
                    : "1px solid transparent",
              }}
            >
              <div
                className="font-display font-semibold text-[18px] tracking-tight w-6"
                style={{
                  color: i === 0 ? "var(--brand-electric)" : "var(--text-muted)",
                }}
              >
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">
                  {item.song}
                </div>
                <div className="text-text-muted text-xs truncate">
                  {item.artist}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="font-display font-semibold text-sm tracking-tight"
                  style={{
                    color: i === 0 ? "var(--brand-electric)" : "var(--text-secondary)",
                  }}
                >
                  {item.votes}
                </div>
                <div className="text-text-muted text-[10px] uppercase tracking-wider">
                  votes
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
