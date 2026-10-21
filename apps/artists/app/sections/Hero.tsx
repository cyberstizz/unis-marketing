import { Button, HeroStage, UNIS_LINKS } from "@unis/ui";

/**
 * Artists hero. Full-bleed loop of /hero-artist.mp4 that pulls back into a
 * rounded card as you scroll (see HeroStage in @unis/ui).
 */
export function Hero() {
  return (
    <HeroStage
      status="Opening soon in Harlem"
      lines={[
        "Where music",
        <span key="lives" className="chrome-text">
          lives.
        </span>,
      ]}
      body="Get heard where you live. Win your neighborhood. Get paid every time your supporters listen."
      videoSrc="/hero-artist.mp4"
      poster="/hero-artist-poster.jpg"
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up as an artist
          </Button>
          <Button as="a" href="#get-paid" variant="secondary" size="lg">
            See how artists get paid
          </Button>
        </>
      }
    />
  );
}
