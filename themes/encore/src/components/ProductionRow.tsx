import { Link } from "../router";
import type { Production } from "../content";
import { priceFrom } from "../lib/house";
import { money, runDates } from "../lib/util";

/** One line of the playbill: dates, title, credit, house and price, with the way in to book. */
export function ProductionRow({ p }: { p: Production }) {
  return (
    <article className="bill-row">
      <Link
        to={`/season/${p.slug}`}
        className="bill-media"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={p.image.src}
          alt=""
          width={p.image.w}
          height={p.image.h}
          loading="lazy"
        />
      </Link>
      <div className="bill-main">
        <h3>
          <Link to={`/season/${p.slug}`}>{p.title}</Link>
        </h3>
        <p className="bill-credit">{p.credit}</p>
        <p className="bill-logline">{p.logline}</p>
      </div>
      <div className="bill-side">
        <p className="bill-dates">{runDates(p.opens, p.closes)}</p>
        <p className="bill-tags">
          <span>{p.stage}</span>
          <span>{p.genre}</span>
          {p.label && <span className="tag-red">{p.label}</span>}
        </p>
        <p className="bill-price">From {money(priceFrom(p))}</p>
        <Link to={`/book/${p.slug}`} className="btn btn-line">
          Choose seats
        </Link>
      </div>
    </article>
  );
}
