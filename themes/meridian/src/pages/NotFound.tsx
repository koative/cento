import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>This address is not on our map</h1>
      <p className="lede">
        The home may have sold, or the link may be mistyped. Everything we have
        on the market is one search away.
      </p>
      <div className="btn-row">
        <Link to="/homes" className="btn btn-accent">
          Search homes
        </Link>
        <Link to="/" className="btn btn-quiet">
          Back to the start
        </Link>
      </div>
    </section>
  );
}
