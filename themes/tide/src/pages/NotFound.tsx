import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>Washed out</h1>
      <p className="lede">
        This page isn't on the chart. It may have moved, or the link was
        mistyped.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-sea">
          Back to the home page
        </Link>
        <Link to="/volunteer" className="btn btn-ghost">
          See volunteer events
        </Link>
      </div>
    </section>
  );
}
