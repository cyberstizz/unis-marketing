import { Logo } from "./Logo";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

type FooterBarProps = {
  site: "artists" | "listeners";
  groups: FooterGroup[];
};

/**
 * Footer appears on both sites with site-specific link groups.
 * Closes out under the PowerToThePeople banner.
 */
export function FooterBar({ site, groups }: FooterBarProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-bg-deep border-t border-divider"
      style={{ padding: "80px var(--content-px) 40px" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <div className="grid gap-16 lg:gap-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] mb-16">
          <div>
            <a href="/" className="inline-flex items-center gap-3 mb-6">
              <Logo size={100} />
              <span className="text-text-muted text-sm font-display tracking-wide">
                for {site === "artists" ? "Artists" : "Listeners"}
              </span>
            </a>
            <p className="text-text-secondary text-[15px] leading-relaxed max-w-[40ch]">
              Unis is a hyper-local music platform built in Harlem. Where music
              lives. Where you live.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-eyebrow uppercase text-text-muted font-semibold mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-[15px] text-text-secondary hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-divider pt-8 flex flex-col sm:flex-row justify-between gap-4 text-text-muted text-sm">
          <span>© {year} Unis. Built in Harlem.</span>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="/contact" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
