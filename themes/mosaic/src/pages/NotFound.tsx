import { Link } from "../router";

export function NotFound() {
  return (
    <section className="not-found" data-not-found>
      <div className="nf-tiles" aria-hidden="true">
        <i />
        <i />
        <i />
        <i data-gap />
      </div>
      <h1>A tile is missing here.</h1>
      <p className="lede">
        This page does not exist, or it has moved. The rest of the floor is
        intact.
      </p>
      <div className="actions">
        <Link to="/" className="btn">
          Back to the home page
        </Link>
        <Link to="/materials" className="text-link">
          Browse the material library
        </Link>
      </div>
    </section>
  );
}
