/** Planet, inclined orbit and a payload on its ascending node. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="7.5" fill="currentColor" />
      <ellipse
        cx="16"
        cy="16"
        rx="14.5"
        ry="5.2"
        transform="rotate(-24 16 16)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="28.6" cy="10.1" r="2.6" fill="var(--orange)" />
    </svg>
  );
}
