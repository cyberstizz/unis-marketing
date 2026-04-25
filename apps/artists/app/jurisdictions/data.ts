/**
 * Jurisdictions data — the single source of truth for the Jurisdictions page.
 *
 * Structure: every supported neighborhood has a complete 7-tier chain, from
 * the sub-neighborhood level at the bottom up to Sitewide at the top.
 *
 * Harlem is the only jurisdiction currently LIVE. All others are shown in
 * the explorer as "Coming soon" and push the user toward the waitlist at
 * unismusic.com/waitlist.
 *
 * Winners at each tier are illustrative placeholders — we're pre-launch and
 * intentionally use fictitious artist/song names so we don't co-opt real
 * Unis pre-launch artists for the marketing site.
 */

export type JurisdictionStatus = "live" | "coming-soon";

export type TierLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TierNode = {
  /** Short name shown in the pill (e.g. "Harlem"). */
  name: string;
  /** Longer descriptor shown on hover/expand (e.g. "Neighborhood"). */
  tierLabel: string;
  /** Tier number, 1 = Sitewide (top), 7 = sub-neighborhood (bottom). */
  tier: TierLevel;
};

export type JurisdictionChain = {
  /** URL-safe id used by the explorer's search + share URLs. */
  id: string;
  /** Display name shown in the search/pick UI. */
  displayName: string;
  /** Visual grouping for the pick grid. */
  region: "NYC" | "West" | "South" | "Midwest" | "East";
  status: JurisdictionStatus;
  /** If status is "coming-soon", text for the subtle inline badge. */
  comingSoonNote?: string;
  /** Chain from bottom (tier 7) up to the top (tier 1). */
  chain: TierNode[];
  /**
   * Mock winner at each tier level, keyed by tier number.
   * Only populated for live jurisdictions; undefined chains get skeleton
   * placeholders in the UI.
   */
  winners?: Partial<Record<TierLevel, WinnerCard>>;
};

export type WinnerCard = {
  artist: string;
  song: string;
  /** Monthly votes in this jurisdiction. Fabricated but consistent. */
  votes: number;
  /** Days the winner has held the top spot at this tier. */
  streakDays: number;
};

/** Top-level sitewide tier — shared by every chain. */
const SITEWIDE: TierNode = {
  name: "Sitewide",
  tierLabel: "Sitewide · Tier 1",
  tier: 1,
};

// ── Harlem (the only live jurisdiction) ────────────────────────────────────

const HARLEM_UPTOWN: JurisdictionChain = {
  id: "harlem-uptown",
  displayName: "Uptown Harlem",
  region: "NYC",
  status: "live",
  chain: [
    { name: "Uptown Harlem", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "Harlem", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "Uptown Manhattan", tierLabel: "Upper borough · Tier 5", tier: 5 },
    { name: "Manhattan", tierLabel: "Borough · Tier 4", tier: 4 },
    { name: "New York City", tierLabel: "City · Tier 3", tier: 3 },
    { name: "New York", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
  winners: {
    7: {
      artist: "Kito Vance",
      song: "Lenox After Dark",
      votes: 412,
      streakDays: 3,
    },
    6: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 2418,
      streakDays: 5,
    },
    5: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 3104,
      streakDays: 2,
    },
    4: {
      artist: "Shae Dubois",
      song: "Sugar Hill Sunday",
      votes: 8140,
      streakDays: 1,
    },
    3: {
      artist: "Obi Ajayi",
      song: "Fourteenth Street",
      votes: 14092,
      streakDays: 4,
    },
    2: {
      artist: "Terry Klein",
      song: "Throgs Neck",
      votes: 28410,
      streakDays: 6,
    },
    1: {
      artist: "Luz Marín",
      song: "Centro del Mundo",
      votes: 118042,
      streakDays: 2,
    },
  },
};

