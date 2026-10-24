import { ThreeDoors, UNIS_LINKS } from "@unis/ui";

/**
 * Closing call to action. Unis isn't invite-only, and the old "find a code
 * near you" store map is gone: it listed real Harlem businesses that never
 * agreed to take part. Shop owners now come in through Sponsor Harlem.
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
            "Sign up now and pick the artist you'll back on the way in. Have a friend's code? Add it when you sign up.",
          cta: { label: "Sign up", href: UNIS_LINKS.signup },
          featured: true,
        },
        {
          title: "Not in Harlem yet?",
          description:
            "Join the waitlist and bring your people. Everyone who signs up with your code counts toward opening your city.",
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
