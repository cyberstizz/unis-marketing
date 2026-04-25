import type { Metadata } from "next";
import { SubPageShell } from "@unis/ui";
import { ARTIST_NAV_LINKS, ARTIST_FOOTER_GROUPS, ARTIST_AUTH } from "../site-config";
import { OwnershipHero } from "./sections/OwnershipHero";
import { OneLineProof } from "./sections/OneLineProof";
import { ComparisonTable } from "./sections/ComparisonTable";
import { TheAgreement } from "./sections/TheAgreement";
import { NonExclusivity } from "./sections/NonExclusivity";
import { TheMoneyQuestion } from "./sections/TheMoneyQuestion";
import { OwnershipFAQ } from "./sections/OwnershipFAQ";
import { OwnershipFinalCTA } from "./sections/OwnershipFinalCTA";

export const metadata: Metadata = {
  title: "Ownership — Unis for Artists",
  description:
    "Every other platform asks you to trust their Terms of Service. Unis gives you a signed PDF. A personalized, downloadable ownership agreement naming you, listing your songs, countersigned, dated.",
  openGraph: {
    title: "Ownership — Unis for Artists",
    description:
      "Every other platform asks you to trust their Terms of Service. Unis gives you a signed PDF.",
    type: "article",
    url: "https://artists.unismusic.com/ownership",
  },
};

export default function OwnershipPage() {
  return (
    <SubPageShell
      site="artists"
      navLinks={ARTIST_NAV_LINKS}
      footerGroups={ARTIST_FOOTER_GROUPS}
      getAccessHref={ARTIST_AUTH.getAccessHref}
      loginHref={ARTIST_AUTH.loginHref}
    >
      <OwnershipHero />
      <OneLineProof />
      <ComparisonTable />
      <TheAgreement />
      <NonExclusivity />
      <TheMoneyQuestion />
      <OwnershipFAQ />
      <OwnershipFinalCTA />
    </SubPageShell>
  );
}
