import { Link } from "../router";

export function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <h1>Out of the light</h1>
      <p className="lede">
        This page isn't in the programme. It may have moved, or it was never on
        the schedule at all.
      </p>
      <div className="actions">
        <Link to="/agenda" className="btn btn-ink">
          Open the agenda
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
