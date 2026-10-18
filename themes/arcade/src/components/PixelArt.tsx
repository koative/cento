import { brand, type HairStyle, type Person } from "../content";
import { SPRITES, spritePaths, spriteSize, type Colors } from "../lib/pixels";
import { Link } from "../router";

type PixelArtProps = {
  grid: string[];
  colors: Colors;
  className?: string;
  label?: string;
};

export function PixelArt({
  grid,
  colors,
  className = "",
  label,
}: PixelArtProps) {
  const { w, h } = spriteSize(grid);
  return (
    <svg
      className={`pixel ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {spritePaths(grid, colors).map((p) => (
        <path key={p.fill} d={p.d} fill={p.fill} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------ team portraits */

const FACE = [
  "............",
  "............",
  "...ssssss...",
  "..ssssssss..",
  "..skssssks..",
  "..ssssssss..",
  "...sskkss...",
  "...ssssss...",
  "....ssss....",
  "..cccccccc..",
  ".cccccccccc.",
  "cccccccccccc",
];

const HAIR: Record<HairStyle, string[]> = {
  short: ["...rrrrrr...", "..rrrrrrrr..", "..rr....rr..", "..r......r.."],
  long: [
    "...rrrrrr...",
    "..rrrrrrrr..",
    ".rrrr..rrrr.",
    ".rr......rr.",
    ".r........r.",
    ".r........r.",
    ".rr......rr.",
    ".rr......rr.",
    ".rrr....rrr.",
    ".rr......rr.",
  ],
  bun: [".....rr.....", "...rrrrrr...", "..rrrrrrrr..", "..r......r.."],
  cap: ["...cccccc...", "..cccccccc..", "..cccccccccc", "..r......r.."],
  curly: [
    ".r.rrrrrr.r.",
    "rrrrrrrrrrrr",
    "rrrr....rrrr",
    ".rr......rr.",
    ".r........r.",
    ".rr......rr.",
  ],
};

export function Avatar({
  person,
  className,
}: {
  person: Person;
  className?: string;
}) {
  const hair = HAIR[person.style];
  const grid = FACE.map((row, y) =>
    row
      .split("")
      .map((ch, x) => (hair[y] && hair[y][x] !== "." ? hair[y][x] : ch))
      .join(""),
  );
  return (
    <PixelArt
      grid={grid}
      colors={{ r: person.hair, s: person.skin, c: person.shirt, k: "#1d1631" }}
      className={className}
    />
  );
}

/* ------------------------------------------------------------ logo */

export const MARK_COLORS: Colors = {
  h: "#5b3fd1",
  d: "#3a2896",
  w: "#f6efe2",
  k: "#1d1631",
  a: "#ff7aa8",
};

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.name}, home`}
    >
      <PixelArt
        grid={SPRITES.blob}
        colors={MARK_COLORS}
        className="logo-mark"
      />
      <span className="logo-word">{brand.name}</span>
    </Link>
  );
}
