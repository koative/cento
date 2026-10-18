/** Four strokes and the gate: the brand mark. */
export function TallyMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`tally-mark ${className}`}
      viewBox="0 0 40 32"
      aria-hidden="true"
      focusable="false"
    >
      <g className="tally-strokes">
        <path d="M7 4 6 28" />
        <path d="M15 3.5 14.5 28.5" />
        <path d="M23 4 22.5 28" />
        <path d="M31 3.5 31 28.5" />
      </g>
      <path className="tally-gate" d="M2 22 37 9" />
    </svg>
  );
}

/** The red-pencil tick an accountant puts beside a checked line. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`tick ${className}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        pathLength={1}
        d="M3 13.5c2 1.2 3.6 2.9 5 5.2C11 12 15.5 6.6 21.5 3.5"
      />
    </svg>
  );
}

/** Tally count for a month: groups of five, the fifth stroke crossing the first four. */
export function TallyCount({ count }: { count: number }) {
  const groups = Array.from({ length: Math.ceil(count / 5) }, (_, g) =>
    Math.min(5, count - g * 5),
  );
  return (
    <span className="tally-count" aria-hidden="true">
      {groups.map((n, g) => (
        <svg key={g} viewBox="0 0 34 28" focusable="false">
          {Array.from({ length: Math.min(n, 4) }, (_, i) => (
            <path
              key={i}
              pathLength={1}
              style={{ animationDelay: `${(g * 5 + i) * 40}ms` }}
              d={`M${5 + i * 7.5} 3 ${4.5 + i * 7.5} 25`}
            />
          ))}
          {n === 5 && (
            <path
              className="gate"
              pathLength={1}
              style={{ animationDelay: `${(g * 5 + 4) * 40}ms` }}
              d="M1 19 32 8"
            />
          )}
        </svg>
      ))}
    </span>
  );
}
