import type { Section } from "../content";

const rad = Math.PI / 180;

export const seasons = [
  { id: "winter", label: "21 December", day: 355 },
  { id: "equinox", label: "20 March", day: 79 },
  { id: "summer", label: "21 June", day: 172 },
] as const;

/**
 * Sun position at a latitude, day of year and solar hour, reduced to what a south-facing
 * section needs: altitude, and the profile angle (the sun's apparent height in the section plane).
 * Profile is null when the sun is down or behind the facade.
 */
export function sun(lat: number, day: number, hour: number) {
  const decl = 23.44 * Math.sin(((2 * Math.PI) / 365) * (284 + day)) * rad;
  const h = (hour - 12) * 15 * rad;
  const phi = lat * rad;
  const alt = Math.asin(
    Math.sin(phi) * Math.sin(decl) +
      Math.cos(phi) * Math.cos(decl) * Math.cos(h),
  );
  // Azimuth measured from due south, positive towards west.
  const az = Math.atan2(
    Math.sin(h),
    Math.cos(h) * Math.sin(phi) - Math.tan(decl) * Math.cos(phi),
  );
  const facing = Math.abs(az) < Math.PI / 2;
  const profile =
    alt > 0 && facing ? Math.atan(Math.tan(alt) / Math.cos(az)) : null;
  return { altitude: alt / rad, azimuth: az / rad, profile };
}

type Pt = [number, number];

/**
 * Where direct sun lands inside the section. x runs from the glazing (0) to the back wall (depth), y up from the floor.
 * The overhang projects outward at roof level and cuts the top of the beam.
 */
export function lightPatch(s: Section, profile: number | null) {
  if (profile === null) return null;
  const t = Math.tan(profile);
  const top =
    s.overhang > 0 ? Math.min(s.head, s.ceiling - s.overhang * t) : s.head;
  if (top <= s.sill) return null;
  const land = (y: number): Pt =>
    y / t <= s.depth ? [y / t, 0] : [s.depth, y - s.depth * t];
  const a = land(top);
  const b = land(s.sill);
  const poly: Pt[] = [[0, top], a];
  if (a[0] === s.depth && b[1] === 0) poly.push([s.depth, 0]);
  poly.push(b, [0, s.sill]);
  return {
    poly,
    top,
    reach: a[1] === 0 ? a[0] : s.depth,
    floor: Math.max(0, Math.min(a[0], s.depth) - Math.min(b[0], s.depth)),
  };
}

/** Solar hour → "9.45" (Danish style clock). */
export function clock(hour: number) {
  const min = Math.round(hour * 60);
  return `${Math.floor(min / 60)}.${String(min % 60).padStart(2, "0")}`;
}
