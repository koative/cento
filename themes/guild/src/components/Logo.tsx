/** The Guild seal (a struck ring around a serif G) beside the wordmark. */
export function Logo() {
  return (
    <>
      <svg
        className="logo-seal"
        viewBox="0 0 40 40"
        width="34"
        height="34"
        aria-hidden="true"
      >
        <circle
          cx="20"
          cy="20"
          r="18.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx="20"
          cy="20"
          r="14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="1.2 1.8"
        />
        <path
          d="M25.6 14.2A7.4 7.4 0 1 0 27 21h-6.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="square"
        />
      </svg>
      <span className="logo-word">Guild</span>
    </>
  );
}
