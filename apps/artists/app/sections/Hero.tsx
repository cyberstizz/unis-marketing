"use client";

import { motion } from "motion/react";
import { Button } from "@unis/ui";

/**
 * Hero section. Full-bleed video loop with headline overlaid bottom-left.
 *
 * Video source: Replace the poster + video src with your final Sora/Veo
 * generated footage (see BRAND.md for the exact prompt). For now, a static
 * gradient placeholder shows the layout without requiring the video asset.
 */
export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden">
      {/* Video layer — replace src when the hero loop is generated */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder background: deep navy radial gradient + subtle noise.
            Swap for <video> once the Sora/Veo loop is ready. */}
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(37, 99, 235, 0.25) 0%, rgba(10, 14, 26, 1) 50%), radial-gradient(ellipse at 80% 60%, rgba(139, 92, 246, 0.15) 0%, rgba(10, 14, 26, 1) 60%), #0a0e1a",
          }}
        /> */}
        <video
          className="w-full h-full object-cover"
          autoPlay muted loop playsInline
          poster="/hero-artist-poster.jpg"
        >
          <source src="/hero-artist.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient scrim so the headline stays legible over any video */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 14, 26, 0.3) 0%, rgba(10, 14, 26, 0) 30%, rgba(10, 14, 26, 0.4) 70%, rgba(10, 14, 26, 0.95) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-20 h-full flex flex-col justify-end mx-auto"
        style={{
          maxWidth: "var(--max-w)",
          padding: "0 var(--content-px) clamp(60px, 10vh, 120px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <h1 className="font-display font-semibold text-white leading-[0.88] tracking-[-0.05em] text-[clamp(40px,7.5vw,120px)] mb-8">
            Where music
            <br />
            <span className="chrome-text">lives.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-text-secondary text-body-lg max-w-[48ch] mb-10"
        >
          Keep your masters. Win your neighborhood. Get paid by fans who never
          press play.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex gap-3 flex-wrap"
        >
          <Button as="a" href="https://unismusic.com" variant="primary" size="lg">
            Get access
          </Button>
          <Button as="a" href="https://unismusic.com" variant="secondary" size="lg">
            Log in
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
