import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>Off route.</h1>
      <p className="lead">
        This page has been stripped, like a wall on reset Tuesday. The problems
        you're after are probably on the route map.
      </p>
      <div className="actions">
        <Link to="/routes" className="btn btn-tape">
          Open the route map
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
