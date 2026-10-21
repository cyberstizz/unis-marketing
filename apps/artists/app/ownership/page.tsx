import type { Metadata } from "next";
import { SubPageShell } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
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
    "Every other platform asks you to trust their Terms of Service. Unis puts it in writing, in your name: a downloadable ownership and revenue-share agreement, dated, from your dashboard any time.",
  openGraph: {
    title: "Ownership — Unis for Artists",
    description:
      "Every other platform asks you to trust their Terms of Service. Unis puts it in writing, in your name.",
    type: "article",
    url: "https://artists.unismusic.com/ownership",
  },
};

export default function OwnershipPage() {
  return (
    <SubPageShell {...ARTIST_SHELL}>
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
