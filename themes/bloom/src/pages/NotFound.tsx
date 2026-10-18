import { Link } from "../router";

export function NotFound() {
  return (
    <div className="not-found" data-not-found>
      <h1>This stem has wandered off.</h1>
      <p className="lead">
        The page you were looking for isn't here, or it was seasonal and the
        season ended.
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          Back to the studio
        </Link>
        <Link to="/shop" className="btn btn-ghost">
          Shop flowers
        </Link>
      </div>
    </div>
  );
}
