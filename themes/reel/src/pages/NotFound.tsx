import { Link } from "../router";
import { timecode } from "../lib/format";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="tc" aria-hidden="true">
        {timecode(0)}
      </p>
      <h1 className="h-display">This reel is empty</h1>
      <p className="lede">
        The page you were looking for was cut, renamed or never shot. The films
        are all still here.
      </p>
      <div className="actions">
        <Link to="/films" className="btn btn-primary">
          Browse the films
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the start
        </Link>
      </div>
    </section>
  );
}
