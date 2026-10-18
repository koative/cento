import type { Glyph } from "../content";
import { connector } from "../lib/flow";

/** The Flux mark: two nodes joined by a wire that bends once. */
export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={inverse ? "logo logo-inverse" : "logo"}>
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="var(--plum)" />
        <path
          d="M9 8.5v4.5a3 3 0 0 0 3 3h4a3 3 0 0 1 3 3v.5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="9" cy="8" r="2.6" fill="#fff" />
        <circle cx="19" cy="20" r="2.6" fill="var(--signal)" />
      </svg>
      <span className="logo-word">flux</span>
    </span>
  );
}

const glyphs: Record<Glyph, string> = {
  bubble:
    "M11 12h18a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9l-6 5v-5h-3a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3z",
  envelope: "M9 13h22v15H9zM9 13l11 9 11-9",
  ledger: "M12 10h16v20H12zM16 16h8M16 20h8M16 24h5",
  coin: "M20 10a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM20 15v10M17 18h6",
  funnel: "M10 12h20l-7 9v7l-6 3v-10z",
  form: "M11 11h18v18H11zM15 16h10M15 20h10M15 24h6",
  ticket: "M10 14h20v4a2 2 0 0 0 0 4v4H10v-4a2 2 0 0 0 0-4zM24 14v12",
  grid: "M11 11h18v18H11zM11 17h18M11 23h18M17 11v18M23 11v18",
  box: "M10 15l10-5 10 5v11l-10 5-10-5zM10 15l10 5 10-5M20 20v11",
  page: "M13 10h10l5 5v15H13zM23 10v5h5M17 20h7M17 24h7",
  branch: "M14 10v20M14 18c0-3 12-1 12-6M26 12a2 2 0 1 0 0-.01",
  crew: "M15 16a3 3 0 1 0 0-.01M25 16a3 3 0 1 0 0-.01M9 29c0-4 3-7 6-7s6 3 6 7M19 29c0-4 3-7 6-7s6 3 6 7",
  clock: "M20 10a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM20 14v6l4 3",
  check: "M11 11h18v18H11zM15 20l4 4 7-8",
  store: "M10 15l2-5h16l2 5zM10 15v15h20V15M17 30v-7h6v7",
  hook: "M23 10v9a6 6 0 0 1-12 0v-2M23 10l-3 3M23 10l3 3",
};

/** Authored mark for a connector; "flux" (conditions and delays) uses the plum Flux node. */
export function ConnectorMark({
  slug,
  size = 40,
}: {
  slug: string;
  size?: number;
}) {
  const c = connector(slug);
  return (
    <svg
      className="mark"
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect
        width="40"
        height="40"
        rx="10"
        fill={c?.color ?? "var(--plum-soft)"}
      />
      {c ? (
        <path
          d={glyphs[c.glyph]}
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M14 12v6a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v4M14 12h.01M26 28h.01"
          fill="none"
          stroke="var(--plum)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
