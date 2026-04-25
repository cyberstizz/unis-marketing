import type { Metadata } from "next";
import { SubPageShell } from "@unis/ui";
import {
  ARTIST_NAV_LINKS,
  ARTIST_FOOTER_GROUPS,
  ARTIST_AUTH,
} from "../site-config";
import { MathHero } from "./sections/MathHero";
import { OpenMathMoment } from "./sections/OpenMathMoment";
import { DollarFlowSimulator } from "./sections/DollarFlowSimulator";
import { EverySplit } from "./sections/EverySplit";
import { AssumptionsLedger } from "./sections/AssumptionsLedger";
import { TransparencyCommitments } from "./sections/TransparencyCommitments";
import { PlatformAvailability } from "./sections/PlatformAvailability";
import { MathFinalCTA } from "./sections/MathFinalCTA";

export const metadata: Metadata = {
  title: "The Math — Unis for Artists",
  description:
    "Every dollar. Every split. Every assumption. Public. The definitive transparency page for Unis: interactive dollar-flow simulator, complete split table, fully documented assumptions ledger, and quarterly publishing commitments.",
  openGraph: {
    title: "The Math — Unis for Artists",
    description:
      "Every dollar. Every split. Every assumption. Public. The definitive transparency page for Unis.",
    type: "article",
    url: "https://artists.unismusic.com/math",
  },
};

export default function MathPage() {
  return (
    <SubPageShell
      site="artists"
      navLinks={ARTIST_NAV_LINKS}
      footerGroups={ARTIST_FOOTER_GROUPS}
      getAccessHref={ARTIST_AUTH.getAccessHref}
      loginHref={ARTIST_AUTH.loginHref}
    >
      <MathHero />
      <OpenMathMoment />
      <DollarFlowSimulator />
      <EverySplit />
      <AssumptionsLedger />
      <TransparencyCommitments />
      <PlatformAvailability />
      <MathFinalCTA />
    </SubPageShell>
  );
}
