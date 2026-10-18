import { Link } from "../router";

export function NotFound() {
  return (
    <section className="page-head not-found" data-not-found>
      <div className="wrap">
        <p className="nf-code" aria-hidden="true">
          −100%
        </p>
        <h1>This page converts at zero.</h1>
        <p className="lede">
          The link is broken or the page has moved. Here's where the traffic
          usually goes instead.
        </p>
        <div className="btn-row">
          <Link to="/" className="btn btn-lift">
            Back to the home page
          </Link>
          <Link to="/work" className="btn btn-line">
            Case studies
          </Link>
          <Link to="/services" className="btn btn-line">
            Services
          </Link>
        </div>
      </div>
    </section>
  );
}
