import { Button, PageHero, UNIS_LINKS, VisualPanel } from "@unis/ui";
import { Phone } from "./Phone";

/**
 * Get started — hero. Answers Spotify's "Get started" page, whose first step
 * is choosing a distributor.
 */
export function StartHero() {
  return (
    <PageHero
      eyebrow="Get started"
      lines={[
        "No distributor.",
        "No pitch.",
        <span key="wait" className="chrome-text">
          No waiting.
        </span>,
      ]}
      body="On Spotify, step one is choosing a distributor and paying for it. On Unis, step one is signing up, and your first song goes up in the same sitting."
      actions={
        <>
          <Button as="a" href={UNIS_LINKS.signup} variant="primary" size="lg">
            Sign up as an artist
          </Button>
          <Button as="a" href="#steps" variant="secondary" size="lg">
            See the steps
          </Button>
        </>
      }
      media={
        <VisualPanel>
          <div className="h-full flex items-center justify-center p-6 sm:p-10">
            <Phone>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-12 w-12 shrink-0 rounded-full" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }} />
                <div>
                  <div className="text-white text-[16px] font-semibold">Your name</div>
                  <div className="text-text-muted text-[12px]">Uptown Harlem &middot; Rap</div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl p-3" style={{ background: "linear-gradient(140deg, #163387, #2563eb)" }}>
                <div className="text-white/80 text-[11px] uppercase tracking-[0.1em]">Featured song</div>
                <div className="text-white text-[15px] font-semibold mt-1">Your debut song</div>
                <div className="mt-3 h-1 rounded-full bg-white/25">
                  <div className="h-full w-1/3 rounded-full bg-white" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {["Songs", "Videos", "Photos"].map((t) => (
                  <div key={t} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2.5">
                    <span className="text-white">{t}</span>
                    <span className="text-text-muted" aria-hidden>
                      &rsaquo;
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-full bg-white py-2.5 text-center text-[13px] font-semibold text-brand-navy">Share your page</div>
              <div className="mt-3 flex items-center justify-center gap-2 text-[12px] text-emerald-300">
                <span aria-hidden className="h-2 w-2 rounded-full bg-emerald-400" />
                Ready for launch day
              </div>
            </Phone>
          </div>
        </VisualPanel>
      }
    />
  );
}
