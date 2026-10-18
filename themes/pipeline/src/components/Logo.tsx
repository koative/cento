/** Three ruled bars narrowing left to right: a pipeline review sheet in miniature. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden>
        <rect width="28" height="28" rx="7" fill="var(--ink)" />
        <rect
          x="6"
          y="7.5"
          width="16"
          height="3"
          rx="1.5"
          fill="var(--paper)"
        />
        <rect
          x="6"
          y="12.5"
          width="11"
          height="3"
          rx="1.5"
          fill="var(--paper)"
        />
        <rect
          x="6"
          y="17.5"
          width="6"
          height="3"
          rx="1.5"
          fill="var(--canary)"
        />
      </svg>
      <span className="logo-word">pipeline</span>
    </span>
  );
}
