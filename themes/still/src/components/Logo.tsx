import { brand } from "../content";
import { Link } from "../router";

/** A low sun resting on still water: the studio's mark. */
export function Mark({ size = 30 }: { size?: number }) {
  return (
    <svg
      className="mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <circle
        cx="16"
        cy="15"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 19h26M8 23h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${brand.name}, home`}>
      <Mark />
      <span className="logo-word">{brand.name.toLowerCase()}</span>
    </Link>
  );
}
