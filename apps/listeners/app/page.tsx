import { LaunchBanner, PillarMarquee, SubPageShell, UNIS_LINKS, VideoFeature } from "@unis/ui";
import { LISTENER_SHELL } from "./site-config";
import { Hero } from "./sections/Hero";
import { Pillars } from "./sections/Pillars";
import { TheMath } from "./sections/TheMath";
import { FinalCTA } from "./sections/FinalCTA";

/**
 * Listeners home. Same running order as the artists home so the two sites
 * read as one family: hero → jump bands → launch slot → four modules →
 * transparency → closing call to action.
 */
export default function ListenersHome() {
  return (
    <SubPageShell {...LISTENER_SHELL} flushTop>
      <Hero />
      <PillarMarquee
        rows={[
          { label: "You decide", href: "#you-decide", style: "solid-white", direction: "left" },
          { label: "Rep your neighborhood", href: "#rep-your-neighborhood", style: "outline-blue", direction: "right" },
          { label: "Back an artist", href: "#back-an-artist", style: "solid-blue", direction: "left" },
          { label: "Bring your people", href: "#bring-your-people", style: "outline-blue", direction: "right" },
        ]}
      />
      <LaunchBanner
        label="Opening soon in Harlem"
        headline={
          <>
            Harlem decides
            <br />
            what plays next.
          </>
        }
        body="Sign up now and your account is ready the day Unis opens. Your username is yours from today, in every capitalization."
        cta={{ label: "Sign up", href: UNIS_LINKS.signup }}
        note={{ label: "Not in Harlem? Join the waitlist", href: UNIS_LINKS.waitlist }}
      />
      {/* The 30-second listener commercial. Hidden until the file is in
          apps/listeners/public/videos/, then it appears on its own. */}
      <VideoFeature
        id="how-unis-works"
        eyebrow="In 30 seconds"
        headline="See how Unis works."
        src="/videos/how-unis-works.mp4"
        captions="/videos/how-unis-works.vtt"
      />
      <Pillars />
      <TheMath />
      <FinalCTA />
    </SubPageShell>
  );
}
