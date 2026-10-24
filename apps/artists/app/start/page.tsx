import type { Metadata } from "next";
import { FaqList, SubPageShell, UNIS_LINKS, VersusTable, VideoFeature } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
import { FinalCTA } from "../sections/FinalCTA";
import { StartHero } from "./sections/StartHero";
import { NoNeed } from "./sections/NoNeed";
import { StartSteps } from "./sections/StartSteps";
import { LaunchChecklist } from "./sections/LaunchChecklist";

/**
 * Get started — the Unis answer to Spotify's "Get started" and "Get ready
 * for Wrapped" pages.
 */
export const metadata: Metadata = {
  title: "Get started — Unis for Artists",
  description:
    "No distributor, no pitch, no waiting. Sign up, upload your first song in the same sitting, and share your link. Five steps from sign-up to your first supporters.",
  openGraph: {
    title: "No distributor. No pitch. No waiting. — Unis for Artists",
    description: "Five steps from sign-up to your first supporters.",
    type: "article",
    url: "https://artists.unismusic.com/start",
  },
};

export default function StartPage() {
  return (
    <SubPageShell {...ARTIST_SHELL}>
      <StartHero />
      <NoNeed />
      <section id="steps">
        <StartSteps />
      </section>
      <VideoFeature
        id="tour"
        eyebrow="The 60-second tour"
        headline="Watch how it works."
        src="/videos/start-tour.mp4"
        captions="/videos/start-tour.vtt"
      />
      <LaunchChecklist />
      <VersusTable
        id="compare"
        eyebrow="Point for point"
        headline={
          <>
            Starting on Spotify
            <br />
            <span className="chrome-text">and on Unis.</span>
          </>
        }
        rows={[
          {
            point: "Getting your music up",
            them: "Choose a distributor first. It charges a fee or a commission.",
            us: "Upload in the app. No distributor.",
          },
          {
            point: "Before release",
            them: "Claim your profile and pitch at least 7 days ahead.",
            us: "Your page is live as soon as you finish.",
          },
          {
            point: "Video",
            them: "Direct uploads are a beta with a waitlist.",
            us: "Upload videos from your dashboard now.",
          },
          {
            point: "Getting paid",
            them: "Through your label or distributor, on their schedule.",
            us: "Stripe pays your bank monthly, on the 1st.",
          },
          {
            point: "Cost",
            them: "Free account; distributor fees on top.",
            us: "Free.",
          },
        ]}
        footnote={
          <>
            Spotify details from{" "}
            <a className="underline hover:text-white" href="https://artists.spotify.com/get-started" target="_blank" rel="noopener noreferrer">
              artists.spotify.com/get-started
            </a>{" "}
            and{" "}
            <a className="underline hover:text-white" href="https://artists.spotify.com/music-videos" target="_blank" rel="noopener noreferrer">
              /music-videos
            </a>
            , October 2026.
          </>
        }
      />
      <FaqList
        id="faq"
        headline={
          <>
            Getting started,
            <br />
            <span className="chrome-text">answered.</span>
          </>
        }
        items={[
          {
            question: "Is it free?",
            answer: "Yes. Artists don't pay to join, upload or stay listed.",
          },
          {
            question: "Do I need a distributor or a label?",
            answer: "No. You upload straight from the app, and you keep every right to your music.",
          },
          {
            question: "Can I keep my music on Spotify and Apple Music?",
            answer: "Yes. Unis is non-exclusive, so keep releasing everywhere you already do.",
          },
          {
            question: "I'm not in Harlem. Can I join?",
            answer: (
              <>
                Join the{" "}
                <a className="underline hover:text-white" href={UNIS_LINKS.waitlist}>
                  waitlist
                </a>
                . Unis opens one region at a time, and a region opens once enough people from it have signed up. Your
                username is saved from day one.
              </>
            ),
          },
          {
            question: "What do I need for my first upload?",
            answer:
              "The song file and its title. A subgenre is required too, and a mood, a second subgenre and the language help the right listeners find it. You can add lyrics and an ISRC if you have one.",
          },
        ]}
      />
      <FinalCTA />
    </SubPageShell>
  );
}
