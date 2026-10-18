import { Link } from "../router";

export function NotFound() {
  return (
    <section className="page-head not-found" data-not-found>
      <div className="wrap">
        <h1 className="display">This scene was cut in rehearsal.</h1>
        <p className="lede">
          The page you were looking for isn't in the script any more. The rest
          of the season is still running.
        </p>
        <div className="actions">
          <Link to="/season" className="btn btn-red">
            See the season
          </Link>
          <Link to="/" className="btn btn-line">
            Back to the foyer
          </Link>
        </div>
      </div>
    </section>
  );
}
