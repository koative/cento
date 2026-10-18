import { Link } from "../router";

export function NotFound() {
  return (
    <section className="page-head not-found" data-not-found>
      <div className="wrap">
        <h1>This page has wandered off.</h1>
        <p className="lede">
          Probably to the mud kitchen. Try one of these instead.
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Back to the front door
          </Link>
          <Link to="/rooms" className="btn btn-ghost">
            Rooms by age
          </Link>
          <Link to="/tour" className="btn btn-ghost">
            Book a tour
          </Link>
        </div>
      </div>
    </section>
  );
}
