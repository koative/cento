import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <span className="bag-no bag-no-big" aria-hidden="true">
        404
      </span>
      <h1>This one went off the menu</h1>
      <p className="lead">
        The page you asked for isn’t in this week’s box. It may have been a
        recipe from an earlier week.
      </p>
      <div className="actions">
        <Link to="/menu" className="btn">
          See this week’s menu
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
