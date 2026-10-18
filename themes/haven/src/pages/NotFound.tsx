import { Link } from "../router";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>This path is lost in the fog</h1>
      <p className="lede">
        The page you were looking for is not here. The house is still where it
        was.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Back to the house
        </Link>
        <Link to="/rooms" className="btn btn-outline">
          See the rooms
        </Link>
      </div>
    </section>
  );
}
