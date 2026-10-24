import type { ReactNode } from "react";

/**
 * A simple phone frame for the Get started visuals. The screen content is
 * a coded sketch of the Unis app, not a screenshot.
 */
export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-full max-h-[560px] aspect-[9/18.5] rounded-[36px] border border-white/15 bg-[#05070d] p-2.5 shadow-[0_40px_120px_-30px_rgba(37,99,235,0.6)]">
      <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-bg-deep">
        <div aria-hidden className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        <div className="h-full overflow-hidden px-4 pt-10 pb-4 text-[13px]">{children}</div>
      </div>
    </div>
  );
}
