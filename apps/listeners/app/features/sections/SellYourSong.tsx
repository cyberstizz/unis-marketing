"use client";

import { helpLink, VisualPanel } from "@unis/ui";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { FeatureSection, SourceMark } from "./FeatureSection";

/**
 * Selling songs. The receipt uses the app's real fee rule (PlatformFees on the
 * backend): 10% of the price, or the card company's fee plus 1¢, whichever is
 * higher. Card fee = 2.9% (rounded up to the cent) + 30¢ on a US card.
 */
const PRICES = [94, 199, 500, 1000];

function split(priceCents: number) {
  const card = Math.ceil((priceCents * 29) / 1000) + 30;
  const fee = Math.min(Math.max(Math.round(priceCents * 0.1), card + 1), priceCents);
  return { price: priceCents, card, unis: fee - card, artist: priceCents - fee };
}

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

export function SellYourSong() {
  return (
    <FeatureSection
      id="selling"
      eyebrow="Selling songs"
      headline="Your song. Your price. Your fan."
      body={
        <>
          <p>
            Spotify doesn&rsquo;t sell songs at all.
            <SourceMark n={5} /> On Unis, an artist can sell any song straight to a fan, and the artist sets the
            price, from $0.94. That&rsquo;s 5&cent; under the iTunes Store&rsquo;s 99&cent; songs, so a song can
            always be cheapest here.
          </p>
          <p>
            The fan pays the listed price and nothing on top. The artist&rsquo;s part lands in their Stripe account
            the moment the fan pays. An artist can also give a song away as a free download, or keep it stream-only.
          </p>
        </>
      }
      visual={<Receipt />}
    >
      <h3 className="font-display font-semibold text-white text-[20px] tracking-[-0.02em] mb-4">
        What each one keeps from a sale
      </h3>
      <ul className="divide-y divide-divider border-y border-divider">
        <li className="py-4 grid gap-1 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-6">
          <span className="font-display font-semibold text-text-secondary text-[17px]">Spotify</span>
          <span className="text-text-muted text-[15px] leading-[1.6]">
            No song sales. It stopped selling downloads in Europe in January 2013 and never sold them in the US.
            <SourceMark n={5} />
          </span>
        </li>
        <li className="py-4 grid gap-1 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-6">
          <span className="font-display font-semibold text-text-secondary text-[17px]">Bandcamp</span>
          <span className="text-text-muted text-[15px] leading-[1.6]">
            Keeps 15% of digital sales, or 10% once an artist passes $5,000 in sales, with payment fees of about 4 to
            6% on top.
            <SourceMark n={6} />
          </span>
        </li>
        <li className="py-4 grid gap-1 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)] sm:gap-6">
          <span className="font-display font-semibold text-white text-[17px]">Unis</span>
          <span className="text-white text-[15px] leading-[1.6]">
            Keeps 10%, or just the card company&rsquo;s fee plus 1&cent; on small sales, whichever is higher. The
            card fee comes out of Unis&rsquo;s part, never the artist&rsquo;s.
          </span>
        </li>
      </ul>
      <a
        href={helpLink("payouts-sales-fee")}
        className="inline-block mt-6 text-[14px] font-medium text-brand-electric-hover underline decoration-brand-electric/40 underline-offset-4 hover:text-white"
      >
        Fees, in full
      </a>
    </FeatureSection>
  );
}

function Receipt() {
  const [price, setPrice] = useState(199);
  const reduce = useReducedMotion();
  const s = split(price);
  const rows = [
    { label: "The artist gets", value: s.artist, color: "var(--brand-electric)", strong: true },
    { label: "The card company takes", value: s.card, color: "rgba(255,255,255,0.28)" },
    { label: "Unis keeps", value: s.unis, color: "var(--accent-violet)" },
  ];

  return (
    <VisualPanel>
      <div className="p-6 sm:p-8">
        <p className="text-brand-electric text-[13px] font-semibold">One song sale</p>
        <p className="font-display text-white text-[22px] sm:text-[26px] leading-[1.1] tracking-[-0.02em] mt-2">
          Pick a price
        </p>

        <div role="radiogroup" aria-label="Song price" className="flex flex-wrap gap-2 mt-5">
          {PRICES.map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={price === p}
              onClick={() => setPrice(p)}
              className={clsx(
                "h-10 px-4 rounded-full text-[14px] font-display font-semibold tabular-nums transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-electric",
                price === p ? "bg-white text-brand-navy" : "bg-white/[0.06] text-text-secondary hover:bg-white/10"
              )}
            >
              {usd(p)}
              {p === 94 && <span className="sr-only"> (lowest price)</span>}
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-baseline justify-between border-b border-dashed border-white/15 pb-4">
          <span className="text-text-secondary text-[15px]">The fan pays</span>
          <span className="font-display font-semibold text-white text-[32px] tabular-nums">{usd(s.price)}</span>
        </div>

        <div className="flex h-3 rounded-full overflow-hidden mt-6 bg-white/5" aria-hidden>
          {rows.map((r) => (
            <motion.span
              key={r.label}
              className="h-full"
              style={{ background: r.color }}
              animate={{ width: `${(r.value / s.price) * 100}%` }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </div>

        <ul className="mt-6 space-y-3" aria-live="polite">
          {rows.map((r) => (
            <li key={r.label} className="flex items-center gap-3">
              <span aria-hidden className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: r.color }} />
              <span className={clsx("flex-1 text-[15px]", r.strong ? "text-white font-medium" : "text-text-secondary")}>
                {r.label}
              </span>
              <span
                className={clsx(
                  "font-display font-semibold tabular-nums",
                  r.strong ? "text-white text-[22px]" : "text-text-secondary text-[17px]"
                )}
              >
                {usd(r.value)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-text-muted text-[12px] leading-[1.5] mt-6">
          On a US card. Card companies charge about 30&cent; on every payment, so on small prices Unis takes only
          enough to cover that, plus 1&cent;.
        </p>
      </div>
    </VisualPanel>
  );
}
