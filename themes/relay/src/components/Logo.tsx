/** Wordmark: two chevrons handing on, the second in signal orange. */
export function Logo() {
  return (
    <span className="logo">
      <svg
        viewBox="0 0 32 24"
        width="32"
        height="24"
        aria-hidden="true"
        className="logo-mark"
      >
        <path
          d="M3 3l9 9-9 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="miter"
        />
        <path
          d="M16 3l9 9-9 9"
          fill="none"
          stroke="var(--orange)"
          strokeWidth="4"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="logo-word">Relay</span>
    </span>
  );
}
