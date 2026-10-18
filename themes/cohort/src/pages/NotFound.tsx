import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page wrap not-found" data-not-found>
      <h1>Nothing on file here.</h1>
      <p className="lede">
        The page you asked for does not exist, or it was retired with an old
        fund. The portfolio and the pitch form are exactly where they were.
      </p>
      <div className="actions">
        <Link to="/portfolio" className="btn btn-ink">
          See the portfolio
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
