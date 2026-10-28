/**
 * The Math — data layer.
 *
 * Every percentage, assumption, and commitment referenced on the /math page
 * lives here. This is the single public-facing source of truth. Copy edits
 * happen in one place; UI consumes everything.
 */

// ── Revenue sources and their splits ──────────────────────────────────────
//
// Mirrors the live Unis model (help center "Earnings and payouts", the in-app
// Artist Agreement schedule, and utils/platformFee.js in unis-sample):
//   Community Share  one listener's monthly slice: 15 / 10 / 5 / 2 / 68
//   Unis Plus        $4.99: 60% of the fee after Stripe's fees to artists
//                    (≈ $2.70: 15% to the subscriber's supported artist,
//                    45% to the artists played, by plays), 40% to Unis
//                    (joins the pot)
//   Song sale        price minus Unis's fee: 10%, or card fee + 1¢
//   Audio ad         60% artist / 40% Unis (not live yet)
// Nobody is paid per ad seen. Nothing is deducted from artists for songwriter
// royalties (MLC mechanicals, PRO performance fees): whatever Unis owes for
// those comes out of Unis's own share.

export type PayeeKey =
  | "artist"
  | "unis"
  | "supporter"
  | "referralL1"
  | "referralL2"
  | "referralL3"
  | "cardFee";

export type PayeeMeta = {
  key: PayeeKey;
  label: string;
  sublabel: string;
  color: string;
};

export const PAYEES: Record<PayeeKey, PayeeMeta> = {
  artist: {
    key: "artist",
    label: "Artist",
    sublabel: "The artist whose music it is",
    color: "#2563eb",
  },
  unis: {
    key: "unis",
    label: "Unis",
    sublabel: "Runs the platform · Plus and ad shares join the pot",
    color: "#163387",
  },
  supporter: {
    key: "supporter",
    label: "Supported artist",
    sublabel: "The artist this listener backs",
    color: "#8b5cf6",
  },
  referralL1: {
    key: "referralL1",
    label: "Referrer · L1",
    sublabel: "Who invited this listener",
    color: "#3b82f6",
  },
  referralL2: {
    key: "referralL2",
    label: "Referrer · L2",
    sublabel: "Who invited them",
    color: "#6d28d9",
  },
  referralL3: {
    key: "referralL3",
    label: "Referrer · L3",
    sublabel: "One step further back",
    color: "#a855f7",
  },
  cardFee: {
    key: "cardFee",
    label: "Card company",
    sublabel: "Stripe's processing and billing fees",
    color: "#f59e0b",
  },
};

export type SourceKey = "community" | "plus" | "sale" | "audio";

export type SourceMeta = {
  key: SourceKey;
  label: string;
  tagline: string;
  note?: string;
  liveStatus: "live" | "coming-soon";
  /** Total dollars "entering" the split, for illustrative purposes. */
  gross: number;
  /**
   * Split as a percent of gross (sums to 100). Keyed by payee. Any payee not
   * in the map receives 0 on this source.
   */
  split: Partial<Record<PayeeKey, number>>;
};

export const SOURCES: Record<SourceKey, SourceMeta> = {
  community: {
    key: "community",
    label: "Community Share",
    tagline:
      "Everything Unis earns goes into one pot each month and is divided by counted plays. This is how one listener's slice is split.",
    note: "A listener never receives their own slice. Missing referrers' parts stay with Unis.",
    liveStatus: "live",
    gross: 1,
    split: {
      supporter: 15,
      referralL1: 10,
      referralL2: 5,
      referralL3: 2,
      unis: 68,
    },
  },
  plus: {
    key: "plus",
    label: "Unis Plus",
    tagline:
      "$4.99 a month for no ads. 60% of the fee after Stripe's fees goes to artists: 15% to the subscriber's supported artist, 45% to the artists they played, by plays.",
    note: "The supported artist's 15% arrives whatever the subscriber played. If they played nobody, all 60% goes to the artist they support.",
    liveStatus: "live",
    gross: 4.99,
    split: {
      // $4.99 → Stripe ≈ $0.49 · artists $2.70 · Unis $1.80
      artist: 54.11,
      unis: 36.07,
      cardFee: 9.82,
    },
  },
  sale: {
    key: "sale",
    label: "Song sale",
    tagline:
      "A fan buys a song at $1.99. Unis takes 10%, or the card fee plus 1¢ when that's higher, as it is here.",
    note: "The lowest price an artist can set is $0.94. From about $4.35 up, the fee is a flat 10%.",
    liveStatus: "live",
    gross: 1.99,
    split: {
      // $1.99 → card fee $0.36 · Unis $0.01 · artist $1.62
      artist: 81.41,
      cardFee: 18.09,
      unis: 0.5,
    },
  },
  audio: {
    key: "audio",
    label: "Audio ad",
    tagline: "An ad played with an artist's song.",
    note: "Coming soon. Audio ads aren't live yet.",
    liveStatus: "coming-soon",
    gross: 1,
    split: {
      artist: 60,
      unis: 40,
    },
  },
};

