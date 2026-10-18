import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <section className="sheet page-head" data-not-found>
      <p className="aside margin-note">
        Missing frame. Probably renamed in the last review.
      </p>
      <div className="col">
        <h1 className="display">This page isn't in the file.</h1>
        <p className="lead">
          The link may be old, or the case study it pointed to has moved.
          Everything current is one click away.
        </p>
        <div className="actions">
          <Link to="/work" className="btn">
            Browse case studies <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link to="/" className="btn btn-line">
            Back to the start
          </Link>
        </div>
      </div>
    </section>
  );
}
