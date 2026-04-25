"use client";

import { useState, useEffect, useId, useMemo } from "react";

type SliderProps = {
  label: string;
  /** Optional hint text shown under the label. */
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Use a logarithmic scale. Good for wide ranges like 0–10,000 supporters. */
  logarithmic?: boolean;
  /** How to format the value chip on the right. */
  formatValue?: (value: number) => string;
  /** Round the value applied via onChange. Defaults to Math.round for non-log. */
  roundTo?: "integer" | "percent" | "currency" | "none";
};

export function Slider({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  logarithmic = false,
  formatValue,
  roundTo = "integer",
}: SliderProps) {
  const id = useId();
  const [editing, setEditing] = useState(false);
  const [draftText, setDraftText] = useState("");

  // For log sliders, the slider itself ranges 0..1000 and we map to [min,max] logarithmically.
  const SLIDER_RESOLUTION = 1000;
  const logMin = useMemo(() => Math.log(Math.max(min, 1)), [min]);
  const logMax = useMemo(() => Math.log(Math.max(max, 1)), [max]);

  const toSliderPos = (v: number): number => {
    if (logarithmic) {
      const clamped = Math.max(v, Math.max(min, 1));
      const t = (Math.log(clamped) - logMin) / (logMax - logMin);
      return Math.round(t * SLIDER_RESOLUTION);
    }
    const t = (v - min) / (max - min);
    return t;
  };

  const fromSliderPos = (pos: number): number => {
    if (logarithmic) {
      const t = pos / SLIDER_RESOLUTION;
      const v = Math.exp(logMin + t * (logMax - logMin));
      return roundOutput(v);
    }
    return roundOutput(pos);
  };

  function roundOutput(v: number): number {
    if (roundTo === "integer") return Math.round(v);
    if (roundTo === "percent") return Math.round(v * 100) / 100;
    if (roundTo === "currency") return Math.round(v * 100) / 100;
    return v;
  }

  const sliderMin = logarithmic ? 0 : min;
  const sliderMax = logarithmic ? SLIDER_RESOLUTION : max;
  const sliderStep = logarithmic ? 1 : step ?? 1;
  const sliderValue = logarithmic ? toSliderPos(value) : value;

  const displayValue = formatValue ? formatValue(value) : String(value);

  // Percent of track filled (for the blue progress line)
  const fillPct = logarithmic
    ? (toSliderPos(value) / SLIDER_RESOLUTION) * 100
    : ((value - min) / (max - min)) * 100;

  // Commit the text edit
  const commitEdit = () => {
    const parsed = parseFloat(draftText.replace(/[^0-9.]/g, ""));
    if (!Number.isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max);
      onChange(roundOutput(clamped));
    }
    setEditing(false);
  };

  useEffect(() => {
    if (editing) setDraftText(String(value));
  }, [editing, value]);

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <label
          htmlFor={id}
          className="font-display font-semibold text-white text-[15px] tracking-tight"
        >
          {label}
        </label>
        {editing ? (
          <input
            type="text"
            value={draftText}
            autoFocus
            onChange={(e) => setDraftText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit();
              if (e.key === "Escape") setEditing(false);
            }}
            className="text-[14px] font-display font-semibold px-3 py-1 rounded-full bg-bg-deep border border-brand-electric text-brand-electric w-24 text-right outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-[14px] font-display font-semibold px-3 py-1 rounded-full bg-brand-electric/10 border border-brand-electric/40 text-brand-electric hover:bg-brand-electric/20 transition-colors whitespace-nowrap tabular-nums"
          >
            {displayValue}
          </button>
        )}
      </div>
      {hint && (
        <p className="text-text-muted text-[13px] mb-3 leading-[1.4]">{hint}</p>
      )}

      <div className="relative h-5 flex items-center">
        {/* Track background */}
        <div
          className="absolute inset-x-0 h-[6px] rounded-full"
          style={{ background: "var(--divider-soft)" }}
          aria-hidden
        />
        {/* Track fill */}
        <div
          className="absolute left-0 h-[6px] rounded-full pointer-events-none"
          style={{
            width: `${fillPct}%`,
            background: "linear-gradient(90deg, var(--brand-electric) 0%, var(--accent-violet) 100%)",
            boxShadow: "0 0 12px rgba(37, 99, 235, 0.5)",
          }}
          aria-hidden
        />
        <input
          id={id}
          type="range"
          min={sliderMin}
          max={sliderMax}
          step={sliderStep}
          value={sliderValue}
          onChange={(e) => onChange(fromSliderPos(Number(e.target.value)))}
          className="unis-slider absolute inset-0 w-full appearance-none bg-transparent cursor-pointer"
          aria-label={label}
        />
      </div>

      <style jsx>{`
        .unis-slider {
          height: 20px;
          width: 100%;
          background: transparent;
        }
        .unis-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--brand-electric);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.5), 0 0 0 0 rgba(37, 99, 235, 0.4);
          cursor: grab;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
          margin-top: 0;
        }
        .unis-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(37, 99, 235, 0.7), 0 0 0 6px rgba(37, 99, 235, 0.18);
        }
        .unis-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
          cursor: grabbing;
        }
        .unis-slider::-webkit-slider-runnable-track {
          height: 6px;
          background: transparent;
          border: none;
        }
        .unis-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--brand-electric);
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.5);
          cursor: grab;
          transition: transform 0.15s ease;
        }
        .unis-slider::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
        .unis-slider::-moz-range-track {
          height: 6px;
          background: transparent;
          border: none;
        }
        .unis-slider:focus-visible::-webkit-slider-thumb {
          outline: 2px solid var(--brand-electric);
          outline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
