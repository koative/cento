import type { Shape } from "../content";
import { ageLabel, bandFor } from "../lib/format";

const paths: Record<Shape, string> = {
  circle: "M50 4a46 46 0 1 1 0 92a46 46 0 1 1 0-92z",
  arch: "M4 96V46a46 46 0 0 1 92 0v50H68V66a18 18 0 0 0-36 0v30z",
  triangle: "M50 5l46 90H4z",
  square:
    "M12 6h76a6 6 0 0 1 6 6v76a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6z",
  hexagon: "M28 8h44l24 42-24 42H28L4 50z",
  star: "M50 4l13.5 29 31.5 3.6-23.4 21.4 6.6 31L50 73.2 21.8 89l6.6-31L5 36.6 36.5 33z",
};

/** One wooden block from the age shelves, drawn in a single flat colour. */
export function Block({
  shape,
  color,
  size = 24,
}: {
  shape: Shape;
  color: string;
  size?: number;
}) {
  return (
    <svg
      className="block"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <path d={paths[shape]} fill={color} />
    </svg>
  );
}

/** The "3+" roundel printed on toy boxes, in the colour of the shelf the toy starts on. */
export function AgeBadge({
  ageMin,
  ageMax,
}: {
  ageMin: number;
  ageMax: number;
}) {
  const band = bandFor(ageMin);
  return (
    <span
      className="age-badge"
      style={{ background: band.color, color: band.on }}
    >
      <span className="visually-hidden">Ages </span>
      {ageLabel({ ageMin, ageMax })}
    </span>
  );
}
