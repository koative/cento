/** Wordmark: four beats of a bar, the third accented, then the name. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 28 24" width="28" height="24" aria-hidden="true">
        <rect x="1" y="12" width="4" height="10" rx="2" fill="currentColor" />
        <rect x="8.5" y="8" width="4" height="14" rx="2" fill="currentColor" />
        <rect
          x="16"
          y="2"
          width="4"
          height="20"
          rx="2"
          className="logo-accent"
        />
        <rect x="23.5" y="8" width="4" height="14" rx="2" fill="currentColor" />
      </svg>
      <span className="logo-word">cadence</span>
    </span>
  );
}
