/* Two strands of a helix seen side-on: one plated gold, one ink. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path d="M4 16c4-9 8-9 12 0s8 9 12 0" className="logo-gold" />
        <path d="M4 16c4 9 8 9 12 0s8-9 12 0" className="logo-ink" />
      </svg>
      <span className="logo-word">helix</span>
    </span>
  );
}
