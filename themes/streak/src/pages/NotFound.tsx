import { Link } from "../router";

export default function NotFound() {
  return (
    <div className="page not-found wrap" data-not-found>
      <div className="nf-square" aria-hidden="true">
        <span>404</span>
      </div>
      <h1>An empty square</h1>
      <p className="lede">
        This page isn't on the calendar. The link may be old, or the address
        mistyped.
      </p>
      <p className="nf-links">
        <Link to="/" className="btn btn-primary">
          Back to the home page
        </Link>
        <Link to="/help" className="btn btn-quiet">
          Search the help centre
        </Link>
      </p>
    </div>
  );
}
