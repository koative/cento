import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <svg viewBox="0 0 400 80" aria-hidden="true">
        <path d="M0 50h400" />
      </svg>
      <h1>Flat spell.</h1>
      <p className="lede">
        There's no swell on this page. It may have moved, or the link was
        mistyped.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-ink">
          Back to the beach
        </Link>
        <Link to="/forecast" className="btn btn-line">
          Find some waves
        </Link>
      </div>
    </section>
  );
}
