import type { KeyboardEvent } from "react";
import { walls } from "../content";

type Props = {
  current: string;
  counts: Record<string, number>;
  onPick: (id: string) => void;
};

const zones = [
  { x: 460, y: 20, w: 160, h: 180, label: "Rope hall" },
  { x: 460, y: 210, w: 160, h: 170, label: "Training" },
  { x: 20, y: 334, w: 130, h: 46, label: "Desk & shop" },
  { x: 150, y: 334, w: 140, h: 46, label: "Café" },
];

/** Plan of the hall: pick a wall by clicking it or with Enter/Space when focused. */
export function FloorPlan({ current, counts, onPick }: Props) {
  const key = (id: string) => (e: KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onPick(id);
  };
  return (
    <svg
      className="floor-plan"
      viewBox="0 0 640 400"
      aria-label="Floor plan of the climbing hall"
    >
      <rect x="20" y="20" width="600" height="360" className="plan-building" />
      <rect x="32" y="32" width="418" height="294" className="plan-mats" />
      {zones.map((z) => (
        <g key={z.label} aria-hidden="true">
          <rect
            x={z.x}
            y={z.y}
            width={z.w}
            height={z.h}
            className="plan-zone"
          />
          <text x={z.x + 12} y={z.y + 26} className="plan-zone-label">
            {z.label}
          </text>
        </g>
      ))}
      <path
        d="M20 300 h-12 m6 -8 l8 8 -8 8"
        className="plan-door"
        aria-hidden="true"
      />
      {walls.map((w) => {
        const on = w.id === current;
        return (
          <g
            key={w.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`${w.name}: ${counts[w.id] ?? 0} problems`}
            className="plan-wall"
            data-on={on ? "" : undefined}
            onClick={() => onPick(w.id)}
            onKeyDown={key(w.id)}
          >
            <path d={w.plan} className="plan-hit" />
            <path d={w.plan} className="plan-stroke" />
            <text x={w.label[0]} y={w.label[1]} className="plan-label">
              {w.name}
              <tspan className="plan-count"> {counts[w.id] ?? 0}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}
