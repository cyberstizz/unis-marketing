/**
 * Single source of truth for the Listeners site's nav, footer and calls to action.
 */

import { helpLink, UNIS_LINKS } from "@unis/ui";

/**
 * Login is hidden before launch (unismusic.com shows the Coming soon page),
 * so the nav doesn't offer it. On launch day, set this to true and redeploy.
 */
const SHOW_LOGIN = false;

export const LISTENER_NAV_LINKS = [
  { label: "Voting", href: "#you-decide" },
  { label: "Neighborhoods", href: "#rep-your-neighborhood" },
  { label: "Supporting", href: "#back-an-artist" },
  { label: "Referrals", href: "#bring-your-people" },
];

export const LISTENER_FOOTER_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "For listeners", href: "/" },
      { label: "For artists", href: UNIS_LINKS.artists },
      { label: "How Unis works", href: UNIS_LINKS.help },
      { label: "The math", href: `${UNIS_LINKS.artists}/math` },
    ],
  },
  {
    title: "On Unis",
    links: [
      { label: "Voting", href: helpLink("voting") },
      { label: "Jurisdictions", href: `${UNIS_LINKS.artists}/jurisdictions` },
      { label: "Supporting an artist", href: helpLink("supporter") },
      { label: "Referrals", href: helpLink("referrals") },
    ],
  },
  {
    title: "Get in",
    links: [
      { label: "Sign up", href: UNIS_LINKS.signup },
      { label: "Join the waitlist", href: UNIS_LINKS.waitlist },
      { label: "Sponsor Harlem", href: UNIS_LINKS.sponsor },
      { label: "Unis Plus", href: helpLink("plus-what") },
    ],
  },
];

export const LISTENER_SHELL = {
  site: "listeners" as const,
  navLinks: LISTENER_NAV_LINKS,
  footerGroups: LISTENER_FOOTER_GROUPS,
  primaryCta: { label: "Sign up", href: UNIS_LINKS.signup },
  secondaryCta: SHOW_LOGIN ? { label: "Log in", href: UNIS_LINKS.login } : undefined,
  crossLink: { label: "Unis for artists", href: UNIS_LINKS.artists },
};
