import { Link } from "../router";

export function NotFound() {
  return (
    <section className="page-head sheet not-found" data-not-found>
      <div className="wrap">
        <h1>This road doesn't go anywhere.</h1>
        <p className="lede">
          The page you asked for has moved or never existed. These ones are
          real:
        </p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
          <Link to="/models" className="btn btn-ghost">
            Models
          </Link>
          <Link to="/test-drive" className="btn btn-ghost">
            Book a test drive
          </Link>
        </div>
      </div>
    </section>
  );
}
