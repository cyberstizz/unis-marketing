"use client";

import { ShowcaseModules } from "@unis/ui";
import { youDecideModule } from "./YouDecide";
import { repModule } from "./RepYourNeighborhood";
import { backModule } from "./BackAnArtist";
import { bringModule } from "./GetPaidToListen";

/**
 * The four listener modules, in the same order as the jump bands under the
 * hero. Client file because each module carries its own animated visual.
 */
export function Pillars() {
  return (
    <ShowcaseModules
      intro={{
        eyebrow: "Built for listeners",
        headline: (
          <>
            Your block
            <br />
            has a sound.
          </>
        ),
        body: "Four things you can do on Unis from the day it opens.",
      }}
      items={[youDecideModule, repModule, backModule, bringModule]}
    />
  );
}
