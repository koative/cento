import { brand } from "../content";
import { Link } from "../router";

/** Wordmark in the display face, led by three rings that echo the speaker cone on the poster. */
export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <circle cx="16" cy="16" r="14" />
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="4" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}
