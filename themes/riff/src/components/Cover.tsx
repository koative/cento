import type { Release } from "../content";
import { seeded } from "../lib/format";

const INK = { red: "var(--red)", ink: "var(--ink)", paper: "var(--paper)" };

/** Two-ink screenprint cover drawn in a 100×100 box, so it can sit inside other artwork. */
export function CoverShapes({ release }: { release: Release }) {
  const { motif, ground } = release.cover;
  const fg = ground === "paper" ? INK.ink : INK.paper;
  const hot = ground === "red" ? INK.ink : INK.red;
  return (
    <>
      <rect width="100" height="100" fill={INK[ground]} />
      {motif === "ceiling" && (
        <>
          <rect y="7" width="100" height="23" fill={hot} />
          <rect y="36" width="100" height="6" fill={hot} />
          <rect y="47" width="100" height="3" fill={hot} />
          <rect y="54" width="100" height="1.4" fill={hot} />
          <circle cx="50" cy="80" r="11" fill={fg} />
        </>
      )}
      {motif === "wire" && (
        <>
          <polyline
            points="-2,58 12,40 24,62 36,36 48,64 60,34 72,60 84,42 102,56"
            fill="none"
            stroke={hot}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <polyline
            points="-2,66 12,48 24,70 36,44 48,72 60,42 72,68 84,50 102,64"
            fill="none"
            stroke={fg}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </>
      )}
      {motif === "lot" && (
        <>
          <circle cx="74" cy="26" r="13" fill={hot} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <polygon
              key={i}
              points={`${4 + i * 17},100 ${10 + i * 17},100 ${22 + i * 17},58 ${18 + i * 17},58`}
              fill={fg}
            />
          ))}
          <rect y="56" width="100" height="2" fill={fg} />
        </>
      )}
      {motif === "rings" && (
        <>
          {[44, 36, 28, 20, 12].map((r) => (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={fg}
              strokeWidth={r > 30 ? 1.2 : 2.4}
            />
          ))}
          <circle cx="50" cy="50" r="6" fill={hot} />
        </>
      )}
      {motif === "static" && (
        <Halftone seed={release.slug} color={fg} hot={hot} />
      )}
      {motif === "dawn" && (
        <>
          <path d="M22 64 A28 28 0 0 1 78 64 Z" fill={hot} />
          {[-60, -30, 0, 30, 60].map((a) => (
            <rect
              key={a}
              x="49.4"
              y="14"
              width="1.2"
              height="16"
              fill={fg}
              transform={`rotate(${a} 50 64)`}
            />
          ))}
          <rect y="64" width="100" height="1.6" fill={fg} />
        </>
      )}
      <text x="6" y="95" fill={fg} className="cover-type">
        RIFF
      </text>
    </>
  );
}

function Halftone({
  seed,
  color,
  hot,
}: {
  seed: string;
  color: string;
  hot: string;
}) {
  const rnd = seeded(seed);
  const dots = [];
  for (let y = 8; y < 82; y += 6)
    for (let x = 6; x < 100; x += 6) {
      const r = Math.max(0.3, 2.6 * (1 - y / 90) * (0.6 + rnd() * 0.6));
      dots.push(
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill={rnd() > 0.93 ? hot : color}
        />,
      );
    }
  return <>{dots}</>;
}

export function Cover({
  release,
  className = "",
}: {
  release: Release;
  className?: string;
}) {
  return (
    <svg
      className={`cover ${className}`}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`${release.title} cover art`}
    >
      <CoverShapes release={release} />
    </svg>
  );
}
