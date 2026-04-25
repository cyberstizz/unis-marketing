/**
 * The Math — data layer.
 *
 * Every percentage, assumption, and commitment referenced on the /math page
 * lives here. This is the single public-facing source of truth. Copy edits
 * happen in one place; UI consumes everything.
 */

// ── Revenue sources and their splits ──────────────────────────────────────

export type PayeeKey =
  | "artist"
  | "unis"
  | "supporter"
  | "referralL1"
  | "referralL2"
  | "referralL3"
  | "mlc";

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
    sublabel: "Performing songwriter's cut",
    color: "#2563eb",
  },
  unis: {
    key: "unis",
    label: "Unis",
    sublabel: "Platform operating share",
    color: "#163387",
  },
  supporter: {
    key: "supporter",
    label: "Supported artist",
    sublabel: "User's chosen artist · 15% of display ads",
    color: "#8b5cf6",
  },
  referralL1: {
    key: "referralL1",
    label: "Referrer · L1",
    sublabel: "User's direct referrer",
    color: "#3b82f6",
  },
  referralL2: {
    key: "referralL2",
    label: "Referrer · L2",
    sublabel: "Referrer's referrer",
    color: "#6d28d9",
  },
  referralL3: {
    key: "referralL3",
    label: "Referrer · L3",
    sublabel: "Third-degree referrer",
    color: "#a855f7",
  },
  mlc: {
    key: "mlc",
    label: "MLC",
    sublabel: "Compulsory mechanical royalties",
    color: "#f59e0b",
  },
};

export type SourceKey = "display" | "audio" | "paidTier" | "directSale";

export type SourceMeta = {
  key: SourceKey;
  label: string;
  tagline: string;
  note?: string;
  liveStatus: "live" | "coming-soon";
  /** Total dollars "entering" the split, for illustrative purposes. */
  gross: number;
  /**
   * Split in cents (always sums to 100). Keyed by payee. Any payee not in
   * the map is assumed to receive 0 on this source.
   *
   * For audio ads, we model MLC as a first-cut off the top, then the
   * remaining net split per the Earnings dashboard code. The simulator
   * visualizes this as MLC receiving 15.3% first, then the remainder
   * flowing through the 60/23/10/5/2 split.
   */
  split: Partial<Record<PayeeKey, number>>;
};

export const SOURCES: Record<SourceKey, SourceMeta> = {
  display: {
    key: "display",
    label: "Display ad",
    tagline: "Banner/interstitial ads served via Google AdSense during browsing.",
    liveStatus: "live",
    gross: 1,
    split: {
      unis: 68,
      supporter: 15,
      referralL1: 10,
      referralL2: 5,
      referralL3: 2,
    },
  },
  audio: {
    key: "audio",
    label: "Audio ad",
    tagline: "Pre-roll ads served before a song plays.",
    note: "Coming soon — rolls out when Unis finalizes an agreement with an audio ad partner.",
    liveStatus: "coming-soon",
    gross: 1,
    split: {
      // MLC comes off the top first (15.3% of gross), then the remaining 84.7%
      // splits per the audio table: 60% artist / 23% unis / 10/5/2 referrals.
      // We represent this as absolute-of-gross cents so the bars visualize
      // correctly: 15.3 + 50.82 + 19.48 + 8.47 + 4.235 + 1.694 = ~100.
      mlc: 15.3,
      artist: 50.82,
      unis: 19.48,
      referralL1: 8.47,
      referralL2: 4.24,
      referralL3: 1.69,
    },
  },
  paidTier: {
    key: "paidTier",
    label: "Paid subscription",
    tagline: "$5.99/month ad-free upgrade. No ads served to this user.",
    liveStatus: "live",
    gross: 5.99,
    split: {
      artist: 50,
      unis: 50,
    },
  },
  directSale: {
    key: "directSale",
    label: "Direct sale",
    tagline: "Fan buys a track direct from the artist at $1.99 minimum.",
    liveStatus: "live",
    gross: 1.99,
    split: {
      artist: 85,
      unis: 15,
    },
  },
};

