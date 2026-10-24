"use client";

import clsx from "clsx";
import { useReducedMotion } from "motion/react";
import { ReactNode, useState } from "react";

type VideoSlotProps = {
  /** Path of the looping video, e.g. "/videos/get-heard.mp4". */
  src: string;
  /** What shows until the video can play, and if it never arrives. */
  fallback: ReactNode;
  className?: string;
};

/**
 * A place for a silent looping video that works before the video exists.
 *
 * The coded fallback shows first. The video loads underneath; once the
 * browser can play it, it fades in over the fallback. If the file isn't
 * there yet (or fails), nothing changes and the fallback stays. So a video
 * goes live by dropping the file at `src` and deploying, with no code change.
 *
 * Visitors who ask for reduced motion keep the still fallback.
 */
export function VideoSlot({ src, fallback, className }: VideoSlotProps) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  return (
    <div className={clsx("relative h-full w-full", className)}>
      <div
        className={clsx(
          "absolute inset-0 transition-opacity duration-700 ease-out-quart",
          ready ? "opacity-0" : "opacity-100"
        )}
        aria-hidden={ready || undefined}
      >
        {fallback}
      </div>
      {!reduce && (
        <div
          className={clsx(
            "absolute inset-0 overflow-hidden rounded-[var(--radius-panel)] border border-[color:var(--panel-border)] bg-bg-surface transition-opacity duration-700 ease-out-quart",
            ready ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          aria-hidden
        >
          <video
            className="h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setReady(true)}
            onError={() => setReady(false)}
          />
        </div>
      )}
    </div>
  );
}
