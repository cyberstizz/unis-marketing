import { helpLink, SectionEyebrow } from "@unis/ui";
import clsx from "clsx";
import { ReactNode } from "react";
import { FactList, SourceMark } from "./FeatureSection";

type Rung = { award: string; who: ReactNode; unis?: boolean };

/**
 * Voting vs. industry awards. Not an attack on anyone's award: each one
 * answers a different question. The ladder runs from awards decided far from
 * the music's home to the one decided where it's made.
 */
const LADDER: Rung[] = [
  {
    award: "The GRAMMYs",
    who: (
      <>
        Recording Academy voting members, working music creators who each vote in up to 10 categories plus the
        General Field.
        <SourceMark n={1} />
      </>
    ),
  },
  {
    award: "BET Awards",
    who: (
      <>
        A voting academy of about 500 people from the music industry and the media, bloggers included.
        <SourceMark n={2} />
      </>
    ),
  },
  {
    award: "Billboard Music Awards",
    who: (
      <>
        National sales, streams, radio airplay, touring and social numbers, plus three fan-voted categories.
        <SourceMark n={3} />
      </>
    ),
  },
  {
    award: "American Music Awards",
    who: (
      <>
        Fans online, anywhere, with up to 25 votes per category every day, and 50 on Turbo Voting days.
        <SourceMark n={4} />
      </>
    ),
  },
  {
    award: "Unis",
    who: "Your neighbors. One phone-verified vote per race per period, counted only where the voter lives, with plays and likes added in.",
    unis: true,
  },
];

export function WhoDecides() {
  return (
    <section id="awards" className="border-t border-divider" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        <SectionEyebrow>Voting and awards</SectionEyebrow>
        <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(38px,4.6vw,68px)] max-w-[20ch]">
          Big awards are decided far away. Unis awards are decided on your block.
        </h2>
        <p className="text-text-secondary text-[clamp(17px,1.4vw,20px)] leading-[1.6] mt-6 max-w-[60ch]">
          Nothing wrong with the GRAMMYs. They answer a different question: what does the industry think? Unis asks
          what the people who live with the music think, one neighborhood at a time, and lets the answer change every
          day.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:gap-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-start">
          {/* The ladder: who decides each award, from farthest to closest */}
          <div>
            <div className="flex justify-between text-[12px] font-medium mb-3">
              <span className="text-accent-amber">Decided far from the music</span>
            </div>
            <ol className="relative">
              <span
                aria-hidden
                className="absolute left-[11px] top-3 bottom-3 w-px"
                style={{ background: "linear-gradient(180deg, var(--accent-amber), var(--brand-electric))" }}
              />
              {LADDER.map((rung) => (
                <li key={rung.award} className="relative pl-10 py-3">
                  <span
                    aria-hidden
                    className={clsx(
                      "absolute left-[5px] top-[22px] h-[13px] w-[13px] rounded-full border-2",
                      rung.unis ? "bg-brand-electric border-brand-electric" : "bg-bg-deep border-white/30"
                    )}
                  />
                  <div
                    className={clsx(
                      "rounded-2xl p-5",
                      rung.unis
                        ? "border border-brand-electric/50"
                        : "border border-transparent"
                    )}
                    style={rung.unis ? { background: "rgba(37,99,235,0.14)" } : undefined}
                  >
                    <p className="font-display font-semibold text-white text-[20px] leading-[1.2] tracking-[-0.02em]">
                      {rung.award}
                    </p>
                    <p className={clsx("text-[15px] leading-[1.6] mt-1.5", rung.unis ? "text-white" : "text-text-muted")}>
                      {rung.who}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-[12px] font-medium mt-3 text-brand-electric-hover">Decided where the music lives</div>
          </div>

          {/* How a Unis winner is picked */}
          <div>
            <h3 className="font-display font-semibold text-white text-[24px] leading-[1.15] tracking-[-0.02em] mb-6">
              How a Unis winner is picked
            </h3>
            <FactList
              items={[
                {
                  lead: "Votes weigh most",
                  text: "A vote for Song of the Day adds 10 points. A like adds 5 and a play adds 1. Votes for longer periods weigh more, up to 250 for Song of the Year.",
                },
                {
                  lead: "Only locals decide",
                  text: "A vote counts in a race only if the voter lives there. A fan in Los Angeles can't decide Harlem's award, though their listening still helps.",
                },
                {
                  lead: "One person, one vote",
                  text: "Voting needs a verified phone number, and you get one vote per race per period.",
                },
                {
                  lead: "One winner, for good",
                  text: "Every award has exactly one winner. It goes on their profile and into the neighborhood's record, permanently.",
                },
                {
                  lead: "Not for sale",
                  text: "No artist can pay to rank or to win. The only paid spots on Unis are labeled ad slots.",
                },
              ]}
            />
            <a
              href={helpLink("voting")}
              className="inline-block mt-6 text-[14px] font-medium text-brand-electric-hover underline decoration-brand-electric/40 underline-offset-4 hover:text-white"
            >
              Voting, in full
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
