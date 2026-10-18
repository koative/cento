import { brand } from "../content";

/** The Nest mark: two eggs in a woven bowl, drawn in the palette. */
export function Logo() {
  return (
    <span className="logo-lockup">
      <svg className="logo-mark" viewBox="0 0 64 48" aria-hidden="true">
        <ellipse cx="24" cy="22" rx="9" ry="12" fill="var(--wren)" />
        <ellipse cx="40" cy="22" rx="9" ry="12" fill="var(--robin)" />
        <path
          d="M5 26c5 18 49 18 54 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M12 33c10 5 30 5 40 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity=".55"
        />
      </svg>
      <span className="logo-word">{brand.name.toLowerCase()}</span>
    </span>
  );
}
