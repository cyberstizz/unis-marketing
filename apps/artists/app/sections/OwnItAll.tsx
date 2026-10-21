"use client";

import { helpLink, VisualPanel, type ShowcaseItem } from "@unis/ui";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Module 4 of the showcase: ownership. Wording follows Section 2 of the
 * in-app Artist Ownership & Revenue Share Agreement (artistDashboard.jsx) and
 * Section 3.3 of the Terms of Service.
 */
export const ownModule: ShowcaseItem = {
  id: "own-it-all",
  label: "Own it all",
  headline: (
    <>
      Your music.
      <br />
      Your masters.
      <br />
      Your money.
    </>
  ),
  body: "Unis gets permission to play your songs on Unis, and nothing more. You keep every right, and you can leave whenever you want.",
  checklist: [
    {
      title: "100% ownership",
      text: "Your recordings and compositions stay yours. Unis claims no ownership of your music.",
      href: "/ownership",
    },
    {
      title: "Non-exclusive",
      text: "Keep your music on every other platform and distributor you use.",
      href: "/ownership",
    },
    {
      title: "Your agreement, in writing",
      text: "Download your ownership and revenue-share agreement from your dashboard any time.",
      href: "/sample-agreement.pdf",
    },
    {
      title: "Leave anytime",
      text: "Take a song down or close your account whenever you like. No contract to sit out, no exit fee.",
      href: helpLink("deleting"),
    },
  ],
  cta: { label: "Explore ownership", href: "/ownership" },
  visual: <AgreementVisual />,
};

function AgreementVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  return (
    <VisualPanel>
      <div ref={ref} className="h-full flex flex-col justify-between p-7 sm:p-10">
        <div>
          <div className="text-brand-electric text-[13px] font-semibold mb-5">
            Artist Ownership &amp; Revenue Share Agreement
          </div>
          <blockquote className="font-display text-white text-[clamp(26px,3vw,38px)] leading-[1.08] tracking-[-0.025em]">
            &ldquo;Unis claims no ownership of your&nbsp;
            <span className="chrome-text">music.</span>&rdquo;
          </blockquote>
          <div className="text-text-muted text-[14px] mt-5">Section 2, Ownership of Your Content</div>
        </div>

        <div className="flex flex-wrap gap-2 my-8">
          {["Non-exclusive", "Masters stay yours", "Leave anytime"].map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1.5 text-[13px] text-text-secondary">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-text-muted text-[12px] mb-1">Artist</div>
            <svg width="150" height="52" viewBox="0 0 150 52" fill="none" aria-hidden>
              <motion.path
                d="M 6 36 Q 18 8, 32 30 T 58 28 Q 72 14, 88 33 T 142 24"
                stroke="white"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: inView || reduce ? 1 : 0 }}
                transition={{ duration: 1.4, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
              />
            </svg>
          </div>
          <div className="text-right">
            <div className="font-display font-semibold text-brand-electric text-[56px] sm:text-[64px] leading-none tracking-[-0.045em]">
              100%
            </div>
            <div className="text-text-muted text-[13px] mt-1">yours</div>
          </div>
        </div>
      </div>
    </VisualPanel>
  );
}
