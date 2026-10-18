import { brand } from "../content";
import { Link } from "../router";

/** Centre mark of a bored hole: the first thing a machinist picks up on a drawing. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="1" y="1" width="30" height="30" rx="2" />
      <circle cx="16" cy="16" r="7.5" />
      <path d="M16 4.5v6M16 21.5v6M4.5 16h6M21.5 16h6" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <Mark />
      <span>{brand.name}</span>
    </Link>
  );
}
