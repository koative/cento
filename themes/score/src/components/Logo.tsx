import { Link } from "../router";
import { brand } from "../content";

/** Wordmark: the name set in Brygada, closed by a staff ending on a final barline. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`logo ${className}`}
      aria-label={`${brand.full}, home`}
    >
      <span className="logo-word">{brand.name}</span>
      <svg className="logo-mark" viewBox="0 0 30 22" aria-hidden="true">
        {[1, 6, 11, 16, 21].map((y) => (
          <line key={y} x1="0" x2="24" y1={y} y2={y} />
        ))}
        <line x1="24.5" x2="24.5" y1="1" y2="21" />
        <rect x="27" y="0.5" width="3" height="21" />
        <ellipse
          cx="13"
          cy="13.5"
          rx="3.6"
          ry="2.6"
          transform="rotate(-20 13 13.5)"
        />
      </svg>
    </Link>
  );
}