/** The canonical ordering for displaying sources left-to-right. */
export const SOURCE_ORDER: SourceKey[] = [
  "display",
  "audio",
  "paidTier",
  "directSale",
];

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
    id: "ad-rev-per-user",
    label: "Average ad revenue per active user",
    value: "$0.70 / month",
    methodology:
      "Conservative launch estimate based on industry-average display ad fill rates and eCPM data for music/entertainment apps serving a US audience in 2025–2026. Intentionally set below the $0.80–$2.50 range observed across comparable apps to avoid over-promising during pre-launch.",
    source:
      "Industry benchmarks (IAB, SpotX ad performance reports 2025); methodology to be replaced with actual Unis platform data once statistically significant user base is reached.",
    lastReviewed: "April 2026",
    revisable: true,
  },
  {
    id: "mlc-rate",
    label: "Mechanical licensing compulsory rate",
    value: "15.30 % of gross",
    methodology:
      "Mechanical royalty paid to the Mechanical Licensing Collective (MLC) on any audio stream where a musical composition is publicly performed. Deducted from gross audio ad revenue before the net splits to artist, Unis, and referral chain. Display ads are not subject to mechanical royalties because no musical work is performed.",
    source:
      "Copyright Royalty Board Phonorecords IV, effective rates for streaming services; climbs to 15.35% in 2027.",
    lastReviewed: "April 2026",
    revisable: false,
  },
  {
    id: "paid-tier-price",
    label: "Paid tier price",
    value: "$5.99 / month",
    methodology:
      "Set below Spotify Premium's $11.99 individual tier by design, to reduce friction for first-time paid-tier adoption among existing Unis users. 50% of every subscription routes directly to the user's supported artist; the remaining 50% funds platform operations.",
    source:
      "Internal pricing decision. Subject to revision based on churn, conversion, and geographic purchasing-power data post-launch.",
    lastReviewed: "April 2026",
    revisable: true,
  },
  {
    id: "direct-sale-floor",
    label: "Direct sale price floor",
    value: "$1.99 per track",
    methodology:
      "Minimum price an artist can set for a direct track sale on Unis. Artists may set higher prices at their discretion. 85% of the sale price goes to the artist; 15% covers Stripe processing fees (~3%) and platform operations.",
    source:
      "Internal pricing decision. Set above iTunes' historical $0.99 floor to meaningfully exceed breakeven on processing fees.",
    lastReviewed: "April 2026",
    revisable: true,
  },
  {
    id: "payout-threshold",
    label: "Minimum balance for payout",
    value: "$50.00",
    methodology:
      "Stripe Connect payout fees effectively eat small transfers. Below $50, platform fees would reduce artist take-home by a material percentage. Above $50, fees are negligible. Earnings below the threshold never expire — they roll over month-to-month until reached. Direct sales bypass this threshold and pay out in 2 business days.",
    source:
      "Stripe Connect fee schedule for ACH deposits in the United States.",
    lastReviewed: "April 2026",
    revisable: true,
  },
  {
    id: "payout-timing-sales",
    label: "Direct sale payout timing",
    value: "2 business days",
    methodology:
      "Direct track sales bypass the $50 accrual threshold. Stripe initiates a deposit to the artist's linked bank account within 2 business days of the purchase clearing (subject to standard fraud and chargeback verification). This is materially faster than industry distribution platforms, which typically aggregate direct sales into monthly or quarterly payouts.",
    source:
      "Stripe Connect settlement schedule, US domestic ACH.",
    lastReviewed: "April 2026",
    revisable: false,
  },
  {
    id: "referral-scope",
    label: "Referral chain depth",
    value: "3 levels · 10% / 5% / 2%",
    methodology:
      "Every Unis user is referred by exactly one other Unis user. When an ad (display or audio) is served to a user, 10% of that ad's revenue routes to the user's direct referrer (Level 1), 5% routes to that referrer's referrer (Level 2), and 2% routes to the third-generation referrer (Level 3). Levels 4+ do not earn from the referral chain; that fraction remains with Unis. If a referrer at any level does not exist (e.g., the user is an early adopter with no upstream chain), that fraction also reverts to Unis rather than being re-distributed.",
    source:
      "Platform architecture. Immutable on the current revenue model.",
    lastReviewed: "April 2026",
    revisable: false,
  },
  {
    id: "voting-and-engagement",
    label: "Voting and engagement weight",
    value: "Vote → plays → likes → seniority",
    methodology:
      "Any user — including artists — can vote in the jurisdiction they joined with. Winners at each tier are decided primarily by vote count within the tier. If two artists are tied on votes, the tiebreaker is total plays and likes from users in that tier. If still tied, the final tiebreaker is seniority on Unis. This means a user who never casts an explicit vote still influences the chart through their listening behavior — passive engagement counts.",
    source:
      "Platform architecture.",
    lastReviewed: "April 2026",
    revisable: false,
  },
];

