/** A round pet ID tag on its split ring, with a nose and whiskers stamped into it. */
export function Mark({ size = 36 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
    >
      <circle
        cx="20"
        cy="6"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <circle cx="20" cy="24" r="15" fill="var(--green)" />
      <path d="M16.6 21.6h6.8L20 25.4z" fill="var(--paper)" />
      <g stroke="var(--paper)" strokeWidth="1.7" strokeLinecap="round">
        <path d="M14.5 24.2 8 22.4M14.5 26.6 8.4 28.4M25.5 24.2 32 22.4M25.5 26.6 31.6 28.4" />
      </g>
    </svg>
  );
}
