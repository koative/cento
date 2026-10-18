import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="bill-stamp static-stamp" aria-hidden="true">
        Cancelled
      </p>
      <h1 className="display-xl">Wrong venue</h1>
      <p className="lede">
        There's no show at this address. The page may have moved, or the date
        was never on the bill.
      </p>
      <div className="actions">
        <Link to="/tour" className="btn btn-red">
          See tour dates
        </Link>
        <Link to="/" className="btn btn-line">
          Back home
        </Link>
      </div>
    </section>
  );
}
