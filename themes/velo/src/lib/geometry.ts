import type { Bike, Geometry } from "../content";

export type SizedGeometry = Geometry & {
  size: number;
  topTube: number;
  wheelbase: number;
  heights: [number, number];
};

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Scale the base geometry to another frame size (cm). Per-centimetre deltas are typical of a
 * steel road range: stack grows faster than reach, angles open slightly on bigger frames.
 */
export function sizeGeometry(bike: Bike, size: number): SizedGeometry {
  const d = size - bike.baseSize;
  const g = bike.geometry;
  const sized: Geometry = {
    ...g,
    stack: Math.round(g.stack + d * 8.5),
    reach: Math.round(g.reach + d * 2.5),
    seatTube: Math.round(g.seatTube + d * 10),
    headTube: Math.round(g.headTube + d * 8.5),
    headAngle: +(g.headAngle + Math.max(-1, Math.min(1, d * 0.15))).toFixed(1),
    seatAngle: +(g.seatAngle - Math.max(-1, Math.min(1, d * 0.12))).toFixed(1),
  };
  const lo = Math.round(size * 3.17);
  const p = points(sized, bike.tyre);
  return {
    ...sized,
    size,
    topTube: Math.round(
      sized.reach + sized.stack / Math.tan(rad(sized.seatAngle)),
    ),
    wheelbase: Math.round(p.front.x - p.rear.x),
    heights: [lo, lo + 6],
  };
}

/** Pick the size whose recommended rider-height range is closest to the rider. */
export function sizeForHeight(bike: Bike, height: number) {
  return bike.sizes.reduce((best, s) =>
    Math.abs(s * 3.17 + 3 - height) < Math.abs(best * 3.17 + 3 - height)
      ? s
      : best,
  );
}

type Pt = { x: number; y: number };

/** Key points of the frame in SVG space: millimetres, bottom bracket at the origin, y down. */
export function points(g: Geometry, tyre: number) {
  const ha = rad(g.headAngle);
  const sa = rad(g.seatAngle);
  const down = { x: Math.cos(ha), y: Math.sin(ha) };
  const rear: Pt = {
    x: -Math.sqrt(g.chainstay ** 2 - g.bbDrop ** 2),
    y: -g.bbDrop,
  };
  const head: Pt = { x: g.reach, y: -g.stack };
  const headLow: Pt = {
    x: head.x + g.headTube * down.x,
    y: head.y + g.headTube * down.y,
  };
  const t = (g.stack - g.bbDrop) / Math.sin(ha);
  const axis: Pt = { x: head.x + t * down.x, y: -g.bbDrop };
  const front: Pt = { x: axis.x + g.offset / Math.sin(ha), y: -g.bbDrop };
  const seat: Pt = {
    x: -g.seatTube * Math.cos(sa),
    y: -g.seatTube * Math.sin(sa),
  };
  const saddleH = g.seatTube * 1.2 + 95;
  const saddle: Pt = { x: -saddleH * Math.cos(sa), y: -saddleH * Math.sin(sa) };
  const steerer: Pt = { x: head.x - 35 * down.x, y: head.y - 35 * down.y };
  const bar: Pt = { x: steerer.x + 100, y: steerer.y - 8 };
  return {
    rear,
    head,
    headLow,
    axis,
    front,
    seat,
    saddle,
    steerer,
    bar,
    down,
    radius: 311 + tyre,
  };
}
