import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>This page has wandered off</h1>
      <p className="lede">
        Like a groomsman just before the speeches. The link may be old, or the
        story may have moved.
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          Back to the start
        </Link>
        <Link to="/weddings" className="text-link">
          Browse weddings
        </Link>
      </div>
    </div>
  );
}
