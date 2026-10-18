/** Wordmark plus a keyhole set in a double ring, the shape of a wax seal. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle
          cx="16"
          cy="16"
          r="14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="16" r="10.5" fill="currentColor" />
        <circle cx="16" cy="13.6" r="2.7" fill="var(--paper)" />
        <path d="M14.7 15.2h2.6l.9 6h-4.4z" fill="var(--paper)" />
      </svg>
      <span className="logo-word">cipher</span>
    </span>
  );
}
