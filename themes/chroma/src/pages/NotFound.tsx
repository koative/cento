import { Link } from "../router";
import { pageCopy } from "../content";

export function NotFound() {
  return (
    <div className="page wrap not-found" data-not-found>
      <h1>{pageCopy.notFound.title}</h1>
      <p className="lede">{pageCopy.notFound.body}</p>
      <div className="actions">
        <Link to="/services" className="btn btn-primary">
          See the menu
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the start
        </Link>
      </div>
    </div>
  );
}
