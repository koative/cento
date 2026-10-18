/** The two-by-two with its top-right quadrant filled: "move now". */
export function Mark() {
  return (
    <svg
      className="mark"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M12 1v22M1 12h22" stroke="currentColor" strokeWidth="2" />
      <rect className="mark-fill" x="12" y="1" width="11" height="11" />
    </svg>
  );
}
