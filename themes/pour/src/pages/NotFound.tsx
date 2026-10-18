import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>This bottle is empty</h1>
      <p className="lead">
        The page you were after is not on the shelf. It may have sold out, or
        the link was mistyped.
      </p>
      <div className="actions">
        <Link to="/wines" className="btn">
          Back to the wines <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
    </div>
  );
}
