import {
  NavBar,
  PillarMarquee,
  PowerToThePeople,
  ScrollProgress,
  FooterBar,
} from "@unis/ui";
import { Hero } from "./sections/Hero";
import { TheMath } from "./sections/TheMath";
import { OwnItAll } from "./sections/OwnItAll";
import { WinYourNeighborhood } from "./sections/WinYourNeighborhood";
import { GetPaidWhileYouSleep } from "./sections/GetPaidWhileYouSleep";
import { ArtistWall } from "./sections/ArtistWall";
import { NewAndNoteworthy } from "./sections/NewAndNoteworthy";
import { FinalCTA } from "./sections/FinalCTA";

const NAV_LINKS = [
  { label: "Ownership", href: "#own-it-all" },
  { label: "Exposure", href: "#win-your-neighborhood" },
  { label: "Income", href: "#get-paid" },
  { label: "Artists", href: "#artists" },
];

const FOOTER_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "For artists", href: "/" },
      { label: "For listeners", href: "https://listeners.unismusic.com" },
      { label: "How it works", href: "/how-it-works" },
      { label: "The math", href: "/math" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Ownership agreement", href: "/ownership" },
      { label: "Revenue model", href: "/revenue" },
      { label: "Jurisdictions", href: "/jurisdictions" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Support", href: "/support" },
    ],
  },
];

export default function ArtistsHome() {
  return (
    <>
      <ScrollProgress />
      <NavBar
        site="artists"
        links={NAV_LINKS}
        getAccessHref="https://unismusic.com"
        loginHref="https://unismusic.com/login"
      />
      <main>
        <Hero />
        <PillarMarquee
          rows={[
            {
              label: "Own it all",
              href: "#own-it-all",
              style: "solid-white",
              direction: "left",
            },
            {
              label: "Win your neighborhood",
              href: "#win-your-neighborhood",
              style: "outline-blue",
              direction: "right",
            },
            {
              label: "Get paid while you sleep",
              href: "#get-paid",
              style: "solid-blue",
              direction: "left",
            },
          ]}
        />
        <WinYourNeighborhood />
        <TheMath />
        <GetPaidWhileYouSleep />
        <ArtistWall />
        <OwnItAll />
        <NewAndNoteworthy />
        <FinalCTA />
        <PowerToThePeople />
      </main>
      <FooterBar site="artists" groups={FOOTER_GROUPS} />
    </>
  );
}
