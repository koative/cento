/** The Clutch mark: a chamfered plate with a cut "C" — the same corner cut used across the site. */
export function Mark({ size = 32 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M2 2h22l6 6v22H8l-6-6z" fill="var(--flare)" />
      <path
        d="M22 9H12l-3 3v8l3 3h10"
        fill="none"
        stroke="var(--night)"
        strokeWidth="3.6"
      />
    </svg>
  );
}
