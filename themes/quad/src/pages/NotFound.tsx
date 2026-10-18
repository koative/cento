import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>This page isn't in the prospectus</h1>
      <p className="lead">
        The link may be from an older edition, or the programme may have been
        renamed. Try one of these instead.
      </p>
      <div className="btn-row">
        <Link to="/programmes" className="btn btn-primary">
          Programme finder
        </Link>
        <Link to="/" className="btn btn-outline">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
