import { Link } from "../router";
import { Glass } from "../components/Art";

export function NotFound() {
  return (
    <section className="wrap not-found" data-not-found>
      <Glass shape="pint" id="empty" className="glass glass-hero" />
      <h1>This glass is empty.</h1>
      <p className="lede">
        The page you were after isn't on the board. It may have been a limited
        release.
      </p>
      <div className="actions">
        <Link to="/beers" className="btn btn-copper">
          See every beer
        </Link>
        <Link to="/" className="btn btn-line">
          Back to the taproom
        </Link>
      </div>
    </section>
  );
}
