/** A molar seen from the side: crown, two roots. Drawn once, used in the header, footer and appointment card. */
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 28 28"
      aria-hidden="true"
    >
      <path
        d="M6.2 3.6c2.6-1.6 5-1.3 7.8.4 2.8-1.7 5.2-2 7.8-.4 2.7 1.7 3 5.9 1.6 9.6-.9 2.4-1.1 5.3-1.6 8.3-.4 2.6-1 4.5-2.4 4.5-1.3 0-1.6-1.8-1.9-4-.3-2.4-.7-4.3-3.5-4.3s-3.2 1.9-3.5 4.3c-.3 2.2-.6 4-1.9 4-1.4 0-2-1.9-2.4-4.5-.5-3-.7-5.9-1.6-8.3C3.2 9.5 3.5 5.3 6.2 3.6z"
        fill="currentColor"
      />
      <path
        d="M8.4 7.6c1.6-.9 3.2-.6 4.4.4"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
