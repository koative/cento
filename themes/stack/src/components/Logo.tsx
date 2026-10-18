export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 28 28" width="26" height="26" aria-hidden="true">
        <rect x="3" y="18" width="22" height="5" rx="1" fill="currentColor" />
        <rect
          x="3"
          y="11"
          width="22"
          height="5"
          rx="1"
          fill="currentColor"
          opacity=".55"
        />
        <rect x="3" y="4" width="15" height="5" rx="1" fill="var(--accent)" />
      </svg>
      <span className="logo-word">stack</span>
      <span className="logo-docs">docs</span>
    </span>
  );
}
