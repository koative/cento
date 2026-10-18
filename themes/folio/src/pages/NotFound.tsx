import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page narrow not-found" data-not-found>
      <h1 className="display">This wall is empty</h1>
      <p className="lede">
        The page you were looking for has been taken down, or was never hung.
        The current exhibitions are a good place to start again.
      </p>
      <div className="actions">
        <Link to="/exhibitions" className="btn">
          See what is on
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the home page
        </Link>
      </div>
    </div>
  );
}
