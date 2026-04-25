import {
  NavBar,
  PillarMarquee,
  PowerToThePeople,
  ScrollProgress,
  FooterBar,
} from "@unis/ui";
import { Hero } from "./sections/Hero";
import { TheMath } from "./sections/TheMath";
import { YouDecide } from "./sections/YouDecide";
import { GetPaidToListen } from "./sections/GetPaidToListen";
import { RepYourNeighborhood } from "./sections/RepYourNeighborhood";
import { FinalCTA } from "./sections/FinalCTA";

const NAV_LINKS = [
  { label: "Discovery", href: "#you-decide" },
  { label: "Earn", href: "#get-paid-to-listen" },
  { label: "Neighborhoods", href: "#rep-your-neighborhood" },
];

const FOOTER_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "For listeners", href: "/" },
      { label: "For artists", href: "https://artists.unismusic.com" },
      { label: "How it works", href: "/how-it-works" },
      { label: "The math", href: "/math" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Find a code", href: "/" },
      { label: "Waitlist", href: "https://unismusic.com/waitlist" },
      { label: "Referrals", href: "/" },
      { label: "Blog", href: "/" },
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

export default function ListenersHome() {
  return (
    <>
      <ScrollProgress />
      <NavBar
        site="listeners"
        links={NAV_LINKS}
        getAccessHref="#get-access"
        loginHref="/login"
      />
      <main>
        <Hero />
        <PillarMarquee
          rows={[
            {
              label: "You decide",
              href: "#you-decide",
              style: "solid-white",
              direction: "left",
            },
            {
              label: "Get paid to listen",
              href: "#get-paid-to-listen",
              style: "outline-blue",
              direction: "right",
            },
            {
              label: "Rep your neighborhood",
              href: "#rep-your-neighborhood",
              style: "solid-blue",
              direction: "left",
            },
          ]}
        />
        <TheMath />
        <YouDecide />
        <GetPaidToListen />
        <RepYourNeighborhood />
        <FinalCTA />
        <PowerToThePeople />
      </main>
      <FooterBar site="listeners" groups={FOOTER_GROUPS} />
    </>
  );
}
