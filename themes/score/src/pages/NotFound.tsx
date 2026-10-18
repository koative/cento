import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found wrap" data-not-found>
      <h1>This bar is empty.</h1>
      <p className="lede">
        The page you were looking for isn't in the score — it may have moved, or
        never existed. Count four beats and try one of these.
      </p>
      <div className="actions">
        <Link to="/programmes" className="btn btn-primary">
          See the programmes
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the beginning
        </Link>
      </div>
    </div>
  );
}
