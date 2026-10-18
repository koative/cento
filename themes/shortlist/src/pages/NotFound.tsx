import { Link } from "../router";

export function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <h1>This listing has come down.</h1>
      <p className="lede">
        Listings leave Shortlist after thirty days or the day they’re filled,
        and this address doesn’t match anything current. The job you were after
        may already be someone’s.
      </p>
      <div className="close-actions">
        <Link to="/jobs" className="btn btn-pen">
          See today’s listings
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the front page
        </Link>
      </div>
    </div>
  );
}
