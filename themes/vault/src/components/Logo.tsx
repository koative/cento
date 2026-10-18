/** A gabled house with a keyhole cut through it: the home, locked. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2.5 29 13v16.5H3V13Z" fill="currentColor" />
      <circle cx="16" cy="17" r="3.4" fill="var(--paper)" />
      <path d="M14.4 19h3.2l1.1 6.5h-5.4Z" fill="var(--paper)" />
    </svg>
  );
}
