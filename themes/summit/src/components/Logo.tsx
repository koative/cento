import { Link } from "../router";
import { brand } from "../content";

/** A summit drawn like a climbing volume, with its bolt hole. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.name}, home`}
    >
      <svg viewBox="0 0 48 40" aria-hidden="true">
        <path d="M2 38 20 4l8 15 5-8 13 27Z" className="logo-peak" />
        <circle cx="20" cy="24" r="3.2" className="logo-bolt" />
      </svg>
      <span>{brand.name}</span>
    </Link>
  );
}
