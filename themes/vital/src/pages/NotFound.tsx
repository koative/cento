import { Link } from "../router";
import { Trace } from "../components/Mark";

export function NotFound() {
  return (
    <section className="page-head not-found" data-not-found>
      <div className="wrap">
        <Trace beats={2} className="flat-trace" />
        <h1>No pulse on this page.</h1>
        <p className="lede">
          The link may be old, or the address mistyped. Everything you need is
          one step away.
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link to="/conditions" className="btn btn-quiet">
            Browse conditions
          </Link>
        </div>
      </div>
    </section>
  );
}
