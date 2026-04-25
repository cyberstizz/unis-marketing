import { PillarSection, CheckBullet } from "@unis/ui";

export function WinYourNeighborhood() {
  return (
    <PillarSection
      id="win-your-neighborhood"
      eyebrow="Exposure"
      headline={
        <>
          Where you're from
          <br />
          is a feature,
          <br />
          not a footnote.
        </>
      }
      body={
        <>
          Forget the algorithm. On Unis, you compete in the neighborhood you
          actually live in — and win real, permanent titles that outlive stream
          counts and trends.
        </>
      }
      visual={<JurisdictionVisual />}
      visualSide="right"
      cta={{ label: "See how jurisdictions work", href: "/jurisdictions" }}
    >
      <CheckBullet title="Six jurisdiction tiers." delay={0}>
        Sub-neighborhood → neighborhood → city → greater territory → state →
        sitewide. Compete upward. Never sideways.
      </CheckBullet>
      <CheckBullet title="Awards at every interval." delay={100}>
        Daily, weekly, monthly, quarterly, annual. Win Artist of the Day on
        your block before you chart anywhere else.
      </CheckBullet>
      <CheckBullet title="Permanent public record." delay={200}>
        Your wins are looked-up-able forever. Tell your grandkids what you won
        in 2026 — they can verify in 2056.
      </CheckBullet>
      <CheckBullet title="Jurisdiction analytics." delay={300}>
        See exactly who's playing you in Bed-Stuy vs. Crown Heights vs. Harlem.
        Book the tour where the fans already are.
      </CheckBullet>
    </PillarSection>
  );
}

/**
 * Jurisdiction visual: stacked rings showing the six tiers from
 * sub-neighborhood outward to sitewide. Each ring labeled.
 */
function JurisdictionVisual() {
  const tiers = [
    { label: "Sub-neighborhood", r: 60, opacity: 1 },
    { label: "Neighborhood", r: 100, opacity: 0.88 },
    { label: "City", r: 145, opacity: 0.72 },
    { label: "Greater territory", r: 190, opacity: 0.56 },
    { label: "State", r: 235, opacity: 0.4 },
    { label: "Sitewide", r: 280, opacity: 0.22 },
  ];

  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #1a2338 0%, #0a0e1a 70%)",
        border: "1px solid rgba(37, 99, 235, 0.15)",
      }}
    >
      <svg viewBox="-300 -300 600 600" className="w-full h-full">
        {tiers
          .slice()
          .reverse()
          .map((tier, i) => (
            <circle
              key={tier.label}
              cx="0"
              cy="0"
              r={tier.r}
              fill="none"
              stroke="var(--brand-electric)"
              strokeWidth="1.2"
              opacity={tier.opacity * 0.6}
              strokeDasharray={i % 2 === 0 ? "4 6" : "none"}
            />
          ))}

        {/* Center core — you */}
        <circle cx="0" cy="0" r="14" fill="var(--brand-electric)" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="var(--brand-electric)" strokeWidth="1" opacity="0.5" />

        {/* Trophy/award indicator */}
        <g transform="translate(0, -4)">
          <path
            d="M -4 -4 L 4 -4 L 4 2 Q 0 5 -4 2 Z"
            fill="white"
            opacity="0.9"
          />
        </g>

        {/* Tier labels */}
        {tiers.map((tier) => (
          <text
            key={`label-${tier.label}`}
            x="0"
            y={-tier.r + 14}
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            fill="white"
            opacity={Math.max(tier.opacity, 0.5)}
            style={{
              fontFamily: "var(--font-body)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {tier.label}
          </text>
        ))}
      </svg>

      {/* Corner annotation */}
      <div className="absolute bottom-6 left-6 text-text-muted text-xs">
        <div className="text-brand-electric uppercase tracking-[0.12em] font-semibold mb-1">
          You are here
        </div>
        <div>Compete upward through every tier</div>
      </div>
    </div>
  );
}
