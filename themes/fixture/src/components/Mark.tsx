/** The Fixture mark: a wall plate with its two screws and a toggle — the last thing we touch on every job. */
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="5"
        y="2"
        width="22"
        height="28"
        rx="3"
        fill="var(--live)"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="16" cy="6.5" r="1.4" fill="currentColor" />
      <circle cx="16" cy="25.5" r="1.4" fill="currentColor" />
      <rect
        x="12"
        y="10"
        width="8"
        height="12"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="13.5" y="11.5" width="5" height="5" rx="1" fill="currentColor" />
    </svg>
  );
}
