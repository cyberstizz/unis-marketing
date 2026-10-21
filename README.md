# Unis Marketing

Marketing sites for Unis. Two Next.js 15 apps in a pnpm monorepo sharing a design system.

> **Where music lives.**
>
> A hyper-local, artist-owned, community-paid music platform, built in Harlem.

## What's in the box

```
unis-marketing/
├── apps/
│   ├── artists/      → artists.unismusic.com (port 3001)
│   └── listeners/    → listeners.unismusic.com (port 3000)
├── packages/
│   └── ui/           → @unis/ui — shared design system
│       ├── src/styles/tokens.css   ← single source of truth for color/type/motion
│       ├── src/components/         ← Button, NavBar, PillarSection, etc.
│       └── tailwind-preset.ts      ← tokens exposed as Tailwind utilities
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── README.md
└── BRAND.md          ← visual direction, AI-generation prompts, copy rules
```

## Prerequisites

- **Node.js 20+**
- **pnpm 9+** — `npm install -g pnpm`

## Setup

From the repo root:

```bash
pnpm install
```

This installs deps for both apps and the shared UI package in one pass.

## Running the sites

Either site, standalone:

```bash
pnpm dev:artists     # http://localhost:3001
pnpm dev:listeners   # http://localhost:3000
```

Or both in parallel (two terminals).

## Building for production

```bash
pnpm build:artists
pnpm build:listeners
# or everything at once
pnpm build
```

## Architecture notes

### Shared design system

Every color, font, motion curve, and layout value lives in
`packages/ui/src/styles/tokens.css` as CSS custom properties, and is also
exposed as Tailwind utilities via `packages/ui/tailwind-preset.ts`.

**Rule: never inline hex codes or raw sizes in app components. Add to the
tokens file or use an existing variable.** This keeps both sites visually
locked and one edit away from a global refresh.

### Shared components

Both apps import from `@unis/ui`:

- `SubPageShell` — every page (home included) renders inside it: smooth
  scroll, scroll progress, nav, closing band, footer
- `SmoothScroll` — Lenis inertial scrolling; off for reduced-motion visitors
- `NavBar` — transparent over the hero, solid on scroll, hides while you
  scroll down, full-screen menu under 768px
- `HeroStage` — full-bleed video hero that pulls back into a rounded card as
  you scroll; headline rises in line by line
- `PillarMarquee` — the jump bands under the hero; speed and direction follow
  your scroll
- `LaunchBanner` — the time-boxed campaign slot ("Opening soon in Harlem")
- `ShowcaseModules` — the four pillar modules; visual pins and changes as you
  scroll on wide screens
- `ScrubText` — a statement that lights up word by word with scroll
- `RollingNumber` — odometer-style numbers (NumberFlow)
- `DriftGallery`, `CardRail`, `ThreeDoors`, `VisualPanel`, `CheckBullet`,
  `SectionEyebrow`, `Button`, `Logo`, `PowerToThePeople`, `FooterBar`
- `UNIS_LINKS` / `helpLink()` — every outbound URL (sign up, waitlist,
  sponsor, help-center deep links) in one place

### App-specific sections

Each app has a `sections/` directory with its own hero, data flex, three
pillars, and final CTA — all of which compose the shared UI primitives.
The structure is intentionally parallel so design changes apply cleanly
across both sites.

## Assets to generate before launch

The repo ships with gradient placeholders everywhere a video or portrait
would go, so you can see the layout immediately without waiting on AI
generation. See **`BRAND.md`** for the exact prompts to generate:

1. **Hero loop videos** — one per site (Sora 2 / Veo 3 / Kling 2)
2. **Artist and listener portrait walls** — 12 portraits each
   (Midjourney v7 or Flux 1.1 Pro)
3. **Editorial paper-style illustrations** — "the math" flex
   (Midjourney or a commissioned illustrator)

Drop finished assets into each app's `public/` folder, then replace the
placeholder gradients in `sections/Hero.tsx`, `sections/ArtistWall.tsx`,
and `sections/TheMath.tsx`.

## Deployment

Both apps are static exports (`output: "export"`) deployed as two Cloudflare
Pages projects: `artists.unismusic.com` and `listeners.unismusic.com`.
Every claim on both sites must match the help center in the Unis app
(unis-sample `src/data/helpContent.jsx`); the in-app Artist Agreement
incorporates the terms published on artists.unismusic.com.

## Post-launch checklist

- [ ] Replace hero video placeholders with real loops
- [ ] Replace portrait grid gradients with real AI portraits
- [ ] Swap the store-map stub data for a live backend endpoint
- [ ] Point the "get-access" / "waitlist" CTAs at real auth flows
- [ ] Fill in blog content for the New & Noteworthy cards
- [ ] Add Plausible or Vercel Analytics
- [ ] Verify OG image generation and set `public/og.png`
- [ ] Review royalty claims with music industry counsel

## License

All rights reserved. This is a private repo for Unis marketing.
