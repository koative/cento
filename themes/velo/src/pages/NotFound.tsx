import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>Dropped chain</h1>
      <p className="lead">
        This page has come off the ring. It may have moved, or the link was
        mistyped.
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          Back to the shop <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/bikes" className="btn btn-ghost">
          See the bikes
        </Link>
      </div>
    </div>
  );
}
