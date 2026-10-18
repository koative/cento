import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="nf-code" aria-hidden="true">
        404 · OUT OF TOLERANCE
      </p>
      <h1>This page is not on the drawing</h1>
      <p className="lede">
        The link may be from an older revision of the site. Try one of these
        instead.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Back to the home page
        </Link>
        <Link to="/capabilities" className="btn btn-ghost">
          Capabilities
        </Link>
        <Link to="/rfq" className="btn btn-ghost">
          Request a quote
        </Link>
      </div>
    </section>
  );
}
