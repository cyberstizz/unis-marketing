"use client";

import { helpLink, ShowcaseModules, UNIS_LINKS, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * The rules that keep Unis fair, as five pinned modules. Sources: help
 * center ("plays", "verification", "voting", "payouts-slice",
 * "messaging-spam", "comments-artist-delete") and the web player's play gate
 * (15 seconds, or less on very short songs; signed-out plays never count).
 */
const ITEMS: ShowcaseItem[] = [
  {
    id: "your-page",
    label: "Your page",
    headline: (
      <>
        Nobody else can put a song
        <br />
        under your name.
      </>
    ),
    body: "Spotify takes music from many distributors, so releases sometimes land on the wrong artist's page, and it now offers a review tool, still in limited beta, to catch them. On Unis, songs reach your page from your own account. There is no outside pipeline to slip through.",
    checklist: [
      { title: "Only your uploads", text: "Songs and videos on your page come from your account." },
      {
        title: "Your comments, your call",
        text: "Remove any comment on your own songs and videos. No moderation queue.",
        href: helpLink("comments-artist-delete"),
      },
      {
        title: "Report anything",
        text: "Copyright problems go through Unis's DMCA process. Anything else goes through the report page.",
        href: UNIS_LINKS.report,
      },
    ],
    visual: <ProfileVisual />,
  },
  {
    id: "plays",
    label: "Plays",
    headline: (
      <>
        A play means someone
        <br />
        chose to listen.
      </>
    ),
    body: "A play counts once someone has listened for 15 seconds, less on very short songs. The same song counts once every 30 minutes per listener, and plays from signed-out visitors never count toward plays or awards.",
    checklist: [
      {
        title: "No looping for points",
        text: "Replaying one song does nothing until 30 minutes have passed. Listening widely is what counts.",
        href: helpLink("plays-repeat"),
      },
      {
        title: "Signed-in listeners only",
        text: "The Community Share counts plays only from signed-in listeners, up to 50 a day each.",
        href: helpLink("payouts-slice"),
      },
      {
        title: "Not your own songs",
        text: "Playing your own music never counts toward your share.",
        href: helpLink("payouts-slice"),
      },
    ],
    visual: <PlaysVisual />,
  },
  {
    id: "votes",
    label: "Votes",
    headline: (
      <>
        One person. One vote.
        <br />
        Per race.
      </>
    ),
    body: "Voting needs a verified phone number, because an email takes seconds to fake and a phone number doesn't. Each person gets one vote per race per period, and only in the places they belong to.",
    checklist: [
      { title: "Phone verified", text: "A six-digit code by text, once. It takes under a minute.", href: helpLink("verification-how") },
      {
        title: "One per race, per period",
        text: "One daily vote, one weekly, and so on, with separate votes for songs and for artists.",
        href: helpLink("voting-basics"),
      },
      {
        title: "Only where you belong",
        text: "Your own neighborhood and the places above it. Never sideways into someone else's race.",
        href: helpLink("voting-where"),
      },
    ],
    visual: <VoteVisual />,
  },
  {
    id: "money",
    label: "Money",
    headline: (
      <>
        No stream minimum.
        <br />
        The first play counts.
      </>
    ),
    body: "On Spotify, a track needs 1,000 streams in a year before it earns recording royalties, and the money from smaller tracks goes to bigger ones. On Unis, a supporter's listening pays you from the first counted play.",
    checklist: [
      {
        title: "Verified accounts only",
        text: "The Community Share pays verified accounts, so a pile of fake accounts can't collect it.",
        href: helpLink("verification-unlocks"),
      },
      {
        title: "Capped listening",
        text: "Each listener counts for at most 50 plays a day, so nobody can inflate a share.",
        href: helpLink("payouts-slice"),
      },
      { title: "The math is public", text: "Every split, every fee and every assumption, on one page.", href: "/math" },
    ],
    cta: { label: "See the math", href: "/math" },
    visual: <MoneyVisual />,
  },
  {
    id: "messages",
    label: "Messages",
    headline: (
      <>
        Your inbox
        <br />
        stays yours.
      </>
    ),
    body: "Strangers get one text-only message into your requests. Each account can start conversations with at most 15 new people a day, and sending anything needs a verified phone.",
    checklist: [
      { title: "One message, then wait", text: "Nobody can pile messages into your requests folder.", href: helpLink("messaging-spam") },
      { title: "Text only from strangers", text: "No images or attachments from anyone you haven't accepted.", href: helpLink("messaging-spam") },
      { title: "Bulk gets filtered", text: "Low-quality messages go to a separate folder. You can switch it off.", href: helpLink("messaging-spam") },
    ],
    visual: <InboxVisual />,
  },
];

export function FairPlayModules() {
  return (
    <ShowcaseModules
      intro={{
        eyebrow: "The rules",
        headline: (
          <>
            Built into how
            <br />
            everything counts.
          </>
        ),
        body: "Five rules, each one public in the Unis help center.",
      }}
      items={ITEMS}
    />
  );
}

/* ───────────────────────── Visuals ───────────────────────── */

const EASE = [0.16, 1, 0.3, 1] as const;

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  return { ref, show: inView || !!reduce, reduce: !!reduce };
}

