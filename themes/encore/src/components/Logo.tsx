/** Proscenium arch with the curtain drawn, plus the wordmark. */
export function Logo() {
  return (
    <span className="logo-lockup">
      <svg className="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M5 38V19a15 15 0 0 1 30 0v19"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path className="logo-curtain" d="M12 38V21a8 8 0 0 1 16 0v17z" />
        <path d="M2 38h36" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span className="logo-word">Encore</span>
    </span>
  );
}
