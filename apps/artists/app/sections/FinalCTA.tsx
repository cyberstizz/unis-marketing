import { ThreeDoors, UNIS_LINKS } from "@unis/ui";

/**
 * Closing call to action. Unis isn't invite-only: signup is open in Harlem,
 * everyone else joins the waitlist, and shop owners sponsor (help center:
 * "Waitlist", "Unis Plus, ads and sponsors").
 */
export function FinalCTA() {
  return (
    <ThreeDoors
      headline={
        <>
          Ready to claim
          <br />
          <span className="chrome-text">your neighborhood?</span>
        </>
      }
      body="Signup is open in Harlem now. Your account is ready the day Unis opens."
      doors={[
        {
          title: "Live in Harlem?",
          description:
            "Sign up as an artist and attach your debut song. It goes live the day Unis opens, ready for the neighborhood's first votes.",
          cta: { label: "Sign up as an artist", href: UNIS_LINKS.signup },
          featured: true,
        },
        {
          title: "Not in Harlem yet?",
          description:
            "Join the waitlist. Your city opens once enough people from it sign up, and your username is saved from day one.",
          cta: { label: "Join the waitlist", href: UNIS_LINKS.waitlist },
        },
        {
          title: "Own a shop in Harlem?",
          description:
            "Put your business in front of neighbors while they listen to local music, from $25 a week.",
          cta: { label: "Sponsor Harlem", href: UNIS_LINKS.sponsor },
        },
      ]}
    />
  );
}
