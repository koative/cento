import { Link } from "../router";
import { Iris } from "../components/Logo";

export function NotFound() {
  return (
    <div className="wrap page-pad not-found" data-not-found>
      <Iris className="iris iris-big" />
      <h1>Reel missing</h1>
      <p className="lede">
        This page is not in the programme. It may have finished its run, or the
        link may have a typo.
      </p>
      <div className="actions">
        <Link to="/whats-on" className="btn btn-red">
          See what's on
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the foyer
        </Link>
      </div>
    </div>
  );
}
