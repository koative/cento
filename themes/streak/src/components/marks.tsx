/** The marker cross: two strokes that draw in when they mount. */
export function Cross({ className = "cross" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5.5c4.6 4 9 8.4 14 13.2" pathLength={1} />
      <path d="M18.6 5.2C13.8 9.4 9.4 13.9 5.4 18.8" pathLength={1} />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <span className="logo-mark" aria-hidden="true">
        <Cross className="cross logo-cross" />
      </span>
      <span className="logo-word">streak</span>
    </span>
  );
}
