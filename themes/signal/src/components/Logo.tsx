import { brand } from "../content";

/** The mark is one measured trace: flat, a spike, settle higher. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden>
        <rect width="28" height="28" rx="7" className="logo-tile" />
        <path d="M5 17h5l2.5-8 3.5 12 2.5-7H23" className="logo-trace" />
      </svg>
      <span className="logo-word">{brand.name.toLowerCase()}</span>
    </span>
  );
}
