import clsx from "clsx";
import { SectionEyebrow } from "@unis/ui";
import { ReactNode } from "react";

type FeatureSectionProps = {
  id: string;
  eyebrow: string;
  headline: ReactNode;
  body: ReactNode;
  /** Lists, comparisons or links under the body. */
  children?: ReactNode;
  /** The demo or illustration beside the copy. */
  visual?: ReactNode;
  /** Put the visual on the left on wide screens. */
  flip?: boolean;
};

/**
 * One feature, told the same way every time: what it is on the left, the
 * thing itself on the right. On phones the visual sits under the copy.
 */
export function FeatureSection({ id, eyebrow, headline, body, children, visual, flip = false }: FeatureSectionProps) {
  return (
    <section id={id} className="border-t border-divider" style={{ padding: "var(--section-py) var(--content-px)" }}>
      <div
        className={clsx(
          "mx-auto grid grid-cols-1 gap-12 lg:gap-20 items-start",
          visual && "lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]"
        )}
        style={{ maxWidth: "var(--max-w)" }}
      >
        <div className={clsx(flip && visual && "lg:order-2")}>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.04em] text-[clamp(38px,4.6vw,68px)] max-w-[16ch]">
            {headline}
          </h2>
          <div className="text-text-secondary text-[clamp(17px,1.4vw,20px)] leading-[1.6] mt-6 max-w-[56ch] space-y-4">
            {body}
          </div>
          {children && <div className="mt-10">{children}</div>}
        </div>
        {visual && (
          <div className={clsx("lg:sticky lg:top-[calc(var(--nav-h)+32px)]", flip && "lg:order-1")}>{visual}</div>
        )}
      </div>
    </section>
  );
}

/** A short fact list: a bold lead and a plain sentence, one per line. */
export function FactList({ items }: { items: { lead: string; text: ReactNode }[] }) {
  return (
    <ul className="divide-y divide-divider border-y border-divider">
      {items.map((item) => (
        <li key={item.lead} className="py-4 grid gap-1 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] sm:gap-6">
          <span className="font-display font-semibold text-white text-[17px] tracking-tight leading-[1.3]">{item.lead}</span>
          <span className="text-text-secondary text-[15px] leading-[1.6]">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** A small superscript-style pointer to the Sources list at the foot of the page. */
export function SourceMark({ n }: { n: number }) {
  return (
    <a
      href={`#source-${n}`}
      className="ml-1 align-super text-[11px] font-semibold text-brand-electric-hover hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-electric rounded"
      aria-label={`Source ${n}`}
    >
      {n}
    </a>
  );
}
