import clsx from "clsx";

type LogoProps = {
  className?: string;
  /** Height of the wordmark in px. Width follows the artwork's 950:224 ratio. */
  height?: number;
};

const RATIO = 950 / 224;

/**
 * UNIS wordmark.
 *
 * Renders /unis-wordmark.svg from each app's /public folder — the same artwork
 * as unisLogoThree.svg, with the empty square canvas cropped away so the
 * wordmark fills its box (the square version rendered a ~20px-tall logo
 * inside a 100px box).
 */
export function Logo({ className, height = 24 }: LogoProps) {
  return (
    <img
      src="/unis-wordmark.svg"
      alt="Unis"
      width={Math.round(height * RATIO)}
      height={height}
      style={{ height, width: "auto", display: "block" }}
      className={clsx("select-none", className)}
      draggable={false}
    />
  );
}
