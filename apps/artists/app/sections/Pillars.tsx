"use client";

import { ShowcaseModules } from "@unis/ui";
import { winModule } from "./WinYourNeighborhood";
import { getPaidModule } from "./GetPaidWhileYouSleep";
import { knowFansModule } from "./KnowYourFans";
import { ownModule } from "./OwnItAll";

/**
 * The four pillar modules, in the same order as the jump bands under the hero.
 * Lives in a client file because each module carries its own animated visual.
 */
export function Pillars() {
  return (
    <ShowcaseModules
      intro={{
        eyebrow: "Built for artists",
        headline: (
          <>
            Tools built for
            <br />
            your neighborhood.
          </>
        ),
        body: "Four things Unis does for you, from your first upload to your first payout.",
      }}
      items={[winModule, getPaidModule, knowFansModule, ownModule]}
    />
  );
}
