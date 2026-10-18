/** An index card with its red header rule and a marker tick: the unit of work Sprint is built around. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect
          x="3"
          y="5"
          width="26"
          height="22"
          rx="3"
          fill="var(--card)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M3 10h26" stroke="var(--rule)" strokeWidth="2" />
        <path
          d="M9 17l4 4 9-9"
          fill="none"
          stroke="var(--marker)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo-word">Sprint</span>
    </span>
  );
}
