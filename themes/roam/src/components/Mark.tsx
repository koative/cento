/** The Roam sign: a yellow panel with a turn-right road arrow, as on our garage wayfinding. */
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="12" fill="var(--sign)" />
      <path
        d="M20 50V30a10 10 0 0 1 10-10h12"
        fill="none"
        stroke="var(--ink)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M38 10l12 10-12 10z" fill="var(--ink)" />
    </svg>
  );
}
