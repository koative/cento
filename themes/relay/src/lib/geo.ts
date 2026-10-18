import { hubs, type Hub, type Mode } from "../content";

/* Equirectangular projection tuned for 49°N; good enough for a schematic network map. */
export const MAP = {
  w: 720,
  h: 760,
  pad: 30,
  lon0: -5,
  lat1: 58.8,
  k: 36,
  cos: Math.cos((49 * Math.PI) / 180),
};

export function project(lat: number, lon: number): [number, number] {
  return [
    MAP.pad + (lon - MAP.lon0) * MAP.cos * MAP.k,
    MAP.pad + (MAP.lat1 - lat) * MAP.k,
  ];
}

const byCode = new Map(hubs.map((h) => [h.code, h]));

export function hub(code: string): Hub {
  const h = byCode.get(code);
  if (!h) throw new Error(`Unknown hub ${code}`);
  return h;
}

export const point = (code: string) => {
  const h = hub(code);
  return project(h.lat, h.lon);
};

/** Great-circle distance in km. */
export function km(a: string, b: string) {
  const A = hub(a);
  const B = hub(b);
  const rad = Math.PI / 180;
  const dLat = (B.lat - A.lat) * rad;
  const dLon = (B.lon - A.lon) * rad;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(A.lat * rad) * Math.cos(B.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(s));
}

/** How much longer the real road, track or sailing is than the straight line. */
export const routeFactor: Record<Mode, number> = {
  road: 1.22,
  rail: 1.3,
  sea: 1.5,
  air: 1,
};

export function routeKm(route: string[], mode: Mode) {
  let total = 0;
  for (let i = 1; i < route.length; i++)
    total += km(route[i - 1], route[i]) * routeFactor[mode];
  return total;
}

/** Cumulative share of the route reached at each hub, 0 … 1. */
export function legShares(route: string[]) {
  const legs = route.slice(1).map((c, i) => km(route[i], c));
  const total = legs.reduce((a, b) => a + b, 0) || 1;
  let run = 0;
  return [0, ...legs.map((l) => (run += l) / total)];
}

/** Position along the drawn polyline at share t (0 … 1). */
export function along(route: string[], t: number): [number, number] {
  const pts = route.map(point);
  const segs = pts
    .slice(1)
    .map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  const total = segs.reduce((a, b) => a + b, 0);
  let left = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < segs.length; i++) {
    if (left <= segs[i] || i === segs.length - 1) {
      const f = segs[i] ? Math.min(1, left / segs[i]) : 0;
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f,
      ];
    }
    left -= segs[i];
  }
  return pts[0];
}

export const polyline = (route: string[]) =>
  route
    .map((c) =>
      point(c)
        .map((n) => n.toFixed(1))
        .join(","),
    )
    .join(" ");
