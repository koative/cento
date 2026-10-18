import { ArrowRight } from "lucide-react";
import { Link } from "../router";

export function NotFound() {
  return (
    <div className="page not-found" data-not-found>
      <span
        className="price-card price-card-xl"
        data-tone="pantry"
        aria-hidden="true"
      >
        <strong>404</strong>
        <small>sold out</small>
      </span>
      <h1>That shelf is empty</h1>
      <p className="lede">
        The page you were after has moved or never existed. The aisles are still
        fully stocked.
      </p>
      <div className="actions">
        <Link to="/aisles" className="btn btn-lg">
          Walk the aisles <ArrowRight size={20} aria-hidden="true" />
        </Link>
        <Link to="/" className="btn btn-ghost btn-lg">
          Back to the front of the shop
        </Link>
      </div>
    </div>
  );
}
