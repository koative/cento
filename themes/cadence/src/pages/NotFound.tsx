import { Link } from "../router";
import { notFound } from "../content";

export default function NotFound() {
  return (
    <section className="wrap page-hero not-found" data-not-found>
      <h1>{notFound.heading}</h1>
      <p className="lede">{notFound.body}</p>
      <ul className="actions">
        <li>
          <Link to="/" className="btn btn-primary">
            Home
          </Link>
        </li>
        <li>
          <Link to="/product" className="btn btn-quiet">
            Product
          </Link>
        </li>
        <li>
          <Link to="/pricing" className="btn btn-quiet">
            Pricing
          </Link>
        </li>
        <li>
          <Link to="/app" className="btn btn-quiet">
            Demo workspace
          </Link>
        </li>
      </ul>
    </section>
  );
}
