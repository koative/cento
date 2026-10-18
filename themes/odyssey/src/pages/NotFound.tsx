import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>Off the chart.</h1>
      <p className="lede">
        This page is not on any route we know. It may have moved, or the link
        may have a typo. From here you can head back to known waters.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-accent">
          Back to the start
        </Link>
        <Link to="/destinations" className="btn btn-line">
          See all destinations
        </Link>
      </div>
    </section>
  );
}
