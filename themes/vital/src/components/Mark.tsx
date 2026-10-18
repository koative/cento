/** Logo: a pine tile carrying one heartbeat that dips into a V. */
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <polyline
        points="4 17 9.5 17 12 12 16 24 21 7 23.5 17 28 17"
        fill="none"
        stroke="var(--slip)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** One beat of the ECG trace, repeated across the width. */
const beat = (x: number) =>
  `L${x + 40} 60 L${x + 48} 54 L${x + 56} 60 L${x + 66} 60 L${x + 72} 70 L${x + 80} 14 L${x + 88} 96 L${x + 95} 60 L${x + 112} 60 L${x + 124} 48 L${x + 138} 60 L${x + 200} 60`;

/** A drawn vitals trace; `beats` controls the rhythm length. The draw-in is the site's one entrance motion. */
export function Trace({
  beats = 6,
  className = "",
}: {
  beats?: number;
  className?: string;
}) {
  const d =
    "M0 60 " + Array.from({ length: beats }, (_, i) => beat(i * 200)).join(" ");
  return (
    <svg
      className={`trace ${className}`}
      viewBox={`0 0 ${beats * 200} 110`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} pathLength={1} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
