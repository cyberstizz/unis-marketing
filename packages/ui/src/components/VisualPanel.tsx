import clsx from "clsx";
import { ReactNode } from "react";

type VisualPanelProps = {
  children: ReactNode;
  className?: string;
  /**
   * Marks the panel as an illustration with made-up figures. Before launch
   * there is no real data to show, so any panel with numbers carries this.
   */
  preview?: boolean;
  /** Use the light editorial paper surface instead of the dark panel. */
  paper?: boolean;
};

/**
 * The surface every showcase visual sits on: one shape, one border, one glow,
 * so the pinned visual reads as a single object changing state.
 */
export function VisualPanel({ children, className, preview = false, paper = false }: VisualPanelProps) {
  return (
    <div
      className={clsx(
        "relative h-full w-full overflow-hidden rounded-[var(--radius-panel)] border",
        paper ? "border-black/5" : "border-[color:var(--panel-border)]",
        className
      )}
      style={{
        background: paper ? "linear-gradient(135deg, #fafaf5 0%, #f4f1e8 100%)" : "var(--panel-gradient)",
      }}
    >
      {paper ? (
        <div aria-hidden className="paper-grain absolute inset-0 opacity-[0.12] mix-blend-multiply pointer-events-none" />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{ background: "var(--glow-electric)" }}
        />
      )}
      {preview && (
        <span
          className={clsx(
            "absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-[12px] font-medium",
            paper ? "bg-black/[0.06] text-[#374151]" : "bg-white/10 text-text-secondary"
          )}
        >
          Preview · example figures
        </span>
      )}
      <div className="relative h-full">{children}</div>
    </div>
  );
}
