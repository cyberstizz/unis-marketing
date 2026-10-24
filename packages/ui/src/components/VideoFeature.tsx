"use client";

import { motion } from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { SectionEyebrow } from "./SectionEyebrow";

type VideoFeatureProps = {
  id?: string;
  eyebrow: string;
  headline: ReactNode;
  body?: ReactNode;
  /** Path of the video with sound, e.g. "/videos/start-tour.mp4". */
  src: string;
  /** Optional captions file (WebVTT), e.g. "/videos/start-tour.vtt". */
  captions?: string;
};

/**
 * A click-to-play explainer video with sound and captions.
 *
 * The whole section stays hidden until the video file is actually on the
 * site, so a page never shows an empty player. Drop the file at `src`,
 * deploy, and the section appears.
 */
export function VideoFeature({ id, eyebrow, headline, body, src, captions }: VideoFeatureProps) {
  const [available, setAvailable] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ask the server whether the file exists before showing anything. A missing
  // file comes back as a 404 page (or an HTML fallback), never as video.
  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        if (!cancelled && res.ok && type.startsWith("video/")) setAvailable(true);
      })
      .catch(() => {
        /* no file yet — stay hidden */
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (!available) return null;

  const play = () => {
    setStarted(true);
    void videoRef.current?.play();
  };

  return (
    <section id={id} className="relative" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div className="mx-auto" style={{ maxWidth: "1120px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-[60ch] mb-10"
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(36px,4.6vw,68px)]">
            {headline}
          </h2>
          {body && <p className="text-text-secondary text-body-lg mt-5">{body}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video overflow-hidden rounded-[var(--radius-panel)] border border-[color:var(--panel-border)] bg-bg-surface"
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={`${src}#t=0.1`}
            controls={started}
            playsInline
            preload="metadata"
          >
            {captions && <track kind="captions" src={captions} srcLang="en" label="English" default />}
          </video>
          {!started && (
            <button
              type="button"
              onClick={play}
              className="group absolute inset-0 flex items-center justify-center bg-bg-deep/30 hover:bg-bg-deep/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
              aria-label="Play video"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-navy shadow-[0_16px_60px_-12px_rgba(37,99,235,0.8)] transition-transform duration-300 group-hover:scale-105">
                <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
