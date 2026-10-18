import { Link } from "../router";
import { brand } from "../content";

/** Wordmark: a pen "M" on a highlighter swipe, then the name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.name}, home`}
    >
      <svg viewBox="0 0 40 32" width="40" height="32" aria-hidden="true">
        <path d="M3 21.5 37 18l-.6 9L2.4 30z" className="logo-swipe" />
        <path d="M8 25V7l12 12L32 7v18" className="logo-pen" />
      </svg>
      <span className="logo-word">{brand.name}</span>
    </Link>
  );
}
