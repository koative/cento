import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="nf-bug num" aria-hidden="true">
        0–13
      </p>
      <h1>Round lost: this page doesn't exist.</h1>
      <p className="lede">
        The link may be from an old season, or the page was moved. Try one of
        these instead.
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          Home
        </Link>
        <Link to="/matches" className="btn btn-ghost">
          Matches
        </Link>
        <Link to="/teams" className="btn btn-ghost">
          Teams
        </Link>
      </div>
    </section>
  );
}
