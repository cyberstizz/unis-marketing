import { SectionEyebrow } from "@unis/ui";
import { SourceMark } from "./FeatureSection";

/**
 * The page's argument in one place: who holds each call on Unis. The same six
 * calls as the hero's faders, plus the one nobody holds.
 */
const CALLS = [
  { call: "Who wins an award", holder: "The neighbors who live there, by phone-verified vote." },
  { call: "What plays next on shuffle", holder: "Pure chance, with every order equally likely." },
  { call: "What a song costs", holder: "The artist, from $0.94." },
  { call: "What stays on a community playlist", holder: "The community, by vote." },
  { call: "Who your listening pays", holder: "The artist you pick to back. You can switch on the 1st." },
  { call: "Who reaches an artist's inbox", holder: "Their supporters, who skip the requests folder unless the artist turns that off." },
  { call: "Who can pay to rank or win", holder: "Nobody." },
];

export function RunByItsPeople() {
  return (
    <section id="run-by-its-people" className="border-t border-divider" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div
        className="mx-auto grid grid-cols-1 gap-14 lg:gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-start"
        style={{ maxWidth: "var(--max-w)" }}
      >
        <div>
          <SectionEyebrow>Power to the people</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(38px,4.6vw,68px)] max-w-[14ch]">
            A music scene run by its own people.
          </h2>
          <div className="text-text-secondary text-[clamp(17px,1.4vw,20px)] leading-[1.6] mt-6 max-w-[52ch] space-y-4">
            <p>
              On Spotify, artists can opt into Discovery Mode: they accept a lower royalty on the streams it brings,
              widely reported at about 30%, and their songs are pushed harder in Radio and Autoplay.
              <SourceMark n={9} /> In 2021 the House Judiciary Committee wrote to Spotify&rsquo;s CEO about it.
              <SourceMark n={10} />
            </p>
            <p>
              Unis has no version of that. Every call that decides who gets heard sits with the people who listen and
              the artists who make the music.
            </p>
          </div>
        </div>

        <dl className="border-t border-divider-soft">
          {CALLS.map((c, i) => (
            <div
              key={c.call}
              className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8 py-5 border-b border-divider"
            >
              <dt className="font-display font-semibold text-white text-[18px] sm:text-[20px] leading-[1.25] tracking-[-0.02em]">
                {c.call}
              </dt>
              <dd
                className={
                  i === CALLS.length - 1
                    ? "font-display font-semibold text-brand-electric-hover text-[18px] sm:text-[20px] leading-[1.25] tracking-[-0.02em]"
                    : "text-text-secondary text-[15px] sm:text-[16px] leading-[1.55]"
                }
              >
                {c.holder}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
