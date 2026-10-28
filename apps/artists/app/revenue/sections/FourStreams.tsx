"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";
import { SectionEyebrow } from "@unis/ui";

type Stream = {
  number: string;
  name: string;
  tag: string;
  tagColor: string;
  comingSoon?: boolean;
  headline: string;
  what: ReactNode;
  compare: ReactNode;
  math: ReactNode;
  accent: string;
};

const STREAMS: Stream[] = [
  {
    number: "01",
    name: "Supporters",
    tag: "15% of each supporter's monthly share",
    tagColor: "var(--brand-electric)",
    headline: "Your supporters pay you whenever they listen. To anyone.",
    accent: "var(--brand-electric)",
    what: (
      <>
        Every listener backs one artist. When that&rsquo;s you,{" "}
        <strong className="text-white">15% of their slice</strong> of the
        monthly Community Share comes to you. Their slice is set by how much
        they listen while signed in, to any artist, so they don&rsquo;t have to
        be playing you.
      </>
    ),
    compare: (
      <>
        Spotify has no way for a listener to fund one specific artist from all
        of their listening. On Unis it&rsquo;s built into every account, and it
        costs the listener nothing.
      </>
    ),
    math: (
      <>
        <div>The month&rsquo;s pot is $1,000 and Unis counted 100,000 plays.</div>
        <div>A supporter who made 500 of them has a $5.00 slice.</div>
        <div>
          Your 15% → <strong className="text-white">$0.75</strong> from that one supporter.
        </div>
        <div className="pt-3 mt-3 border-t border-divider">
          <div>
            200 supporters who listen like that ={" "}
            <strong className="text-brand-electric">$150 that month</strong>.
          </div>
          <div className="text-text-muted text-[12px] pt-1">
            (The help center&rsquo;s own example. Real figures depend on what Unis earns each month.)
          </div>
        </div>
      </>
    ),
  },
  {
    number: "02",
    name: "Audio ads",
    tag: "60% of net · not live yet",
    tagColor: "var(--accent-violet)",
    comingSoon: true,
    headline: "Ads played with your songs pay you 60%.",
    accent: "var(--accent-violet)",
    what: (
      <>
        When audio ads arrive, <strong className="text-white">60% of the net</strong>{" "}
        revenue from ads played with your songs goes to you. Unis&rsquo;s 40%
        joins the Community Share pot.{" "}
        <strong className="text-white">Audio ads aren&rsquo;t live yet.</strong>
      </>
    ),
    compare: (
      <>
        Spotify pools ad money and pays it out by share of all streams. On
        Unis, the ads tied to your plays pay you first.
      </>
    ),
    math: (
      <>
        <div>5,000 plays of your songs · 60% carry an ad · $0.015 net per ad</div>
        <div>= $45 net tied to your plays</div>
        <div className="pt-3 mt-3 border-t border-divider">
          Your 60% →{" "}
          <strong className="text-accent-violet">about $27/month</strong> at that level of play.
          <div className="text-text-muted text-[12px] pt-1">(Assumed rates. Not live yet.)</div>
        </div>
      </>
    ),
  },
  {
    number: "03",
    name: "Unis Plus",
    tag: "60% of $4.99, after Stripe's fees · 15% supported + 45% by plays",
    tagColor: "var(--accent-violet-deep)",
    headline: "Every Plus subscriber pays the artist they back, and the artists they play.",
    accent: "var(--accent-violet-deep)",
    what: (
      <>
        Unis Plus is the ad-free plan at $4.99 a month. Each month,{" "}
        <strong className="text-white">60% of a subscriber&rsquo;s fee</strong>{" "}
        after Stripe&rsquo;s fees (about $2.70) goes to artists: 15% (about
        $0.67) to the artist they support, whatever they played, and 45% (about
        $2.02) shared among the artists they played, by their counted plays. If
        they played nobody, all of it goes to the artist they support.
      </>
    ),
    compare: (
      <>
        Spotify Premium money goes into one global pool split by total stream
        share, so a subscriber who mostly plays you still mostly pays the
        biggest artists. On Unis, each subscriber&rsquo;s money follows that
        subscriber&rsquo;s own plays.
      </>
    ),
    math: (
      <>
        <div>A subscriber who supports you, and whose plays this month were 25% you:</div>
        <div>
          $0.67 + $2.02 × 25% = <strong className="text-white">$1.18</strong>
        </div>
        <div className="pt-3 mt-3 border-t border-divider">
          40 subscribers like that →{" "}
          <strong style={{ color: "var(--accent-violet-deep)" }}>$47/month</strong>.
        </div>
      </>
    ),
  },
  {
    number: "04",
    name: "Song sales and support",
    tag: "Your price, minus 10% · from $0.94",
    tagColor: "var(--accent-amber)",
    headline: "Sell your songs for less than iTunes. Keep almost all of it.",
    accent: "var(--accent-amber)",
    what: (
      <>
        Set your price from <strong className="text-white">$0.94</strong>, 5¢
        under the iTunes Store&rsquo;s 99¢ songs. Unis keeps{" "}
        <strong className="text-white">10%</strong>, or only the card fee plus
        1¢ on small sales, whichever is higher. Fans can send you support
        directly on the same terms. The money lands in your Stripe account the
        moment they pay.
      </>
    ),
    compare: (
      <>
        Card companies charge about 30¢ on every payment, so on small prices
        Unis takes that fee plus one cent and nothing more. From about $4.35 up
        it&rsquo;s a flat 10%.
      </>
    ),
    math: (
      <>
        <div>$0.94 → you get $0.60</div>
        <div>$1.99 → you get $1.62</div>
        <div>$10.00 → you get $9.00</div>
        <div className="pt-3 mt-3 border-t border-divider">
          20 songs a month at $1.99 →{" "}
          <strong style={{ color: "var(--accent-amber)" }}>$32.40/month</strong>, paid
          to your Stripe account as each sale happens.
        </div>
      </>
    ),
  },
];

