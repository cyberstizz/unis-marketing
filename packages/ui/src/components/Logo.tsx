import clsx from "clsx";

type LogoProps = {
  className?: string;
  /** Height in px. Width auto-scales. */
  size?: number;
};

/**
 * UNIS wordmark. Renders the real logo asset from each app's /public folder.
 */
export function Logo({ className, size = 100 }: LogoProps) {
  return (
    <img
      src="/unisLogoThree.svg"
      alt="Unis"
      height={size}
      style={{ height: size, width: 100, display: "block" }}
      className={clsx(className)}
    />
  );
}