"use client";

import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { createRef, ReactNode, RefObject, useEffect, useMemo, useState } from "react";
import { Button } from "./Button";
import { CheckBullet } from "./CheckBullet";
import { SectionEyebrow } from "./SectionEyebrow";
import { useLenis } from "./SmoothScroll";

export type ShowcaseItem = {
  /** Anchor id — the jump bands link here. */
  id: string;
  /** Pillar name, shown as the eyebrow and on the progress rail. */
  label: string;
  headline: ReactNode;
  body: ReactNode;
  checklist: { title: string; text: ReactNode; href?: string }[];
  cta?: { label: string; href: string };
  /** The visual for this module. Pinned beside the text on wide screens. */
  visual: ReactNode;
};

type ShowcaseModulesProps = {
  intro?: { eyebrow: string; headline: ReactNode; body?: ReactNode };
  items: ShowcaseItem[];
};

/**
 * Spotify's four "checklist" modules (headline, short intro, a few linked
 * items, one "Explore" button), staged as one scroll story.
 *
 * Wide screens: the text scrolls on the left while the visual stays pinned on
 * the right and changes as each module crosses the middle of the screen. A
 * four-part rail above the visual fills as you read through each module, and
 * clicking a segment jumps there.
 * Phones and tablets: each module shows its own visual above its text.
 */
export function ShowcaseModules({ intro, items }: ShowcaseModulesProps) {
  const [active, setActive] = useState(0);
  const refs = useMemo(
    () => items.map(() => createRef<HTMLElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.length]
  );

  // Active module = the one crossing the vertical middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = refs.findIndex((r) => r.current === entry.target);
          if (index >= 0) setActive(index);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    refs.forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
  }, [refs]);

  return (
    <section className="relative" style={{ padding: "var(--section-py) var(--content-px) 0" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-w)" }}>
        {intro && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="max-w-[62ch] mb-10 lg:mb-0"
          >
            <SectionEyebrow>{intro.eyebrow}</SectionEyebrow>
            <h2 className="font-display font-semibold text-white mt-6 leading-[0.95] tracking-[-0.045em] text-[clamp(40px,5.4vw,84px)]">
              {intro.headline}
            </h2>
            {intro.body && (
              <p className="text-text-secondary text-body-lg mt-6 max-w-[52ch]">{intro.body}</p>
            )}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-16 xl:gap-x-24">
          {/* Text column */}
          <div>
            {items.map((item, i) => (
              <article
                key={item.id}
                id={item.id}
                ref={refs[i]}
                className="lg:min-h-[100svh] flex flex-col justify-center py-14 lg:py-24"
              >
                <div className="lg:hidden mb-10">
                  <div className="relative h-[540px] sm:h-auto sm:aspect-[4/5] w-full max-w-[520px] mx-auto">{item.visual}</div>
                </div>
                <SectionEyebrow>{item.label}</SectionEyebrow>
                <h3 className="font-display font-semibold text-white mt-6 mb-6 leading-[0.95] tracking-[-0.04em] text-[clamp(34px,3.9vw,60px)]">
                  {item.headline}
                </h3>
                <p className="text-text-secondary text-body-lg max-w-[52ch] mb-9">{item.body}</p>
                <ul className="space-y-6 mb-10">
                  {item.checklist.map((c, j) => (
                    <CheckBullet key={c.title} title={c.title} href={c.href} delay={j * 90}>
                      {c.text}
                    </CheckBullet>
                  ))}
                </ul>
                {item.cta && (
                  <div>
                    <Button as="a" href={item.cta.href} variant="secondary" size="md">
                      {item.cta.label}
                      <span aria-hidden>→</span>
                    </Button>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Pinned visual column */}
          <div className="hidden lg:block">
            <div
              className="sticky flex flex-col justify-center gap-6"
              style={{
                top: "var(--nav-h)",
                height: "calc(100svh - var(--nav-h))",
              }}
            >
              {/* Width follows the available height so the 4:5 panel always fits on screen */}
              <div
                className="mx-auto w-full flex flex-col gap-6"
                style={{ maxWidth: "calc(min(calc(100svh - var(--nav-h) - 120px), 760px) * 0.8)" }}
              >
              <ProgressRail items={items} refs={refs} active={active} />
              <div className="relative w-full aspect-[4/5]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={items[active]?.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 1.02 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {items[active]?.visual}
                  </motion.div>
                </AnimatePresence>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressRail({
  items,
  refs,
  active,
}: {
  items: ShowcaseItem[];
  refs: RefObject<HTMLElement | null>[];
  active: number;
}) {
  return (
    <div className="flex gap-2" role="list" aria-label="Sections">
      {items.map((item, i) => (
        <RailSegment key={item.id} item={item} target={refs[i]!} isActive={i === active} />
      ))}
    </div>
  );
}

function RailSegment({
  item,
  target,
  isActive,
}: {
  item: ShowcaseItem;
  target: RefObject<HTMLElement | null>;
  isActive: boolean;
}) {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: target as RefObject<HTMLElement>,
    offset: ["start center", "end center"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <a
      role="listitem"
      href={`#${item.id}`}
      onClick={(e) => {
        if (!lenis) return;
        e.preventDefault();
        lenis.scrollTo(`#${item.id}`);
      }}
      className="group flex-1 min-w-0 focus:outline-none"
      aria-current={isActive ? "step" : undefined}
    >
      <span className="block h-[3px] rounded-full bg-white/10 overflow-hidden">
        <motion.span
          className="block h-full w-full rounded-full bg-brand-electric origin-left"
          style={{ scaleX: reduce ? (isActive ? 1 : 0) : fill }}
        />
      </span>
      <span
        className={clsx(
          "block mt-3 text-[13px] truncate transition-colors duration-300 group-focus-visible:text-white",
          isActive ? "text-white" : "text-text-subtle group-hover:text-text-secondary"
        )}
      >
        {item.label}
      </span>
    </a>
  );
}
