import { Link } from "../router";
import { brand } from "../content";

/** Wordmark plus four beat bars — the count-in "1, 2, 3, 4" every class starts on. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.name}, home`}
    >
      <svg className="logo-beat" viewBox="0 0 28 24" aria-hidden="true">
        <rect x="0" y="10" width="5" height="14" rx="1" />
        <rect x="7.5" y="4" width="5" height="20" rx="1" />
        <rect x="15" y="13" width="5" height="11" rx="1" />
        <rect x="22.5" y="0" width="5" height="24" rx="1" />
      </svg>
      <span>{brand.name.toLowerCase()}</span>
    </Link>
  );
}
