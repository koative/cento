import { brand } from "../content";

/** I-beam section in a square plate, beside the wordmark. */
export function Logo() {
  return (
    <span className="logo">
      <svg
        viewBox="0 0 32 32"
        width="32"
        height="32"
        aria-hidden="true"
        className="logo-mark"
      >
        <rect width="32" height="32" fill="var(--signal)" />
        <path d="M7 7h18v4.5h-6.5v9H25V25H7v-4.5h6.5v-9H7z" fill="var(--ink)" />
      </svg>
      <span className="logo-word">{brand.name}</span>
    </span>
  );
}