/** The canonical ordering for displaying sources left-to-right. */
export const SOURCE_ORDER: SourceKey[] = ["community", "plus", "sale", "audio"];

// ── Assumptions ledger ────────────────────────────────────────────────────

export type Assumption = {
  id: string;
  label: string;
  value: string;
  methodology: string;
  source: string;
  lastReviewed: string;
  revisable: boolean;
};

export const ASSUMPTIONS: Assumption[] = [
  {
    id: "community-share",
    label: "Community Share per counted play",
    value: "Set by each month's pot",
    methodology:
      "Everything Unis earns in a month (advertising, local sponsorships, Unis's part of Unis Plus, and what Unis keeps from its fees after the card company's cut) goes into one pot. After the month ends and Unis has actually been paid for it, the pot is divided by every counted play that month. Projections on this site use example values; the real figure moves with Unis's income and with how much everyone listens.",
    source:
      "Unis help center, Earnings and payouts. Real monthly figures to be published once there is enough data to be meaningful.",
    lastReviewed: "October 2026",
    revisable: true,
  },
  {
    id: "counted-plays",
    label: "What counts as a play",
    value: "Signed in · someone else's song · 50 a day",
    methodology:
      "A play counts toward the Community Share when the listener is signed in, the song isn't their own, and they're under 50 counted plays for the day. Unis staff and test accounts don't count. Nobody is paid for seeing or clicking an ad.",
    source: "Platform rules.",
    lastReviewed: "October 2026",
    revisable: false,
  },
  {
    id: "plus-price",
    label: "Unis Plus price",
    value: "$4.99 / month",
    methodology:
      "Removes every ad for the subscriber. Each month, 60% of the fee after Stripe's card and billing fees (about $2.70) goes to artists: 15% (about $0.67) to the subscriber's supported artist whatever they played, and 45% (about $2.02) to the artists they played, by counted plays. Unis's 40% joins the Community Share pot.",
    source: "Unis help center, Unis Plus.",
    lastReviewed: "October 2026",
    revisable: true,
  },
  {
    id: "sale-fee",
    label: "Fee on song sales and support",
    value: "10%, or card fee + 1¢",
    methodology:
      "Unis takes 10% of a song sale or support payment, or the card company's fee for that payment plus 1¢, whichever is higher. Under about $4.35 the card fee decides; from about $4.35 up it's a flat 10%. Buyers pay the listed price with nothing added. The lowest song price is $0.94, 5¢ under the iTunes Store's 99¢ songs.",
    source: "Platform fee rule (the same one the app uses to show artists their take-home).",
    lastReviewed: "October 2026",
    revisable: true,
  },
  {
    id: "payout-threshold",
    label: "Minimum Community Share withdrawal",
    value: "$50.00",
    methodology:
      "Community Share and Unis Plus money builds up in an artist's or referrer's Unis balance once a month and can be withdrawn to Stripe once it reaches $50. Below that it keeps building up. Song sales and support skip the threshold: they reach the artist's Stripe account when the buyer pays.",
    source: "Platform rules.",
    lastReviewed: "October 2026",
    revisable: true,
  },
  {
    id: "payout-timing",
    label: "When money reaches the bank",
    value: "Monthly, on the 1st",
    methodology:
      "Stripe pays everything in the Stripe account to the bank once a month, on the 1st, and Unis covers Stripe's payout fees. A month's Community Share is closed after Unis has been paid for it, usually in the second half of the following month.",
    source: "Platform payout schedule.",
    lastReviewed: "October 2026",
    revisable: true,
  },
  {
    id: "referral-scope",
    label: "Referral chain depth",
    value: "3 levels · 10% / 5% / 2%",
    methodology:
      "A referral link is made once, at signup, from the code in the form. Each month, 10% of a listener's Community Share slice goes to whoever invited them, 5% to the person who invited that person, and 2% one step further back. Nothing reaches a fourth level. A missing or departed referrer's part stays with Unis; it isn't passed to anyone else. Earning needs a verified phone number.",
    source: "Platform rules.",
    lastReviewed: "October 2026",
    revisable: false,
  },
  {
    id: "voting-and-engagement",
    label: "How awards are decided",
    value: "Total points, then tiebreakers",
    methodology:
      "Every vote, play and like in a period earns points. A vote is worth 10 to 250 depending on the award, a play 1, a like 5, all added into one total. The highest total wins. Ties go to vote points, then plays, likes, lifetime score and finally seniority, so every award has exactly one winner.",
    source: "Platform rules (help center, Awards).",
    lastReviewed: "October 2026",
    revisable: false,
  },
];

