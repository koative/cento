/** A heart-shaped collar ID tag on its split ring — the thing every animal leaves Kindred wearing. */
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 40 44"
      width="34"
      height="38"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="6"
        r="4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M20 41 C 9 33, 3 26, 3 19 C 3 13.5, 7 10, 11.6 10 C 15 10, 18 12, 20 15 C 22 12, 25 10, 28.4 10 C 33 10, 37 13.5, 37 19 C 37 26, 31 33, 20 41 Z"
        fill="var(--accent)"
      />
      <circle cx="20" cy="15.6" r="2" fill="var(--paper)" />
      <path
        d="M14 24.5 h12 M16 29 h8"
        stroke="var(--paper)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
