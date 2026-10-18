/** Wordmark: four panel cells, one of them lit, beside a lowercase "grid". */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
        <rect x="1" y="1" width="12" height="12" rx="2" className="logo-cell" />
        <rect x="15" y="1" width="12" height="12" rx="2" className="logo-sun" />
        <rect
          x="1"
          y="15"
          width="12"
          height="12"
          rx="2"
          className="logo-cell"
        />
        <rect
          x="15"
          y="15"
          width="12"
          height="12"
          rx="2"
          className="logo-cell"
        />
      </svg>
      <span className="logo-word">grid</span>
    </span>
  );
}
