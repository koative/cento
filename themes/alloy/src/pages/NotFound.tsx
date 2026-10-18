import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="nf-code num" aria-hidden="true">
        404
      </p>
      <h1>Site closed to visitors</h1>
      <p className="lede">
        This page is not on the drawings. It may have moved, or the link was
        mistyped.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-signal">
          Back to the home page
        </Link>
        <Link to="/projects" className="btn btn-line">
          Browse projects
        </Link>
      </div>
    </section>
  );
}
