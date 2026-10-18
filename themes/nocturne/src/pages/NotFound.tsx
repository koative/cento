import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>This side has run out.</h1>
      <p className="lede">
        The page you were after isn't in the crate. It may have moved, or the
        link was mistyped.
      </p>
      <div className="hero-actions">
        <Link to="/" className="btn btn-brass">
          Back to the bar
        </Link>
        <Link to="/records" className="btn btn-ghost">
          Last night's records
        </Link>
      </div>
    </section>
  );
}
