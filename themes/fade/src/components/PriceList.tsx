import { Link } from "../router";
import type { Service } from "../content";
import { duration, money } from "../lib/format";

/** Price-board rows: name, dot leader, price. `detailed` adds the description and a booking link. */
export function PriceList({
  items,
  detailed = false,
}: {
  items: Service[];
  detailed?: boolean;
}) {
  return (
    <ul className={`price-list${detailed ? " detailed" : ""}`}>
      {items.map((s) => (
        <li key={s.id}>
          <p className="price-line">
            <span className="price-name">{s.name}</span>
            <span className="leader" aria-hidden="true" />
            <span className="price-num">{money(s.price)}</span>
          </p>
          <p className="price-meta">
            {duration(s.minutes)}
            {detailed && <> · {s.blurb}</>}
          </p>
          {detailed && (
            <Link
              to={`/book?service=${s.id}`}
              className="text-link"
              aria-label={`Book a ${s.name.toLowerCase()}`}
            >
              Book this
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
