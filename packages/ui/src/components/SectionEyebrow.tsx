import clsx from "clsx";
import { ReactNode } from "react";

type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The small uppercase label that sits above every section H2.
 * "OWNERSHIP", "EXPOSURE", "INCOME", etc.
 */
export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 text-eyebrow uppercase font-semibold text-brand-electric",
        className
      )}
    >
      <span className="h-px w-8 bg-brand-electric" aria-hidden />
      {children}
    </div>
  );
}
