import { Link } from "../router";
import { brand } from "../content";

/** The step: flat baseline, one sharp rise, a new plateau — what a winning test looks like on a chart. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.name}, home`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="logo-mark">
        <rect width="32" height="32" rx="7" />
        <path d="M6 22h9l3-12h8" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}
