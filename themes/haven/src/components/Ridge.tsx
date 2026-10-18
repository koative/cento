import { peaks } from "../content";

/** Panorama geometry in a 1000 × 300 box: altitude 2,000 m sits on the floor, every 1,300 m above it climbs 160 units. */
export const altToY = (alt: number) => 300 - ((alt - 2000) / 1300) * 160;

/** Skyline through every named summit, with saddles and small deterministic notches between them. */
function skyline(shift = 0, lift = 0) {
  const pts: [number, number][] = [[0, altToY(2380 + lift)]];
  const tops = peaks.map((p) => [p.x * 10 + shift, p.alt + lift] as const);
  tops.forEach(([x, alt], i) => {
    const [nx, nalt] = tops[i + 1] ?? [1000, 2300 + lift];
    pts.push([x, altToY(alt)]);
    const low = Math.min(alt, nalt) - 240 - (i % 3) * 80;
    const steps = 11;
    for (let k = 1; k < steps; k++) {
      const t = k / steps;
      const base =
        t < 0.5
          ? alt + (low - alt) * (t / 0.5) ** 0.7
          : low + (nalt - low) * ((t - 0.5) / 0.5) ** 1.4;
      // two out-of-step waves make notches and false summits; tapered to zero at each named summit
      const notch =
        (Math.sin(x * 0.013 + k * 1.7) * 0.6 + Math.sin(k * 4.3 + i) * 0.4) *
        70 *
        Math.sin(Math.PI * t);
      pts.push([x + (nx - x) * t, altToY(base + notch)]);
    }
  });
  pts.push([1000, altToY(2300 + lift)]);
  return `M0 300 L${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} L1000 300 Z`;
}

export const frontRidge = skyline();
export const backRidge = skyline(45, -110);

/** The skyline alone, for page edges and the footer. */
export function Ridge({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={backRidge} className="ridge-back" />
      <path d={frontRidge} className="ridge-front" />
    </svg>
  );
}
