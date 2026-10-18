import { Link } from "../router";
import { ASTERISK } from "../components/Mark";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        focusable="false"
        className="nf-mark"
      >
        <path d={ASTERISK} />
      </svg>
      <h1>This page fell off the wall.</h1>
      <p className="lede">
        The link may be old, or we moved the project. The work index has
        everything we still stand behind.
      </p>
      <div className="actions">
        <Link to="/work" className="btn btn-ink">
          See all work
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the front page
        </Link>
      </div>
    </section>
  );
}
