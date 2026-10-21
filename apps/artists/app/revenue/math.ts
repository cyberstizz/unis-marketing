/**
 * Revenue math — the single source of truth for the Revenue page.
 *
 * Every projection on the page (calculator, worked examples, Spotify
 * comparison) runs through these functions. They follow the live Unis model,
 * as published in the help center (unis-sample src/data/helpContent.jsx,
 * "Earnings and payouts") and the in-app Artist Agreement schedule:
 *
 *   Song sales & support   Artist keeps the price minus Unis's fee:
 *                          10%, or Stripe's card fee + 1¢ if that's higher.
 *                          Minimum song price $0.94.
 *   Community Share        Everything Unis earns goes into one monthly pot,
 *                          divided by counted plays. Each listener's slice
 *                          splits 15% to their supported artist, 10/5/2% up
 *                          their referral chain, 68% stays with Unis.
 *   Unis Plus ($4.99/mo)   60% of the fee after Stripe's fees (≈ $2.70) goes
 *                          to the artists that subscriber played, by plays.
 *   Audio ads (not live)   60% of the net from ads played with your songs.
 *
 * Nobody is paid per ad seen, and there are no MLC deductions in this model —
 * Unis claims no mechanical rights (Terms of Service §3.2).
 */

// ── Fee rule (mirrors unis-sample utils/platformFee.js and the backend) ──

export const MIN_SONG_PRICE = 0.94;

function stripeCardFeeCents(cents: number): number {
  if (cents <= 0) return 0;
  return Math.floor((cents * 29 + 999) / 1000) + 30;
}

/** Unis's fee on a song sale or support payment, in dollars. */
export function platformFee(price: number): number {
  const cents = Math.floor(Math.round(price * 100));
  if (cents <= 0) return 0;
  const share = Math.round(cents * 0.1);
  return Math.min(cents, Math.max(share, stripeCardFeeCents(cents) + 1)) / 100;
}

/** What the artist receives from a payment, in dollars. */
export function artistReceives(price: number): number {
  return Math.max(0, Math.round(price * 100) / 100 - platformFee(price));
}

export const REVENUE_ASSUMPTIONS = {
  /** Unis Plus price per month. */
  plusPrice: 4.99,
  /** Artists' 60% of one Plus subscription after Stripe's fees (help center: "$2.70"). */
  plusArtistPool: 2.7,
  /** Most counted plays one listener can add in a month (50 a day). */
  maxCountedPlaysPerMonth: 1500,
  /** Assumed net per filled audio ad, for the "once audio ads launch" view only. */
  audioNetPerFill: 0.015,
} as const;

export const SPLITS = {
  communityShare: {
    platform: 0.68,
    supporter: 0.15,
    referralL1: 0.1,
    referralL2: 0.05,
    referralL3: 0.02,
  },
  plus: { artists: 0.6, platform: 0.4 },
  audio: { artist: 0.6, platform: 0.4 },
} as const;

// ── Calculator input shape ──

export type CalculatorInputs = {
  /** People who picked you as their supported artist. */
  supporters: number;
  /** Counted plays per supporter/referral per month (any artist, capped at 50/day). */
  playsPerListener: number;
  /** What the month's Community Share pot works out to per 1,000 counted plays, in $. */
  poolPer1000Plays: number;
  /** Unis Plus subscribers who play your songs. */
  plusListeners: number;
  /** Fraction 0–1 of those subscribers' plays that are your songs. */
  plusShareOfPlays: number;
  /** People you invited directly (level 1). */
  referralsL1: number;
  monthlySales: number;
  salePrice: number;
  // Only used once audio ads are live:
  monthlyAudioPlays: number;
  /** Fraction 0–1 of plays of your songs that carry an ad. */
  audioAdFillRate: number;
};

export type CalculatorMode = "at-launch" | "with-audio";

export type StreamBreakdown = {
  /** Your 15% of your supporters' monthly Community Share slices. */
  supporters: number;
  /** Your part of the 60% Unis Plus pool, by plays. */
  plus: number;
  /** What you keep from song sales. */
  sales: number;
  /** Your 10% of your direct referrals' slices. */
  referralL1: number;
  /** 60% of audio ads on your songs (only when audio ads are modeled). */
  audio: number;
  total: number;
};

// ── Math ──

