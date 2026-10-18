import { episodes } from "../content";
import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap notfound" data-not-found>
      <p className="notfound-time" aria-hidden="true">
        0:00
      </p>
      <h1>This page is dead air.</h1>
      <p className="lede">
        The link may be old, or the episode may have moved. Everything we have
        ever published is still in the archive.
      </p>
      <div className="btn-row">
        <Link to="/episodes" className="btn btn-ink">
          Browse every episode
        </Link>
        <Link to={`/episodes/${episodes[0].id}`} className="btn btn-line">
          Play the newest one
        </Link>
      </div>
    </section>
  );
}
