# Unis Brand Guide

Everything you need to keep both sites visually locked as you generate
assets, write new sections, and bring on collaborators.

## Through-line

- **Artist site**: *Where music lives.*
- **Listener site**: *Where music lives. Where you live.*
- **Universal tagline**: *Power to the people.*

Every piece of copy, every image, every animation should reinforce one
of these three statements. If it doesn't, cut it.

## Color

The palette is navy + electric blue + violet on near-black. Do **not**
introduce new colors. If you need contrast, use the amber accent sparingly.

| Token | Hex | Used for |
| --- | --- | --- |
| `--bg-deep` | `#0a0e1a` | Page background |
| `--bg-surface` | `#111828` | Cards, surfaces |
| `--bg-elevated` | `#1a2338` | Nested surfaces, modals |
| `--brand-navy` | `#163387` | Deep brand blue |
| `--brand-electric` | `#2563eb` | Primary accent, CTAs, eyebrows |
| `--brand-electric-hover` | `#3b82f6` | Hover state |
| `--accent-violet` | `#8b5cf6` | Secondary accent, data viz |
| `--accent-violet-deep` | `#6d28d9` | Deeper violet, supporter income |
| `--accent-amber` | `#f59e0b` | Warm contrast, used sparingly |

## Typography

Two typefaces only, both free via Fontshare:

- **Clash Display** (600, 700) — headlines, the UNIS wordmark complement
- **Satoshi** (400, 500, 700) — body copy, UI

Global rules:

- Headlines: tight tracking (`-0.04em` to `-0.05em`), line height 0.88–0.95
- Body: 1.55–1.6 line height
- Eyebrow labels: uppercase, 13px, `0.12em` letter spacing, `--brand-electric`
- No other typefaces. No Inter. No system stacks.

## Motion

- **Ease curve**: `cubic-bezier(0.2, 0.8, 0.2, 1)` — called `--ease-out-quart`
- **Stagger**: child elements 80–120ms apart, never synchronized
- **Nothing auto-animates on load** except the hero headline and the
  pillar marquee. Everything else is scroll-triggered via `whileInView`.
- **Respect `prefers-reduced-motion`** (Framer Motion does this by default;
  don't override).

## Hero video — generation prompts

Use Sora 2, Veo 3, Kling 2, or Runway Gen-4. Generate **three to four
variants** per site so you can A/B test.

### Artist site hero (primary: female with headphones)

> Cinematic close-up portrait of a young woman in her mid-20s, mixed
> heritage (Afro-Latina), seated on a Harlem rooftop at golden hour
> turning to blue hour. Brownstones and water towers soft-focused in the
> far background. She's wearing matte black over-ear headphones with
> purple accents, head tilted slightly down, eyes closed in a moment of
> listening. One hand gently resting on the headphone cup. Warm sunset
> light on one side of her face, deep navy sky on the other — the
> lighting itself splits the frame between gold and royal blue. Shallow
> depth of field, subtle film grain, slow breathing motion only. 4K,
> 24fps, photorealistic, shot on ARRI Alexa aesthetic. Static camera,
> no movement. Loop-ready: 15 seconds with seamless start and end.

Variants: Black woman with natural hair on Bed-Stuy stoop · Dominican
woman with braids in Washington Heights window seat · Asian-American
woman with septum ring on Lower East Side fire escape.

### Listener site hero

Same direction, same subjects, but **posture signals receiving rather
than creating**: eyes fully closed, head tilted back, absorbed. Keep the
same gold/royal-blue lighting split so the two sites feel like siblings.

## Portrait walls — artist + listener

Use **Midjourney v7** or **Flux 1.1 Pro**. Generate 12 portraits per site.

Base prompt:

> Studio-quality portrait photograph of [DESCRIPTOR] in [NEIGHBORHOOD
> SETTING]. Low-key lighting with deep navy shadows and electric blue
> rim light. [DIRECT EYE CONTACT / wearing headphones, caught
> mid-listen]. Square crop 1:1. Consistent color grading across the
> set: shadows push toward `#163387`, highlights toward `#2563eb`.
> Photorealistic, editorial magazine aesthetic, shot on 85mm lens.

### Artist descriptors (looking at camera)

1. Young Dominican woman, 22, R&B singer, Washington Heights apartment
2. Black male producer, 30s, MPC on desk, Harlem basement studio
3. Puerto Rican teen rapper, 17, Bronx rooftop at dusk
4. Black female soul singer, 28, in front of a Harlem brownstone
5. Asian-American male beatmaker, laptop, dim coffee shop
6. Older Black jazz pianist, 55+, upright piano in small apartment
7. Haitian female gospel singer, 30s, stained glass behind her
8. Young white indie rock singer, 24, guitar, Bushwick loft
9. Black female drill rapper, 20s, Inwood rooftop
10. Korean female electronic producer, 27, modular synth rack
11. Black male gospel choir director, 40s, church interior
12. Black female neo-soul singer, 30s, Sugar Hill brownstone

### Listener descriptors (not looking at camera — mid-listen)

1. Black woman, 20s, AirPods, Harlem subway platform
2. Puerto Rican man, 30s, over-ear headphones, Bronx stoop
3. Dominican teen, earbuds, in a bodega
4. Asian-American woman, 20s, on park bench in Prospect Park
5. Older Black man, 60s, at chess table in Washington Square
6. Haitian grandmother, 70s, Crown Heights porch, portable speaker
7. White guy, 20s, fire escape, East Village
8. Senegalese woman, 30s, doing laundry with headphones
9. Black teenage boy, earbuds, corner store
10. Mexican-American woman, 20s, laundromat
11. Black woman, 40s, walking Malcolm X Blvd, headphones
12. Young Black couple, shared earbuds, park bench

## Editorial "math" illustration

Style reference: Spotify's Loud & Clear 2024/2025 graphics — layered
semi-transparent circles on off-white paper texture with hand-drawn
arrow annotations. Ours uses the Unis palette (electric blue + navy +
violet) instead of Spotify's purple.

Generate on Midjourney, or commission on Fiverr for ~$150 and get a
matched set of 4 (one per pillar, plus the hero "math" piece).

## Copy voice

- **Declarative, not persuasive.** "Keep your masters." not "Why not keep
  your masters?"
- **Short sentences.** Three to seven words is the sweet spot for
  headlines. Twelve to twenty for body.
- **Concrete, not abstract.** "Get paid in two business days." not
  "fast payouts."
- **Confrontational where earned.** "No payola. No ghost artists." is
  fine. "The music industry is broken" is not.
- **No exclamation marks.** No emoji. No TikTok voice.
- **Capitalize proper nouns.** Harlem, Bed-Stuy, Washington Heights.
  These carry weight.

## Forbidden

- Stock photography of diverse people in fake offices
- Purple-to-pink gradients (everyone's marketing site has them)
- Inter font
- Emoji in headlines
- "Revolutionary," "disruptive," "unlock," "leverage"
- Any claim about royalty rates that hasn't been reviewed by counsel

## When in doubt

Compare to Spotify's artist site. If yours is more polished, more direct,
and more **true**, you're on the right track.
