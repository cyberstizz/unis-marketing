import type { Metadata } from "next";
import { SubPageShell } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
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
    "The first music platform where your neighborhood is on the map. Compete in every place you belong to, from your block to all of Unis, with awards that stay on the record. Opening first in Harlem.",
  openGraph: {
    title: "Jurisdictions — Unis for Artists",
    description:
      "The first music platform where your neighborhood is on the map. Opening first in Harlem.",
    type: "article",
    url: "https://artists.unismusic.com/jurisdictions",
  },
};

export default function JurisdictionsPage() {
  return (
    <SubPageShell {...ARTIST_SHELL}>
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
