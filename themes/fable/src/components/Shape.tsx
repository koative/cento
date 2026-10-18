import type { ShapeKind, Swatch } from "../content";

/** The wayfinding shapes: every gallery has one, printed on its door, its map tile and its tickets. */
const paths: Record<ShapeKind, string> = {
  circle: "M50 2a48 48 0 1 1 0 96a48 48 0 1 1 0-96z",
  drop: "M50 2C62 20 88 46 88 64a38 38 0 0 1-76 0C12 46 38 20 50 2z",
  square:
    "M18 6h64a12 12 0 0 1 12 12v64a12 12 0 0 1-12 12H18A12 12 0 0 1 6 82V18A12 12 0 0 1 18 6z",
  half: "M2 78a48 48 0 0 1 96 0z",
  triangle: "M43 10a8 8 0 0 1 14 0l39 72a8 8 0 0 1-7 12H11a8 8 0 0 1-7-12z",
  arch: "M8 96V50a42 42 0 0 1 84 0v46z",
  pill: "M28 24h44a26 26 0 0 1 0 52H28a26 26 0 0 1 0-52z",
  leaf: "M6 94C6 42 42 6 94 6c0 52-36 88-88 88z",
  ring: "M50 2a48 48 0 1 1 0 96a48 48 0 1 1 0-96zm0 26a22 22 0 1 0 0 44a22 22 0 1 0 0-44z",
};

export function Shape({
  kind,
  swatch,
  className = "",
}: {
  kind: ShapeKind;
  swatch: Swatch;
  className?: string;
}) {
  return (
    <svg
      className={`shape ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[kind]} fill={`var(--${swatch})`} fillRule="evenodd" />
    </svg>
  );
}

export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 62V34a14 14 0 0 1 28 0v28z" fill="var(--coral)" />
      <circle cx="47" cy="47" r="15" fill="var(--sun)" />
      <path
        d="M36 4h20a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H36a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4z"
        fill="var(--mint)"
      />
    </svg>
  );
}
