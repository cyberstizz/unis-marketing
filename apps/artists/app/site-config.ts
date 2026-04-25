/**
 * Single source of truth for the Artists site's nav and footer.
 * Imported by the homepage and by every sub-page shell.
 */

export const ARTIST_NAV_LINKS = [
  { label: "Ownership", href: "/ownership" },
  { label: "Exposure", href: "/jurisdictions" },
  { label: "Income", href: "/revenue" },
  { label: "Artists", href: "/#artists" },
];

export const ARTIST_FOOTER_GROUPS = [
  {
    title: "Platform",
    links: [
      { label: "For artists", href: "/" },
      { label: "For listeners", href: "https://unismusic.com" },
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

export const ARTIST_AUTH = {
  getAccessHref: "https://unismusic.com",
  loginHref: "/login",
};
