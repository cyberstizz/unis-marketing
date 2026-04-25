import type { Metadata } from "next";
import { SubPageShell } from "@unis/ui";
import {
  ARTIST_NAV_LINKS,
  ARTIST_FOOTER_GROUPS,
  ARTIST_AUTH,
} from "../site-config";
import { RevenueHero } from "./sections/RevenueHero";
import { FourStreamMoment } from "./sections/FourStreamMoment";
import { EarningsCalculator } from "./EarningsCalculator";
import { FourStreams } from "./sections/FourStreams";
import { SpotifyComparison } from "./sections/SpotifyComparison";
import { BusinessModel } from "./sections/BusinessModel";
import { RevenueFAQ } from "./sections/RevenueFAQ";
import { RevenueFinalCTA } from "./sections/RevenueFinalCTA";

export const metadata: Metadata = {
  title: "Revenue — Unis for Artists",
  description:
    "One listener on Spotify pays you once. One listener on Unis pays you four ways. Calculate what your fanbase is actually worth with the interactive earnings projector.",
  openGraph: {
    title: "Revenue — Unis for Artists",
    description:
      "One listener on Spotify pays you once. One listener on Unis pays you four ways.",
    type: "article",
    url: "https://artists.unismusic.com/revenue",
  },
};

export default function RevenuePage() {
  return (
    <SubPageShell
      site="artists"
      navLinks={ARTIST_NAV_LINKS}
      footerGroups={ARTIST_FOOTER_GROUPS}
      getAccessHref={ARTIST_AUTH.getAccessHref}
      loginHref={ARTIST_AUTH.loginHref}
    >
      <RevenueHero />
      <FourStreamMoment />
      <EarningsCalculator />
      <FourStreams />
      <SpotifyComparison />
      <BusinessModel />
      <RevenueFAQ />
      <RevenueFinalCTA />
    </SubPageShell>
  );
}
