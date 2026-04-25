import { PillarSection, CheckBullet } from "@unis/ui";

export function GetPaidToListen() {
  return (
    <PillarSection
      id="get-paid-to-listen"
      eyebrow="Listener income"
      headline={
        <>
          The first app
          <br />
          that pays
          <br />
          <span className="chrome-text">you back.</span>
        </>
      }
      body={
        <>
          You already sit through ads on every other platform. On Unis, those
          ads pay you. Invite a few friends and you start earning on every one
          of their ads too — and on the people they invite, and the people
          they invite. Three levels deep. No cap. For as long as the app
          exists.
        </>
      }
      visual={<ReferralTreeVisual />}
      visualSide="right"
      cta={{ label: "See the referral math", href: "/referrals" }}
    >
      <CheckBullet title="Earn on every referral you bring." delay={0}>
        10% of their ad revenue comes back to you on Level 1.
      </CheckBullet>
      <CheckBullet title="Keep earning as they grow the community." delay={100}>
        5% on Level 2. 2% on Level 3.
      </CheckBullet>
      <CheckBullet title="Cash out at $50." delay={200}>
        Paid via Stripe, straight to your bank account. No crypto. No points.
        No gift cards.
      </CheckBullet>
      <CheckBullet title="Real money, tracked honestly." delay={300}>
        Every ad you and your referrals see is logged with the amount it paid.
        See your breakdown any time.
      </CheckBullet>
    </PillarSection>
  );
}

/**
 * Referral-tree visual: you at top, three direct referrals on L1,
 * three on L2, three on L3. Each level labeled with its %.
 */
function ReferralTreeVisual() {
  return (
    <div
      className="relative aspect-square w-full max-w-[560px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, #1a2338 0%, #0a0e1a 70%)",
        border: "1px solid rgba(37, 99, 235, 0.15)",
      }}
    >
      <svg viewBox="0 0 560 560" className="w-full h-full">
        {/* Tree connectors */}
        <g stroke="#2563eb" strokeWidth="1" opacity="0.4" fill="none">
          {/* L0 -> L1 */}
          <line x1="280" y1="100" x2="140" y2="220" />
          <line x1="280" y1="100" x2="280" y2="220" />
          <line x1="280" y1="100" x2="420" y2="220" />
          {/* L1 -> L2 */}
          <line x1="140" y1="220" x2="80" y2="340" />
          <line x1="140" y1="220" x2="170" y2="340" />
          <line x1="280" y1="220" x2="250" y2="340" />
          <line x1="280" y1="220" x2="340" y2="340" />
          <line x1="420" y1="220" x2="400" y2="340" />
          <line x1="420" y1="220" x2="480" y2="340" />
          {/* L2 -> L3 */}
          <line x1="80" y1="340" x2="60" y2="440" />
          <line x1="170" y1="340" x2="180" y2="440" />
          <line x1="250" y1="340" x2="260" y2="440" />
          <line x1="340" y1="340" x2="330" y2="440" />
          <line x1="400" y1="340" x2="400" y2="440" />
          <line x1="480" y1="340" x2="500" y2="440" />
        </g>

        {/* You */}
        <g>
          <circle cx="280" cy="70" r="34" fill="#2563eb" />
          <text x="280" y="65" textAnchor="middle" fontSize="11" fontWeight="600" fill="white" style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            You
          </text>
          <text x="280" y="82" textAnchor="middle" fontSize="11" fill="white" opacity="0.8" style={{ fontFamily: "var(--font-body)" }}>
            earn →
          </text>
        </g>

        {/* L1 */}
        {[140, 280, 420].map((x) => (
          <g key={`l1-${x}`}>
            <circle cx={x} cy="240" r="26" fill="#3b82f6" opacity="0.9" />
            <text x={x} y="244" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" style={{ fontFamily: "var(--font-display)" }}>
              10%
            </text>
          </g>
        ))}
        <text x="500" y="244" fontSize="11" fill="var(--brand-electric)" fontWeight="600" style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          L1
        </text>

        {/* L2 */}
        {[80, 170, 250, 340, 400, 480].map((x) => (
          <g key={`l2-${x}`}>
            <circle cx={x} cy="360" r="20" fill="#6d28d9" opacity="0.85" />
            <text x={x} y="364" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" style={{ fontFamily: "var(--font-display)" }}>
              5%
            </text>
          </g>
        ))}
        <text x="520" y="364" fontSize="11" fill="var(--accent-violet-deep)" fontWeight="600" style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          L2
        </text>

        {/* L3 */}
        {[60, 180, 260, 330, 400, 500].map((x) => (
          <g key={`l3-${x}`}>
            <circle cx={x} cy="460" r="15" fill="#8b5cf6" opacity="0.75" />
            <text x={x} y="464" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" style={{ fontFamily: "var(--font-display)" }}>
              2%
            </text>
          </g>
        ))}
        <text x="520" y="464" fontSize="11" fill="var(--accent-violet)" fontWeight="600" style={{ fontFamily: "var(--font-body)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          L3
        </text>

        {/* Legend */}
        <text x="40" y="530" fontSize="12" fill="white" opacity="0.7" style={{ fontFamily: "var(--font-body)" }}>
          3 levels deep. no cap. forever.
        </text>
      </svg>
    </div>
  );
}
