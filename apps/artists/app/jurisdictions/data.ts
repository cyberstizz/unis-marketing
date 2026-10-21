/**
 * Jurisdictions data — the single source of truth for the Jurisdictions page.
 *
 * Structure: every supported neighborhood has a chain from its own
 * neighborhood at the bottom up to Unis at the top. Harlem's is the real one
 * (unis-sample findpage.jsx HARLEM_PARENT_CHAIN): eight places for Uptown
 * and Downtown Harlem. The other cities are illustrative.
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

export type TierLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type TierNode = {
  /** Short name shown in the pill (e.g. "Harlem"). */
  name: string;
  /** Longer descriptor shown on hover/expand (e.g. "Neighborhood"). */
  tierLabel: string;
  /** Tier number, 1 = Unis (top), higher = more local. */
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
  /** Chain from the home neighborhood (bottom) up to Unis (tier 1). */
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

/** The top tier — Unis itself — shared by every chain. */
const SITEWIDE: TierNode = {
  name: "Unis",
  tierLabel: "Everyone · Tier 1",
  tier: 1,
};

// ── Harlem (the only live jurisdiction) ────────────────────────────────────

const HARLEM_UPTOWN: JurisdictionChain = {
  id: "harlem-uptown",
  displayName: "Uptown Harlem",
  region: "NYC",
  status: "live",
  chain: [
    { name: "Uptown Harlem", tierLabel: "Sub-neighborhood · Tier 8", tier: 8 },
    { name: "Harlem", tierLabel: "Neighborhood · Tier 7", tier: 7 },
    { name: "Upper Manhattan", tierLabel: "Area · Tier 6", tier: 6 },
    { name: "Manhattan", tierLabel: "Borough · Tier 5", tier: 5 },
    { name: "New York City", tierLabel: "City · Tier 4", tier: 4 },
    { name: "New York City Metro", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "New York", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
  winners: {
    8: {
      artist: "Kito Vance",
      song: "Lenox After Dark",
      votes: 412,
      streakDays: 3,
    },
    7: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 2418,
      streakDays: 5,
    },
    6: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 3104,
      streakDays: 2,
    },
    5: {
      artist: "Shae Dubois",
      song: "Sugar Hill Sunday",
      votes: 8140,
      streakDays: 1,
    },
    4: {
      artist: "Obi Ajayi",
      song: "Fourteenth Street",
      votes: 14092,
      streakDays: 4,
    },
    3: {
      artist: "Ana Ruiz",
      song: "Bridge & Tunnel",
      votes: 19870,
      streakDays: 3,
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
    { name: "Downtown Harlem", tierLabel: "Sub-neighborhood · Tier 8", tier: 8 },
    { name: "Harlem", tierLabel: "Neighborhood · Tier 7", tier: 7 },
    { name: "Upper Manhattan", tierLabel: "Area · Tier 6", tier: 6 },
    { name: "Manhattan", tierLabel: "Borough · Tier 5", tier: 5 },
    { name: "New York City", tierLabel: "City · Tier 4", tier: 4 },
    { name: "New York City Metro", tierLabel: "Metro · Tier 3", tier: 3 },
    { name: "New York", tierLabel: "State · Tier 2", tier: 2 },
    SITEWIDE,
  ],
  winners: {
    8: {
      artist: "Dee Vance",
      song: "110 & Fifth",
      votes: 389,
      streakDays: 2,
    },
    7: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 2418,
      streakDays: 5,
    },
    6: {
      artist: "Mila Reyes",
      song: "North Side Summer",
      votes: 3104,
      streakDays: 2,
    },
    5: {
      artist: "Shae Dubois",
      song: "Sugar Hill Sunday",
      votes: 8140,
      streakDays: 1,
    },
    4: {
      artist: "Obi Ajayi",
      song: "Fourteenth Street",
      votes: 14092,
      streakDays: 4,
    },
    3: {
      artist: "Ana Ruiz",
      song: "Bridge & Tunnel",
      votes: 19870,
      streakDays: 3,
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
// Illustrative chains for places that aren't open yet. Each opens when enough
// people from its region join the waitlist; real chains may differ.

const COMPTON: JurisdictionChain = {
  id: "compton",
  displayName: "Compton",
  region: "West",
  status: "coming-soon",
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
  comingSoonNote: "Opens when its waitlist fills · Join the waitlist",
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
