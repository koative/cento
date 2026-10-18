import { useId } from "react";
import type { Layer } from "../content";

const outline =
  "M40 62C40 32 60 20 75 28c13 6 17 2 25-2 8 4 12 8 25 2 15-8 35 4 35 34 0 33-8 58-12 73-2 35-8 75-16 105-4 10-14 10-16-2-4-28-8-58-16-73-8 15-12 45-16 73-2 12-12 12-16 2-8-30-14-70-16-105-4-15-12-40-12-73z";
const dentinCore =
  "M54 66c0-22 14-30 24-25 10 4 16 1 22-1 6 2 12 5 22 1 10-5 24 3 24 25 0 26-6 46-9 60H63c-3-14-9-34-9-60z";
const pulp =
  "M80 72c0-10 10-8 20-6 10-2 20-4 20 6 0 24-2 38-4 53-2 35 0 75 6 107l-4 2c-8-32-12-66-18-82-6 16-10 50-18 82l-4-2c6-32 8-72 6-107-2-15-4-29-4-53z";

const labels: {
  layer: Layer | "dentin" | "bone";
  text: string;
  y: number;
  x: number;
}[] = [
  { layer: "surface", text: "Enamel", y: 44, x: 150 },
  { layer: "dentin", text: "Dentine", y: 96, x: 140 },
  { layer: "pulp", text: "Pulp & nerve", y: 160, x: 112 },
  { layer: "gum", text: "Gum", y: 138, x: 190 },
  { layer: "root", text: "Root", y: 214, x: 130 },
  { layer: "bone", text: "Bone", y: 246, x: 196 },
];

/** A molar in cross-section; the treated layer is inked in the charting colour. */
export function ToothDiagram({
  layer,
  title,
}: {
  layer: Layer;
  title: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <figure className="diagram" data-layer={layer}>
      <svg viewBox="0 0 330 270" role="img" aria-labelledby={`${id}-t`}>
        <title id={`${id}-t`}>{title}</title>
        <defs>
          <clipPath id={`${id}-crown`}>
            <rect x="0" y="0" width="200" height="128" />
          </clipPath>
          <clipPath id={`${id}-root`}>
            <rect x="0" y="128" width="200" height="142" />
          </clipPath>
        </defs>
        <rect
          className="d-bone"
          x="0"
          y="150"
          width="200"
          height="120"
          rx="6"
        />
        <path className="d-dentin" d={outline} />
        <g className="d-crown" clipPath={`url(#${id}-crown)`}>
          <path className="d-enamel" d={outline} />
          <path className="d-dentin" d={dentinCore} />
        </g>
        <path className="d-root" d={outline} clipPath={`url(#${id}-root)`} />
        <path className="d-pulp" d={pulp} />
        <path
          className="d-gum"
          d="M0 122c16 0 30 4 40 9 8 4 12 11 13 21H0zM200 122c-16 0-30 4-40 9-8 4-12 11-13 21h53z"
        />
        <path className="d-outline" d={outline} />
        <path className="d-bite" d="M40 12h120" />
        {labels.map((l) => (
          <g key={l.text} className="d-label" data-for={l.layer}>
            <line x1={l.x} y1={l.y} x2={214} y2={l.y} />
            <text x={220} y={l.y + 4}>
              {l.text}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