const HARLEM_DOWNTOWN: JurisdictionChain = {
  id: "harlem-downtown",
  displayName: "Downtown Harlem",
  region: "NYC",
  status: "live",
  chain: [
    { name: "Downtown Harlem", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "Harlem", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "Uptown Manhattan", tierLabel: "Upper borough · Tier 5", tier: 5 },
    { name: "Manhattan", tierLabel: "Borough · Tier 4", tier: 4 },
    { name: "New York City", tierLabel: "City · Tier 3", tier: 3 },
    { name: "New York", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
  winners: {
    7: {
      artist: "Dee Vance",
      song: "110 & Fifth",
      votes: 389,
      streakDays: 2,
    },
    6: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 2418,
      streakDays: 5,
    },
    5: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 3104,
      streakDays: 2,
    },
    4: {
      artist: "Shae Dubois",
      song: "Sugar Hill Sunday",
      votes: 8140,
      streakDays: 1,
    },
    3: {
      artist: "Obi Ajayi",
      song: "Fourteenth Street",
      votes: 14092,
      streakDays: 4,
    },
    2: {
      artist: "Terry Klein",
      song: "Throgs Neck",
      votes: 28410,
      streakDays: 6,
    },
    1: {
      artist: "Luz Marín",
      song: "Centro del Mundo",
      votes: 118042,
      streakDays: 2,
    },
  },
};

// ── Coming-soon jurisdictions ──────────────────────────────────────────────
// These include plausible 7-tier chains for illustrative purposes. They
// demonstrate the model at scale.

const COMPTON: JurisdictionChain = {
  id: "compton",
  displayName: "Compton",
  region: "West",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "Central Compton", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "Compton", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "South LA", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Los Angeles", tierLabel: "City · Tier 4", tier: 4 },
    { name: "Los Angeles Metro", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "California", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

const FISHTOWN: JurisdictionChain = {
  id: "fishtown",
  displayName: "Fishtown",
  region: "East",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "East Fishtown", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "Fishtown", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "River Wards", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Philadelphia", tierLabel: "City · Tier 4", tier: 4 },
    { name: "Greater Philadelphia", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "Pennsylvania", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

const SOUTHSIDE_CHICAGO: JurisdictionChain = {
  id: "southside-chi",
  displayName: "South Side Chicago",
  region: "Midwest",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "Bronzeville", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "South Side", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "South Chicago", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Chicago", tierLabel: "City · Tier 4", tier: 4 },
    { name: "Chicagoland", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "Illinois", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

const FIFTH_WARD_HOUSTON: JurisdictionChain = {
  id: "fifth-ward",
  displayName: "Fifth Ward",
  region: "South",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "Lyons Ave", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "Fifth Ward", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "North Houston", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Houston", tierLabel: "City · Tier 4", tier: 4 },
    { name: "Greater Houston", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "Texas", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

const OAKLAND: JurisdictionChain = {
  id: "oakland-west",
  displayName: "West Oakland",
  region: "West",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "Lower Bottoms", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "West Oakland", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "East Bay", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Oakland", tierLabel: "City · Tier 4", tier: 4 },
    { name: "SF Bay Area", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "California", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

const ATL: JurisdictionChain = {
  id: "atl-westside",
  displayName: "West End, Atlanta",
  region: "South",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "Ashview Heights", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "West End", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "South Atlanta", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Atlanta", tierLabel: "City · Tier 4", tier: 4 },
    { name: "Metro Atlanta", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "Georgia", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

const DETROIT: JurisdictionChain = {
  id: "detroit-eastside",
  displayName: "East Side, Detroit",
  region: "Midwest",
  status: "coming-soon",
  comingSoonNote: "Launching 2027+ · Join the waitlist",
  chain: [
    { name: "Jefferson–Chalmers", tierLabel: "Sub-neighborhood · Tier 7", tier: 7 },
    { name: "East Side", tierLabel: "Neighborhood · Tier 6", tier: 6 },
    { name: "East Detroit", tierLabel: "Greater territory · Tier 5", tier: 5 },
    { name: "Detroit", tierLabel: "City · Tier 4", tier: 4 },
    { name: "Metro Detroit", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "Michigan", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
};

export const JURISDICTIONS: JurisdictionChain[] = [
  HARLEM_UPTOWN,
  HARLEM_DOWNTOWN,
  COMPTON,
  FIFTH_WARD_HOUSTON,
  SOUTHSIDE_CHICAGO,
  ATL,
  FISHTOWN,
  OAKLAND,
  DETROIT,
];

/** Lookup by id. */
export function findJurisdiction(id: string): JurisdictionChain | undefined {
  return JURISDICTIONS.find((j) => j.id === id);
}

export const WAITLIST_URL = "https://unismusic.com/waitlist";
