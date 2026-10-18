/*
 * Security-printing linework, the kind engraved on passports and share certificates.
 * Every curve is computed, so the seal and bands stay crisp at any size.
 */

/** A woven ring: `copies` rose curves r = a + b·cos(k·t), each rotated a little further. */
function ring(
  cx: number,
  cy: number,
  a: number,
  b: number,
  k: number,
  copies: number,
) {
  const paths: string[] = [];
  for (let c = 0; c < copies; c++) {
    const phase = (c / copies) * ((2 * Math.PI) / k);
    let d = "";
    for (let i = 0; i <= 360; i++) {
      const t = (i / 360) * 2 * Math.PI;
      const r = a + b * Math.cos(k * (t + phase));
      d += `${i ? "L" : "M"}${(cx + r * Math.cos(t)).toFixed(2)} ${(cy + r * Math.sin(t)).toFixed(2)}`;
    }
    paths.push(d + "Z");
  }
  return paths;
}

const outer = ring(100, 100, 84, 8, 30, 6);
const inner = ring(100, 100, 58, 8, 14, 5);

export function Seal({
  label = "Attested",
  sub = "Cipher",
  drawn = true,
}: {
  label?: string;
  sub?: string;
  drawn?: boolean;
}) {
  return (
    <svg
      className="seal"
      data-drawn={drawn ? "" : undefined}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="96" className="seal-rim" />
      <g className="seal-lines">
        {outer.map((d, i) => (
          <path key={"o" + i} d={d} pathLength={1} />
        ))}
        {inner.map((d, i) => (
          <path key={"i" + i} d={d} pathLength={1} />
        ))}
      </g>
      <circle cx="100" cy="100" r="42" className="seal-core" />
      <text x="100" y="100" textAnchor="middle" className="seal-label">
        {label}
      </text>
      <text x="100" y="118" textAnchor="middle" className="seal-sub">
        {sub}
      </text>
    </svg>
  );
}

/** Interfering sine lines, as on the edge of a banknote. Decorative only. */
export function Waves({
  lines = 14,
  height = 120,
}: {
  lines?: number;
  height?: number;
}) {
  const paths = Array.from({ length: lines }, (_, n) => {
    let d = "";
    for (let x = 0; x <= 1200; x += 8) {
      const y =
        height / 2 +
        Math.sin(x / 70 + n * 0.32) * (height * 0.28) +
        Math.sin(x / 23 - n * 0.5) * 4 +
        (n - lines / 2) * 2.2;
      d += `${x ? "L" : "M"}${x} ${y.toFixed(1)}`;
    }
    return d;
  });
  return (
    <svg
      className="waves"
      viewBox={`0 0 1200 ${height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
