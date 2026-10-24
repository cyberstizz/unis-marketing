"use client";

import { helpLink, ShowcaseModules, UNIS_LINKS, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ReactNode, useRef } from "react";
import { Phone } from "./Phone";

/**
 * The five steps from sign-up to your first supporters. Facts from the help
 * center ("sounds-what", "sounds-tagging", "jurisdiction-change",
 * "verification-how", "supporter-artist-side", "referrals-levels") and the
 * sign-up wizard (debut song attached at sign-up).
 */
const ITEMS: ShowcaseItem[] = [
  {
    id: "step-sign-up",
    label: "1 · Sign up",
    headline: <>Sign up as an artist.</>,
    body: "Create your account at unismusic.com and choose Artist. It's free. In Harlem, your account is ready for launch day. Anywhere else, join the waitlist and your username is saved.",
    checklist: [
      { title: "Free to join", text: "No fee to sign up, upload or stay listed." },
      { title: "Pick your race", text: "Rap, Rock or Pop. Every song competes in one of the three.", href: helpLink("sounds-what") },
      {
        title: "Your neighborhood, set once",
        text: "It's where you compete, so it's set when you sign up and can't be switched to chase an easier race.",
        href: helpLink("jurisdiction-change"),
      },
    ],
    visual: <SignUpScreen />,
  },
  {
    id: "step-upload",
    label: "2 · Upload",
    headline: (
      <>
        Your first song goes up
        <br />
        while you sign up.
      </>
    ),
    body: "Attach your debut song in the sign-up flow. Tag its subgenre, mood and language so the right listeners find it.",
    checklist: [
      { title: "Sound and mood tags", text: "A subgenre, an optional second one, one or two moods, and the language.", href: helpLink("sounds-tagging") },
      { title: "Clean versions too", text: "A clean version uploaded right after the explicit one gets the same tags automatically.", href: helpLink("sounds-tagging") },
      { title: "More any time", text: "Upload new songs and videos from your dashboard whenever they're ready." },
    ],
    visual: <UploadScreen />,
  },
  {
    id: "step-page",
    label: "3 · Your page",
    headline: <>Make your page yours.</>,
    body: "Add a photo, your story and the song people should hear first. Then fill it out with photos, videos, lyrics and your links.",
    checklist: [
      { title: "Featured song", text: "The first track people see and hear on your page." },
      { title: "Video, no waitlist", text: "Upload performances, covers and music videos from your dashboard." },
      { title: "Your links", text: "Instagram, TikTok, X, YouTube and a contact email." },
    ],
    visual: <PageScreen />,
  },
  {
    id: "step-get-paid",
    label: "4 · Get paid",
    headline: (
      <>
        Verify your phone.
        <br />
        Connect payouts.
      </>
    ),
    body: "Your phone unlocks voting, messages and your monthly share. Connect Stripe so sales and your share reach your bank.",
    checklist: [
      { title: "Under a minute", text: "A six-digit code by text, once.", href: helpLink("verification-how") },
      { title: "Paid on the 1st", text: "Stripe pays your bank once a month, and Unis covers the payout fee.", href: "/revenue" },
      { title: "Your agreement, in your name", text: "Download your ownership and revenue share agreement from your dashboard.", href: "/ownership" },
    ],
    visual: <PaidScreen />,
  },
  {
    id: "step-share",
    label: "5 · Share",
    headline: <>Share your link.</>,
    body: "Everyone who joins with your link adds to your monthly share. Everyone who picks you as their artist adds more, every month they listen.",
    checklist: [
      { title: "15% from supporters", text: "Of each supporter's monthly Community Share slice.", href: helpLink("supporter-artist-side") },
      { title: "10%, 5% and 2% from referrals", text: "From the people you invite, and the people they invite.", href: helpLink("referrals-levels") },
      { title: "Votes from your people", text: "Every verified fan you bring can vote in your races." },
    ],
    cta: { label: "Sign up as an artist", href: UNIS_LINKS.signup },
    visual: <ShareScreen />,
  },
];

export function StartSteps() {
  return (
    <ShowcaseModules
      intro={{
        eyebrow: "Five steps",
        headline: (
          <>
            From sign-up
            <br />
            to your first supporters.
          </>
        ),
      }}
      items={ITEMS}
    />
  );
}

