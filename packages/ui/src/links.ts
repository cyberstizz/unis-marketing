/**
 * Every URL the marketing sites send people to, in one place.
 *
 * While the pre-launch gate is on, unismusic.com shows the Coming soon page
 * (sign up works there; login is hidden). /waitlist, /sponsor, /help, /terms
 * and /privacy stay open before launch, so every link below works today and
 * keeps working after launch with no edits.
 */

const APP = "https://unismusic.com";

export const UNIS_LINKS = {
  /** The app. Before launch this is the Coming soon page with Sign up. */
  app: APP,
  signup: APP,
  login: `${APP}/login`,
  waitlist: `${APP}/waitlist`,
  sponsor: `${APP}/sponsor`,
  help: `${APP}/help`,
  terms: `${APP}/terms`,
  privacy: `${APP}/privacy`,
  cookies: `${APP}/cookie`,
  report: `${APP}/report`,
  artists: "https://artists.unismusic.com",
  listeners: "https://listeners.unismusic.com",
} as const;

/** Deep link into one help-center section or article, e.g. help("awards"). */
export function helpLink(id: string): string {
  return `${UNIS_LINKS.help}#${id}`;
}
