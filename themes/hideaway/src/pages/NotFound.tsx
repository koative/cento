import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page wrap not-found" data-not-found>
      <h1>This path ends at the sea.</h1>
      <p className="lede">
        The page you asked for is not here, or we have taken it down. The houses
        and the coves are exactly where they were.
      </p>
      <div className="actions">
        <Link to="/villas" className="btn btn-primary">
          See the villas
        </Link>
        <Link to="/" className="btn btn-quiet">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
