import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page-head wrap not-found" data-not-found>
      <h1>That one's off the menu.</h1>
      <p className="lede">
        The page you asked for doesn't exist, or the kitchen eighty-sixed it.
        The oven is still lit.
      </p>
      <div className="actions">
        <Link to="/menu/dinner" className="btn btn-primary">
          See tonight's menu
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the front door
        </Link>
      </div>
    </div>
  );
}
