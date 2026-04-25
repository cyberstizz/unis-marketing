import { PillarSection, CheckBullet } from "@unis/ui";

export function GetPaidWhileYouSleep() {
  return (
    <PillarSection
      id="get-paid"
      eyebrow="Income"
      headline={
        <>
          Earn from fans
          <br />
          who never
          <br />
          <span className="chrome-text">press play.</span>
        </>
      }
      body={
        <>
          On Unis, every listener picks one artist to support the moment they
          sign up. Then they keep supporting you whether they stream your music
          or not. It's patronage, built into the platform — and it stacks with
          everything else.
        </>
      }
      visual={<IncomeStreams />}
      visualSide="left"
      cta={{ label: "See the revenue model", href: "/revenue" }}
    >
      <CheckBullet title="Supporter income." delay={0}>
        Every user backs one artist at signup. A cut of their ad revenue flows
        to that artist daily, automatically, whether they press play or not.
      </CheckBullet>
      <CheckBullet title="Direct subscription income." delay={100}>
        When a supporter upgrades to ad-free, half their monthly payment goes
        straight to you. Not pooled. Not pro-rata. Direct.
      </CheckBullet>
      <CheckBullet title="Audio ad revenue." delay={200}>
        60% of net on every pre-roll before your songs.
      </CheckBullet>
      <CheckBullet title="Referral income." delay={300}>
        Bring new users to Unis and earn from their activity, three levels
        deep. 10% / 5% / 2%.
      </CheckBullet>
    </PillarSection>
  );
}

/**
 * Four income streams represented as stacked horizontal bars —
 * a "revenue vertical garden" showing the compounding nature of the model.
 */
function IncomeStreams() {
  const streams = [
    { label: "Supporters", pct: "15%", color: "var(--accent-violet)", width: "38%" },
    { label: "Paid subscriptions", pct: "50%", color: "var(--accent-violet-deep)", width: "66%" },
    { label: "Audio ads", pct: "60%", color: "var(--brand-electric)", width: "78%" },
    { label: "Referrals", pct: "10/5/2%", color: "var(--brand-electric-muted)", width: "48%" },
    { label: "Direct sales", pct: "85%", color: "var(--brand-navy)", width: "92%" },
  ];

  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden p-10 flex flex-col justify-center gap-6"
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

      <div className="relative">
        <div className="text-eyebrow uppercase text-brand-electric mb-2 font-semibold">
          Revenue Streams
        </div>
        <div className="font-display text-white text-[28px] leading-tight tracking-[-0.02em] mb-8">
          Five ways to earn.
          <br />
          Stacked. Automatic.
        </div>

        <div className="space-y-4">
          {streams.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-white text-sm font-medium">
                  {s.label}
                </span>
                <span
                  className="font-display font-semibold text-[20px] tracking-[-0.02em]"
                  style={{ color: s.color }}
                >
                  {s.pct}
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: s.color,
                    width: s.width,
                    transition: "width 1s var(--ease-out-quart)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
