"use client";

import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type GalleryImage = { src: string; alt: string };

type DriftGalleryProps = {
  images: GalleryImage[];
};

/**
 * Two rows of portraits that slide in opposite directions as you scroll past —
 * the page moves, the rows answer. Reduced motion: two still rows.
 */
export function DriftGallery({ images }: DriftGalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const forward = useTransform(scrollYProgress, [0, 1], ["-6%", "-30%"]);
  const backward = useTransform(scrollYProgress, [0, 1], ["-30%", "-6%"]);

  const half = Math.ceil(images.length / 2);
  // Each row repeats its images so it stays full while it slides.
  const rowA = [...images.slice(0, half), ...images.slice(0, half)];
  const rowB = [...images.slice(half), ...images.slice(half)];

  return (
    <div ref={ref} className="relative flex flex-col gap-3 md:gap-4 overflow-hidden py-2" aria-hidden>
      <Row images={rowA} x={reduce ? undefined : forward} />
      <Row images={rowB} x={reduce ? undefined : backward} />
    </div>
  );
}

function Row({ images, x }: { images: GalleryImage[]; x?: MotionValue<string> }) {
  return (
    <motion.div style={x ? { x } : { x: "-6%" }} className="flex gap-3 md:gap-4 w-max">
      {images.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          className="relative shrink-0 w-[clamp(180px,24vw,340px)] aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-bg-surface"
        >
          <img
            src={img.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
}
