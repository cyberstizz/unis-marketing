import type { Metadata } from "next";
import { SubPageShell, VideoFeature } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
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
    <SubPageShell {...ARTIST_SHELL}>
      <RevenueHero />
      <FourStreamMoment />
      <EarningsCalculator />
      <FourStreams />
      <VideoFeature
        id="how-you-get-paid"
        eyebrow="In one minute"
        headline="How you get paid, explained."
        src="/videos/how-you-get-paid.mp4"
        captions="/videos/how-you-get-paid.vtt"
      />
      <SpotifyComparison />
      <BusinessModel />
      <RevenueFAQ />
      <RevenueFinalCTA />
    </SubPageShell>
  );
}
