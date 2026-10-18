import { brand } from "../content";

/** The mark is a ledger column: two ruled entries and a double-ruled total. */
export function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden>
        <rect width="28" height="28" rx="7" className="logo-tile" />
        <path d="M8 8.5h12M8 13h8M8 18.5h12M8 21.5h12" className="logo-rule" />
      </svg>
      <span className="logo-word">{brand.name.toLowerCase()}</span>
    </span>
  );
}
