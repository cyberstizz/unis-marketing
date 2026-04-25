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
│   └── listeners/    → unismusic.com         (port 3000)
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

- `Button` — polymorphic (button or anchor) with primary/secondary/ghost
  variants and sm/md/lg sizes
- `NavBar` — floats transparent over hero, solidifies on scroll
- `Logo` — the chrome-gradient UNIS wordmark as SVG
- `PillarSection` — the 60/40 alternating block used for every feature
  pillar on both sites
- `PillarMarquee` — the rotating pillar names that link down the page
- `CheckBullet` — animated circular check bullets for pillar lists
- `SectionEyebrow` — the letter-spaced uppercase label with an electric-blue
  accent line
- `PowerToThePeople` — the full-bleed electric-blue closing band
- `ScrollProgress` — thin scroll indicator fixed to top
- `FooterBar` — shared footer with configurable link groups

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

Both apps deploy independently to Vercel. Point each one at a different
project, configure the domain (`artists.unismusic.com` vs `unismusic.com`),
and Vercel handles the rest. Both apps use `next.config.ts` with
`transpilePackages: ["@unis/ui"]` which Vercel supports natively.

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