function Lock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

const SONGS = ["Lenox at Night", "125th & Fifth", "Sugar Hill Freestyle"];

function ProfileVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <span aria-hidden className="h-16 w-16 shrink-0 rounded-full" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }} />
          <div>
            <div className="font-display font-semibold text-white text-[22px] tracking-[-0.02em]">Your page</div>
            <div className="text-text-muted text-[13px]">Uptown Harlem &middot; Rap</div>
          </div>
        </div>
        <ul className="mt-6 space-y-2.5">
          {SONGS.map((song, i) => (
            <motion.li
              key={song}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: EASE }}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3"
            >
              <span className="text-white text-[14px]">{song}</span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-emerald-300">
                <Lock />
                From your account
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="mt-auto rounded-xl border border-dashed border-white/20 px-4 py-4 text-[14px] text-text-secondary"
        >
          A song from someone else&rsquo;s account can&rsquo;t appear here.
        </motion.div>
      </div>
    </VisualPanel>
  );
}

const PLAY_ROWS = [
  { label: "Listened past 0:15", result: "Counts", ok: true, fill: 0.42 },
  { label: "Same song, 10 minutes later", result: "Doesn't count yet", ok: false, fill: 0.9 },
  { label: "Signed-out visitor", result: "Not counted", ok: false, fill: 0.7 },
];

function PlaysVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col justify-center gap-4 p-6 sm:p-8">
        {PLAY_ROWS.map((row, i) => (
          <div key={row.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-white text-[14px]">{row.label}</span>
              <span
                className={
                  row.ok
                    ? "rounded-full px-3 py-1 text-[12px] font-semibold text-emerald-300 bg-emerald-400/10"
                    : "rounded-full px-3 py-1 text-[12px] font-semibold text-text-secondary bg-white/[0.06]"
                }
              >
                {row.result}
              </span>
            </div>
            <span className="relative block h-1.5 rounded-full bg-white/10 overflow-hidden">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full origin-left"
                style={{ width: `${row.fill * 100}%`, background: row.ok ? "var(--brand-electric)" : "rgba(156,163,175,0.6)" }}
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: show ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.15 + i * 0.15, ease: EASE }}
              />
            </span>
          </div>
        ))}
      </div>
    </VisualPanel>
  );
}

const CODE = ["4", "8", "2", "9", "1", "7"];

function VoteVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="text-text-muted text-[13px]">Verify your phone, once</div>
        <div className="mt-3 grid grid-cols-6 gap-2" aria-hidden>
          {CODE.map((digit, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: EASE }}
              className="flex h-14 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] font-display font-semibold text-white text-[24px]"
            >
              {digit}
            </motion.span>
          ))}
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={show ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
          className="mt-8 rounded-2xl p-5"
          style={{ background: "linear-gradient(140deg, var(--brand-navy) 0%, var(--brand-electric) 100%)" }}
        >
          <div className="text-white/80 text-[13px]">Artist of the Day &middot; Uptown Harlem &middot; Rap</div>
          <div className="mt-1 font-display font-semibold text-white text-[24px] tracking-[-0.02em]">Your vote is in.</div>
        </motion.div>
        <div className="mt-auto pt-6 grid grid-cols-2 gap-3 text-[13px]">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-text-secondary">
            Next vote in this race: <span className="text-white">tomorrow</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-text-secondary">
            Weekly race: <span className="text-white">still open to you</span>
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}

function MoneyVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col justify-center gap-6 p-6 sm:p-8">
        <div>
          <div className="flex items-center justify-between text-[13px] mb-2">
            <span className="text-text-secondary">Spotify: recording royalties start at</span>
            <span className="text-white font-semibold tabular-nums">1,000 streams a year</span>
          </div>
          <span className="relative block h-10 rounded-xl bg-white/[0.05] border border-white/10 overflow-hidden">
            <motion.span
              className="absolute inset-y-0 left-0 bg-white/[0.12]"
              initial={reduce ? false : { width: "0%" }}
              animate={{ width: show ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease: EASE }}
            />
            <span className="absolute inset-0 flex items-center px-4 text-[13px] text-text-secondary">
              Streams 1 to 999 earn no recording royalties
            </span>
          </span>
        </div>
        <div>
          <div className="flex items-center justify-between text-[13px] mb-2">
            <span className="text-text-secondary">Unis: a supporter&rsquo;s listening pays from</span>
            <span className="text-white font-semibold tabular-nums">the first counted play</span>
          </div>
          <span className="relative block h-10 rounded-xl border border-white/10 overflow-hidden" style={{ background: "rgba(37,99,235,0.12)" }}>
            <motion.span
              className="absolute inset-y-0 left-0 bg-brand-electric"
              initial={reduce ? false : { width: "0%" }}
              animate={{ width: show ? "100%" : "0%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            />
            <span className="absolute inset-0 flex items-center px-4 text-[13px] text-white">Every counted play adds to the share</span>
          </span>
        </div>
        <p className="text-text-muted text-[12px]">
          Spotify&rsquo;s rule, from{" "}
          <a className="underline hover:text-white" href="https://artists.spotify.com/trusted-platform" target="_blank" rel="noopener noreferrer">
            artists.spotify.com/trusted-platform
          </a>
          , October 2026.
        </p>
      </div>
    </VisualPanel>
  );
}

function InboxVisual() {
  const { ref, show, reduce } = useReveal();
  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col p-6 sm:p-8">
        <div className="flex gap-2" aria-hidden>
          <span className="rounded-full bg-white/[0.08] px-4 py-1.5 text-[13px] text-text-secondary">Chats</span>
          <span className="rounded-full bg-white px-4 py-1.5 text-[13px] font-semibold text-bg-deep">Requests &middot; 1</span>
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
        >
          <div className="text-text-muted text-[12px] mb-2">From someone you don&rsquo;t know yet</div>
          <div className="rounded-2xl rounded-bl-md bg-white/[0.08] px-4 py-3 text-white text-[14px]">
            Heard your song at the 125th St open mic. Got anything else?
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-brand-electric px-4 py-1.5 text-[13px] font-semibold text-white">Accept</span>
            <span className="rounded-full border border-white/15 px-4 py-1.5 text-[13px] text-text-secondary">Decline</span>
          </div>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={show ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
          className="mt-3 rounded-2xl border border-dashed border-white/15 px-4 py-3 text-[13px] text-text-muted"
        >
          A second message waits until you accept. Photos and attachments can&rsquo;t come in from strangers.
        </motion.div>
        <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <div className="font-display font-semibold text-white text-[24px]">15</div>
            <div className="text-text-muted text-[12px]">new people a day, per account</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.05] p-3">
            <div className="font-display font-semibold text-white text-[24px]">1</div>
            <div className="text-text-muted text-[12px]">message before you accept</div>
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
