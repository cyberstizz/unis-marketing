import { PillarSection, CheckBullet } from "@unis/ui";

export function OwnItAll() {
  return (
    <PillarSection
      id="own-it-all"
      eyebrow="Ownership"
      headline={
        <>
          Your music.
          <br />
          Your masters.
          <br />
          Your money.
        </>
      }
      body={
        <>
          Most platforms take a slice of your ownership along with your income.
          Unis takes neither. Everything you upload stays yours. Everything you
          earn hits your bank in two business days.
        </>
      }
      visual={<PillarVisual />}
      visualSide="left"
      cta={{ label: "See how ownership works", href: "/ownership" }}
    >
      <CheckBullet title="100% ownership, forever." delay={0}>
        Every song comes with a downloadable ownership agreement, signed. Keep
        it on file. Use it in court.
      </CheckBullet>
      <CheckBullet title="60% of every stream, direct." delay={100}>
        Paid straight to you — no pro-rata pool, no algorithm weighting, no
        label middleman.
      </CheckBullet>
      <CheckBullet title="Mechanical royalties, handled free." delay={200}>
        We register your songs with the Mechanical Licensing Collective and pay
        your compulsory royalties on your behalf. No admin fee. No annual
        charge. No percentage taken.
      </CheckBullet>
      <CheckBullet title="Sell direct to fans." delay={300}>
        Set your price — $1.99 or more, artist-set. Keep 85%. Paid via Stripe
        in two business days.
      </CheckBullet>
      <CheckBullet title="Leave anytime." delay={400}>
        No contracts, no lock-in, no exit fees. Your catalog walks out with
        you.
      </CheckBullet>
    </PillarSection>
  );
}

/**
 * Visual column for Own It All.
 * A stylized document/contract treatment — "ownership agreement" motif,
 * with the signature and percentage callouts. Until real imagery arrives,
 * this SVG serves as a production-ready placeholder.
 */
function PillarVisual() {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[520px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #111828 0%, #1a2338 60%, #163387 100%)",
        border: "1px solid rgba(37, 99, 235, 0.2)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "var(--glow-electric)" }}
      />
      <div className="relative h-full flex flex-col justify-between p-10">
        <div>
          <div className="text-eyebrow uppercase text-brand-electric mb-4 font-semibold">
            Ownership Agreement
          </div>
          <div className="font-display text-white text-[32px] leading-[1.1] tracking-[-0.02em] mb-2">
            "The Artist retains
            <br />
            <span className="chrome-text">100% ownership</span>
            <br />
            of all uploaded works."
          </div>
          <div className="text-text-muted text-sm mt-6 italic">
            — Section 1, Unis Artist Terms
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-text-muted text-xs uppercase tracking-wider mb-1">
              Signed
            </div>
            <svg width="140" height="50" viewBox="0 0 140 50" fill="none">
              <path
                d="M 8 35 Q 20 10, 32 30 T 56 28 Q 70 15, 85 32 T 130 25"
                stroke="white"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="font-display font-semibold text-brand-electric text-[48px] leading-none tracking-[-0.04em]">
              60%
            </div>
            <div className="text-text-muted text-xs uppercase tracking-wider">
              per stream, direct
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
