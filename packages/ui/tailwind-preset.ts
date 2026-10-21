type Config = Record<string, unknown>;
/**
 * Shared Tailwind preset. Apps extend this so their utilities stay in sync
 * with the CSS variables in tokens.css. Colors read the *-rgb channel
 * variables so opacity modifiers like bg-bg-deep/80 actually render (with
 * plain var(--x) values Tailwind silently dropped every /NN class).
 */
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        "bg-deep": "rgb(var(--bg-deep-rgb) / <alpha-value>)",
        "bg-surface": "rgb(var(--bg-surface-rgb) / <alpha-value>)",
        "bg-elevated": "rgb(var(--bg-elevated-rgb) / <alpha-value>)",
        "brand-navy": "rgb(var(--brand-navy-rgb) / <alpha-value>)",
        "brand-electric": "rgb(var(--brand-electric-rgb) / <alpha-value>)",
        "brand-electric-hover": "rgb(var(--brand-electric-hover-rgb) / <alpha-value>)",
        "brand-electric-muted": "rgb(var(--brand-electric-muted-rgb) / <alpha-value>)",
        "accent-violet": "rgb(var(--accent-violet-rgb) / <alpha-value>)",
        "accent-violet-deep": "rgb(var(--accent-violet-deep-rgb) / <alpha-value>)",
        "accent-amber": "rgb(var(--accent-amber-rgb) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary-rgb) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary-rgb) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted-rgb) / <alpha-value>)",
        "text-subtle": "rgb(var(--text-subtle-rgb) / <alpha-value>)",
        divider: "rgb(var(--divider-rgb) / <alpha-value>)",
        "divider-soft": "rgb(var(--divider-soft-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      fontSize: {
        eyebrow: ["13px", { lineHeight: "1.2", letterSpacing: "0.12em" }],
        "body-lg": ["20px", { lineHeight: "1.55" }],
      },
      maxWidth: {
        content: "var(--max-w)",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left 40s linear infinite",
        "marquee-right": "marquee-right 40s linear infinite",
        "fade-up": "fade-up 0.8s var(--ease-out-quart) forwards",
      },
    },
  },
};

export default preset;
