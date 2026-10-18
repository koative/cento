import { Link } from "../router";
import { brand } from "../content";

export function NotFound() {
  return (
    <section className="not-found wrap" data-not-found>
      <h1>This page has wandered off.</h1>
      <p className="lede">
        The link may be old, or the page moved. Try the services list, or call
        us and we'll point you the right way.
      </p>
      <div className="actions">
        <Link to="/" className="btn btn-primary">
          Back to the clinic
        </Link>
        <Link to="/services" className="btn btn-ghost">
          All services
        </Link>
        <a href={brand.phoneHref} className="text-link">
          {brand.phone}
        </a>
      </div>
    </section>
  );
}
