import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found wrap" data-not-found>
      <h1>That's not on the board.</h1>
      <p className="lede">
        The page you asked for doesn't exist, or we took it off the menu. The
        burgers are still where they always were.
      </p>
      <div className="actions">
        <Link to="/menu" className="btn btn-primary">
          See the menu
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
