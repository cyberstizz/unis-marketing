import type { Metadata } from "next";
import { FaqList, SubPageShell, VersusTable } from "@unis/ui";
import { ARTIST_SHELL } from "../site-config";
import { FinalCTA } from "../sections/FinalCTA";
import { DashboardHero } from "./sections/DashboardHero";
import { DashboardModules } from "./sections/DashboardModules";

/**
 * Know your fans — the Unis answer to Spotify's Analytics page.
 */
export const metadata: Metadata = {
  title: "Know your fans — Unis for Artists",
  description:
    "Every supporter by name, your fans block by block, every song's sales, and one message to all of them. The Unis artist dashboard, free with every artist account.",
  openGraph: {
    title: "Know every fan by name — Unis for Artists",
    description: "Every supporter by name, your fans block by block, and one message to all of them.",
    type: "article",
    url: "https://artists.unismusic.com/dashboard",
  },
};

export default function DashboardPage() {
  return (
    <SubPageShell {...ARTIST_SHELL}>
      <DashboardHero />
      <DashboardModules />
      <VersusTable
        id="compare"
        eyebrow="Point for point"
        headline={
          <>
            Spotify Analytics
            <br />
            <span className="chrome-text">and the Unis dashboard.</span>
          </>
        }
        rows={[
          {
            point: "Who your fans are",
            them: "Anonymous groups: super, moderate and light listeners, and more.",
            us: "Every supporter by name, your top supporter and your newest ones.",
          },
          {
            point: "Talking to fans",
            them: "No way to message your listeners from your dashboard.",
            us: "One message to all your supporters. Replies come back to you alone.",
          },
          {
            point: "Where fans are",
            them: "Top cities and countries.",
            us: "Plays, listeners, likes, followers and supporters by neighborhood.",
          },
          {
            point: "Who's listening",
            them: "Age and gender.",
            us: "Age and gender filters on every step from first play to supporter.",
          },
          {
            point: "Each song",
            them: "Streams, saves and playlist adds.",
            us: "Its own fan funnel, plus copies sold and what you kept.",
          },
          {
            point: "Your money",
            them: "Not in the dashboard. Royalties arrive through your distributor.",
            us: "Sales, support, your monthly share and payouts on the same screen.",
          },
          {
            point: "Where you stand",
            them: "City and country charts, if you're big enough to make them.",
            us: "Your live rank in every place you belong, and your trophy case.",
          },
        ]}
        footnote={
          <>
            Spotify details from{" "}
            <a className="underline hover:text-white" href="https://artists.spotify.com/analytics" target="_blank" rel="noopener noreferrer">
              artists.spotify.com/analytics
            </a>{" "}
            and its{" "}
            <a
              className="underline hover:text-white"
              href="https://artists.spotify.com/blog/super-listeners-your-guide-for-developing-fans-who-go-deeper"
              target="_blank"
              rel="noopener noreferrer"
            >
              super listeners guide
            </a>
            , October 2026.
          </>
        }
      />
      <FaqList
        id="faq"
        headline={
          <>
            Your dashboard,
            <br />
            <span className="chrome-text">answered.</span>
          </>
        }
        items={[
          {
            question: "Can I see who my fans are?",
            answer:
              "You see every supporter by name. For everyone else who listens, you get the breakdowns: how many, where they are, and their age and gender, for any period from today to all time.",
          },
          {
            question: "Can I message my fans?",
            answer:
              "You can send one message to everyone who supports you. It arrives as a normal conversation, and replies come back to you alone. Listeners can also message you from your page.",
          },
          {
            question: "Do fake accounts show up in my numbers?",
            answer:
              "A play only counts once someone has listened for 15 seconds (less on very short songs), and the same song counts once every 30 minutes per listener. Plays from signed-out visitors never count toward your play count or your awards.",
          },
          {
            question: "Does the dashboard cost anything?",
            answer: "No. It comes with every artist account, and joining Unis is free.",
          },
        ]}
      />
      <FinalCTA />
    </SubPageShell>
  );
}
