import { LaunchBanner, PillarMarquee, SubPageShell, UNIS_LINKS } from "@unis/ui";
import { ARTIST_SHELL } from "./site-config";
import { Hero } from "./sections/Hero";
import { Pillars } from "./sections/Pillars";
import { TheMath } from "./sections/TheMath";
import { ArtistWall } from "./sections/ArtistWall";
import { NewAndNoteworthy } from "./sections/NewAndNoteworthy";
import { FinalCTA } from "./sections/FinalCTA";

/**
 * Artists home. Same running order as artists.spotify.com:
 * hero → jump bands → campaign slot → four modules → transparency →
 * artists → new & noteworthy → closing call to action.
 */
export default function ArtistsHome() {
  return (
    <SubPageShell {...ARTIST_SHELL} flushTop>
      <Hero />
      <PillarMarquee
        rows={[
          { label: "Win your neighborhood", href: "#win-your-neighborhood", style: "solid-white", direction: "left" },
          { label: "Get paid", href: "#get-paid", style: "outline-blue", direction: "right" },
          { label: "Know your fans", href: "#know-your-fans", style: "solid-blue", direction: "left" },
          { label: "Own it all", href: "#own-it-all", style: "outline-blue", direction: "right" },
        ]}
      />
      <LaunchBanner
        label="Opening soon in Harlem"
        headline={
          <>
            Be in Harlem&rsquo;s
            <br />
            first race.
          </>
        }
        body="Sign up as an artist today and attach your debut song. It goes live the day Unis opens, ready for the neighborhood's first votes."
        cta={{ label: "Sign up as an artist", href: UNIS_LINKS.signup }}
        note={{ label: "Not in Harlem? Join the waitlist", href: UNIS_LINKS.waitlist }}
      />
      <Pillars />
      <TheMath />
      <ArtistWall />
      <NewAndNoteworthy />
      <FinalCTA />
    </SubPageShell>
  );
}
