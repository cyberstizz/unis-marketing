import { Button, HeroStage, UNIS_LINKS } from "@unis/ui";

/**
 * Listeners hero. Same structure as the artists hero so the two sites feel
 * like siblings; the headline carries both halves of the through-line.
 */
export function Hero() {
  return (
    <HeroStage
      status="Opening soon in Harlem"
      lines={[
        <span key="music">
          Where music <span className="chrome-text">lives.</span>
        </span>,
        "Where you live.",
      ]}
      body="Hear what your neighborhood is playing. Vote on who wins. Back the artist you believe in."
      videoSrc="/hero-listener.mp4"
      poster="/hero-listener-poster.jpg"
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up
          </Button>
          <Button as="a" href={UNIS_LINKS.waitlist} variant="secondary" size="lg">
            Not in Harlem? Join the waitlist
          </Button>
        </>
      }
    />
  );
}
