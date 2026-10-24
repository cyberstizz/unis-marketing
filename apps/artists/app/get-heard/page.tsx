import type { Metadata } from "next";
import { FaqList, SubPageShell, VersusTable } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
import { FinalCTA } from "../sections/FinalCTA";
import { GetHeardHero } from "./sections/GetHeardHero";
import { PaidReach } from "./sections/PaidReach";
import { GetHeardModules } from "./sections/GetHeardModules";

/**
 * Get heard — the Unis answer to Spotify's Campaign Kit, Discovery Mode,
 * display campaigns and playlist pitching pages.
 */
export const metadata: Metadata = {
  title: "Get heard — Unis for Artists",
  description:
    "No pitch, no paid placement, no algorithm to buy. On Unis your neighborhood's plays, likes and votes decide who rises.",
  openGraph: {
    title: "Get heard without paying for it — Unis for Artists",
    description: "No pitch, no paid placement, no algorithm to buy. Your neighborhood decides who rises.",
    type: "article",
    url: "https://artists.unismusic.com/get-heard",
  },
};

export default function GetHeardPage() {
  return (
    <SubPageShell {...ARTIST_SHELL}>
      <GetHeardHero />
      <PaidReach />
      <GetHeardModules />
      <VersusTable
        id="compare"
        eyebrow="Point for point"
        headline={
          <>
            Getting heard on Spotify
            <br />
            <span className="chrome-text">and on Unis.</span>
          </>
        }
        rows={[
          {
            point: "Boosting a song",
            them: "Discovery Mode puts a song in personalized playlists, for a commission on those streams.",
            us: "Not for sale. Local songs come first for every artist.",
          },
          {
            point: "Ads inside the app",
            them: "Marquee and Showcase, paid per campaign.",
            us: "None. No artist can buy a placement.",
          },
          {
            point: "Editors",
            them: "Pitch one song per release, at least 7 days ahead. Nothing is guaranteed.",
            us: "No gatekeepers. Plays, likes and votes decide every award.",
          },
          {
            point: "Who you're up against",
            them: "Everyone. Over 100,000 new songs are released every day.",
            us: "The artists in your neighborhood first, then up from there.",
          },
          {
            point: "What a win leaves behind",
            them: "A playlist spot, until it rotates out.",
            us: "A permanent place on your profile and on your neighborhood's record.",
          },
          {
            point: "What it costs you",
            them: "Free tools, paid tools, and a commission on Discovery Mode streams.",
            us: "Nothing. Joining is free and there's nothing to buy.",
          },
        ]}
        footnote={
          <>
            Spotify details from artists.spotify.com (Campaign Kit, Discovery Mode, display campaigns, playlisting) and
            Spotify&rsquo;s{" "}
            <a
              className="underline hover:text-white"
              href="https://artists.spotify.com/blog/what-were-building-for-artists-in-2026"
              target="_blank"
              rel="noopener noreferrer"
            >
              2026 artist update
            </a>
            , October 2026.
          </>
        }
      />
      <FaqList
        id="faq"
        headline={
          <>
            Getting heard,
            <br />
            <span className="chrome-text">answered.</span>
          </>
        }
        items={[
          {
            question: "Can I pay to get my song in front of more people?",
            answer:
              "No. There's no paid placement for artists on Unis. Plays, likes and votes from real, signed-in people are the only things that move a song.",
          },
          {
            question: "Do I need a big following to win?",
            answer:
              "No. You compete in your own neighborhood first, against the artists around you. Win there and you're on that neighborhood's record for good. You're also in the running in every bigger place above it, all the way up to Unis.",
          },
          {
            question: "Who decides the awards?",
            answer:
              "The neighborhood. A play adds 1 point, a like 5, and a vote between 10 and 250 depending on the race. The highest total at the close wins, and every award records what decided it.",
          },
          {
            question: "Can my fans vote for me every day?",
            answer:
              "Each person gets one vote per race per period: one in the daily race, one in the weekly, and so on, with separate votes for songs and for artists. Voting needs a verified phone number.",
          },
          {
            question: "Can I keep pitching to Spotify?",
            answer:
              "Yes. Unis is non-exclusive. Keep releasing everywhere else; your neighborhood on Unis is reach you add, not a replacement.",
          },
        ]}
      />
      <FinalCTA />
    </SubPageShell>
  );
}
