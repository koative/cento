import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <div className="wrap page not-found" data-not-found>
      <h1>This drawing is not in the set.</h1>
      <p>
        The page may have moved when we reorganised the archive, or the address
        has a typo.
      </p>
      <div className="actions">
        <Link to="/projects" className="btn">
          Browse the projects <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the home page
        </Link>
      </div>
    </div>
  );
}
