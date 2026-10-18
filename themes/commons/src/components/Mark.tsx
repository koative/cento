/** A room drawn the way it sits on our floor plans: four walls, a door swing, one table. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path
        d="M13 29H4V3h24v26h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M13 29a9 9 0 0 1 9-9"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
      />
      <rect x="10" y="9" width="12" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
}
