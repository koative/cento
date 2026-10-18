import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>This page has rinsed away.</h1>
      <p className="lede">
        The link may be old, or the product may have been reformulated under a
        new name.
      </p>
      <div className="actions">
        <Link to="/shop" className="btn">
          Browse the essentials <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to home
        </Link>
      </div>
    </div>
  );
}
