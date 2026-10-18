import { Link } from "../router";

export function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <h1>This kennel's empty.</h1>
      <p className="lede">
        The page you were looking for has gone home, or never lived here. If it
        was an animal's profile, good news: they've probably been adopted.
      </p>
      <div className="actions">
        <Link to="/animals" className="btn btn-primary">
          See who's still waiting
        </Link>
        <Link to="/" className="btn btn-quiet">
          Back to the front desk
        </Link>
      </div>
    </div>
  );
}
