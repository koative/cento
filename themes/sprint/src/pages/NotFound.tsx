import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <section className="page-head not-found" data-not-found>
      <div className="wrap">
        <p className="nf-card" aria-hidden="true">
          <span className="card-key">404</span>
        </p>
        <h1>{notFound.h1}</h1>
        <p className="lede">{notFound.lede}</p>
        <div className="actions">
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
          <Link to="/app" className="btn btn-line">
            Live demo board
          </Link>
          <Link to="/pricing" className="btn btn-line">
            Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
