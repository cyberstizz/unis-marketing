import type { Metadata } from "next";
import { SubPageShell } from "@unis/ui";
import {
  ARTIST_NAV_LINKS,
  ARTIST_FOOTER_GROUPS,
  ARTIST_AUTH,
} from "../site-config";
import { JurisdictionsHero } from "./sections/JurisdictionsHero";
import { PlaceMomentClaim } from "./sections/PlaceMomentClaim";
import { JurisdictionsExplorer } from "./sections/JurisdictionsExplorer";
import { WhyTiersMatter } from "./sections/WhyTiersMatter";
import { PermanentRecord } from "./sections/PermanentRecord";
import { RolloutMap } from "./sections/RolloutMap";
import { JurisdictionsFAQ } from "./sections/JurisdictionsFAQ";
import { JurisdictionsFinalCTA } from "./sections/JurisdictionsFinalCTA";

export const metadata: Metadata = {
  title: "Jurisdictions — Unis for Artists",
  description:
    "The first music platform where your neighborhood is on the map. Seven tiers of geographic competition, permanent public awards, and launching first in Harlem. Explore the tier chain for any neighborhood in America.",
  openGraph: {
    title: "Jurisdictions — Unis for Artists",
    description:
      "The first music platform where your neighborhood is on the map. Explore the seven-tier chain for any neighborhood in America.",
    type: "article",
    url: "https://artists.unismusic.com/jurisdictions",
  },
};

export default function JurisdictionsPage() {
  return (
    <SubPageShell
      site="artists"
      navLinks={ARTIST_NAV_LINKS}
      footerGroups={ARTIST_FOOTER_GROUPS}
      getAccessHref={ARTIST_AUTH.getAccessHref}
      loginHref={ARTIST_AUTH.loginHref}
    >
      <JurisdictionsHero />
      <PlaceMomentClaim />
      <JurisdictionsExplorer />
      <WhyTiersMatter />
      <PermanentRecord />
      <RolloutMap />
      <JurisdictionsFAQ />
      <JurisdictionsFinalCTA />
    </SubPageShell>
  );
}
