import { NavBar } from "./NavBar";
import { ScrollProgress } from "./ScrollProgress";
import { PowerToThePeople } from "./PowerToThePeople";
import { FooterBar } from "./FooterBar";
import { ReactNode } from "react";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };
type NavLink = { label: string; href: string };

type SubPageShellProps = {
  site: "artists" | "listeners";
  navLinks: NavLink[];
  footerGroups: FooterGroup[];
  getAccessHref: string;
  loginHref: string;
  children: ReactNode;
  /** If true, the PowerToThePeople banner is hidden on this page. Default false. */
  hidePowerBand?: boolean;
};

/**
 * Shared shell for every non-home page (ownership, jurisdictions, revenue, math, etc.).
 * Keeps nav and footer consistent across the site without every page re-importing the
 * same config.
 */
export function SubPageShell({
  site,
  navLinks,
  footerGroups,
  getAccessHref,
  loginHref,
  children,
  hidePowerBand = false,
}: SubPageShellProps) {
  return (
    <>
      <ScrollProgress />
      <NavBar
        site={site}
        links={navLinks}
        getAccessHref={getAccessHref}
        loginHref={loginHref}
      />
      <main>
        {/* Add top padding so hero content clears the fixed NavBar cleanly */}
        <div style={{ paddingTop: "80px" }}>{children}</div>
        {!hidePowerBand && <PowerToThePeople />}
      </main>
      <FooterBar site={site} groups={footerGroups} />
    </>
  );
}
