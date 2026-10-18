/** Two ports joined by a bent run of conduit. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <rect
          x="2"
          y="4"
          width="10"
          height="10"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <rect
          x="20"
          y="18"
          width="10"
          height="10"
          rx="2.5"
          fill="var(--signal)"
        />
        <path
          d="M12 9h5a4 4 0 0 1 4 4v5"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="logo-word">conduit</span>
    </span>
  );
}
