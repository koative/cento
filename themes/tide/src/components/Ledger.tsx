import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import type { Programme } from "../content";

/** Programmes as rows in a field ledger: thumbnail, type of work, name, one-line summary, where. */
export function Ledger({
  items,
  compact,
}: {
  items: Programme[];
  compact?: boolean;
}) {
  return (
    <ul className={compact ? "ledger ledger-compact" : "ledger"}>
      {items.map((p) => (
        <li key={p.slug}>
          <Link to={`/programmes/${p.slug}`} className="ledger-row">
            <img
              src={p.image.src}
              alt=""
              width={p.image.w}
              height={p.image.h}
              loading="lazy"
            />
            <span className="ledger-theme">{p.theme}</span>
            <strong>{p.name}</strong>
            <span className="ledger-summary">{p.summary}</span>
            <span className="ledger-region">{p.region}</span>
            <ArrowRight aria-hidden="true" className="ledger-go" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
