import { PillarSection, CheckBullet } from "@unis/ui";

export function RepYourNeighborhood() {
  return (
    <PillarSection
      id="rep-your-neighborhood"
      eyebrow="Belonging"
      headline={
        <>
          Find the best music
          <br />
          on your block.
          <br />
          <span className="chrome-text">Or anywhere else.</span>
        </>
      }
      body={
        <>
          Unis is built around where you live. The moment you open the app, you
          see what's moving in your neighborhood right now. Curious what Harlem
          sounds like this week? Look it up. Bed-Stuy? Look it up. Every
          neighborhood in the country has its own living chart, updated by the
          people who live there.
        </>
      }
      visual={<NeighborhoodVisual />}
      visualSide="left"
      cta={{ label: "See how jurisdictions work", href: "/jurisdictions" }}
    >
      <CheckBullet title="Local charts, six tiers deep." delay={0}>
        Sub-neighborhood → neighborhood → city → greater territory → state →
        sitewide. Drill as deep as you want.
      </CheckBullet>
      <CheckBullet title="Look up any neighborhood in America." delay={100}>
        Planning a trip? See what's popping where you're going, before you get
        there.
      </CheckBullet>
      <CheckBullet title="Support an artist from day one." delay={200}>
        Every Unis account is tied to one artist you chose to support. A piece
        of your activity funds their career, automatically. Switch them
        whenever you want.
      </CheckBullet>
      <CheckBullet title="Invite-only community." delay={300}>
        You got in because someone you know vouched for you. No bots. No fake
        accounts. No streaming farms. Just real people, real neighborhoods,
        real taste.
      </CheckBullet>
    </PillarSection>
  );
}

function NeighborhoodVisual() {
  const hoods = [
    { name: "Harlem", top: "22%", left: "40%", count: "2,418" },
    { name: "Washington Heights", top: "10%", left: "22%", count: "1,904" },
    { name: "Bed-Stuy", top: "52%", left: "70%", count: "1,622" },
    { name: "South Bronx", top: "8%", left: "68%", count: "1,201" },
    { name: "Crown Heights", top: "68%", left: "58%", count: "987" },
    { name: "East Harlem", top: "32%", left: "62%", count: "841" },
    { name: "Flatbush", top: "82%", left: "50%", count: "673" },
    { name: "Inwood", top: "6%", left: "32%", count: "512" },
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
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />

      <div className="relative h-full flex flex-col">
        <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-2">
          Live now
        </div>
        <div className="font-display text-white text-[26px] leading-[1.1] tracking-[-0.02em] mb-4">
          Neighborhoods streaming
          <br />
          right now.
        </div>

        <div className="relative flex-1">
          {/* Faint grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(37, 99, 235, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(37, 99, 235, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {hoods.map((h, i) => (
            <div
              key={h.name}
              className="absolute flex items-center gap-2"
              style={{ top: h.top, left: h.left }}
            >
              <div className="relative">
                <div
                  className="w-2.5 h-2.5 rounded-full bg-brand-electric"
                  style={{
                    boxShadow: `0 0 0 ${4 + (i % 3) * 3}px rgba(37, 99, 235, 0.2)`,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full bg-brand-electric"
                  style={{
                    animation: `pulse-${i} 2.5s ease-in-out infinite`,
                  }}
                />
              </div>
              <div className="text-white text-[11px] whitespace-nowrap">
                <span className="font-medium">{h.name}</span>
                <span className="text-text-muted ml-2">{h.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-text-muted text-xs mt-4">
          <span className="text-brand-electric font-semibold">●</span>{" "}
          9,358 neighbors listening right now
        </div>
      </div>
    </div>
  );
}
