"use client";

import NumberFlow, { type Format } from "@number-flow/react";
import { useInView } from "motion/react";
import { useRef } from "react";

type RollingNumberProps = {
  value: number;
  /** Shown before it rolls in. Defaults to 0. */
  from?: number;
  prefix?: string;
  suffix?: string;
  /** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD" }. */
  format?: Format;
  className?: string;
};

/**
 * A number whose digits roll into place like an odometer the first time it
 * scrolls into view (NumberFlow). Reduced-motion visitors see the final
 * number straight away — NumberFlow respects that setting itself.
 */
export function RollingNumber({ value, from = 0, prefix, suffix, format, className }: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={inView ? value : from}
        prefix={prefix}
        suffix={suffix}
        format={format}
        transformTiming={{ duration: 1100, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        spinTiming={{ duration: 1100, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </span>
  );
}
