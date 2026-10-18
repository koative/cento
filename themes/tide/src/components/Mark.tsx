/** A swell over chart datum: the tide gauge reduced to two strokes. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <path
        d="M5 17c3.5 0 3.5-4 7-4s3.5 4 7 4 3.5-4 7-4"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M5 23h22"
        stroke="var(--buoy-bright)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
