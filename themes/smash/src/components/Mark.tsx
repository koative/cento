/** The patty mark: a bun, a lacy smashed patty through the middle. Colours come from CSS so it recolours on any surface. */
export function Mark({ className = "mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="31" fill="var(--mark-bg, var(--ketchup))" />
      <path
        d="M11 25 Q13 11 32 10 Q51 11 53 25 Z"
        fill="var(--mark-bun, var(--mustard))"
      />
      <path
        d="M7 30 L12 27 L16 30 L21 27 L25 30 L30 27 L34 30 L39 27 L43 30 L48 27 L52 30 L57 28 V37 L52 39 L48 36 L43 39 L39 36 L34 39 L30 36 L25 39 L21 36 L16 39 L12 36 L7 38 Z"
        fill="var(--mark-patty, var(--char))"
      />
      <path
        d="M11 42 H53 Q51 53 32 53 Q13 53 11 42 Z"
        fill="var(--mark-bun, var(--mustard))"
      />
    </svg>
  );
}
