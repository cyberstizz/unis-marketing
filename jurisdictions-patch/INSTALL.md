# Jurisdictions Page — Install

This patch adds the `/jurisdictions` deep-dive page to your artist site,
including the interactive Jurisdictions Explorer.

## What's in the zip

Just one folder: `jurisdictions/`. Drops directly into your artists app.

```
jurisdictions/
├── page.tsx                                 ← makes /jurisdictions work
├── data.ts                                  ← 9 neighborhoods + full tier chains
└── sections/
    ├── JurisdictionsHero.tsx                ← tier-chain preview
    ├── PlaceMomentClaim.tsx                 ← quiet one-line moment
    ├── JurisdictionsExplorer.tsx            ← the interactive centerpiece
    ├── WhyTiersMatter.tsx                   ← #47k on Spotify vs #1 in Harlem
    ├── PermanentRecord.tsx                  ← award certificate + cadence grid
    ├── RolloutMap.tsx                       ← stylized US map with pulsing pins
    ├── JurisdictionsFAQ.tsx                 ← 7 questions
    └── JurisdictionsFinalCTA.tsx            ← two-track CTA
```

No dependency changes. No overwrites. No shared UI edits. Same install
pattern as the revenue patch.

## How to install

**Option A — Terminal (30 seconds):**

```bash
cd ~/code/unis-marketing
unzip ~/Downloads/jurisdictions-patch.zip
mv jurisdictions-patch/jurisdictions apps/artists/app/jurisdictions
rm -rf jurisdictions-patch
```

**Option B — VS Code drag-and-drop:**

1. Unzip the downloaded file anywhere.
2. Drag the `jurisdictions/` folder onto `apps/artists/app/` in VS Code.
3. Done.

## Verify

Save any file to trigger a hot-reload, or restart the dev server if needed:

```bash
pnpm dev:artists
```

Visit **http://localhost:3001/jurisdictions** — the full page should load.

## What to test

1. **Hero** — "The first platform where your neighborhood is on the map" + the tier-chain preview stacks in on the right.

2. **The Explorer (the big one):**
   - Default selection is Uptown Harlem with a pulsing LIVE indicator.
   - Right pane shows 7 tier rows (T1 Sitewide at top, T7 sub-neighborhood at bottom) with winner cards at every tier.
   - Click **Downtown Harlem** in the left list — second live option.
   - Click **Compton** — the tier chain rebuilds with a "Coming soon" amber pill, winner cards are replaced with "Awaiting launch", and a dashed-border waitlist CTA appears at the bottom.
   - Click any coming-soon neighborhood's **"Join the waitlist for [City]"** button — opens unismusic.com/waitlist in a new tab.
   - Try the **search box** — type "south" → filters to South Side Chicago and South LA's Compton chain. Type "harlem" → Harlem neighborhoods only.
   - Try the **region tabs** (All / NYC / East / South / Midwest / West) — morphing pill animation.
   - **Deep-linking**: visit `http://localhost:3001/jurisdictions#explore=compton` → page loads with Compton pre-selected.

3. **Why tiers matter** — "One chart has one winner. Seven charts have seven." + the "#47,000 on Spotify vs #1 in Uptown Harlem" comparison card.

4. **Permanent Record** — angled certificate mockup + 5-cadence award grid (Daily / Weekly / Monthly / Quarterly / Annual).

5. **Rollout Map** — stylized US map with Harlem pulsing blue (live) and 7 other cities showing amber "waitlist building" dots. Hover any dot to see its tooltip.

6. **FAQ** — 7 questions, accordion behavior.

7. **Final CTA** — two cards side by side, Harlem card in electric blue gradient (primary), anywhere-else card linking to the real production waitlist.

## Things worth knowing

- **Compton is used as the "hypothetical non-Harlem example"** per our earlier discussion. Its 7-tier chain runs: Central Compton → Compton → South LA → Los Angeles → Los Angeles Metro → California → Sitewide.
- **Every coming-soon neighborhood pushes to https://unismusic.com/waitlist** — your real production waitlist.
- **All Harlem "winners" are fabricated placeholder names** (Mila Reyes, Kito Vance, Shae Dubois, etc.) per your instruction to not use any pre-launch real artists.
- **The Explorer deep-links** via `#explore=harlem-uptown`, `#explore=compton`, etc. — useful for sharing.

If anything breaks or looks off, paste the error and I'll fix it.
