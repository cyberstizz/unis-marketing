import type { Metadata } from "next";
import { helpLink, SubPageShell, VersusTable } from "@unis/ui";
import { LISTENER_SHELL } from "../site-config";
import { FinalCTA } from "../sections/FinalCTA";
import { FeaturesHero } from "./sections/FeaturesHero";
import { FeatureIndex } from "./sections/FeatureIndex";
import { WhoDecides } from "./sections/WhoDecides";
import { SellYourSong } from "./sections/SellYourSong";
import { Playlists } from "./sections/Playlists";
import { TrueShuffle } from "./sections/TrueShuffle";
import { RunByItsPeople } from "./sections/RunByItsPeople";
import { Sources } from "./sections/Sources";

/**
 * Every feature on Unis, and the one idea behind all of them: the people who
 * live with the music make the calls. Facts about other companies are numbered
 * and listed in Sources at the foot of the page (see ./sources.ts).
 */
export const metadata: Metadata = {
  title: "Every feature — Unis",
  description:
    "Voting where you live, awards with one winner, backing an artist for free, selling songs from $0.94, community playlists and a shuffle that's actually random. Everything on Unis, and who decides each part.",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "Who decides what you hear? — Every feature on Unis",
    description: "Everything on Unis, and why each call sits with listeners, neighbors and artists.",
    type: "article",
    url: "https://listeners.unismusic.com/features",
    images: [{ url: "/og-listeners.jpg", width: 1200, height: 630, alt: "Unis for Listeners" }],
  },
};

export default function FeaturesPage() {
  return (
    <SubPageShell {...LISTENER_SHELL}>
      <FeaturesHero />
      <FeatureIndex />
      <WhoDecides />
      <VersusTable
        id="backing"
        eyebrow="Backing an artist"
        headline={
          <>
            Showing up once,
            <br />
            or backing them every month.
          </>
        }
        body="Underground fans go to a friend's showcase once or twice and call it support. It is. Here's what backing that artist on Unis adds to it."
        themLabel="A night at their showcase"
        usLabel="Backing them on Unis"
        rows={[
          {
            point: "What it costs you",
            them: "The ticket, the ride over and whatever you buy at the bar.",
            us: "Nothing. Your listening is the support.",
          },
          {
            point: "How often it helps",
            them: "One night.",
            us: "Every month you listen, whoever you're listening to.",
          },
          {
            point: "What reaches the artist",
            them: "Their share of the door, if there is one.",
            us: "15% of your monthly share of what Unis earns, plus 5 points on their score the day you start.",
          },
          {
            point: "Getting their attention",
            them: "A shout from the crowd.",
            us: "Your messages land in their inbox, not their requests.",
          },
          {
            point: "Hearing from them",
            them: "A flyer for the next show.",
            us: "Their messages to supporters arrive as a conversation you can answer.",
          },
          {
            point: "Can they count on it?",
            them: "Not from one night to the next.",
            us: "Yes. You can switch artists, but the switch waits until the 1st, so their month holds.",
          },
        ]}
        footnote={
          <>
            Go to the show too. Backing them on Unis is what keeps them going between shows.{" "}
            <a className="underline hover:text-white" href={helpLink("supporter")}>
              How supporting works
            </a>
          </>
        }
      />
      <SellYourSong />
      <Playlists />
      <TrueShuffle />
      <RunByItsPeople />
      <FinalCTA />
      <Sources />
    </SubPageShell>
  );
}
