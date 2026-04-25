"use client";

import { motion } from "motion/react";
import { Button } from "@unis/ui";

/**
 * Listener-site hero. Same structural approach as the Artists hero, but the
 * headline acknowledges both halves of the through-line: "Where music lives.
 * Where you live." The video in production will show a woman with headphones
 * on a Harlem stoop at blue hour (see BRAND.md for the Sora/Veo prompt).
 */
export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[720px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 70% 40%, rgba(139, 92, 246, 0.2) 0%, rgba(10, 14, 26, 1) 55%), radial-gradient(ellipse at 20% 70%, rgba(37, 99, 235, 0.22) 0%, rgba(10, 14, 26, 1) 60%), #0a0e1a",
          }}
        /> */}
        {/* Swap for /hero-listener.mp4 when the loop is generated. */}

        <video
          className="w-full h-full object-cover"
          autoPlay muted loop playsInline
          poster="/hero-artist-poster.jpg"
        >
          <source src="/hero-listener.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 14, 26, 0.3) 0%, rgba(10, 14, 26, 0) 30%, rgba(10, 14, 26, 0.4) 70%, rgba(10, 14, 26, 0.95) 100%)",
        }}
      />

      <div
        className="relative z-20 h-full flex flex-col justify-end mx-auto"
        style={{
          maxWidth: "var(--max-w)",
          padding: "0 var(--content-px) clamp(60px, 10vh, 120px)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="font-display font-semibold text-white leading-[0.88] tracking-[-0.05em] text-[clamp(48px,8vw,140px)] mb-8"
        >
          Where music
          <br />
          <span className="chrome-text">lives.</span>
          <br />
          Where you live.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="text-text-secondary text-body-lg max-w-[52ch] mb-10"
        >
          Discover the best music in your neighborhood. Decide who wins. Get
          paid every time you open the app.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.2, 0.8, 0.2, 1] }}
          className="flex gap-3 flex-wrap"
        >
          <Button as="a" href="#get-access" variant="primary" size="lg">
            Get access
          </Button>
          <Button as="a" href="/login" variant="secondary" size="lg">
            Log in
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