/* ───────────────────────── Phone screens ───────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

function Screen({ children }: { children: (show: boolean, reduce: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = !!useReducedMotion();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex items-center justify-center p-6 sm:p-10">
        <Phone>{children(inView || reduce, reduce)}</Phone>
      </div>
    </VisualPanel>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <div className="text-text-muted text-[11px] uppercase tracking-[0.1em] mb-1.5">{children}</div>;
}

function SignUpScreen() {
  return (
    <Screen>
      {() => (
        <>
          <div className="text-white text-[18px] font-semibold mb-4">Create your account</div>
          <Label>I&rsquo;m joining as</Label>
          <div className="grid grid-cols-2 gap-1 rounded-full bg-white/[0.06] p-1 mb-4">
            <span className="rounded-full py-1.5 text-center text-text-secondary">Listener</span>
            <span className="rounded-full bg-brand-electric py-1.5 text-center font-semibold text-white">Artist</span>
          </div>
          <Label>Your race</Label>
          <div className="flex gap-1.5 mb-4">
            {["Rap", "Rock", "Pop"].map((g, i) => (
              <span
                key={g}
                className={
                  i === 0
                    ? "rounded-full bg-white px-3 py-1 font-semibold text-bg-deep"
                    : "rounded-full border border-white/15 px-3 py-1 text-text-secondary"
                }
              >
                {g}
              </span>
            ))}
          </div>
          <Label>Your neighborhood</Label>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2.5 text-white mb-4">Uptown Harlem</div>
          <Label>Username</Label>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2.5 text-white mb-5">yourname</div>
          <div className="rounded-full bg-white py-2.5 text-center font-semibold text-brand-navy">Continue</div>
        </>
      )}
    </Screen>
  );
}

function UploadScreen() {
  return (
    <Screen>
      {(show, reduce) => (
        <>
          <div className="text-white text-[18px] font-semibold mb-4">Your debut song</div>
          <div className="rounded-xl bg-white/[0.06] p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white">debut-song.mp3</span>
              <span className="text-text-muted text-[11px]">{show ? "Done" : "Uploading"}</span>
            </div>
            <span className="block h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.span
                className="block h-full rounded-full bg-brand-electric origin-left"
                initial={reduce ? false : { scaleX: 0.1 }}
                animate={{ scaleX: show ? 1 : 0.1 }}
                transition={{ duration: 1.6, ease: EASE }}
              />
            </span>
          </div>
          <Label>Subgenre</Label>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2.5 text-white mb-3">Drill</div>
          <Label>Mood</Label>
          <div className="flex gap-1.5 mb-3">
            <span className="rounded-full bg-white/[0.1] px-3 py-1 text-white">Hype</span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-text-secondary">+ add</span>
          </div>
          <Label>Language</Label>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2.5 text-white mb-5">English</div>
          <div className="rounded-full bg-brand-electric py-2.5 text-center font-semibold text-white">Finish sign-up</div>
        </>
      )}
    </Screen>
  );
}

function PageScreen() {
  return (
    <Screen>
      {(show, reduce) => (
        <>
          <div
            aria-hidden
            className="-mx-4 -mt-10 mb-4 h-28"
            style={{ background: "linear-gradient(160deg, #163387 0%, #7c3aed 100%)" }}
          />
          <div className="-mt-12 mb-3 flex items-end gap-3">
            <span aria-hidden className="h-16 w-16 shrink-0 rounded-full border-4 border-bg-deep" style={{ background: "linear-gradient(135deg, #f59e0b, #b45309)" }} />
            <div className="pb-1">
              <div className="text-white text-[16px] font-semibold">Your name</div>
              <div className="text-text-muted text-[11px]">Uptown Harlem &middot; Rap</div>
            </div>
          </div>
          <p className="text-text-secondary text-[12px] leading-[1.5] mb-3">Your story, in a line or two.</p>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                aria-hidden
                className="aspect-square rounded-lg"
                style={{ background: ["#1f2b52", "#3b1a5a", "#0f3d3a", "#4a1d2f", "#2a2f45", "#3d2a12"][i] }}
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={show ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: EASE }}
              />
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["Instagram", "TikTok", "YouTube"].map((l) => (
              <span key={l} className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-text-secondary">
                {l}
              </span>
            ))}
          </div>
        </>
      )}
    </Screen>
  );
}

function PaidScreen() {
  return (
    <Screen>
      {(show, reduce) => (
        <>
          <div className="text-white text-[18px] font-semibold mb-4">Get paid</div>
          <div className="rounded-xl bg-white/[0.06] p-3 mb-3">
            <div className="text-text-muted text-[11px] mb-2">Code sent by text</div>
            <div className="grid grid-cols-6 gap-1">
              {["4", "8", "2", "9", "1", "7"].map((d, i) => (
                <motion.span
                  key={i}
                  className="flex h-9 items-center justify-center rounded-lg bg-white/[0.08] text-white font-semibold"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={show ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                >
                  {d}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            className="flex items-center justify-between rounded-xl bg-emerald-400/10 px-3 py-2.5 mb-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="text-white">Phone verified</span>
            <span className="text-emerald-300 font-semibold">&#10003;</span>
          </motion.div>
          <motion.div
            className="flex items-center justify-between rounded-xl bg-emerald-400/10 px-3 py-2.5 mb-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={show ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <span className="text-white">Stripe connected</span>
            <span className="text-emerald-300 font-semibold">&#10003;</span>
          </motion.div>
          <div className="rounded-xl bg-white/[0.06] p-3">
            <div className="text-text-muted text-[11px]">Next bank payout</div>
            <div className="text-white text-[16px] font-semibold">The 1st of the month</div>
          </div>
        </>
      )}
    </Screen>
  );
}

function ShareScreen() {
  return (
    <Screen>
      {(show, reduce) => (
        <>
          <div className="text-white text-[18px] font-semibold mb-1">Bring your people</div>
          <p className="text-text-secondary text-[12px] mb-4">They join with your link. You earn from their listening.</p>
          <div className="rounded-xl bg-white/[0.06] p-3 mb-4 flex items-center justify-between">
            <span className="text-white">Your invite link</span>
            <span className="rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-brand-navy">Copy</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4" aria-hidden>
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.span
                key={i}
                className="h-8 w-8 rounded-full"
                style={{ background: ["#7c3aed", "#0f766e", "#b45309", "#be185d", "#0284c7"][i % 5] }}
                initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                animate={show ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE }}
              />
            ))}
          </div>
          <div className="rounded-xl p-3 text-white" style={{ background: "linear-gradient(140deg, #163387, #2563eb)" }}>
            <div className="text-white/80 text-[11px]">Goal before launch day</div>
            <div className="text-[15px] font-semibold">10 people with your link</div>
          </div>
        </>
      )}
    </Screen>
  );
}
