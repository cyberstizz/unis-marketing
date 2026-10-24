/**
 * Single source of truth for the Artists site's nav, footer and calls to action.
 * Imported by the home page and by every sub-page.
 */

import { UNIS_LINKS } from "@unis/ui";

/**
 * Login is hidden before launch (unismusic.com shows the Coming soon page),
 * so the nav doesn't offer it. On launch day, set this to true and redeploy.
 */
const SHOW_LOGIN = false;

export const ARTIST_NAV_LINKS = [
  { label: "Get heard", href: "/get-heard" },
  { label: "Jurisdictions", href: "/jurisdictions" },
  { label: "Know your fans", href: "/dashboard" },
  { label: "Revenue", href: "/revenue" },
  { label: "Ownership", href: "/ownership" },
];

export const ARTIST_FOOTER_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "For artists", href: "/" },
      { label: "For listeners", href: UNIS_LINKS.listeners },
      { label: "Get started", href: "/start" },
      { label: "How Unis works", href: UNIS_LINKS.help },
    ],
  },
  {
    title: "For artists",
    links: [
      { label: "Get heard", href: "/get-heard" },
      { label: "Know your fans", href: "/dashboard" },
      { label: "Fair play", href: "/fair-play" },
      { label: "Jurisdictions", href: "/jurisdictions" },
    ],
  },
  {
    title: "Money and rights",
    links: [
      { label: "Revenue model", href: "/revenue" },
      { label: "The math", href: "/math" },
      { label: "Ownership", href: "/ownership" },
      { label: "Sample agreement", href: "/sample-agreement.pdf" },
    ],
  },
  {
    title: "Get in",
    links: [
      { label: "Sign up", href: UNIS_LINKS.signup },
      { label: "Join the waitlist", href: UNIS_LINKS.waitlist },
      { label: "Sponsor Harlem", href: UNIS_LINKS.sponsor },
      { label: "Help center", href: UNIS_LINKS.help },
    ],
  },
];

export const ARTIST_CTAS = {
  primary: { label: "Sign up", href: UNIS_LINKS.signup },
  secondary: SHOW_LOGIN ? { label: "Log in", href: UNIS_LINKS.login } : undefined,
  crossLink: { label: "Unis for listeners", href: UNIS_LINKS.listeners },
};

/** Everything SubPageShell needs, so each page spreads one object. */
export const ARTIST_SHELL = {
  site: "artists" as const,
  navLinks: ARTIST_NAV_LINKS,
  footerGroups: ARTIST_FOOTER_GROUPS,
  primaryCta: ARTIST_CTAS.primary,
  secondaryCta: ARTIST_CTAS.secondary,
  crossLink: ARTIST_CTAS.crossLink,
};
