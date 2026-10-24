import type { Metadata } from "next";
import { FaqList, SubPageShell, UNIS_LINKS, VersusTable } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
import { FinalCTA } from "../sections/FinalCTA";
import { FairPlayHero } from "./sections/FairPlayHero";
import { FairPlayModules } from "./sections/FairPlayModules";

/**
 * Fair play — the Unis answer to Spotify's "Building a trusted platform" page.
 */
export const metadata: Metadata = {
  title: "Fair play — Unis for Artists",
  description:
    "Real people, real plays, real winners. How Unis keeps one account to one person: verified votes, plays that mean something, no stream minimum, and an inbox that stays yours.",
  openGraph: {
    title: "Real people. Real plays. Real winners. — Unis for Artists",
    description: "How Unis keeps one account to one person, rule by rule.",
    type: "article",
    url: "https://artists.unismusic.com/fair-play",
  },
};

export default function FairPlayPage() {
  return (
    <SubPageShell {...ARTIST_SHELL}>
      <FairPlayHero />
      <FairPlayModules />
      <VersusTable
        id="compare"
        eyebrow="Point for point"
        headline={
          <>
            Trust on Spotify
            <br />
            <span className="chrome-text">and on Unis.</span>
          </>
        }
        rows={[
          {
            point: "Music on your page you didn't upload",
            them: "It happens. Profile Protection, to review releases that list you, is in limited beta.",
            us: "Can't happen. Your page only shows what your own account uploads.",
          },
          {
            point: "Fake listening",
            them: "Artificial streams are filtered out after the fact.",
            us: "A play counts after 15 seconds, once per song every 30 minutes, and only from signed-in listeners.",
          },
          {
            point: "Who picks the winners",
            them: "Charts and algorithms.",
            us: "Plays, likes and phone-verified votes: one vote per race per period.",
          },
          {
            point: "Small artists' earnings",
            them: "Tracks under 1,000 streams a year earn no recording royalties.",
            us: "No minimum. A supporter's listening pays you from the first counted play.",
          },
          {
            point: "Reporting a problem",
            them: "Separate routes for infringement, playlists and profile mix-ups.",
            us: "One report page, plus a DMCA notice-and-takedown process for copyright.",
          },
        ]}
        footnote={
          <>
            Spotify details from{" "}
            <a className="underline hover:text-white" href="https://artists.spotify.com/trusted-platform" target="_blank" rel="noopener noreferrer">
              artists.spotify.com/trusted-platform
            </a>
            , October 2026.
          </>
        }
      />
      <FaqList
        id="faq"
        headline={
          <>
            Fair play,
            <br />
            <span className="chrome-text">answered.</span>
          </>
        }
        items={[
          {
            question: "What if someone uploads my song to Unis?",
            answer: (
              <>
                Send a copyright notice. Unis follows the DMCA notice-and-takedown process and can remove accounts that
                infringe repeatedly. For anything else, use the{" "}
                <a className="underline hover:text-white" href={UNIS_LINKS.report}>
                  report page
                </a>
                .
              </>
            ),
          },
          {
            question: "Why do I need to verify my phone?",
            answer:
              "Voting, messaging and the Community Share all need it, because a phone number is much harder to fake than an email. It takes under a minute, and you only do it once. Until you verify, your part of any month that closes stays with Unis.",
          },
          {
            question: "Do my own plays count?",
            answer: "Playing your own songs never counts toward your Community Share. Your fans' listening does.",
          },
          {
            question: "Can fans game the vote by making extra accounts?",
            answer:
              "Every vote needs a verified phone number, so every extra account would need its own phone. That's the point: an email takes seconds to fake, a phone number doesn't. And each account gets one vote per race per period, only in the places it belongs to.",
          },
        ]}
      />
      <FinalCTA />
    </SubPageShell>
  );
}
