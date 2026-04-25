"use client";

import clsx from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  as?: "button";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

type AnchorProps = ComponentPropsWithoutRef<"a"> & {
  as: "a";
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

type Props = ButtonProps | AnchorProps;

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight " +
  "transition-all duration-200 ease-out-quart will-change-transform " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-electric text-white hover:bg-brand-electric-hover active:scale-[0.98] shadow-[0_0_0_1px_rgba(37,99,235,0.5),0_8px_32px_-8px_rgba(37,99,235,0.6)]",
  secondary:
    "bg-transparent text-white border border-white/20 hover:border-white/60 hover:bg-white/5",
  ghost: "bg-transparent text-text-secondary hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-full",
  md: "h-11 px-6 text-[15px] rounded-full",
  lg: "h-14 px-8 text-base rounded-full",
};

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
