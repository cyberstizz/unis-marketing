import { ReactNode } from "react";
import { FooterBar } from "./FooterBar";
import { NavBar } from "./NavBar";
import { PowerToThePeople } from "./PowerToThePeople";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };
type NavLink = { label: string; href: string };
type Cta = { label: string; href: string };

type SubPageShellProps = {
  site: "artists" | "listeners";
  navLinks: NavLink[];
  footerGroups: FooterGroup[];
  primaryCta: Cta;
  secondaryCta?: Cta;
  crossLink?: Cta;
  children: ReactNode;
  /** If true, the PowerToThePeople banner is hidden on this page. Default false. */
  hidePowerBand?: boolean;
  /**
   * If true, content starts at the very top (under the transparent nav), the
   * way the home heroes are built. Sub-pages leave this off so their first
   * section clears the fixed nav.
   */
  flushTop?: boolean;
};

/**
 * Shared shell for every page — home and sub-pages (ownership, jurisdictions,
 * revenue, math). Smooth scroll, nav, closing band and footer in one place, so
 * every page behaves the same.
 */
export function SubPageShell({
  site,
  navLinks,
  footerGroups,
  primaryCta,
  secondaryCta,
  crossLink,
  children,
  hidePowerBand = false,
  flushTop = false,
}: SubPageShellProps) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <NavBar
        site={site}
        links={navLinks}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
        crossLink={crossLink}
      />
      <main>
        {flushTop ? children : <div style={{ paddingTop: "var(--nav-h)" }}>{children}</div>}
        {!hidePowerBand && <PowerToThePeople />}
      </main>
      <FooterBar site={site} groups={footerGroups} />
    </SmoothScroll>
  );
}