export function FourStreams() {
  return (
    <section style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-14 max-w-[62ch]"
        >
          <SectionEyebrow>Four ways your fans pay you</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(40px,5vw,72px)]">
            The math, broken down.
          </h2>
          <p className="text-text-secondary text-body-lg">
            Here&rsquo;s exactly what each stream is, how it pays, and what it
            looks like in dollars. Every split below is the same one the Unis
            platform runs and the help center publishes.
          </p>
        </motion.div>

        <div className="space-y-6 lg:space-y-8">
          {STREAMS.map((stream, i) => (
            <StreamCard key={stream.number} stream={stream} index={i} />
          ))}
        </div>

        {/* Referrals additive block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-8 rounded-2xl p-8 lg:p-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(22, 51, 135, 0.3) 0%, rgba(37, 99, 235, 0.1) 100%)",
            border: "1px solid rgba(37, 99, 235, 0.25)",
          }}
        >
          <div className="text-eyebrow uppercase text-brand-electric font-semibold mb-3">
            Plus, for every Unis user · not just artists
          </div>
          <h3 className="font-display font-semibold text-white text-[clamp(24px,3vw,36px)] leading-tight tracking-[-0.02em] mb-4">
            10% / 5% / 2% referrals, three levels deep.
          </h3>
          <p className="text-text-secondary text-[16px] leading-[1.6] max-w-[72ch]">
            When you bring someone to Unis, you get{" "}
            <strong className="text-white">10%</strong> of their slice of the
            monthly Community Share for as long as they keep listening.* The
            people they invite earn you <strong className="text-white">5%</strong>,
            and one step further, <strong className="text-white">2%</strong>.
            Every Unis member earns this way, not only artists. Nobody is paid
            for seeing or clicking ads.
          </p>
          <p className="mt-4 text-text-muted text-[13px] leading-[1.6] max-w-[72ch]">
            *The people you invite need a verified phone number for their
            listening to count toward your share.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function StreamCard({ stream, index }: { stream: Stream; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] rounded-2xl p-6 lg:p-10"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--divider)",
      }}
    >
      {/* Left rail */}
      <div className="flex flex-col gap-4">
        <div
          className="font-display font-semibold text-[14px] tracking-[0.12em]"
          style={{ color: stream.accent }}
        >
          {stream.number}
        </div>
        <h3 className="font-display font-semibold text-white text-[22px] lg:text-[26px] leading-[1.15] tracking-[-0.02em]">
          {stream.name}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span
            className="text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
            style={{
              background: `${stream.tagColor}18`,
              color: stream.tagColor,
              border: `1px solid ${stream.tagColor}30`,
            }}
          >
            {stream.tag}
          </span>
          {stream.comingSoon && (
            <span
              className="text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest"
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
      </div>

      {/* Right content */}
      <div>
        <div
          className="font-display font-semibold text-white text-[clamp(20px,2.4vw,30px)] leading-[1.2] tracking-[-0.02em] mb-6"
        >
          {stream.headline}
        </div>

        <div className="space-y-5 text-text-secondary text-[15px] leading-[1.65]">
          <div>
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
              What it is
            </div>
            <p>{stream.what}</p>
          </div>
          <div>
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-2">
              How it compares
            </div>
            <p>{stream.compare}</p>
          </div>
          <div
            className="rounded-lg p-5 font-mono text-[14px] leading-[1.8] space-y-1"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid var(--divider)",
            }}
          >
            <div className="text-eyebrow uppercase text-text-muted font-semibold mb-3 font-sans">
              Illustrated math
            </div>
            <div className="text-text-secondary">{stream.math}</div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
