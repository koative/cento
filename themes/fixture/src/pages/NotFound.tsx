import { Link } from "../router";
import { brand } from "../content";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <h1>This line is capped off.</h1>
      <p className="lede">
        The page you were after isn't connected to anything. Try one of these,
        or call the office on <a href={brand.phoneHref}>{brand.phone}</a>.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-ink">
          Home
        </Link>
        <Link to="/services" className="btn btn-ghost">
          Services
        </Link>
        <Link to="/estimate" className="btn btn-ghost">
          Instant estimate
        </Link>
        <Link to="/emergency" className="btn btn-live">
          Emergency help
        </Link>
      </div>
    </section>
  );
}
