import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <p className="nf-code" aria-hidden="true">
        404
      </p>
      <h1>This video is unavailable</h1>
      <p className="lead">
        The link might be old, or the episode was cut in the edit. Everything
        that made it out of the shop is in the library.
      </p>
      <div className="actions">
        <Link to="/videos" className="btn btn-spark">
          Browse all videos
        </Link>
        <Link to="/" className="btn btn-ghost">
          Back to the channel
        </Link>
      </div>
    </section>
  );
}
