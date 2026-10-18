/** Wordmark: the name set in Be Vietnam Pro ExtraBold, underlined by a highlighter stroke. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="var(--ink)" />
        <rect
          x="6"
          y="17"
          width="20"
          height="7"
          rx="1.5"
          fill="var(--marker)"
        />
        <path
          d="M8 11h16M8 15h11"
          stroke="var(--paper)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
      <span className="logo-word">campus</span>
    </span>
  );
}
