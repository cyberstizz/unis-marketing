import { helpLink, SectionEyebrow, UNIS_LINKS } from "@unis/ui";

type Feature = { name: string; text: string; href: string; link: string; note?: string };
type Group = { title: string; features: Feature[] };

/**
 * Every feature on one screen, grouped by what you're doing. Each line links
 * to its section further down the page, or to the help center article that
 * explains it.
 */
const GROUPS: Group[] = [
  {
    title: "Decide",
    features: [
      {
        name: "Vote where you live",
        text: "One phone-verified vote per race per period, in your neighborhood and every place above it.",
        href: "#awards",
        link: "How winners are picked",
      },
      {
        name: "Awards with one winner",
        text: "Song and Artist of the Day, Week, Month, Quarter, Midterm and Year. One winner each, on the record for good.",
        href: helpLink("awards"),
        link: "About awards",
      },
      {
        name: "Community playlists",
        text: "Anyone can suggest a song. The neighborhood votes it in or out.",
        href: "#playlists",
        link: "See how",
      },
    ],
  },
  {
    title: "Listen",
    features: [
      {
        name: "True shuffle",
        text: "Every order of your queue is equally likely, and nothing gets slipped in.",
        href: "#shuffle",
        link: "Watch it shuffle",
      },
      {
        name: "Your playlists",
        text: "Private, unlisted or public. Follow anyone's public playlists.",
        href: "#playlists",
        link: "Playlists",
      },
      {
        name: "Plays that mean something",
        text: "A play counts after 15 seconds, once per song every 30 minutes, from signed-in listeners.",
        href: helpLink("plays"),
        link: "About plays",
      },
    ],
  },
  {
    title: "Back an artist",
    features: [
      {
        name: "Back one artist",
        text: "15% of your monthly share of what Unis earns goes to them. It costs you nothing.",
        href: "#backing",
        link: "Backing vs. a night out",
      },
      {
        name: "Buy their songs",
        text: "From $0.94. The artist sets the price and keeps most of it.",
        href: "#selling",
        link: "Where the money goes",
      },
      {
        name: "Send support",
        text: "Send an artist money directly, from $1.",
        href: helpLink("payouts-sales-fee"),
        link: "Fees, in full",
      },
      {
        name: "Unis Plus",
        text: "$4.99 a month, no ads. 15% goes to the artist you back no matter what, and 45% to the artists you play.",
        href: helpLink("plus-what"),
        link: "About Plus",
      },
    ],
  },
  {
    title: "Connect",
    features: [
      {
        name: "Messages",
        text: "Message any artist. If you back them, you land in their inbox, not their requests.",
        href: helpLink("messaging-artists"),
        link: "About messages",
      },
      {
        name: "Profiles and photos",
        text: "Find friends on Discover and see their photos, unless their profile is private or they're under 17.",
        href: helpLink("follow"),
        link: "About following",
      },
    ],
  },
  {
    title: "Earn",
    features: [
      {
        name: "Bring your people",
        text: "Earn 10%, 5% and 2% of the monthly shares of people you bring in, three levels deep.*",
        note: "*The people you bring in need a verified phone number for their listening to count toward your share.",
        href: helpLink("referrals"),
        link: "About referrals",
      },
      {
        name: "Get paid as an artist",
        text: "Supporters, Plus, song sales and direct support, paid through Stripe.",
        href: `${UNIS_LINKS.artists}/revenue`,
        link: "Unis for artists",
      },
    ],
  },
];

export function FeatureIndex() {
  return (
    <section id="every-feature" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <SectionEyebrow>All of it</SectionEyebrow>
        <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(38px,4.6vw,68px)] max-w-[18ch]">
          Everything you can do on Unis.
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="font-display font-semibold text-brand-electric-hover text-[15px] tracking-tight pb-4 border-b border-divider-soft">
                {group.title}
              </h3>
              <ul className="divide-y divide-divider">
                {group.features.map((f) => (
                  <li key={f.name} className="py-5">
                    <p className="font-display font-semibold text-white text-[20px] leading-[1.2] tracking-[-0.02em]">{f.name}</p>
                    <p className="text-text-secondary text-[15px] leading-[1.6] mt-2 max-w-[48ch]">{f.text}</p>
                    {f.note && <p className="text-text-muted text-[13px] leading-[1.6] mt-2 max-w-[48ch]">{f.note}</p>}
                    <a
                      href={f.href}
                      className="inline-block mt-3 text-[14px] font-medium text-brand-electric-hover underline decoration-brand-electric/40 underline-offset-4 hover:text-white hover:decoration-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-electric rounded-sm"
                    >
                      {f.link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
