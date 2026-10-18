import { tracks } from "../content";

/** The Prism mark: a beam enters a triangle and leaves as the five track colours. */
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 48 32"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 19 L17 17" stroke="currentColor" strokeWidth="2.4" />
      {tracks.map((t, i) => (
        <path
          key={t.id}
          d={`M24 17 L48 ${8 + i * 4.5}`}
          stroke={`var(--t-${t.id})`}
          strokeWidth="3"
        />
      ))}
      <path
        d="M20 3 L33 28 H7 Z"
        fill="var(--paper)"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
