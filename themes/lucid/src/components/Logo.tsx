/** Wordmark: "lucid" with the proofreader's insertion caret in blue pencil. */
export function Logo() {
  return (
    <span className="logo">
      <svg
        viewBox="0 0 20 24"
        width="16"
        height="20"
        aria-hidden
        className="logo-caret"
      >
        <path
          d="M2 22 10 3l8 19"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo-word">lucid</span>
    </span>
  );
}
