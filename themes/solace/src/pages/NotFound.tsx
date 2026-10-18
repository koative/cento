import { Link } from "../router";
import { brand } from "../content";

export function NotFound() {
  return (
    <section className="not-found" data-not-found>
      <h1>We can’t find that page.</h1>
      <p className="lede">
        It may have moved when we reorganised the site. Try one of these, or
        call reception on <a href={brand.phoneHref}>{brand.phone}</a>.
      </p>
      <div className="row">
        <Link to="/" className="btn">
          Back to the home page
        </Link>
        <Link to="/book" className="btn btn-quiet">
          Book a visit
        </Link>
        <Link to="/services" className="btn btn-quiet">
          See all services
        </Link>
      </div>
    </section>
  );
}
