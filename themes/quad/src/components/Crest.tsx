/** The Quadwell arms: a shield holding the plan of the Old Quad — four lawns, crossing paths, the well at the centre. */
export function Crest({ className = "crest" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 46"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M2 2h36v22c0 11-8.5 17.2-18 20C10.5 41.2 2 35 2 24z"
        fill="var(--crimson)"
      />
      <g fill="var(--paper)">
        <rect x="9" y="9" width="9.6" height="9.6" />
        <rect x="21.4" y="9" width="9.6" height="9.6" />
        <rect x="9" y="21.4" width="9.6" height="9.6" />
        <rect x="21.4" y="21.4" width="9.6" height="9.6" />
      </g>
      <circle cx="20" cy="20" r="3.4" fill="var(--paper)" />
      <circle cx="20" cy="20" r="1.5" fill="var(--crimson)" />
      <path
        d="M14 37.5h12"
        stroke="var(--paper)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
