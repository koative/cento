import type { Chart } from "../content";

/** Clipper guards, shortest first. Lengths in millimetres. */
export const guards = [
  { id: "skin", label: "Skin", mm: 0 },
  { id: "0", label: "#0", mm: 0.8 },
  { id: "0.5", label: "#0.5", mm: 1.5 },
  { id: "1", label: "#1", mm: 3 },
  { id: "1.5", label: "#1.5", mm: 4.5 },
  { id: "2", label: "#2", mm: 6 },
  { id: "3", label: "#3", mm: 10 },
  { id: "4", label: "#4", mm: 13 },
  { id: "5", label: "#5", mm: 16 },
  { id: "6", label: "#6", mm: 19 },
];

export const startGuards = ["skin", "0", "0.5", "1"];
export const blendGuards = ["2", "3", "4", "5"];

export const heights: { id: Chart["height"]; label: string; where: string }[] =
  [
    { id: "taper", label: "Taper", where: "the neckline and sideburns" },
    { id: "low", label: "Low", where: "just above the ear" },
    { id: "mid", label: "Mid", where: "the temple" },
    { id: "high", label: "High", where: "the parietal ridge" },
  ];

/** Bands from the neckline (0) to the crown (11); 0–7 are the sides, 8–11 the top. */
export const BANDS = 12;
const SIDES = 8;
const fadeTop: Record<Chart["height"], number> = {
  taper: 1,
  low: 3,
  mid: 5,
  high: 7,
};
export const zoneNames = [
  "Neckline",
  "",
  "",
  "Above the ear",
  "",
  "Temple",
  "",
  "Parietal ridge",
  "Top",
  "",
  "",
  "Crown",
];

const MM_PER_INCH = 25.4;

export type Band = { mm: number; label: string };

/** Hair length per band, bottom to top, as the chart draws it. */
export function bands(c: Chart): Band[] {
  const from = guards.findIndex((g) => g.id === c.start);
  const to = guards.findIndex((g) => g.id === c.blend);
  const peak = fadeTop[c.height];
  const topMm = c.top * MM_PER_INCH;
  return Array.from({ length: BANDS }, (_, i) => {
    if (i < SIDES) {
      const g =
        guards[i <= peak ? Math.round(from + ((to - from) * i) / peak) : to];
      return { mm: g.mm, label: g.label };
    }
    // The first top band is the scissor blend between the sides and the top length.
    const mm = i === SIDES ? (guards[to].mm + topMm) / 2 : topMm;
    return { mm, label: `${+(mm / MM_PER_INCH).toFixed(1)} in` };
  });
}

/** 0 (skin) → 1 (an inch and a half or more), on a square-root curve so short guards stay distinguishable. */
export const density = (mm: number) =>
  mm === 0 ? 0 : Math.min(1, 0.14 + 0.86 * Math.sqrt(mm / 38));

const inches = (n: number) => {
  const whole = Math.floor(n);
  const frac =
    ({ 0.25: "¼", 0.5: "½", 0.75: "¾" } as Record<number, string>)[n - whole] ??
    "";
  return `${whole || ""}${frac}${whole || frac ? "" : "0"} ${n > 1 ? "inches" : "inch"}`;
};

/** The cut in the words a barber uses. */
export function describe(c: Chart) {
  const start = guards.find((g) => g.id === c.start)!;
  const blend = guards.find((g) => g.id === c.blend)!;
  const h = heights.find((x) => x.id === c.height)!;
  const kind =
    c.height === "taper"
      ? "Taper"
      : `${h.label} ${c.start === "skin" ? "skin " : ""}fade`;
  const parts = [
    `${kind}: ${start.id === "skin" ? "foiled to skin" : start.label} at the bottom, blended up to a ${blend.label} at ${h.where}.`,
    `${inches(c.top)} left on top, ${c.top >= 1.5 ? "scissor-cut" : "clipper-cut and point-cut for texture"}.`,
    c.lineup === "sharp"
      ? "Sharp line-up at the front and temples."
      : "Natural hairline, just cleaned up.",
  ];
  if (c.part) parts.push("Hard part on the side.");
  if (c.beard === "trim") parts.push("Beard trimmed and lined up.");
  if (c.beard === "blend") parts.push("Beard faded into the sides.");
  return parts.join(" ");
}

/** The price-board service this chart books as. */
export function serviceFor(c: Chart) {
  if (c.beard !== "none") return "cut-beard";
  if (c.top >= 3) return "scissor-cut";
  if (c.height === "taper") return "taper";
  return c.start === "skin" || c.start === "0" ? "skin-fade" : "classic-cut";
}