// ── Transparency commitments ─────────────────────────────────────────────

export type CommitmentStatus = "committed-now" | "committed-post-audio";

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
      "Per-tier count of Daily, Weekly, Monthly, Quarterly, and Annual awards issued across every live jurisdiction — broken out by sub-neighborhood, neighborhood, city, metro, state, and sitewide. Public, permanent, historical record.",
    status: "committed-now",
  },
  {
    id: "mlc-royalties-paid",
    metric: "MLC royalties paid on behalf of artists",
    cadence: "Quarterly",
    description:
      "Total compulsory mechanical royalties Unis has paid to the Mechanical Licensing Collective on behalf of the artists on the platform. This cost is borne entirely by Unis — artists never see a deduction for publishing administration.",
    status: "committed-post-audio",
  },
  {
    id: "ad-rev-per-user",
    metric: "Actual average ad revenue per active user",
    cadence: "Quarterly",
    description:
      "The real figure replacing our $0.70 launch assumption, broken out by jurisdiction once we have statistically significant user counts in each. Methodology + raw denominators published alongside.",
    status: "committed-post-audio",
  },
  {
    id: "payouts-by-stream",
    metric: "Total paid to artists, by stream",
    cadence: "Quarterly",
    description:
      "Dollar amounts paid to artists broken out by revenue source: display ad supporter share, audio ad streaming share, paid tier subscriptions, direct sales, and referrals. The Loud & Clear equivalent — but broken out rather than pooled.",
    status: "committed-post-audio",
  },
  {
    id: "paid-conversion",
    metric: "Paid tier conversion rate",
    cadence: "Quarterly",
    description:
      "The fraction of active users who upgrade to ad-free. Published per jurisdiction so artists can benchmark their expected paid-supporter income against real platform averages.",
    status: "committed-post-audio",
  },
  {
    id: "referral-depth",
    metric: "Average referral chain depth and per-level earnings",
    cadence: "Quarterly",
    description:
      "Observed depth distribution of the referral tree (how many users have L1 chains, L2 chains, L3 chains), plus average monthly earnings by level. Helps users calibrate realistic referral-income expectations.",
    status: "committed-post-audio",
  },
  {
    id: "platform-growth",
    metric: "Active users, active artists, live jurisdictions",
    cadence: "Quarterly",
    description:
      "Headline growth numbers: monthly active users, artists with at least one uploaded work, and count of live jurisdictions at each tier. Published without editorial framing — just the raw numbers.",
    status: "committed-post-audio",
  },
];

// ── Platform availability ────────────────────────────────────────────────

export const PLATFORMS = [
  { label: "iOS · iPhone and iPad", href: "https://apps.apple.com/us/app/unis-music/id0000000000" },
  { label: "Android · Google Play", href: "https://play.google.com/store/apps/details?id=com.unis.music" },
  { label: "Web · unismusic.com", href: "https://unismusic.com" },
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
