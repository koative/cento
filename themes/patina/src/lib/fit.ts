import type { Dims } from "../content";

export type Way = { label: string; across: number; tall: number };
export type DoorResult = { way: Way; spare: number; parts: boolean } | null;

/**
 * Every way a box can be carried through an opening: two of its dimensions form
 * the cross-section, the third points along the direction of travel. Listed in
 * the order movers prefer them.
 * ponytail: ignores tilting a piece diagonally through the frame; add the diagonal
 * case if customers ask why a borderline piece "did fit" on the day.
 */
function ways({ w, d, h }: Dims): Way[] {
  return [
    { label: "upright, carried end first", across: d, tall: h },
    { label: "upright, carried front first", across: w, tall: h },
    { label: "tipped onto its back", across: h, tall: d },
    { label: "on its end", across: d, tall: w },
    { label: "on its side, front first", across: h, tall: w },
    { label: "laid flat", across: w, tall: d },
  ];
}

function firstWay(piece: Dims, door: { w: number; h: number }) {
  for (const way of ways(piece)) {
    const spare = Math.min(door.w - way.across, door.h - way.tall);
    if (spare >= 0) return { way, spare };
  }
  return null;
}

/** Which way the piece passes a doorway; falls back to its largest part if it comes apart. */
export function throughDoor(
  piece: Dims,
  door: { w: number; h: number },
  largestPart?: Dims,
): DoorResult {
  const whole = firstWay(piece, door);
  if (whole) return { ...whole, parts: false };
  const part = largestPart && firstWay(largestPart, door);
  return part ? { ...part, parts: true } : null;
}

/** Inches with one decimal at most: 31, 31.5. */
export const inches = (n: number) => `${Math.round(n * 10) / 10}″`;
