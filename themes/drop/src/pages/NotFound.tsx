import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <h1>Sold out. Or it never existed.</h1>
      <p className="lead">
        This page is not on the rail. Pieces from old drops leave the shop once
        they sell through, so the link may be from an archived run.
      </p>
      <div className="hero-actions">
        <Link to="/shop" className="btn btn-signal">
          Shop what is left <ArrowRight size={18} aria-hidden="true" />
        </Link>
        <Link to="/drops" className="btn btn-outline">
          Drops calendar
        </Link>
      </div>
    </div>
  );
}
