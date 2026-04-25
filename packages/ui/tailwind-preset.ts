import type { Config } from "tailwindcss";

/**
 * Shared Tailwind preset. Apps extend this so their utilities stay in sync
 * with the CSS variables in tokens.css.
 */
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        "bg-deep": "var(--bg-deep)",
        "bg-surface": "var(--bg-surface)",
        "bg-elevated": "var(--bg-elevated)",
        "brand-navy": "var(--brand-navy)",
        "brand-electric": "var(--brand-electric)",
        "brand-electric-hover": "var(--brand-electric-hover)",
        "brand-electric-muted": "var(--brand-electric-muted)",
        "accent-violet": "var(--accent-violet)",
        "accent-violet-deep": "var(--accent-violet-deep)",
        "accent-amber": "var(--accent-amber)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-subtle": "var(--text-subtle)",
        divider: "var(--divider)",
        "divider-soft": "var(--divider-soft)",
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