function perPlay(i: CalculatorInputs) {
  return i.poolPer1000Plays / 1000;
}

function countedPlays(i: CalculatorInputs) {
  return Math.min(i.playsPerListener, REVENUE_ASSUMPTIONS.maxCountedPlaysPerMonth);
}

/** One listener's monthly slice of the Community Share. */
export function listenerSlice(i: CalculatorInputs): number {
  return countedPlays(i) * perPlay(i);
}

export function supporterIncome(i: CalculatorInputs): number {
  return i.supporters * listenerSlice(i) * SPLITS.communityShare.supporter;
}

export function plusIncome(i: CalculatorInputs): number {
  return i.plusListeners * REVENUE_ASSUMPTIONS.plusArtistPool * i.plusShareOfPlays;
}

export function salesIncome(i: CalculatorInputs): number {
  return i.monthlySales * artistReceives(Math.max(i.salePrice, MIN_SONG_PRICE));
}

export function referralL1Income(i: CalculatorInputs): number {
  return i.referralsL1 * listenerSlice(i) * SPLITS.communityShare.referralL1;
}

export function audioIncome(i: CalculatorInputs): number {
  return i.monthlyAudioPlays * i.audioAdFillRate * REVENUE_ASSUMPTIONS.audioNetPerFill * SPLITS.audio.artist;
}

export function computeBreakdown(inputs: CalculatorInputs, mode: CalculatorMode): StreamBreakdown {
  const supporters = supporterIncome(inputs);
  const plus = plusIncome(inputs);
  const sales = salesIncome(inputs);
  const referralL1 = referralL1Income(inputs);
  const audio = mode === "with-audio" ? audioIncome(inputs) : 0;
  return {
    supporters,
    plus,
    sales,
    referralL1,
    audio,
    total: supporters + plus + sales + referralL1 + audio,
  };
}

// ── URL sharing ──

const SHORT_KEYS: Record<keyof CalculatorInputs, string> = {
  supporters: "s",
  playsPerListener: "pl",
  poolPer1000Plays: "pk",
  plusListeners: "u",
  plusShareOfPlays: "us",
  referralsL1: "r",
  monthlySales: "d",
  salePrice: "dp",
  monthlyAudioPlays: "ap",
  audioAdFillRate: "af",
};

const PARAM_KEYS = Object.keys(SHORT_KEYS) as Array<keyof CalculatorInputs>;

const LONG_KEYS: Record<string, keyof CalculatorInputs> = Object.fromEntries(
  Object.entries(SHORT_KEYS).map(([k, v]) => [v, k as keyof CalculatorInputs])
);

export function inputsToQueryString(inputs: CalculatorInputs, mode: CalculatorMode): string {
  const params = new URLSearchParams();
  for (const key of PARAM_KEYS) {
    const val = Math.round(inputs[key] * 10000) / 10000;
    params.set(SHORT_KEYS[key], String(val));
  }
  params.set("m", mode === "with-audio" ? "a" : "l");
  return params.toString();
}

export function inputsFromQueryString(
  search: string,
  defaults: CalculatorInputs
): { inputs: CalculatorInputs; mode: CalculatorMode } {
  const params = new URLSearchParams(search);
  const inputs: CalculatorInputs = { ...defaults };
  for (const [short, long] of Object.entries(LONG_KEYS)) {
    const raw = params.get(short);
    if (raw !== null) {
      const num = parseFloat(raw);
      if (!Number.isNaN(num)) {
        (inputs as Record<string, number>)[long] = num;
      }
    }
  }
  const mode: CalculatorMode = params.get("m") === "a" ? "with-audio" : "at-launch";
  return { inputs, mode };
}

// ── Defaults ──

export const DEFAULT_INPUTS: CalculatorInputs = {
  supporters: 100,
  playsPerListener: 300,
  poolPer1000Plays: 2,
  plusListeners: 10,
  plusShareOfPlays: 0.2,
  referralsL1: 25,
  monthlySales: 10,
  salePrice: 0.99,
  monthlyAudioPlays: 5000,
  audioAdFillRate: 0.6,
};

// ── Helpers ──

export function formatMoney(n: number): string {
  if (n >= 1000) {
    return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `$${n.toFixed(2)}`;
}

export function formatPercent(n: number): string {
  return `${Math.round(n * 100)}%`;
}
