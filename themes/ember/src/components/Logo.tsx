import { brand } from "../content";
import { Link } from "../router";

/** The oven mouth with three coals: the shape every arch on the site repeats. */
export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M4 38V20a16 16 0 0 1 32 0v18z" fill="currentColor" />
      <path d="M11 38V21a9 9 0 0 1 18 0v17z" fill="var(--paper)" />
      <circle cx="16" cy="33.5" r="2.6" fill="var(--tomato)" />
      <circle cx="22.4" cy="32" r="2.1" fill="var(--tomato)" />
      <circle cx="26.2" cy="35" r="1.6" fill="var(--tomato)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.name}, home`}
    >
      <Mark />
      <span>{brand.name}</span>
    </Link>
  );
}