// ── Transparency commitments ─────────────────────────────────────────────

export type CommitmentStatus = "committed-now" | "committed-with-data";

export type Commitment = {
  id: string;
  metric: string;
  cadence: string;
  description: string;
  status: CommitmentStatus;
};

export const COMMITMENTS: Commitment[] = [
  {
    id: "awards-per-tier",
    metric: "Awards given at each tier",
    cadence: "Quarterly",
    description:
      "Per-tier count of Daily, Weekly, Monthly, Quarterly, Midterm and Annual awards issued across every live jurisdiction, from the neighborhood up to Unis. Public, permanent, historical record.",
    status: "committed-now",
  },
  {
    id: "community-share-per-play",
    metric: "What the Community Share paid per counted play",
    cadence: "Quarterly",
    description:
      "The real monthly figure that replaces the examples on this site, with the size of each month's pot and the number of counted plays alongside.",
    status: "committed-with-data",
  },
  {
    id: "payouts-by-stream",
    metric: "Total paid to artists, by stream",
    cadence: "Quarterly",
    description:
      "Dollar amounts paid to artists broken out by source: supporters' Community Share, Unis Plus, song sales and support, referrals, and audio ads once they launch. The Loud & Clear equivalent, broken out rather than pooled.",
    status: "committed-with-data",
  },
  {
    id: "plus-conversion",
    metric: "Unis Plus adoption",
    cadence: "Quarterly",
    description:
      "The share of active listeners on Unis Plus, per jurisdiction, so artists can benchmark what Plus is likely to pay them.",
    status: "committed-with-data",
  },
  {
    id: "referral-depth",
    metric: "Average referral chain depth and per-level earnings",
    cadence: "Quarterly",
    description:
      "How many members have level 1, 2 and 3 chains, plus average monthly earnings by level, so people can set realistic expectations.",
    status: "committed-with-data",
  },
  {
    id: "platform-growth",
    metric: "Active users, active artists, live jurisdictions",
    cadence: "Quarterly",
    description:
      "Headline growth numbers: monthly active users, artists with at least one uploaded song, and live jurisdictions at each tier. Published without editorial framing.",
    status: "committed-with-data",
  },
];

// ── Platform availability ────────────────────────────────────────────────

/**
 * The apps open on launch day; until then only the web signup is live, so
 * the store entries carry no links (the old ones were placeholder IDs).
 */
export const PLATFORMS: { label: string; status: string; href?: string }[] = [
  { label: "iOS · iPhone and iPad", status: "On launch day" },
  { label: "Android · Google Play", status: "On launch day" },
  { label: "Web · unismusic.com", status: "Sign up now", href: "https://unismusic.com" },
];

// ── Helpers ──────────────────────────────────────────────────────────────

export function sourceByKey(key: SourceKey): SourceMeta {
  return SOURCES[key];
}

/** Dollar share of a $1 allocation given a source + payee. */
export function dollarShare(source: SourceMeta, payee: PayeeKey): number {
  const cents = source.split[payee] ?? 0;
  return (cents / 100) * source.gross;
}
